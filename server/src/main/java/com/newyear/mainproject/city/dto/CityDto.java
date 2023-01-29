package com.newyear.mainproject.city.dto;

import lombok.Getter;
import lombok.Setter;

public class CityDto {

    @Getter
    @Setter
    public static class ImageResponse {
        private Long id;
        private String cityName;
        private String cityImage;
    }
}

