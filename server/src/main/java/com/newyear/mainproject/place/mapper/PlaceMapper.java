package com.newyear.mainproject.place.mapper;

import com.newyear.mainproject.place.dto.PlaceDto;
import com.newyear.mainproject.place.entity.Place;
import com.newyear.mainproject.plan.entity.PlanDates;
import com.newyear.mainproject.plan.service.PlanService;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PlaceMapper {
    default Place placePostDtoToPlace(PlaceDto.Post post, PlanService planService) {
        Place place = new Place();
        place.setPlaceName(post.getPlaceName());

        //plan_date, plan 연결
        PlanDates planDates = planService.findPlanDates(post.getPlaceDateId());
        place.setPlanDate(planDates);

        place.setPlan(planDates.getPlan());
        return place;
    }

    Place placePatchDtoToPlace(PlaceDto.Patch patch);
    PlaceDto.Response placeToPlaceResponseDto(Place place);
}
