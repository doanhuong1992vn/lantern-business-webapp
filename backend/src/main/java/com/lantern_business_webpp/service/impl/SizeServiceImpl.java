package com.lantern_business_webpp.service.impl;

import com.lantern_business_webpp.entity.Size;
import com.lantern_business_webpp.repository.SizeRepository;
import com.lantern_business_webpp.service.SizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class SizeServiceImpl implements SizeService {
    private final SizeRepository sizeRepository;
    @Override
    public Size save(Size t) {
        return null;
    }

    @Override
    public Size findById(Long id) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public List<Size> findByActiveTrue() {
        return sizeRepository.findByIsActiveTrue();
    }
}
