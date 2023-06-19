package com.lantern_business_webapp.payload.response;

import com.lantern_business_webapp.payload.VariantDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class DetailProductResponseDTO extends ProductResponseDTO {
    private String description;
    private List<VariantDTO> variants;
}
