package com.lantern_business_webpp.service;

import com.lantern_business_webpp.entity.Category;

public interface CategoryService extends GeneralService<Category, Category> {
    Category save(Category category);
}
