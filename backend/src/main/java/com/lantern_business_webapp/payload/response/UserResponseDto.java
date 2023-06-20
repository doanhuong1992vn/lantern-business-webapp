package com.lantern_business_webapp.payload.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    private String id;
    private String fullName;
    private String username;
    private String email;
    private String password;
    private String address;
    private String phone;
    private String avatar;
    private Boolean activated;
    private String rememberToken;
}
