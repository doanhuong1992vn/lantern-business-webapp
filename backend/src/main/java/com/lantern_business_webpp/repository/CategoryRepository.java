package com.lantern_business_webpp.repository;

import com.lantern_business_webpp.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CategoryRepository extends CrudRepository<Category, Long>, JpaRepository<Category, Long> {
    List<Category> findByActiveTrue();
}
