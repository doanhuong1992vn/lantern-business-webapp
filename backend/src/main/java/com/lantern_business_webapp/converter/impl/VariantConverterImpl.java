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
        return VariantDTO.builder()
                .id(variant.getId().toString())
                .color(variant.getColor().getName())
                .size(variant.getSize().getName())
                .quantity(variant.getQuantity())
                .price(variant.getPrice())
                .build();
    }

    @Override
    public Variant convertRequestToEntity(VariantDTO variantDTO) {
        return Variant.builder()
                .id(variantDTO.getId() == null
                        ? UUID.randomUUID()
                        : UUID.fromString(variantDTO.getId()))
                .size(sizeRepository.findByNameAndActiveTrue(variantDTO.getSize()))
                .color(colorRepository.findByNameAndActiveTrue(variantDTO.getColor()))
                .price(variantDTO.getPrice())
                .quantity(variantDTO.getQuantity())
                .active(true)
                .isShow(true)
                .build();
    }
}
