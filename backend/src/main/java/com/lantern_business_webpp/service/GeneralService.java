package com.lantern_business_webpp.service;

import java.util.List;

public interface GeneralService<REQUEST_DTO, RESPONSE_DTO> {

    RESPONSE_DTO save(REQUEST_DTO t);

    RESPONSE_DTO findById(Long id);

    void delete(Long id);

    List<RESPONSE_DTO> findByActiveTrue();
}
