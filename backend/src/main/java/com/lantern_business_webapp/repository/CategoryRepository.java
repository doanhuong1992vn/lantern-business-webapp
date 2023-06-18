package com.lantern_business_webapp.repository;

import com.lantern_business_webapp.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface CategoryRepository extends CrudRepository<Category, UUID>, JpaRepository<Category, UUID> {
    List<Category> findByActiveTrue();
    Category findByNameAndActiveTrue(String category);
}
