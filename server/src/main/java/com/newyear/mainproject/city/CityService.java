package com.newyear.mainproject.city;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {
    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    /**
     * 도시 데이터 불러오기
     */
    public List<City> findCity() {
        return cityRepository.findAll();
    }
}
