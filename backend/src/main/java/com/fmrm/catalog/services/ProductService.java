package com.fmrm.catalog.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fmrm.catalog.dto.ProductDTO;
import com.fmrm.catalog.entities.Product;
import com.fmrm.catalog.repositories.ProductRepository;
import com.fmrm.catalog.services.exceptions.DatabaseException;
import com.fmrm.catalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService {
	
	@Autowired
	private ProductRepository repository;
	
	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(PageRequest pageRequest) 
	{
		Page<Product> list = repository.findAll(pageRequest);
		
		return list.map(x -> new ProductDTO(x));
	}
	
	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {
		Optional<Product> obj = repository.findById(id);
		Product entity = obj.orElseThrow(() -> new ResourceNotFoundException("Product not found"));
		
		return new ProductDTO(entity, entity.getCategories());
	}
	
	@Transactional
	public ProductDTO insert(ProductDTO dto) {
		Product entity = instantiate(dto);
		entity = repository.save(entity);
		
		return new ProductDTO(entity);
		
	}
	
	private Product instantiate(ProductDTO dto) {
		Product entity = new Product();
		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		entity.setPrice(dto.getPrice());
		entity.setImgUrl(dto.getImgUrl());
		
		return entity;
	}
	
//	public ProductDTO update(ProductDTO dto, Long id) {
//		try {
//			Product entity = instantiate(dto);
//		}catch(EntityNotFoundException e) {
//			throw new ResourceNotFoundException("Id not found: " + id);
//		}
//	}
	
	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} 
		catch(EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
		catch(DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity violation");
		}
	}
}
