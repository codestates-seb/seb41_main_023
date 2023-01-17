package com.newyear.mainproject.board.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;

public class BoardDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        @NotBlank
        private String title;
        //travel experience
        private String content;
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private long boardId;
        @NotBlank
        private String title;
        //travel experience
        private String content;
    }

    // 게시판 목록 조회시
    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long boardId;
        private String title;
        //총 좋아요 수
        private int likes;
        private int views;
        //회원 정보
        private long memberId;
        private String displayName;
        private String profileImage;
        //로그인 회원의 좋아요 여부
        private boolean checkLikes;
        //일정 - date
        private String travelPeriod;
        private String cityImage;
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SimpleResponse {
        private long boardId;
        private LocalDate createdAt;
    }

    // 한 게시물 클릭시
    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseDetails {
        private long boardId;
        private String title;
        private String content;
        private int likes;
        private int views;
        private String createdAt;
        //회원 정보
        private long memberId;
        private String displayName;
        private String profileImage;
        //로그인 회원의 좋아요 여부
        private boolean checkLikes;
        //plan
        private long planId;
        private String cityName;
        private List<Days> days;
        private String cityImage;

    }

    //게시판 최초 작성시
    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseEditDetails {
        private String planTitle;
        private long planId;
        private String cityName;
        private List<Days> days;
        private String cityImage;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter @Setter
    public static class Days {
        private String day;
        private List<PlaceDetails> placeDetails;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter @Setter
    public static class PlaceDetails {
        private int index;
        private long placeId;
        private String placeName;
        private String startTime;
        private String endTime;
        private String description;
        private double latitude;
        private double longitude;
        private String placeAddress;
        private double ratings;
        private String website;
        private String phone;
        private String openingHours;
    }

}
