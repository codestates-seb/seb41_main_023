package com.newyear.mainproject.city.service;

import com.newyear.mainproject.city.entity.City;
import com.newyear.mainproject.city.repository.CityRepository;
import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CityService {
    private final CityRepository cityRepository;


    /**
     * 도시 데이터 불러오기
     */
    public List<City> findCities() {
        return cityRepository.findAll();
    }

    /**
     * 도시 조회
     */
    public City findCity(String cityName) {
        Optional<City> optionalCity = cityRepository.findByCityName(cityName);
        return optionalCity.orElseThrow(() -> new BusinessLogicException(ExceptionCode.CITY_NOT_FOUND));
    }
}
