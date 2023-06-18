package com.lantern_business_webapp.service.impl;

import com.lantern_business_webapp.converter.ProductConverter;
import com.lantern_business_webapp.converter.VariantConverter;
import com.lantern_business_webapp.entity.Category;
import com.lantern_business_webapp.entity.Product;
import com.lantern_business_webapp.entity.Variant;
import com.lantern_business_webapp.payload.request.ProductRequestDTO;
import com.lantern_business_webapp.payload.response.ProductResponseDTO;
import com.lantern_business_webapp.repository.ProductRepository;
import com.lantern_business_webapp.repository.VariantRepository;
import com.lantern_business_webapp.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final VariantRepository variantRepository;
    private final ProductConverter productConverter;
    private final VariantConverter variantConverter;

    @Override
    public ProductResponseDTO save(ProductRequestDTO productRequestDTO) {
        Product product = productConverter.convertRequestToEntity(productRequestDTO);
        Product originProduct = productRepository.save(product);
        if (productRequestDTO.getVariants() != null) {
            List<Variant> variants = productRequestDTO.getVariants().stream().map(item -> {
                Variant variant = variantConverter.convertRequestToEntity(item);
                variant.setProduct(originProduct);
                return variant;
            }).toList();
            variantRepository.saveAll(variants);
        }
        return productConverter.convertEntityToResponse(originProduct);
    }

    @Override
    public void delete(String id) {
        Optional<Product> optionalProduct = productRepository.findById(UUID.fromString(id));
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setActive(false);
            productRepository.save(product);
        }
    }

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
    public boolean existsByNameAndActiveTrue(String name) {
        return productRepository.existsByNameAndActiveTrue(name);
    }

    @Override
    public boolean deleteByIds(String[] ids) {
        List<Product> products = new ArrayList<>();
        for (String id : ids) {
            Optional<Product> optionalProduct = productRepository.findById(UUID.fromString(id));
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
    public ProductResponseDTO findById(String id) {
        return productRepository
                .findById(UUID.fromString(id))
                .map(productConverter::convertEntityToDetailResponse)
                .orElse(null);
    }
}
