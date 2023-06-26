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
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@CacheConfig(cacheNames = "productCache")
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final VariantRepository variantRepository;
    private final ProductConverter productConverter;
    private final VariantConverter variantConverter;

    @Override
    public ProductResponseDTO setShown(@NotNull @NotBlank String id, Boolean isShow) {
        Optional<Product> optionalProduct = productRepository.findById(UUID.fromString(id));
        if (optionalProduct.isPresent()) {
            optionalProduct.get().setShown(isShow);
            Product product = productRepository.save(optionalProduct.get());
            return productConverter.convertEntityToResponse(product);
        } else {
            throw new NullPointerException();
        }
    }

    @Override
    @CacheEvict(cacheNames = "products", allEntries = true)
    public ProductResponseDTO save(@NotNull ProductRequestDTO productRequestDTO) {
        Product product = productConverter.convertRequestToEntity(productRequestDTO);
        Product productDatabase = productRepository.save(product);
        List<Variant> variantInputs = new ArrayList<>(productRequestDTO.getVariants().stream().map(item -> {
            Variant variantInput = variantConverter.convertRequestToEntity(item);
            variantInput.setProduct(productDatabase);
            return variantInput;
        }).toList());
        List<Variant> variantsDatabase = variantRepository.findByProductOrderByColorAsc(productDatabase);
        if (!variantsDatabase.isEmpty()) {
            variantInputs.forEach(variantInput -> {
                variantsDatabase.forEach(variantDatabase -> {
                    if (Objects.equals(variantDatabase.getSize().getName(), variantInput.getSize().getName())
                            && Objects.equals(variantDatabase.getColor().getName(), variantInput.getColor().getName())) {
                        variantInput.setId(variantDatabase.getId());
                    }
                });
            });
            variantsDatabase.removeAll(variantInputs);
            List<Variant> variantsToRemove = new ArrayList<>(variantsDatabase);
            variantsToRemove.forEach(variant -> variant.setActive(false));
            variantInputs.addAll(variantsToRemove);
        }
        variantRepository.saveAll(variantInputs);
        Product originProduct = productRepository.save(productDatabase);
        return productConverter.convertEntityToResponse(originProduct);
    }

    @Override
    @Caching(evict = {
            @CacheEvict(cacheNames = "product", key = "#id"),
            @CacheEvict(cacheNames = "products", allEntries = true)
    })
    public void delete(@NotNull @NotBlank String id) {
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
    public Page<Product> findByCategory(@NotNull Category category, Pageable pageable) {
        return productRepository.findAllByCategory(category, pageable);
    }


    @Override
    @Cacheable(cacheNames = "products")
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
    @Cacheable(cacheNames = "product", key = "#id", unless = "#result == null")
    public ProductResponseDTO findById(@NotNull @NotBlank String id) {
        return productRepository
                .findById(UUID.fromString(id))
                .map(productConverter::convertEntityToDetailResponse)
                .orElse(null);
    }
}
