package com.lantern_business_webpp.payload.response;

import javax.validation.constraints.NotBlank;
import org.springframework.lang.Nullable;


public class LoginResponseDTO {

    @NotBlank
    private String message;

    @Nullable
    private String token;

    public LoginResponseDTO() {
        super();
    }

    public LoginResponseDTO(@NotBlank String message, String token) {
        super();
        this.message = message;
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
