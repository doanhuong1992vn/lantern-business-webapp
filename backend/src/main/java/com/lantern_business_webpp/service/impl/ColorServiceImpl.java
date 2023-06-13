package com.lantern_business_webpp.service.impl;

import com.lantern_business_webpp.entity.Color;
import com.lantern_business_webpp.repository.ColorRepository;
import com.lantern_business_webpp.service.ColorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class ColorServiceImpl implements ColorService {
    private final ColorRepository colorRepository;
    @Override
    public Color save(Color t) {
        return null;
    }

    @Override
    public Color findById(Long id) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public List<Color> findByActiveTrue() {
        return colorRepository.findByIsActiveTrue();
    }
}
