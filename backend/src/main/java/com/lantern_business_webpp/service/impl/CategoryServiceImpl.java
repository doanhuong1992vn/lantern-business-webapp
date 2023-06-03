package com.lantern_business_webpp.service.impl;

import com.lantern_business_webpp.entity.Category;
import com.lantern_business_webpp.repository.CategoryRepository;
import com.lantern_business_webpp.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> findByActiveTrue() {
        return categoryRepository.findByActiveTrue();
    }


    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }


    @Override
    public Category findById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {

    }
}
