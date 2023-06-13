package com.lantern_business_webpp.controller;

import com.lantern_business_webpp.entity.Color;
import com.lantern_business_webpp.entity.Size;
import com.lantern_business_webpp.service.ColorService;
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
@RequestMapping("/api/admin/colors")
public class ColorController {
    private final ColorService colorService;

    @GetMapping
    public ResponseEntity<?> findAllColors() {
        List<Color> colors = colorService.findByActiveTrue();
        if (colors.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(colors, HttpStatus.OK);
    }

}
