package com.newyear.mainproject.place.service;

import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.member.service.MemberService;
import com.newyear.mainproject.place.entity.Place;
import com.newyear.mainproject.place.repository.PlaceRepository;
import com.newyear.mainproject.plan.entity.Plan;
import com.newyear.mainproject.plan.service.PlanService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PlaceService {

    private final PlaceRepository placeRepository;
    private final MemberService memberService;
    private final PlanService planService;

    public PlaceService(PlaceRepository placeRepository, MemberService memberService, PlanService planService) {
        this.placeRepository = placeRepository;
        this.memberService = memberService;
        this.planService = planService;
    }

    /**
     * 해당 일정에 대한 장소 정보 등록
     */
    public Place createPlace(Place place) {
        //plan 작성자만 place 생성 가능
        Plan plan = planService.findPlan(place.getPlan().getPlanId());
        if (!plan.getMember().equals(memberService.getLoginMember())) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN);
        }

        if(place.getRatings() == null){
            place.setRatings(0.0);
        }

        return placeRepository.save(place);
    }

    /**
     * 해당 일정에 대한 장소 정보 수정
     */
    public Place updatePlace(Place place) {
        Place findPlace = findVerifiedPlace(place.getPlaceId());

        //작성자만 수정 가능
        if (!findPlace.getPlan().getMember().equals(memberService.getLoginMember())) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN);
        }

        Optional.ofNullable(place.getPlaceName())
                .ifPresent(placeName -> findPlace.setPlaceName(placeName));
        Optional.ofNullable(place.getStartTime())
                .ifPresent(startTime -> findPlace.setStartTime(startTime));
        Optional.ofNullable(place.getEndTime())
                .ifPresent(endTime -> findPlace.setEndTime(endTime));
        Optional.ofNullable(place.getLatitude())
                .ifPresent(latitude -> findPlace.setLatitude(latitude));
        Optional.ofNullable(place.getLongitude())
                .ifPresent(longitude -> findPlace.setLongitude(longitude));
        Optional.ofNullable(place.getPlaceAddress())
                .ifPresent(address -> findPlace.setPlaceAddress(address));
        Optional.ofNullable(place.getRatings())
                .ifPresent(ratings -> findPlace.setRatings(ratings));
        Optional.ofNullable(place.getWebsite())
                .ifPresent(website -> findPlace.setWebsite(website));
        Optional.ofNullable(place.getPhone())
                .ifPresent(phone -> findPlace.setPhone(phone));
        Optional.ofNullable(place.getOpeningHours())
                .ifPresent(openingHours -> findPlace.setOpeningHours(openingHours));
        Optional.ofNullable(place.getDescription())
                .ifPresent(description -> findPlace.setDescription(description));

        return placeRepository.save(findPlace);
    }

    /**
     * 해당 일정에 대한 장소 삭제
     */
    public void deletePlace(Long placeId) {
        Place findPlace = findVerifiedPlace(placeId);

        //작성자만 삭제 가능
        if (!findPlace.getPlan().getMember().equals(memberService.getLoginMember())) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN);
        }
        placeRepository.delete(findPlace);
    }

    /**
     * 해당 장소 조회
     */
    public Place findPlace(Long placeId) {
        return findVerifiedPlace(placeId);
    }

    /**
     * 장소 정보 존재 여부 확인
     */
    private Place findVerifiedPlace(Long placeId) {
        Optional<Place> optionalPlace = placeRepository.findById(placeId);
        return optionalPlace.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PLACE_NOT_FOUND));
    }

    //게시판 - 장소에 대한 desc 저장
    public void updatePlaceDesc(List<Place> place) {
        for (Place value : place) {
            Place findPlace = findVerifiedPlace(value.getPlaceId());
            Optional.ofNullable(value.getDescription())
                    .ifPresent(findPlace::setDescription);

            placeRepository.save(findPlace);
        }
    }
}
