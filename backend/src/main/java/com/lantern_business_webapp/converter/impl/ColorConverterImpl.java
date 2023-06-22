package com.lantern_business_webapp.converter.impl;

import com.lantern_business_webapp.converter.ColorConverter;
import com.lantern_business_webapp.entity.Color;
import com.lantern_business_webapp.payload.ColorDTO;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Component
public class ColorConverterImpl implements ColorConverter {
    @Override
    public ColorDTO convertEntityToResponse(@NotNull Color color) {
        return ColorDTO.builder()
                .id(color.getId().toString())
                .color(color.getName())
                .build();
    }

    @Override
    public Color convertRequestToEntity(@NotNull ColorDTO color) {
        return Color.builder()
                .id(color.getId() == null
                        ? null
                        : UUID.fromString(color.getId()))
                .name(color.getColor())
                .build();
    }
}
