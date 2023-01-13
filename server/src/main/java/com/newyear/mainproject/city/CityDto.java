package com.newyear.mainproject.city;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class CityDto {
    @Builder
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response {
        private Long id;
        private String cityName;
    }
    @Getter
    @Setter
    public static class ImageResponse {
        private Long id;
        private String cityName;
        private String cityImage;
    }
}

