package com.lantern_business_webpp.service;


import com.lantern_business_webpp.entity.User;
import com.lantern_business_webpp.exception.DuplicateFieldUserException;
import com.lantern_business_webpp.payload.request.RegisterRequestDTO;
import com.lantern_business_webpp.payload.response.UserResponseDto;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<UserResponseDto> getUsers();
    List<UserResponseDto> getUsersByFullName(String fullName);
    UserResponseDto getUserById(Long userId);
    Iterable<UserResponseDto> findAll();
    Optional<UserResponseDto> findById(Long id);
    void save(UserResponseDto userResponseDto);
    User save(RegisterRequestDTO registerRequestDTO) throws DuplicateFieldUserException;
    void remove(Long id);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
}
