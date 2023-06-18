package com.lantern_business_webapp.service;


import com.lantern_business_webapp.entity.User;
import com.lantern_business_webapp.exception.DuplicateFieldUserException;
import com.lantern_business_webapp.payload.request.RegisterRequestDTO;
import com.lantern_business_webapp.payload.response.UserResponseDto;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<UserResponseDto> getUsers();
    List<UserResponseDto> getUsersByFullName(String fullName);
    UserResponseDto getUserById(String userId);
    Iterable<UserResponseDto> findAll();
    Optional<UserResponseDto> findById(String id);
    void save(UserResponseDto userResponseDto);
    User save(RegisterRequestDTO registerRequestDTO) throws DuplicateFieldUserException;
    void remove(String id);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByPhone(String phone);
    User findByUsername(String username);

    boolean existsByFieldAndData(String field, String data);
}
