package com.newyear.mainproject.member.email;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class EmailDto {

    @NotBlank
    private String email;
}
