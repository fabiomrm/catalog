package com.fmrm.catalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fmrm.catalog.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{

}
