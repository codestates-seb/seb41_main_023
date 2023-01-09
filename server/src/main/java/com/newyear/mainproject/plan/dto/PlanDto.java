package com.newyear.mainproject.plan.dto;

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

    @Getter
    @Setter
    public static class Response {
        private Long planId;
        private String cityName;
        private String planTitle;
        private String startDate;
        private String endDate;
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

    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    public static class PlanDatesResponse {
        private Long planDateId;
        private String planDate;
    }
}
