package com.lantern_business_webpp.service;



import com.lantern_business_webpp.payload.RoleDto;

import java.util.Optional;

public interface RoleService {

    Iterable<RoleDto> findAll();
    Optional<RoleDto> findById(Long id);
    void save(RoleDto roleDto);
    void remove(Long id);
}
