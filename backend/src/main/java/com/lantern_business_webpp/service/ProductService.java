package com.lantern_business_webpp.service;

import com.lantern_business_webpp.payload.response.ProductResponseDTO;
import com.lantern_business_webpp.entity.Category;
import com.lantern_business_webpp.entity.Product;
import com.lantern_business_webpp.payload.request.ProductRequestDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService extends GeneralService<ProductRequestDTO, ProductResponseDTO> {
    Page<Product> findAllWithPagination(Pageable pageable);

    Page<Product> findByCategory(Category value, Pageable pageable);

    Page<Product> findAllByNameContaining(String query, Pageable pageRequest);

    boolean existsByNameAndActiveTrue(String name);

    boolean deleteByIds(Long[] ids);
}
