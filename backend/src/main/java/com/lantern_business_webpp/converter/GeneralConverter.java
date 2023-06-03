package com.lantern_business_webpp.converter;

public interface GeneralConverter<ENTITY, REQUEST_DTO, RESPONSE_DTO> {
    RESPONSE_DTO convertEntityToResponse(ENTITY source);

    ENTITY convertRequestToEntity(REQUEST_DTO source);

}
