package com.newyear.mainproject.plan.mapper;

import com.newyear.mainproject.place.dto.PlaceDto;
import com.newyear.mainproject.place.entity.Place;
import com.newyear.mainproject.plan.dto.PlanDto;
import com.newyear.mainproject.plan.entity.Plan;
import com.newyear.mainproject.plan.entity.PlanDates;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PlanMapper {
    default Plan planPostDtoToPlan(PlanDto.Post post) {
        Plan plan = new Plan();

        plan.setCityName(post.getCityName());
        plan.setStartDate(post.getStartDate());
        plan.setEndDate(post.getEndDate());
        plan.setPlanTitle("Trip to "+ post.getCityName());

        return plan;
    }
    Plan planPatchDtoToPlan(PlanDto.Patch patch);

    PlanDto.Response planToPlanResponseDto(Plan plan);
    default PlanDto.PlaceDetailResponse planToPlaceDetailResponseDto(Plan plan){
        PlanDto.PlaceDetailResponse response = new PlanDto.PlaceDetailResponse();
        response.setPlanId(plan.getPlanId());
        response.setCityName(plan.getCityName());
        response.setPlanTitle(plan.getPlanTitle());
        response.setStartDate(plan.getStartDate());
        response.setEndDate(plan.getEndDate());
        response.setPlanDates(planDateToPlanDateResponseDtos(plan.getPlanDates()));
        response.setPlaces(placesToPlaceResponseDtos(plan.getPlaces()));
        return response;
    }

    PlanDto.PlanDatesResponse planDatesToPlanDateResponseDto(PlanDates planDates);

    default List<PlanDto.PlanDatesResponse> planDateToPlanDateResponseDtos(List<PlanDates> planDates) {
        return planDates
                .stream()
                .map(planDate -> PlanDto.PlanDatesResponse
                        .builder()
                        .planDateId(planDate.getPlanDateId())
                        .planDate(planDate.getPlanDate())
                        .build())
                .collect(Collectors.toList());
    }
    default List<PlaceDto.Response> placesToPlaceResponseDtos(List<Place> places) {
        return places
                .stream()
                .map(place -> PlaceDto.Response
                        .builder()
                        .placeId(place.getPlaceId())
                        .placeName(place.getPlaceName())
                        .expense(place.getExpense())
                        .startTime(place.getStartTime())
                        .endTime(place.getEndTime())
                        .planDates(planDatesToPlanDateResponseDto(place.getPlanDates()))
                        .build())
                .collect(Collectors.toList());
    }
}
