package com.lantern_business_webapp.service.impl;

import com.lantern_business_webapp.converter.VariantConverter;
import com.lantern_business_webapp.entity.Product;
import com.lantern_business_webapp.entity.Variant;
import com.lantern_business_webapp.payload.VariantDTO;
import com.lantern_business_webapp.repository.VariantRepository;
import com.lantern_business_webapp.service.VariantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VariantServiceImpl implements VariantService {
    private final VariantRepository variantRepository;
    private final VariantConverter variantConverter;

    @Override
    public VariantDTO setShown(@NotNull @NotBlank String id, Boolean isShow) {
        Optional<Variant> optionalVariant = variantRepository.findById(UUID.fromString(id));
        if (optionalVariant.isPresent()) {
            optionalVariant.get().setShown(isShow);
            Variant variant = variantRepository.save(optionalVariant.get());
            return variantConverter.convertEntityToResponse(variant);
        } else {
            throw new NullPointerException();
        }
    }

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
