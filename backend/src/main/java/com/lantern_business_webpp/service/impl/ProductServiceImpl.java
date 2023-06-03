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

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final GeneralConverter<Product, ProductResponseDTO, ProductRequestDTO> productConverter;


//    @Override
//    public void save(Product product) {
//        productRepository.save(product);
//    }

    @Override
    public ProductResponseDTO save(ProductRequestDTO productRequestDTO) {
        Product product = productConverter.convertToEntity(productRequestDTO);
        return productConverter.convertToDTO(productRepository.save(product));
    }

//    @Override
//    public Optional<Product> findById(Long id) {
//        return productRepository.findById(id);
//    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

//    @Override
//    public ProductResponseDTO update(ProductRequestDTO productRequestDTO) {
//
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
                .map(productConverter::convertToDTO)
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
    public Optional<ProductResponseDTO> findById(Long id) {
        return Optional.empty();
    }
}
