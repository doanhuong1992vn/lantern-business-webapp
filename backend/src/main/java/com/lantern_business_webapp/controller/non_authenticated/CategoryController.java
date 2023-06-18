package com.lantern_business_webapp.controller.non_authenticated;

import com.lantern_business_webapp.payload.CategoryDTO;
import com.lantern_business_webapp.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<?> findAllCategories() {
        List<CategoryDTO> categories = categoryService.findByActiveTrue();
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
