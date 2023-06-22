package com.lantern_business_webapp.controller.authenticated;

import com.lantern_business_webapp.payload.VariantDTO;
import com.lantern_business_webapp.payload.request.ProductRequestDTO;
import com.lantern_business_webapp.payload.response.ProductResponseDTO;
import com.lantern_business_webapp.service.ProductService;
import com.lantern_business_webapp.service.VariantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/api/auth/variants")
public class AuthVariantController {
    private final VariantService variantService;

    @PatchMapping("/{id}")
    public ResponseEntity<?> setShown(@PathVariable @NotNull @NotBlank String id, @RequestBody Boolean isShow) {
        VariantDTO variantDTO = variantService.setShown(id, isShow);
        return variantDTO == null
                ? new ResponseEntity<>(HttpStatus.NOT_FOUND)
                : new ResponseEntity<>(HttpStatus.OK);
    }

}
