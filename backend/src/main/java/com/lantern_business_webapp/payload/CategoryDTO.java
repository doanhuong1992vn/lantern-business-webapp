package com.lantern_business_webapp.payload;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private String id;
    private String category;

    @Override
    public String toString() {
        return String.format("id = %s, category = %s", getId(), getCategory());
    }
}
