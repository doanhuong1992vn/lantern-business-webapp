package com.lantern_business_webpp.service.impl;

import com.lantern_business_webpp.entity.Variant;
import com.lantern_business_webpp.repository.VariantRepository;
import com.lantern_business_webpp.service.VariantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class VariantServiceImpl implements VariantService {
    private final VariantRepository variantRepository;
    @Override
    public Variant save(Variant t) {
        return null;
    }

    @Override
    public Variant findById(Long id) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public List<Variant> findByActiveTrue() {
        return null;
    }
}
