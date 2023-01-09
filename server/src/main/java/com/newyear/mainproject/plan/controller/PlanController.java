package com.newyear.mainproject.plan.controller;

import com.newyear.mainproject.dto.SingleResponseDto;
import com.newyear.mainproject.member.service.MemberService;
import com.newyear.mainproject.plan.dto.PlanDto;
import com.newyear.mainproject.plan.entity.Plan;
import com.newyear.mainproject.plan.mapper.PlanMapper;
import com.newyear.mainproject.plan.service.PlanService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/plans")
@Slf4j
@Validated
public class PlanController {
    private final PlanService planService;
    private final PlanMapper planMapper;
    private final MemberService memberService;

    public PlanController(PlanService planService, PlanMapper planMapper, MemberService memberService) {
        this.planService = planService;
        this.planMapper = planMapper;
        this.memberService = memberService;
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

    /**
     * 해당 여행일정에 대한 세부 일정 조회
     */
    @GetMapping("/{plan-id}")
    public ResponseEntity getPlan(@PathVariable("plan-id") @Positive Long planId) {
        Plan plan = planService.findPlan(planId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(planMapper.planToPlaceDetailResponseDto(plan)), HttpStatus.OK);
    }

    /**
     * 해당 유저가 작성한 일정 조회
     */
    @GetMapping
    public ResponseEntity getPlans(){
        List<Plan> planList = planService.findPlans(memberService.getLoginMember());

        return new ResponseEntity<>(
                new SingleResponseDto<>(planMapper.plansToPlanResponseDtos(planList)), HttpStatus.OK);
    }
}
