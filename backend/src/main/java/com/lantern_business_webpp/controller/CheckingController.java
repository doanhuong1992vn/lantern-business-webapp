package com.lantern_business_webpp.controller;

import com.lantern_business_webpp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/checking")
public class CheckingController {
    private final UserService userService;
    @GetMapping("/user/{field}/{data}")
    public ResponseEntity<?> isExistsByData(@PathVariable String field, @PathVariable String data) {
        boolean result = userService.existsByFieldAndData(field, data);
        if (result) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
