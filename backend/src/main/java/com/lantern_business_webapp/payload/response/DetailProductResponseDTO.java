package com.lantern_business_webapp.payload.response;

import com.lantern_business_webapp.entity.Variant;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class DetailProductResponseDTO extends ProductResponseDTO {
    private String description;
    private List<Variant> variants;
}
