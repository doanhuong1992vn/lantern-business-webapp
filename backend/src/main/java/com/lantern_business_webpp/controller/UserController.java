package com.lantern_business_webpp.controller;

import com.lantern_business_webpp.payload.response.UserResponseDto;
import com.lantern_business_webpp.service.SecurityService;
import com.lantern_business_webpp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private SecurityService securityService;

    @GetMapping({"/all"})
    public ResponseEntity<?> getAll(@RequestHeader("Authorization") final String authToken) {
        if (!securityService.isAuthenticated() && !securityService.isValidToken(authToken)) {
            return new ResponseEntity<String>("Responding with unauthorized error. Message - {}", HttpStatus.UNAUTHORIZED);
        }
        List<UserResponseDto> userResponseDtos = userService.getUsers();
        if (userResponseDtos.isEmpty()) {
            return new ResponseEntity<List<UserResponseDto>>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(userResponseDtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") Long id,
                                    @RequestHeader("Authorization") final String authToken) {
        if (!securityService.isAuthenticated() && !securityService.isValidToken(authToken)) {
            return new ResponseEntity<String>("Responding with unauthorized error. Message - {}", HttpStatus.UNAUTHORIZED);
        }
        UserResponseDto userResponseDto = userService.getUserById(id);
        if (userResponseDto == null) {
            return new ResponseEntity<UserResponseDto>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
    }

//    @PostMapping("/search")
//    public ResponseEntity<?> search(@RequestBody SearchRequest searchRequest,
//                                    @RequestHeader("Authorization") final String authToken) {
//        if (!securityService.isAuthenticated() && !securityService.isValidToken(authToken)) {
//            return new ResponseEntity<String>("Responding with unauthorized error. Message - {}", HttpStatus.UNAUTHORIZED);
//        }
//        List<UserResponseDto> userDtos = null;
//        if (searchRequest.getKeyword() != null && !searchRequest.getKeyword().isEmpty()) {
//            userDtos = userService.getUsersByFullName(searchRequest.getKeyword());
//            if (userDtos.isEmpty()) {
//                return new ResponseEntity<List<UserResponseDto>>(HttpStatus.NO_CONTENT);
//            }
//        }
//        return new ResponseEntity<>(userDtos, HttpStatus.OK);
//    }
}
