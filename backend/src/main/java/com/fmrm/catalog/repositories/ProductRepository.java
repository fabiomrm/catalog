package com.fmrm.catalog.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.fmrm.catalog.entities.Category;
import com.fmrm.catalog.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{
	
	@Query("SELECT DISTINCT obj "
			+ "FROM Product obj INNER JOIN obj.categories cats "
			+ "WHERE (:category IS NULL) OR :category IN cats")
	Page<Product> find(Category category, Pageable pageable);

}
