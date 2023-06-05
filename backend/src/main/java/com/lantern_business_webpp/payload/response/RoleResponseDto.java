package com.lantern_business_webpp.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleResponseDto {

    private Long id;
    private String name;
    private String description;

    public RoleResponseDto(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
