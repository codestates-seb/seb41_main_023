package com.newyear.mainproject.city;

import com.newyear.mainproject.dto.SingleResponseDto;
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
public class CityController {
    private final CityService cityService;
    private final CityMapper cityMapper;

    public CityController(CityService cityService, CityMapper cityMapper) {
        this.cityService = cityService;
        this.cityMapper = cityMapper;
    }

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