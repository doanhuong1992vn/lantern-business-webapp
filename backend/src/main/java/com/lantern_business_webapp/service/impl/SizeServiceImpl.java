package com.lantern_business_webapp.service.impl;

import com.lantern_business_webapp.converter.SizeConverter;
import com.lantern_business_webapp.payload.SizeDTO;
import com.lantern_business_webapp.repository.SizeRepository;
import com.lantern_business_webapp.service.SizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SizeServiceImpl implements SizeService {
    private final SizeRepository sizeRepository;
    private final SizeConverter sizeConverter;

    @Override
    public SizeDTO save(SizeDTO t) {
        return null;
    }

    @Override
    public SizeDTO findById(String id) {
        return null;
    }

    @Override
    public void delete(String id) {

    }

    @Override
    public List<SizeDTO> findByActiveTrue() {
        return sizeRepository.findByActiveTrue()
                .stream().map(sizeConverter::convertEntityToResponse).toList();
    }
}
