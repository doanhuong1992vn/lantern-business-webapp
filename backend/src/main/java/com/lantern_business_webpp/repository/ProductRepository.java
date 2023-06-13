package com.lantern_business_webpp.repository;

import com.lantern_business_webpp.entity.Category;
import com.lantern_business_webpp.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;


public interface ProductRepository extends
        PagingAndSortingRepository<Product, Long>,
        CrudRepository<Product, Long>,
        JpaRepository<Product, Long> {
    Page<Product> findAllByCategory(Category category, Pageable pageable);

    Page<Product> findAllByNameContaining(String query, Pageable pageable);

    List<Product> findByActiveTrue();

    boolean existsByName(String name);

    boolean existsByNameAndActiveTrue(String name);
}
