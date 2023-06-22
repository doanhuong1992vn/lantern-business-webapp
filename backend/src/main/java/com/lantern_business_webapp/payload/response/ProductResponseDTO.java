package com.lantern_business_webapp.payload.response;

import com.lantern_business_webapp.payload.VariantDTO;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO {
    protected String id;
    protected String name;
    protected String image;
    protected String category;
    protected boolean isShown;
    private List<VariantDTO> variants;

    @Override
    public String toString() {
        return String.format("id = %s, name = %s, image = %s, category = %s, isShown = %b",
                getId(), getName(), getImage(), getCategory(), isShown());
    }
}
