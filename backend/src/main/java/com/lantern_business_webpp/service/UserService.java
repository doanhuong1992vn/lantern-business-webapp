package com.lantern_business_webpp.service;


import com.lantern_business_webpp.payload.UserDto;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<UserDto> getUsers();
    List<UserDto> getUsersByFullName(String fullName);
    UserDto getUserById(Integer userId);
    Iterable<UserDto> findAll();
    Optional<UserDto> findById(Integer id);
    void save(UserDto userDto);
    void remove(Integer id);
}
