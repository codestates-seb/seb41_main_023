package com.newyear.mainproject.plan.mapper;

import com.newyear.mainproject.budget.dto.BudgetDto;
import com.newyear.mainproject.budget.entity.Budget;
import com.newyear.mainproject.city.entity.City;
import com.newyear.mainproject.city.dto.CityDto;
import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.expense.dto.ExpenseDto;
import com.newyear.mainproject.expense.entity.Expenses;
import com.newyear.mainproject.place.dto.PlaceDto;
import com.newyear.mainproject.place.entity.Place;
import com.newyear.mainproject.plan.dto.PlanDto;
import com.newyear.mainproject.plan.entity.Plan;
import com.newyear.mainproject.plan.entity.PlanDates;
import com.newyear.mainproject.util.DateCalculation;
import com.newyear.mainproject.util.DateUtil;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
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
        plan.setBoardCheck(false);

        //예산 연결
        Budget budget = new Budget();
        budget.setExpectedBudget(0);
        budget.setPlan(plan);
        plan.setBudget(budget);

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
                .map(plan -> {
                            try {
                                return PlanDto.Response
                                        .builder()
                                        .planId(plan.getPlanId())
                                        .planTitle(plan.getPlanTitle())
                                        .startDate(DateUtil.convertStringToDateFormatV1(plan.getStartDate()))
                                        .endDate(DateUtil.convertStringToDateFormatV1(plan.getEndDate()))
                                        .cityName(plan.getCityName())
                                        .placesCount(plan.getPlaces().size())
                                        .city(cityImageResponseToCity(plan.getCity()))
                                        .boardCheck(plan.getBoardCheck())
                                        .build();
                            } catch (ParseException e) {
                                throw new RuntimeException(e);
                            }
                        }
                ).collect(Collectors.toList());
    }
    CityDto.ImageResponse cityImageResponseToCity(City city);

    default PlanDto.PlanDatePlaceDetailResponse planToPlaceDetailResponseDto(Plan plan) throws ParseException {
        PlanDto.PlanDatePlaceDetailResponse response = new PlanDto.PlanDatePlaceDetailResponse();
        response.setPlanId(plan.getPlanId());
        response.setCityName(plan.getCityName());
        response.setPlanTitle(plan.getPlanTitle());
        response.setStartDate(DateUtil.convertStringToDateFormatV1(plan.getStartDate()));
        response.setEndDate(DateUtil.convertStringToDateFormatV1(plan.getEndDate()));
        response.setPlanDates(planDateToPlanDateResponseDtos(plan.getPlanDates()));
        response.setPlanDatesAndPlace(planDatesToPlanDatesDetailResponseDtos(plan.getPlanDates()));
        response.setBudget(budgetToBudgetSimpleResponseDto(plan.getBudget()));
        response.setCity(cityImageResponseToCity(plan.getCity()));
        Optional.ofNullable(plan.getBoard())
                .ifPresent(board -> response.setBoardId(board.getBoardId()));
        return response;
    }



    //plan 에 planDates 넣어주기 위한 메소드(중복 방지)
    default List<PlanDates> planDatesToPlanPlanDates(Plan plan) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            Date startIf = formatter.parse(plan.getStartDate());
            Date endIf = formatter.parse(plan.getEndDate());
            //endDate 보다 startDate 가 크면 안됨
            if(startIf.compareTo(endIf) > 0) throw new BusinessLogicException(ExceptionCode.INVALID_VALUES);
        }catch (ParseException e) {
            e.printStackTrace();
        }

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


    //리스트용
    default PlanDto.PlanDatesResponse planDatesToPlanDateResponseDto(PlanDates planDates) throws ParseException {

        PlanDto.PlanDatesResponse planDatesResponse = new PlanDto.PlanDatesResponse();
        planDatesResponse.setPlanDateId(planDates.getPlanDateId());
        planDatesResponse.setPlanDate(DateUtil.convertStringToDateFormatV1(planDates.getPlanDate()));
        planDatesResponse.setSubTitle(planDates.getSubTitle());

        return planDatesResponse;
    }

    default PlanDto.PlanDatesResponse planDatesToPlanDateResponseDtoV2(PlanDates planDates) throws ParseException {

        PlanDto.PlanDatesResponse planDatesResponse = new PlanDto.PlanDatesResponse();
        planDatesResponse.setPlanDateId(planDates.getPlanDateId());
        planDatesResponse.setPlanDate(DateUtil.convertStringToDateFormatV2(planDates.getPlanDate()));
        planDatesResponse.setSubTitle(planDates.getSubTitle());

        return planDatesResponse;
    }

    default List<PlanDto.PlanDatesResponse> planDateToPlanDateResponseDtos(List<PlanDates> planDates) throws ParseException {
        List<PlanDto.PlanDatesResponse> list = new ArrayList<>();
        for ( PlanDates planDates1 : planDates ) {
            list.add( planDatesToPlanDateResponseDto( planDates1 ) );

        }
        return list;
    }
    default List<PlaceDto.Response> placesToPlaceResponseDtos(List<Place> places) {
        return places
                .stream()
                .map(place -> PlaceDto.Response
                                .builder()
                                .placeId(place.getPlaceId())
                                .placeName(place.getPlaceName())
                                .description(place.getDescription())
                                .startTime(place.getStartTime())
                                .endTime(place.getEndTime())
                                .expenses(expensesToExpenseSimpleResponseDto(place.getExpenses()))
                                .latitude(place.getLatitude())
                                .longitude(place.getLongitude())
                                .placeAddress(place.getPlaceAddress())
                                .ratings(place.getRatings())
                                .website(place.getWebsite())
                                .phone(place.getPhone())
                                .openingHours(place.getOpeningHours())
                                .build())
                    .collect(Collectors.toList());
    }

    default List<PlanDto.PlanDatesDetailResponse> planDatesToPlanDatesDetailResponseDtos(List<PlanDates> dates) {
        return dates
                .stream()
                .map(planDates -> {
                    try {
                        return PlanDto.PlanDatesDetailResponse
                                .builder()
                                .planDateId(planDates.getPlanDateId())
                                .planDate(DateUtil.convertStringToDateFormatV1(planDates.getPlanDate()))
                                .subTitle(planDates.getSubTitle())
                                .places(placesToPlaceResponseDtos(planDates.getPlaces()))
                                .build();
                    } catch (ParseException e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toList());
    }

   ExpenseDto.SimpleResponse expensesToExpenseSimpleResponseDto(Expenses expenses);
    BudgetDto.SimpleResponse budgetToBudgetSimpleResponseDto(Budget budget);
}