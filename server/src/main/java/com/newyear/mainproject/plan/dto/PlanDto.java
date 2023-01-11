package com.newyear.mainproject.plan.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.newyear.mainproject.place.dto.PlaceDto;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

public class PlanDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Post {
        private String cityName;
        private String startDate;
        private String endDate;
        private String planTitle;
    }

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Patch {
        private Long planId;
        private String planTitle;
        private String startDate;
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

        private List<PlanDto.PlanDatesResponse> planDates;
    }

    @Getter
    @Setter
    public static class PlaceDetailResponse {
        private Long planId;
        private String cityName;
        private String planTitle;
        private String startDate;
        private String endDate;

        private List<PlanDatesResponse> planDates = new ArrayList<>();
        private List<PlaceDto.Response> places = new ArrayList<>();
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
    public static class PlanDatesResponse {
        private Long planDateId;
        private String planDate;
        private String subTitle;
    }
}
