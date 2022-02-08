package com.fmrm.catalog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fmrm.catalog.entities.Category;
import com.fmrm.catalog.repositories.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	CategoryRepository repository;
	
	public List<Category> findAll() {
		return repository.findAll();
	}
}
