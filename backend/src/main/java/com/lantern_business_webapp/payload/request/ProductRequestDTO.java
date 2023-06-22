package com.lantern_business_webapp.payload.request;

import com.lantern_business_webapp.payload.VariantDTO;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDTO {
    @NotBlank
    private String id;
    @NotBlank(message = "* Tên sản phẩm không được để trống")
    @Size(max = 50, message = "* Tên sản phẩm không được vượt quá 50 ký tự")
    private String name;
    private String image;
    private String description;
    @NotBlank
    private String category;
    private boolean isShown;
    @NotNull
    private List<VariantDTO> variants;

    @Override
    public String toString() {
        return String.format("id = %s, name = %s, image = %s, description = %s, category = %s, isShown = %b, variants = %s", getId(), getName(), getImage(), getDescription(), getCategory(), isShown(), getVariants().toString());
    }
}
