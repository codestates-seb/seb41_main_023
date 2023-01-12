package com.newyear.mainproject.place.service;

import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.place.entity.Place;
import com.newyear.mainproject.place.repository.PlaceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PlaceService {

    private final PlaceRepository placeRepository;

    public PlaceService(PlaceRepository placeRepository) {
        this.placeRepository = placeRepository;
    }

    /**
     * 해당 일정에 대한 장소 정보 등록
     */
    public Place createPlace(Place place) {
        return placeRepository.save(place);
    }

    /**
     * 해당 일정에 대한 장소 정보 수정
     */
    public Place updatePlace(Place place) {
        Place findPlace = findVerifiedPlace(place.getPlaceId());

        Optional.ofNullable(place.getPlaceName())
                .ifPresent(placeName -> findPlace.setPlaceName(placeName));
        Optional.ofNullable(place.getStartTime())
                .ifPresent(startTime -> findPlace.setStartTime(startTime));
        Optional.ofNullable(place.getEndTime())
                .ifPresent(endTime -> findPlace.setEndTime(endTime));

        return placeRepository.save(findPlace);
    }

    /**
     * 해당 일정에 대한 장소 삭제
     */
    public void deletePlace(Long placeId) {
        Place findPlace = findVerifiedPlace(placeId);
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
