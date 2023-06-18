package com.lantern_business_webapp.service;

import com.lantern_business_webapp.entity.Category;
import com.lantern_business_webapp.entity.Product;
import com.lantern_business_webapp.payload.request.ProductRequestDTO;
import com.lantern_business_webapp.payload.response.ProductResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService extends GeneralService<ProductRequestDTO, ProductResponseDTO> {
    Page<Product> findAllWithPagination(Pageable pageable);

    Page<Product> findByCategory(Category value, Pageable pageable);

    Page<Product> findAllByNameContaining(String query, Pageable pageRequest);

    boolean existsByNameAndActiveTrue(String name);

    boolean deleteByIds(String[] ids);
}
