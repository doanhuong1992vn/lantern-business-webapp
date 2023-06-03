package com.lantern_business_webpp.controller;

import com.lantern_business_webpp.entity.Category;
import com.lantern_business_webpp.entity.Product;
import com.lantern_business_webpp.service.CategoryService;
import com.lantern_business_webpp.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/admin/categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Category>> findAllCategories() {
        List<Category> categories = categoryService.findByActiveTrue();
        if (categories.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
//
//    @GetMapping("/{id}/posts")
//    public ResponseEntity<Page<Product>> findPostsByCategory(
//            @PathVariable Long id,
//            @PageableDefault(size = 2) Pageable pageable) {
//        Optional<Category> optionalCategory = categoryService.findById(id);
//        if (optionalCategory.isPresent()) {
//            Sort sort = Sort.by("name").ascending();
//            Pageable pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
//            Page<Product> products = productService.findByCategory(optionalCategory.get(), pageRequest);
//            if (products.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            } else {
//                return new ResponseEntity<>(products, HttpStatus.OK);
//            }
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
}
