package com.lantern_business_webapp.converter.impl;

import com.lantern_business_webapp.converter.VariantConverter;
import com.lantern_business_webapp.entity.Variant;
import com.lantern_business_webapp.payload.VariantDTO;
import com.lantern_business_webapp.repository.ColorRepository;
import com.lantern_business_webapp.repository.SizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.UUID;

@RequiredArgsConstructor
@Component
public class VariantConverterImpl implements VariantConverter {
    private final SizeRepository sizeRepository;
    private final ColorRepository colorRepository;

    @Override
    public VariantDTO convertEntityToResponse(Variant variant) {
        return variant == null
                ? null
                : VariantDTO.builder()
                .id(variant.getId().toString())
                .size(variant.getSize().getName())
                .color(variant.getColor().getName())
                .importPrice(variant.getImportPrice())
                .salePrice(variant.getSalePrice())
                .quantity(variant.getQuantity())
                .isShow(variant.isShow())
                .build();
    }

    @Override
    public Variant convertRequestToEntity(VariantDTO variantDTO) {
        return variantDTO == null
                ? null
                : Variant.builder()
                .id(variantDTO.getId() == null
                        ? null
                        : UUID.fromString(variantDTO.getId()))
                .color(colorRepository.findByNameAndActiveTrue(variantDTO.getColor()))
                .size(sizeRepository.findByNameAndActiveTrue(variantDTO.getSize()))
                .importPrice(variantDTO.getImportPrice())
                .salePrice(variantDTO.getSalePrice())
                .quantity(variantDTO.getQuantity())
                .isShow(variantDTO.isShow())
                .active(true)
                .build();
    }
}
