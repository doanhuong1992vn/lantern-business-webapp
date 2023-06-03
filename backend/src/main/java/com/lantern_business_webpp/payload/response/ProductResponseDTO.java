package com.lantern_business_webpp.payload.response;

import com.lantern_business_webpp.entity.Category;
import lombok.*;

@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO {
    private Long id;
    private String name;
    private String image;
    private Category category;
}
