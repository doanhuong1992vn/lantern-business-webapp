package com.lantern_business_webapp.payload;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ColorDTO {
    private String id;
    private String color;

    @Override
    public String toString() {
        return String.format("id = %s, color = %s", getId(), getColor());
    }
}
