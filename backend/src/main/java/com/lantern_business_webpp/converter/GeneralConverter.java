package com.lantern_business_webpp.converter;

public interface GeneralConverter<ENTITY, REQUEST_DTO, RESPONSE_DTO> {
    REQUEST_DTO convertToDTO(ENTITY source);
    ENTITY convertToEntity(RESPONSE_DTO source);
}
