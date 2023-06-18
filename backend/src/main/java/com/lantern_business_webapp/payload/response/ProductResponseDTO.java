package com.lantern_business_webapp.payload.response;

import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ProductResponseDTO {
    protected String id;
    protected String name;
    protected String image;
    protected String category;
}
