package com.newyear.mainproject.security.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

@Getter
public class LoginDto {
    @Email
    private String email;

    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&]).{8,20}")
    private String password;
}

