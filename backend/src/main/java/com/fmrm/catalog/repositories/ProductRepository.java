package com.fmrm.catalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fmrm.catalog.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
