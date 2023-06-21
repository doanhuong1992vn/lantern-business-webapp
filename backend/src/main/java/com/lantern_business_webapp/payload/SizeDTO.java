package com.lantern_business_webapp.payload;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SizeDTO {
    private String id;
    private String size;

    @Override
    public String toString() {
        return String.format("id = %s, size = %s", getId(), getSize());
    }
}
