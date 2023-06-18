package com.lantern_business_webapp.controller.non_authenticated;

import com.lantern_business_webapp.payload.SizeDTO;
import com.lantern_business_webapp.service.SizeService;
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
@RequestMapping("/api/sizes")
public class SizeController {
    private final SizeService sizeService;

    @GetMapping
    public ResponseEntity<?> findAllSizes() {
        List<SizeDTO> sizes = sizeService.findByActiveTrue();
        if (sizes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(sizes, HttpStatus.OK);
    }

}
