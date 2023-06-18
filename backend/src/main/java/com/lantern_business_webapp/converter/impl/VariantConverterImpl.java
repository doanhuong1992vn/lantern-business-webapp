package com.lantern_business_webapp.converter.impl;

import com.lantern_business_webapp.converter.VariantConverter;
import com.lantern_business_webapp.entity.Variant;
import com.lantern_business_webapp.payload.request.VariantRequestDTO;
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
    public Variant convertEntityToResponse(Variant source) {
        return null;
    }

    @Override
    public Variant convertRequestToEntity(VariantRequestDTO variantRequestDTO) {
        return Variant.builder()
                .id(variantRequestDTO.getId() == null
                        ? UUID.randomUUID()
                        : UUID.fromString(variantRequestDTO.getId()))
                .size(sizeRepository.findByNameAndActiveTrue(variantRequestDTO.getSize()))
                .color(colorRepository.findByNameAndActiveTrue(variantRequestDTO.getColor()))
                .price(variantRequestDTO.getPrice())
                .quantity(variantRequestDTO.getQuantity())
                .active(true)
                .isShow(true)
                .build();
    }
}
