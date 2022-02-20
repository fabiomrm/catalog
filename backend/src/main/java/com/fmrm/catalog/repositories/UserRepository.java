package com.fmrm.catalog.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fmrm.catalog.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{

	User findByEmail(String email);
}
