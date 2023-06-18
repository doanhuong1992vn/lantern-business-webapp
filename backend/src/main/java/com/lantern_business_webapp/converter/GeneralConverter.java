package com.lantern_business_webapp.converter;

public interface GeneralConverter<ENTITY, REQUEST_DTO, RESPONSE_DTO> {
    RESPONSE_DTO convertEntityToResponse(ENTITY source);

    ENTITY convertRequestToEntity(REQUEST_DTO source);

}
