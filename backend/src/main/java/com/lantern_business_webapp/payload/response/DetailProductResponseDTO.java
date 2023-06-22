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
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class DetailProductResponseDTO extends ProductResponseDTO {
    private String description;
    private List<VariantDTO> variants;

    @Override
    public String toString() {
        return String.format("id = %s, name = %s, image = %s, description = %s, category = %s, isShown = %b, variants = %s", getId(), getName(), getImage(), getDescription(), getCategory(), isShown(), getVariants().toString());
    }
}