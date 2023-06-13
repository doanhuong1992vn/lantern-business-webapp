package com.lantern_business_webpp.controller;

import com.lantern_business_webpp.entity.Category;
import com.lantern_business_webpp.entity.Size;
import com.lantern_business_webpp.service.ProductService;
import com.lantern_business_webpp.service.SizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/api/admin/sizes")
public class SizeController {
    private final SizeService sizeService;

    @GetMapping
    public ResponseEntity<?> findAllSizes() {
        List<Size> sizes = sizeService.findByActiveTrue();
        if (sizes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(sizes, HttpStatus.OK);
    }

}
