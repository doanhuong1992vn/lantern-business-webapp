package com.lantern_business_webapp.converter.impl;

import com.lantern_business_webapp.converter.CategoryConverter;
import com.lantern_business_webapp.entity.Category;
import com.lantern_business_webapp.payload.CategoryDTO;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Component
public class CategoryConverterImpl implements CategoryConverter {
    @Override
    public CategoryDTO convertEntityToResponse(@NotNull Category category) {
        return CategoryDTO.builder()
                .id(category.getId().toString())
                .category(category.getName())
                .build();
    }

    @Override
    public Category convertRequestToEntity(@NotNull CategoryDTO category) {
        return Category.builder()
                .id(category.getId() == null
                        ? null
                        : UUID.fromString(category.getId()))
                .name(category.getCategory())
                .build();
    }
}
