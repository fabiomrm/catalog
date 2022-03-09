package com.fmrm.catalog.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.fmrm.catalog.dto.ProductDTO;
import com.fmrm.catalog.entities.Category;
import com.fmrm.catalog.entities.Product;
import com.fmrm.catalog.repositories.CategoryRepository;
import com.fmrm.catalog.repositories.ProductRepository;
import com.fmrm.catalog.services.exceptions.DatabaseException;
import com.fmrm.catalog.services.exceptions.ResourceNotFoundException;
import com.fmrm.catalog.tests.Factory;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {

	@InjectMocks
	private ProductService service;

	@Mock
	private ProductRepository repository;
	
	@Mock
	private CategoryRepository categoryRepository;
	
	private long existingId;
	private long nonExistingId;
	private long dependentId;
	private PageImpl<Product> page;
	private Product product;
	private ProductDTO productDTO;
	private Category category;
	private Long categoryId;
	
	@BeforeEach
	void setup() throws Exception {
		existingId = 1L;
		nonExistingId = 2L;
		dependentId = 3L;
		categoryId = 1L;
		product = Factory.createProduct();
		productDTO = Factory.createProductDTO(); 
		category = Factory.createCategory();
		page = new PageImpl<>(List.of(product));
		
		Mockito.when(repository.getById(existingId)).thenReturn(product);
		Mockito.when(repository.getById(nonExistingId)).thenThrow(EntityNotFoundException.class);
		
		Mockito.when(categoryRepository.getById(existingId)).thenReturn(category);
		Mockito.when(categoryRepository.getById(nonExistingId)).thenThrow(EntityNotFoundException.class);
		
		Mockito.when(repository.findAll((Pageable)ArgumentMatchers.any())).thenReturn(page);
		
		Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(product);
		
		Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(product));
		Mockito.when(repository.findById(nonExistingId)).thenReturn(Optional.empty());
		
		Mockito.doNothing().when(repository).deleteById(existingId);
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
	}
	
	@Test
	public void updateShouldThrowResultNotFoundExceptionWhenIdDoesNotExist() {
		
		
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {			
			ProductDTO result = service.update(nonExistingId, productDTO);
		});
		
	}
	
	@Test
	public void updateShouldReturnProductDTOWhenIdExists() {
		
		ProductDTO result = service.update(existingId, productDTO);
		
		Assertions.assertNotNull(result);
		
	}
	
	@Test
	public void findByIdShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {			
			ProductDTO dto = service.findById(nonExistingId);
		});
	}
	
	@Test
	public void findByIdShoudReturnProductDTOWhenIdExists() {
		ProductDTO dto = service.findById(existingId);
		
		Assertions.assertNotNull(dto);
	}
	
	@Test
	public void findAllPagedShouldReturnPage() {
		Pageable pageable = PageRequest.of(0, 10);
		
		Page<ProductDTO> result = service.findAllPaged(categoryId, pageable);
		
		Assertions.assertNotNull(result);
		Mockito.verify(repository, Mockito.times(1)).findAll(pageable);
	}
	
	
	@Test
	public void deleteShoudThrowDatabaseExceptionWhenDependentId() {
		Assertions.assertThrows(DatabaseException.class, () -> {
			service.delete(dependentId);			
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(dependentId);
	}
	
	@Test
	public void deleteShoudThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);			
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(nonExistingId);
	}
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		
		
		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);			
		});
		
		Mockito.verify(repository, Mockito.times(1)).deleteById(existingId);
	}

}
