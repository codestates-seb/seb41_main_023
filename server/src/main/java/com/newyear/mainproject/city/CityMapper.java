package com.newyear.mainproject.city;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CityMapper {
    List<CityDto.Response> cityToCityResponseDtos(List<City> city);
}
