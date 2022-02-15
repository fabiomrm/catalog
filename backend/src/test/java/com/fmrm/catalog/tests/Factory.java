package com.fmrm.catalog.tests;

import java.time.Instant;

import com.fmrm.catalog.dto.ProductDTO;
import com.fmrm.catalog.entities.Category;
import com.fmrm.catalog.entities.Product;

public class Factory {

	public static Product createProduct() {
		Product p = new Product(1L, "Phone", "Good Phone", 800.0, "https://img.com/img.png", Instant.parse("2020-10-20T03:00:00Z"));
		p.getCategories().add(new Category(2L, "Electronics"));
		
		return p;
	}
	
	public static ProductDTO createProductDTO() {
		Product p = createProduct();
		
		return new ProductDTO(p, p.getCategories());
	}
}
