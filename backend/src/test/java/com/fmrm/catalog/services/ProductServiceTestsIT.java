package com.fmrm.catalog.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import com.fmrm.catalog.dto.ProductDTO;
import com.fmrm.catalog.repositories.ProductRepository;
import com.fmrm.catalog.services.exceptions.ResourceNotFoundException;

@SpringBootTest
@Transactional
public class ProductServiceTestsIT {

	@Autowired
	private ProductService service;

	@Autowired
	private ProductRepository repository;

	private Long existingId;
	private Long nonExistingId;
	private Long countTotalProducts;

	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 1000L;
		countTotalProducts = 25L;
	}

	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});
	}

	@Test
	public void deleteShouldDeleteResourceWhenIdExists() {
		service.delete(existingId);

		Assertions.assertEquals(countTotalProducts - 1, repository.count());

	}

	@Test
	public void findAllPagedShouldReturnOrderedPageWhenSortByName() {
		PageRequest pageRequest = PageRequest.of(0, 10, Sort.by("name"));

		Page<ProductDTO> result = service.findAllPaged(0L, "", pageRequest);

		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals("Macbook Pro", result.getContent().get(0).getName());
		Assertions.assertEquals("PC Gamer", result.getContent().get(1).getName());
		Assertions.assertEquals("PC Gamer Alfa", result.getContent().get(2).getName());
	}

	@Test
	public void findAllPagedShouldReturnEmptyPageWhenPageDoesNotExist() {
		int size = 10;
		long lastPage = countTotalProducts / size;

		PageRequest pageRequest = PageRequest.of((int) lastPage + 1, size);

		Page<ProductDTO> result = service.findAllPaged(0L, "", pageRequest);

		Assertions.assertTrue(result.isEmpty());

	}

	@Test
	public void findAllPagedShouldReturnPageWhenPage0Size10() {
		PageRequest pageRequest = PageRequest.of(0, 10);

		Page<ProductDTO> result = service.findAllPaged(0L, "", pageRequest);

		Assertions.assertFalse(result.isEmpty());
		Assertions.assertEquals(0, result.getNumber());
		Assertions.assertEquals(10, result.getSize());
		Assertions.assertEquals(countTotalProducts, result.getTotalElements());
	}
}
