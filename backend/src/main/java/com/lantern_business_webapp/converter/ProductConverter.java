package com.lantern_business_webapp.converter;

import com.lantern_business_webapp.entity.Product;
import com.lantern_business_webapp.payload.request.ProductRequestDTO;
import com.lantern_business_webapp.payload.response.DetailProductResponseDTO;
import com.lantern_business_webapp.payload.response.ProductResponseDTO;

public interface ProductConverter extends GeneralConverter
        <Product, ProductRequestDTO, ProductResponseDTO> {
    DetailProductResponseDTO convertEntityToDetailResponse(Product product);
}
