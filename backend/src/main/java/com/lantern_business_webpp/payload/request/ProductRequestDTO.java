package com.lantern_business_webpp.payload.request;

import com.lantern_business_webpp.entity.Category;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDTO {
    @NotBlank(message = "* Tên sản phẩm không được để trống")
    @Size(max = 50, message = "* Tên sản phẩm không được vượt quá 50 ký tự")
    private String name;
    @Size(max = 500, message = "* Url hình ảnh không được vượt quá 500 ký tự")
    private String image;
    @Size(max = 2000, message = "* Mô tả sản phẩm không được vượt quá 2000 ký tự")
    private String description;

    private Category category;
}