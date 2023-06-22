package com.lantern_business_webapp.payload;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SizeDTO {
    @NotBlank
    private String id;
    @NotBlank
    private String size;

    @Override
    public String toString() {
        return String.format("id = %s, size = %s", getId(), getSize());
    }
}
