package com.newyear.mainproject.city.mapper;

import com.newyear.mainproject.city.dto.CityDto;
import com.newyear.mainproject.city.entity.City;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CityMapper {
    List<CityDto.ImageResponse> cityToCityResponseDtos(List<City> city);
}
