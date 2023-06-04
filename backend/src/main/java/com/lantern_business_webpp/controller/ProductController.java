package com.lantern_business_webpp.controller;

import com.lantern_business_webpp.entity.Product;
import com.lantern_business_webpp.payload.request.ProductRequestDTO;
import com.lantern_business_webpp.payload.response.ProductResponseDTO;
import com.lantern_business_webpp.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/products")
@CrossOrigin("*")
public class ProductController {
    private final ProductService productService;
    private final Logger logger = LogManager.getLogger(ProductController.class);

    @GetMapping
    public ResponseEntity<?> findAll() {
//        logger.info("abc");
        List<ProductResponseDTO> products = productService.findByActiveTrue();
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> save(
            @Valid @RequestBody ProductRequestDTO productRequestDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            System.out.println(bindingResult);
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        ProductResponseDTO productResponseDTO = productService.save(productRequestDTO);
        return new ResponseEntity<>(productResponseDTO, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<?> update(
            @Valid @RequestBody ProductRequestDTO productRequestDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            System.out.println(bindingResult);
            return new ResponseEntity<>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        ProductResponseDTO productResponseDTO = productService.save(productRequestDTO);
        return new ResponseEntity<>(productResponseDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        ProductResponseDTO productResponseDTO = productService.findById(id);
        if (productResponseDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            productService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

//    @DeleteMapping
//    public ResponseEntity<?> delete(@RequestBody Long[] ids) {
//        boolean success = productService.deleteByIds(ids);
//        if (success) {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//    }

    @GetMapping("/pagination")
    public ResponseEntity<?> findAll(@PageableDefault(size = 5) Pageable pageable) {
        Sort sort = Sort.by("name").ascending();
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        Page<Product> products = productService.findAllWithPagination(pageRequest);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Product> findById(@PathVariable Long id) {
//        Optional<Product> optionalProduct = productService.findById(id);
//        return optionalProduct
//                .map(post -> new ResponseEntity<>(post, HttpStatus.OK))
//                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
//    }
}
