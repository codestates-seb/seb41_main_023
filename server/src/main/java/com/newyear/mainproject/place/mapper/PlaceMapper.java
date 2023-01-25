package com.newyear.mainproject.place.mapper;

import com.newyear.mainproject.place.dto.PlaceDto;
import com.newyear.mainproject.place.entity.Place;
import com.newyear.mainproject.plan.entity.PlanDates;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PlaceMapper {
    default Place placePostDtoToPlace(PlaceDto.Post post) {
        Place place = new Place();
        place.setPlaceName(post.getPlaceName());
        place.setLatitude(post.getLatitude());
        place.setLongitude(post.getLongitude());
        place.setPlaceAddress(post.getPlaceAddress());
        if(post.getRatings() == null) {
            place.setRatings(0.0);
        }else {
            place.setRatings(post.getRatings());
        }

        place.setWebsite(post.getWebsite());
        place.setPhone(post.getPhone());
        place.setOpeningHours(post.getOpeningHours());


        //plan_date 연결
        PlanDates planDates = new PlanDates();
        planDates.setPlanDateId(post.getPlaceDateId());
        place.setPlanDate(planDates);

        return place;
    }

    Place placePatchDtoToPlace(PlaceDto.Patch patch);
    PlaceDto.Response placeToPlaceResponseDto(Place place);
    //게시판 desc
    List<Place> patchDescToPlaces(List<PlaceDto.PatchPlaceDesc> patchDesc);
}
