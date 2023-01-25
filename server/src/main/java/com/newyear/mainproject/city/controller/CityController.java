package com.newyear.mainproject.city.controller;

import com.newyear.mainproject.city.mapper.CityMapper;
import com.newyear.mainproject.city.service.CityService;
import com.newyear.mainproject.city.entity.City;
import com.newyear.mainproject.dto.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/city")
@Slf4j
@RequiredArgsConstructor
public class CityController {
    private final CityService cityService;
    private final CityMapper cityMapper;

    /**
     * 대한민국 도시 데이터들 조회
     */
    @GetMapping
    public ResponseEntity getCity() {
        List<City> cityList = cityService.findCities();
        return new ResponseEntity<>(
                new SingleResponseDto<>(cityMapper.cityToCityResponseDtos(cityList)), HttpStatus.OK);
    }
}