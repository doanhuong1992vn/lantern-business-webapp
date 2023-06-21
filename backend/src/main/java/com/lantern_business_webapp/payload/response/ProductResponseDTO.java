package com.lantern_business_webapp.payload.response;

import lombok.*;
import lombok.experimental.SuperBuilder;

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
    protected boolean isShow;

    @Override
    public String toString() {
        return String.format("id = %s, name = %s, image = %s, category = %s, isShow = %b",
                getId(), getName(), getImage(), getCategory(), isShow());
    }
}
