package com.lantern_business_webapp.service;



import com.lantern_business_webapp.payload.response.RoleResponseDto;

import java.util.Optional;

public interface RoleService {

    Iterable<RoleResponseDto> findAll();
    Optional<RoleResponseDto> findById(String id);
    void save(RoleResponseDto roleResponseDto);
    void remove(String id);
}
