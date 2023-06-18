package com.lantern_business_webapp.service;

import java.util.List;

public interface GeneralService<REQUEST_DTO, RESPONSE_DTO> {

    RESPONSE_DTO save(REQUEST_DTO t);

    RESPONSE_DTO findById(String id);

    void delete(String id);

    List<RESPONSE_DTO> findByActiveTrue();
}
