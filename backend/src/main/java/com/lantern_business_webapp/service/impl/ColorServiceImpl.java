package com.lantern_business_webapp.service.impl;

import com.lantern_business_webapp.converter.ColorConverter;
import com.lantern_business_webapp.payload.ColorDTO;
import com.lantern_business_webapp.repository.ColorRepository;
import com.lantern_business_webapp.service.ColorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ColorServiceImpl implements ColorService {
    private final ColorRepository colorRepository;
    private final ColorConverter colorConverter;

    @Override
    public ColorDTO save(ColorDTO t) {
        return null;
    }

    @Override
    public ColorDTO findById(String id) {
        return null;
    }

    @Override
    public void delete(String id) {

    }

    @Override
    public List<ColorDTO> findByActiveTrue() {
        return colorRepository.findByActiveTrue()
                .stream().map(colorConverter::convertEntityToResponse).toList();
    }
}
