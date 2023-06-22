package com.lantern_business_webapp.payload;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    @NotBlank
    private String id;
    @NotBlank
    private String category;

    @Override
    public String toString() {
        return String.format("id = %s, category = %s", getId(), getCategory());
    }
}
