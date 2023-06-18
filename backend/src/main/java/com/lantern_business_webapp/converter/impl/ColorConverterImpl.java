package com.lantern_business_webapp.converter.impl;

import com.lantern_business_webapp.converter.ColorConverter;
import com.lantern_business_webapp.entity.Color;
import com.lantern_business_webapp.payload.ColorDTO;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ColorConverterImpl implements ColorConverter {
    @Override
    public ColorDTO convertEntityToResponse(Color color) {
        if (color == null) {
            return null;
        }
        return ColorDTO.builder()
                .id(color.getId().toString())
                .color(color.getName())
                .build();
    }

    @Override
    public Color convertRequestToEntity(ColorDTO color) {
        return Color.builder()
                .id(color.getId() == null
                        ? UUID.randomUUID()
                        : UUID.fromString(color.getId()))
                .name(color.getColor())
                .build();
    }
}
