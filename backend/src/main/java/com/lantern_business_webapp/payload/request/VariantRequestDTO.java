package com.lantern_business_webapp.payload.request;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VariantRequestDTO {
    private String id;
    private String size;
    private String color;
    private Double price;
    private Integer quantity;
}
