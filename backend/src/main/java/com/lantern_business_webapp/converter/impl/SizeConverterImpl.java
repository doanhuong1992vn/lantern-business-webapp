package com.lantern_business_webapp.converter.impl;

import com.lantern_business_webapp.converter.SizeConverter;
import com.lantern_business_webapp.entity.Size;
import com.lantern_business_webapp.payload.SizeDTO;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class SizeConverterImpl implements SizeConverter {
    @Override
    public SizeDTO convertEntityToResponse(Size size) {
        return size == null
                ? null
                : SizeDTO.builder()
                .id(size.getId().toString())
                .size(size.getName())
                .build();
    }

    @Override
    public Size convertRequestToEntity(SizeDTO size) {
        return size == null
                ? null
                : Size.builder()
                .id(size.getId() == null
                        ? null
                        : UUID.fromString(size.getId()))
                .name(size.getSize())
                .build();
    }
}
