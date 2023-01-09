package com.newyear.mainproject.place.repository;

import com.newyear.mainproject.place.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceRepository extends JpaRepository<Place, Long> {
}
