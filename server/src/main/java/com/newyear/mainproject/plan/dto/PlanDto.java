package com.newyear.mainproject.plan.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    public static class Response {
        private Long planId;
        private String planName;
        private String startDate;
        private String endDate;
    }
}
