package com.lantern_business_webapp.payload;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VariantDTO {
    @NotBlank
    private String id;
    @NotBlank
    private String size;
    @NotBlank
    private String color;
    @NotNull
    @PositiveOrZero
    private Double importPrice;
    @NotNull
    @PositiveOrZero
    private Double salePrice;
    @NotNull
    @PositiveOrZero
    private Integer quantity;
    private boolean isShown;

    @Override
    public String toString() {
        return String.format("id = %s, " +
                        "importPrice = %f, " +
                        "salePrice = %f, " +
                        "quantity = %d, " +
                        "size = %s, " +
                        "color = %s" +
                        "isShown = %b",
                getId(), getImportPrice(), getSalePrice(), getQuantity(), getSize(), getColor(), isShown());
    }
}
