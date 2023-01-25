package com.newyear.mainproject.plan.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.newyear.mainproject.budget.dto.BudgetDto;
import com.newyear.mainproject.city.dto.CityDto;
import com.newyear.mainproject.place.dto.PlaceDto;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.ArrayList;
import java.util.List;

public class PlanDto {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Post {
        @NotBlank
        private String cityName;
        @Pattern(regexp = "^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$", message = "YYYY-MM-DD 형식으로 작성해야 합니다.")
        private String startDate;
        @Pattern(regexp = "^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$", message = "YYYY-MM-DD 형식으로 작성해야 합니다.")
        private String endDate;
        private String planTitle;
    }

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Patch {
        private Long planId;
        private String planTitle;
        @Pattern(regexp = "^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$", message = "YYYY-MM-DD 형식으로 작성해야 합니다.")
        private String startDate;
        @Pattern(regexp = "^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$", message = "YYYY-MM-DD 형식으로 작성해야 합니다.")
        private String endDate;
    }

    @Builder
    @Getter
    @Setter
    @JsonInclude(JsonInclude.Include.NON_NULL) // response null 필드 제외
    public static class Response {
        private Long planId;
        private String cityName;
        private String planTitle;
        private String startDate;
        private String endDate;
        private Integer placesCount;

        private List<PlanDto.PlanDatesSimpleResponse> planDates;
        private BudgetDto.SimpleResponse budget;
        private CityDto.ImageResponse city;
        private Boolean boardCheck;

    }

    @Getter
    @Setter
    public static class PlanDatePlaceDetailResponse {
        private Long planId;
        private String cityName;
        private String planTitle;
        private String startDate;
        private String endDate;
        private BudgetDto.SimpleResponse budget;
        private CityDto.ImageResponse city;
        private List<PlanDatesResponse> planDates = new ArrayList<>();
        private List<PlanDto.PlanDatesDetailResponse> planDatesAndPlace = new ArrayList<>();
        private Long boardId;
    }
    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class PatchPlanDatesSubTitle {
        private Long planDateId;
        private String subTitle;
    }

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PlanDatesResponse {
        private Long planDateId;
        private String planDate;
        private String subTitle;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PlanDatesSimpleResponse {
        private Long planDateId;
        private String planDate;
    }

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PlanDatesDetailResponse {
        private Long planDateId;
        private String planDate;
        private String subTitle;
        private List<PlaceDto.Response> places;
    }
}
