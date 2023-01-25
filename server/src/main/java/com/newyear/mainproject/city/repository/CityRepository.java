package com.newyear.mainproject.city.repository;

import com.newyear.mainproject.city.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Long> {
    Optional<City> findByCityName(String cityName);
}