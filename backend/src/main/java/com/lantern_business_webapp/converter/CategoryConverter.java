package com.lantern_business_webapp.converter;

import com.lantern_business_webapp.entity.Category;
import com.lantern_business_webapp.payload.CategoryDTO;

public interface CategoryConverter extends GeneralConverter
        <Category, CategoryDTO, CategoryDTO> {
}
