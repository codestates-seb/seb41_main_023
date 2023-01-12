package com.newyear.mainproject.expense.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.newyear.mainproject.place.dto.PlaceDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

public class ExpenseDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        @NotBlank
        private String item;

        @NotNull @Positive
        private int price;

        @NotBlank
        private String category;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {
        private long expenseId;

        @NotBlank
        private String item;

        @NotNull @Positive
        private int price;

        @NotBlank
        private String category;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private long expenseId;
        private String item;
        private int price;
        private String category;
        private String createdAt;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SimpleResponse {
        private long expenseId;
        private int price;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonInclude(JsonInclude.Include.NON_NULL) // response null 필드 제외
    public static class PlaceResponse {
        private long expenseId;
        private String item;
        private int price;
        private String category;
        private String createdAt;
        private PlaceDto.SimpleResponse places;
    }

}
