package com.lantern_business_webapp.payload;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VariantDTO {
    private String id;
    private String size;
    private String color;
    private Double price;
    private Integer quantity;
}
