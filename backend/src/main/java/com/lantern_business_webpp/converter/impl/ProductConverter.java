package com.lantern_business_webpp.converter.impl;

import com.lantern_business_webpp.converter.GeneralConverter;
import com.lantern_business_webpp.payload.response.ProductResponseDTO;
import com.lantern_business_webpp.entity.Product;
import com.lantern_business_webpp.payload.request.ProductRequestDTO;
import org.springframework.stereotype.Component;

@Component
public class ProductConverter implements GeneralConverter
        <Product, ProductResponseDTO, ProductRequestDTO> {
    @Override
    public ProductResponseDTO convertToDTO(Product product) {
        return ProductResponseDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .image(product.getImage())
                .category(product.getCategory())
                .build();
    }

    @Override
    public Product convertToEntity(ProductRequestDTO productRequestDTO) {
        return Product.builder()
                .active(true)
                .name(productRequestDTO.getName())
                .image(productRequestDTO.getImage())
                .description(productRequestDTO.getDescription())
                .category(productRequestDTO.getCategory())
                .build();
    }
}
