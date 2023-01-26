package com.newyear.mainproject.security.logout;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LogoutDto{
    @NotBlank
    private String accessToken;
    private String refreshToken;
}
