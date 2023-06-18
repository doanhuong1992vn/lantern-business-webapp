package com.lantern_business_webapp.service.impl;

import com.lantern_business_webapp.converter.CategoryConverter;
import com.lantern_business_webapp.payload.CategoryDTO;
import com.lantern_business_webapp.repository.CategoryRepository;
import com.lantern_business_webapp.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryConverter categoryConverter;

    @Override
    public List<CategoryDTO> findByActiveTrue() {
        return categoryRepository.findByActiveTrue()
                .stream().map(categoryConverter::convertEntityToResponse).toList();
    }


    @Override
    public CategoryDTO save(CategoryDTO category) {
        return categoryConverter.convertEntityToResponse(
                categoryRepository.save(
                        categoryConverter.convertRequestToEntity(category)
                ));
    }


    @Override
    public CategoryDTO findById(String id) {
        return categoryConverter.convertEntityToResponse(
                categoryRepository.findById(UUID.fromString(id)).orElse(null));
    }

    @Override
    public void delete(String id) {

    }
}
