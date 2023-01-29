package com.newyear.mainproject.plan.controller;

import com.newyear.mainproject.budget.service.BudgetService;
import com.newyear.mainproject.dto.SingleResponseDto;
import com.newyear.mainproject.member.service.MemberService;
import com.newyear.mainproject.plan.dto.PlanDto;
import com.newyear.mainproject.plan.entity.Plan;
import com.newyear.mainproject.plan.entity.PlanDates;
import com.newyear.mainproject.plan.mapper.PlanMapper;
import com.newyear.mainproject.plan.service.PlanService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/plans")
@Slf4j
@Validated
@RequiredArgsConstructor
public class PlanController {
    private final PlanService planService;
    private final PlanMapper planMapper;
    private final MemberService memberService;
    private final BudgetService budgetService;

    /**
     * 일정 등록
     */
    @PostMapping
    public ResponseEntity postPlan(@Valid @RequestBody PlanDto.Post post) {
        Plan plan = planService.createPlan(planMapper.planPostDtoToPlan(post));
        planService.createPlanDate(plan);//PlanDates 생성 시, update 문 실행 방지 Plan 등록 후 - PlanDates 등록

        //일정 등록과 동시에 예산 초기 세팅
        budgetService.createBudget(plan.getBudget());


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
        Plan originPlan = planService.findPlan(planId);
        Plan patchPlan = planMapper.planPatchDtoToPlan(patch);

        //쓸데없는 delete 명령문 낭비를 방지하기 위해 PlanDate 값이 (하나 이상) 달라야 삭제 + 생성 처리
        if(!originPlan.getStartDate().equals(patchPlan.getStartDate()) || !originPlan.getEndDate().equals(patchPlan.getEndDate())) {
            planService.deletePlanDate(originPlan);
            planService.updatePlanDate(patchPlan); //PlanDates 생성 시, update 문 실행 방지 Plan 등록 후 - PlanDates 등록
        }

        Plan plan = planService.updatePlan(patchPlan);

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
    public ResponseEntity getPlan(@PathVariable("plan-id") @Positive Long planId) throws ParseException {
        Plan plan = planService.findPlanAndMember(planId, memberService.getLoginMember());

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

    /**
     * 각각 일정의 SubTitle 수정
     */
    @PatchMapping("/date/title/{plan-date-id}")
    public ResponseEntity patchPlanDateSubTitle(@PathVariable("plan-date-id") @Positive Long planDateId,

                                                @Valid @RequestBody PlanDto.PatchPlanDatesSubTitle patch) throws ParseException {

        patch.setPlanDateId(planDateId);
        PlanDates planDates = planService.updatePlanDateSubTitle(planMapper.planDatesPatchToPlanDates(patch));

        return new ResponseEntity<>(
                new SingleResponseDto<>(planMapper.planDatesToPlanDateResponseDto(planDates)), HttpStatus.OK);
    }
}
