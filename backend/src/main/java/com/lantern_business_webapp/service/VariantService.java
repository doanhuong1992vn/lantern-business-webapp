package com.lantern_business_webapp.service;

import com.lantern_business_webapp.entity.Variant;
import com.lantern_business_webapp.payload.VariantDTO;

public interface VariantService extends GeneralService<Variant, Variant> {
    VariantDTO setShown(String id, Boolean isShow);
}
