package com.lantern_business_webapp.payload;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ColorDTO {
    @NotBlank
    private String id;
    @NotBlank
    private String color;

    @Override
    public String toString() {
        return String.format("id = %s, color = %s", getId(), getColor());
    }
}
