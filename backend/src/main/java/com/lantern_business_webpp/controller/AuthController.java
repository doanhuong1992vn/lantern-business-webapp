package com.lantern_business_webpp.controller;

import com.lantern_business_webpp.payload.request.LoginRequest;
import com.lantern_business_webpp.payload.response.MessageResponse;
import com.lantern_business_webpp.payload.response.LoginResponse;
import com.lantern_business_webpp.security.JwtTokenProvider;
import javax.validation.Valid;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "*", maxAge = 3600)
@RequestMapping("/api")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // Gọi hàm authenticate để xác thực thông tin đăng nhập
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Gọi hàm tạo Token
            String token = tokenProvider.generateToken(authentication);
            return new ResponseEntity<>(new LoginResponse("Đăng nhập thành công!", token), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(new LoginResponse("Đăng nhập thất bại!", null), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody ) {

    }

    @GetMapping("/access-denied")
    public ResponseEntity<?> getAccessDenied() {
        return new ResponseEntity<>(new MessageResponse("Không có quyền truy cập!"), HttpStatus.FORBIDDEN);
    }
}
