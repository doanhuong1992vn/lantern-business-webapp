package com.lantern_business_webapp.converter.impl;

import com.lantern_business_webapp.converter.ProductConverter;
import com.lantern_business_webapp.converter.VariantConverter;
import com.lantern_business_webapp.entity.Product;
import com.lantern_business_webapp.entity.Variant;
import com.lantern_business_webapp.payload.request.ProductRequestDTO;
import com.lantern_business_webapp.payload.response.DetailProductResponseDTO;
import com.lantern_business_webapp.payload.response.ProductResponseDTO;
import com.lantern_business_webapp.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ProductConverterImpl implements ProductConverter {
    private final CategoryRepository categoryRepository;
    private final VariantConverter variantConverter;

    @Override
    public DetailProductResponseDTO convertEntityToDetailResponse(Product product) {
        return product == null
                ? null
                : DetailProductResponseDTO.builder()
                .id(product.getId().toString())
                .name(product.getName())
                .image(product.getImage())
                .category(product.getCategory().getName())
                .description(product.getDescription())
                .isShow(product.isShow())
                .variants(product.getVariants()
                        .stream()
                        .filter(Variant::isActive)
                        .map(variantConverter::convertEntityToResponse)
                        .toList())
                .build();
    }

    @Override
    public ProductResponseDTO convertEntityToResponse(Product product) {
        return product == null
                ? null
                : ProductResponseDTO.builder()
                .id(product.getId().toString())
                .name(product.getName())
                .image(product.getImage())
                .isShow(product.isShow())
                .category(product.getCategory().getName())
                .build();
    }

    @Override
    public Product convertRequestToEntity(ProductRequestDTO productRequestDTO) {
        return productRequestDTO == null
                ? null
                : Product.builder()
                .id(productRequestDTO.getId() == null
                        ? null
                        : UUID.fromString(productRequestDTO.getId()))
                .active(true)
                .isShow(productRequestDTO.isShow())
                .name(productRequestDTO.getName())
                .image(productRequestDTO.getImage())
                .description(productRequestDTO.getDescription())
                .category(categoryRepository.findByNameAndActiveTrue(productRequestDTO.getCategory()))
                .build();
    }

}
