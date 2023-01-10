package com.newyear.mainproject.plan.mapper;

import com.newyear.mainproject.place.dto.PlaceDto;
import com.newyear.mainproject.place.entity.Place;
import com.newyear.mainproject.plan.dto.PlanDto;
import com.newyear.mainproject.plan.entity.Plan;
import com.newyear.mainproject.plan.entity.PlanDates;
import com.newyear.mainproject.util.DateCalculation;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
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

        plan.setPlanDates(planDatesToPlanPlanDates(plan));

        return plan;
    }
    default Plan planPatchDtoToPlan(PlanDto.Patch patch) {
        Plan plan = new Plan();

        plan.setPlanId(patch.getPlanId());
        plan.setPlanTitle(patch.getPlanTitle());
        plan.setStartDate(patch.getStartDate());
        plan.setEndDate(patch.getEndDate());

        plan.setPlanDates(planDatesToPlanPlanDates(plan));

        return plan;

    }

    PlanDto.Response planToPlanResponseDto(Plan plan);

    default List<PlanDto.Response> plansToPlanResponseDtos(List<Plan> plans){
        return plans
                .stream()
                .map(plan -> PlanDto.Response
                        .builder()
                        .planId(plan.getPlanId())
                        .planTitle(plan.getPlanTitle())
                        .startDate(plan.getStartDate())
                        .endDate(plan.getEndDate())
                        .cityName(plan.getCityName())
                        .placesCount(plan.getPlaces().size())
                        .build()
                ).collect(Collectors.toList());
    }
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

    //plan 에 planDates 넣어주기 위한 메소드(중복 방지)
    default List<PlanDates> planDatesToPlanPlanDates(Plan plan) {
        List<String> dateList = DateCalculation.dateCal(plan.getStartDate(), plan.getEndDate());

        //일정 등록하면서 동시에 plan_date 테이블에 값 저장
        List<PlanDates> planDatesList = new ArrayList<>();

        for(String date : dateList) {
            PlanDates planDates = new PlanDates();
            planDates.setPlanDate(date); // 시작일정-끝일정 사이의 일정들을 전부 등록
            planDates.setSubTitle(null);
            planDates.setPlan(plan);
            planDatesList.add(planDates);
        }

        return planDatesList;
    }

    PlanDates planDatesPatchToPlanDates(PlanDto.PatchPlanDatesSubTitle patch);
    PlanDto.PlanDatesResponse planDatesToPlanDateResponseDto(PlanDates planDates);

    default List<PlanDto.PlanDatesResponse> planDateToPlanDateResponseDtos(List<PlanDates> planDates) {
        return planDates
                .stream()
                .map(planDate -> PlanDto.PlanDatesResponse
                        .builder()
                        .planDateId(planDate.getPlanDateId())
                        .planDate(planDate.getPlanDate())
                        .subTitle(planDate.getSubTitle())
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