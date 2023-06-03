package com.lantern_business_webpp.service.impl;

import com.lantern_business_webpp.converter.GeneralConverter;
import com.lantern_business_webpp.payload.response.ProductResponseDTO;
import com.lantern_business_webpp.entity.Category;
import com.lantern_business_webpp.entity.Product;
import com.lantern_business_webpp.payload.request.ProductRequestDTO;
import com.lantern_business_webpp.repository.ProductRepository;
import com.lantern_business_webpp.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final GeneralConverter<Product, ProductRequestDTO, ProductResponseDTO> productConverter;


//    @Override
//    public void save(Product product) {
//        productRepository.save(product);
//    }

    @Override
    public ProductResponseDTO save(ProductRequestDTO productRequestDTO) {
        Product product = productConverter.convertRequestToEntity(productRequestDTO);
        return productConverter.convertEntityToResponse(productRepository.save(product));
    }

//    @Override
//    public Optional<Product> findById(Long id) {
//        return productRepository.findById(id);
//    }

    @Override
    public void delete(Long id) {
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setActive(false);
            productRepository.save(product);
        }
    }

//    @Override
//    public ProductResponseDTO update(ProductRequestDTO productRequestDTO) {
//    }

//    @Override
//    public void update(Product post) {
//        productRepository.save(post);
//    }

    @Override
    public Page<Product> findAllWithPagination(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Page<Product> findByCategory(Category category, Pageable pageable) {
        return productRepository.findAllByCategory(category, pageable);
    }

    @Override
    public List<ProductResponseDTO> findByActiveTrue() {
        return productRepository.findByActiveTrue().stream()
                .map(productConverter::convertEntityToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Page<Product> findAllByNameContaining(String query, Pageable pageRequest) {
        return productRepository.findAllByNameContaining(query, pageRequest);
    }

    @Override
    public boolean existsByName(String name) {
        return productRepository.existsByName(name);
    }

    @Override
    public boolean deleteByIds(Long[] ids) {
        List<Product> products = new ArrayList<>();
        for (Long id : ids) {
            Optional<Product> optionalProduct = productRepository.findById(id);
            if (optionalProduct.isPresent()) {
                products.add(optionalProduct.get());
            } else {
                return false;
            }
        }
        for (Product product : products) {
            product.setActive(false);
            productRepository.save(product);
        }
        return true;
    }

    @Override
    public ProductResponseDTO findById(Long id) {
        return productRepository
                .findById(id)
                .map(productConverter::convertEntityToResponse)
                .orElse(null);
    }
}
