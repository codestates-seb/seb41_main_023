package com.newyear.mainproject.place.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.newyear.mainproject.expense.dto.ExpenseDto;
import com.newyear.mainproject.plan.dto.PlanDto;
import lombok.*;

import java.util.List;

public class PlaceDto {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Post {
        private Long placeDateId;
        private String placeName;
        private Double latitude; //위도
        private Double longitude; //경도
        private String placeAddress;
        private Double ratings; //별점
        private String website; //웹사이트
        private String phone; //전화번호
        private String openingHours; //영업시간
    }

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Patch {
        private Long placeId;
        private String placeName;
        private String description;
        private Double latitude; //위도
        private Double longitude; //경도
        private String placeAddress;
        private String startTime;
        private String endTime;
        private Double ratings; //별점
        private String website; //웹사이트
        private String phone; //전화번호
        private String openingHours; //영업시간
    }

    @Builder
    @Getter
    @Setter
    public static class Response {
        private PlanDto.PlanDatesResponse planDates;
        private Long placeId;
        private String placeName;
        private String description;
        private String startTime;
        private String endTime;
        private Double latitude; //위도
        private Double longitude; //경도
        private String placeAddress;

        private Double ratings; //별점
        private String website; //웹사이트
        private String phone; //전화번호
        private String openingHours; //영업시간
        private ExpenseDto.SimpleResponse expenses;
    }


    @Getter
    @Setter
    public static class SimpleResponse {
        private Long placeId;
        private String placeName;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    public static class PatchDesc {
        private List<PatchPlaceDesc> placeDesc;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatchPlaceDesc {
        private Long placeId;
        private String description;
    }

}
