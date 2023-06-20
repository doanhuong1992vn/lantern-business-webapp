package com.lantern_business_webapp.converter.impl;

import com.lantern_business_webapp.converter.CategoryConverter;
import com.lantern_business_webapp.entity.Category;
import com.lantern_business_webapp.payload.CategoryDTO;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class CategoryConverterImpl implements CategoryConverter {
    @Override
    public CategoryDTO convertEntityToResponse(Category category) {
        return category == null
                ? null
                : CategoryDTO.builder()
                .id(category.getId().toString())
                .category(category.getName())
                .build();
    }

    @Override
    public Category convertRequestToEntity(CategoryDTO category) {
        return category == null
                ? null
                : Category.builder()
                .id(category.getId() == null
                        ? null
                        : UUID.fromString(category.getId()))
                .name(category.getCategory())
                .build();
    }
}
