package com.newyear.mainproject.place.controller;

import com.newyear.mainproject.dto.SingleResponseDto;
import com.newyear.mainproject.place.dto.PlaceDto;
import com.newyear.mainproject.place.entity.Place;
import com.newyear.mainproject.place.mapper.PlaceMapper;
import com.newyear.mainproject.place.service.PlaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/places")
@Slf4j
@Validated
@RequiredArgsConstructor
public class PlaceController {
    private final PlaceService placeService;
    private final PlaceMapper placeMapper;

    /**
     * 해당 일정에 대한 장소 정보 등록
     */
    @PostMapping("/{plan-date-id}")
    public ResponseEntity postPlace(@PathVariable("plan-date-id") @Positive Long planDateId,
                                    @Valid @RequestBody PlaceDto.Post post) {
        post.setPlaceDateId(planDateId);
        Place place = placeService.createPlace(placeMapper.placePostDtoToPlace(post));

        return new ResponseEntity<>(
                new SingleResponseDto<>(placeMapper.placeToPlaceResponseDto(place)), HttpStatus.CREATED);
    }

    /**
     * 해당 일정에 대한 장소 정보 수정
     */
    @PatchMapping("/{place-id}")
    public ResponseEntity patchPlace(@PathVariable("place-id") @Positive Long placeId,
                                     @RequestBody PlaceDto.Patch patch) {
        patch.setPlaceId(placeId);
        Place place = placeService.updatePlace(placeMapper.placePatchDtoToPlace(patch));

        return new ResponseEntity<>(
                new SingleResponseDto<>(placeMapper.placeToPlaceResponseDto(place)), HttpStatus.OK);
    }

    /**
     * 해당 일정에 대한 장소 정보 삭제
     */
    @DeleteMapping("/{place-id}")
    public ResponseEntity deletePlace(@PathVariable("place-id") @Positive Long placeId) {
        placeService.deletePlace(placeId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


    //게시판 desc 설정
    @PatchMapping("/desc")
    public ResponseEntity patchPlaceDescription(@RequestBody PlaceDto.PatchDesc patchDesc) {
        placeService.updatePlaceDesc(placeMapper.patchDescToPlaces(patchDesc.getPlaceDesc()));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
