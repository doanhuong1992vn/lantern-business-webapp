package com.lantern_business_webapp.converter;

import com.lantern_business_webapp.entity.Variant;
import com.lantern_business_webapp.payload.VariantDTO;

public interface VariantConverter extends GeneralConverter
        <Variant, VariantDTO, VariantDTO> {
}
