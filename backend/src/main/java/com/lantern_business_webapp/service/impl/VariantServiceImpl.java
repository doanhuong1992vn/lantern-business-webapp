package com.lantern_business_webapp.service.impl;

import com.lantern_business_webapp.entity.Variant;
import com.lantern_business_webapp.repository.VariantRepository;
import com.lantern_business_webapp.service.VariantService;
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
    public Variant findById(String id) {
        return null;
    }

    @Override
    public void delete(String id) {

    }

    @Override
    public List<Variant> findByActiveTrue() {
        return null;
    }
}
