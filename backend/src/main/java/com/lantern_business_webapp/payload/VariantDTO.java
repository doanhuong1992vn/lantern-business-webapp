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
    private Double importPrice;
    private Double salePrice;
    private Integer quantity;
    private boolean isShow;

    @Override
    public String toString() {
        return String.format("id = %s, " +
                        "importPrice = %f, " +
                        "salePrice = %f, " +
                        "quantity = %d, " +
                        "size = %s, " +
                        "color = %s" +
                        "isShow = %b",
                getId(), getImportPrice(), getSalePrice(), getQuantity(), getSize(), getColor(), isShow());
    }
}
