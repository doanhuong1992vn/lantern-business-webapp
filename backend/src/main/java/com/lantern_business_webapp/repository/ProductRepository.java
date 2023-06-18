package com.lantern_business_webapp.repository;

import com.lantern_business_webapp.entity.Category;
import com.lantern_business_webapp.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.UUID;


public interface ProductRepository extends
        PagingAndSortingRepository<Product, UUID>,
        CrudRepository<Product, UUID>,
        JpaRepository<Product, UUID> {
    Page<Product> findAllByCategory(Category category, Pageable pageable);

    Page<Product> findAllByNameContaining(String query, Pageable pageable);

    List<Product> findByActiveTrue();

    boolean existsByName(String name);

    boolean existsByNameAndActiveTrue(String name);
}
