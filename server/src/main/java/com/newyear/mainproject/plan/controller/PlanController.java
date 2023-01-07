package com.newyear.mainproject.plan.controller;

import com.newyear.mainproject.dto.SingleResponseDto;
import com.newyear.mainproject.plan.dto.PlanDto;
import com.newyear.mainproject.plan.entity.Plan;
import com.newyear.mainproject.plan.mapper.PlanMapper;
import com.newyear.mainproject.plan.serivce.PlanService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/plans")
@Slf4j
@Validated
public class PlanController {
    private final PlanService planService;
    private final PlanMapper planMapper;

    public PlanController(PlanService planService, PlanMapper planMapper) {
        this.planService = planService;
        this.planMapper = planMapper;
    }

    /**
     * 일정 등록
     */
    @PostMapping
    public ResponseEntity postPlan(@Valid @RequestBody PlanDto.Post post) {
        Plan plan = planService.createPlan(planMapper.planPostDtoToPlan(post));
        planService.createPlanDate(plan); // 일정에서 등록한 여행 시작일자 ~ 여행 끝 일자들의 리스트를 테이블에 저장

        return new ResponseEntity<>(
                new SingleResponseDto<>(planMapper.planToPlanResponseDto(plan)), HttpStatus.CREATED);
    }

    /**
     * 일정 수정
     */
    @PatchMapping("/{plan-id}")
    public ResponseEntity patchPlan(@PathVariable("plan-id") @Positive Long planId,
                                    @Valid @RequestBody PlanDto.Patch patch) {
        patch.setPlanId(planId);
        Plan plan = planService.updatePlan(planMapper.planPatchDtoToPlan(patch));
        planService.createPlanDate(plan); // 일정에서 등록한 여행 시작일자 ~ 여행 끝 일자들의 리스트를 테이블에 저장
        return new ResponseEntity<>(
                new SingleResponseDto<>(planMapper.planToPlanResponseDto(plan)), HttpStatus.OK);
    }

    /**
     * 일정 삭제
     */
    @DeleteMapping("/{plan-id}")
    public ResponseEntity deletePlan(@PathVariable("plan-id") @Positive Long planId) {
        planService.deletePlan(planId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
