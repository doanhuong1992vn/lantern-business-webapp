package com.lantern_business_webpp.service;



import com.lantern_business_webpp.payload.response.RoleResponseDto;

import java.util.Optional;

public interface RoleService {

    Iterable<RoleResponseDto> findAll();
    Optional<RoleResponseDto> findById(Long id);
    void save(RoleResponseDto roleResponseDto);
    void remove(Long id);
}
