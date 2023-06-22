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

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ProductConverterImpl implements ProductConverter {
    private final CategoryRepository categoryRepository;
    private final VariantConverter variantConverter;

    @Override
    public DetailProductResponseDTO convertEntityToDetailResponse(@NotNull Product product) {
        return DetailProductResponseDTO.builder()
                .id(product.getId().toString())
                .name(product.getName())
                .image(product.getImage())
                .category(product.getCategory().getName())
                .description(product.getDescription())
                .isShown(product.isShown())
                .variants(product.getVariants()
                        .stream()
                        .filter(Variant::isActive)
                        .map(variantConverter::convertEntityToResponse)
                        .toList())
                .build();
    }

    @Override
    public ProductResponseDTO convertEntityToResponse(@NotNull Product product) {
        return ProductResponseDTO.builder()
                .id(product.getId().toString())
                .name(product.getName())
                .image(product.getImage())
                .isShown(product.isShown())
                .category(product.getCategory().getName())
                .build();
    }

    @Override
    public Product convertRequestToEntity(@NotNull ProductRequestDTO productRequestDTO) {
        return Product.builder()
                .id(productRequestDTO.getId() == null
                        ? null
                        : UUID.fromString(productRequestDTO.getId()))
                .active(true)
                .isShown(productRequestDTO.isShown())
                .name(productRequestDTO.getName())
                .image(productRequestDTO.getImage())
                .description(productRequestDTO.getDescription())
                .category(categoryRepository.findByNameAndActiveTrue(productRequestDTO.getCategory()))
                .build();
    }

}
