package com.lantern_business_webapp.converter;

import javax.validation.constraints.NotNull;

public interface GeneralConverter<ENTITY, REQUEST_DTO, RESPONSE_DTO> {
    RESPONSE_DTO convertEntityToResponse(@NotNull ENTITY source);

    ENTITY convertRequestToEntity(@NotNull REQUEST_DTO source);

}
