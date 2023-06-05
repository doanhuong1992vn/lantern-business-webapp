package com.lantern_business_webpp.payload.request;

import lombok.*;

import javax.validation.constraints.*;

@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDTO {
    @NotBlank
    @Size(min = 2, max = 50)
//    @Pattern(regexp = "^(?!.*[@;:.=+\\-#%^*'!$&()\"}{\\\\/<>])$")
    private String fullName;
    @NotBlank
    @Size(min = 6, max = 20)
//    @Pattern(regexp = "^(?!.*[@;:.=+\\-#%^*'!$&()\"}{\\\\/<>])$")
    private String username;
    @NotBlank
    @Size(max = 50)
    @Email
    private String email;
    @NotBlank
    @Pattern(regexp = "^(0[3|5|7|8|9])+([0-9]{8})$")
    private String phone;
    @NotBlank
    private String password;
}
