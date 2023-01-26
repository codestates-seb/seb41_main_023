package com.newyear.mainproject.city;

import lombok.AllArgsConstructor;
import lombok.Builder;
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

