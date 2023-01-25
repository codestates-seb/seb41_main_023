package com.newyear.mainproject.plan.service;

import com.newyear.mainproject.board.service.BoardService;
import com.newyear.mainproject.city.service.CityService;
import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.member.service.MemberService;
import com.newyear.mainproject.plan.entity.Plan;
import com.newyear.mainproject.plan.entity.PlanDates;
import com.newyear.mainproject.plan.repository.PlanDateRepository;
import com.newyear.mainproject.plan.repository.PlanRepository;
import com.newyear.mainproject.util.DateCalculation;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PlanService {
   private final PlanRepository planRepository;
   private final PlanDateRepository planDateRepository;
   private final MemberService memberService;
   private final CityService cityService;
   private final BoardService boardService;

    public PlanService(PlanRepository planRepository, PlanDateRepository planDateRepository, MemberService memberService, CityService cityService, @Lazy BoardService boardService) {
        this.planRepository = planRepository;
        this.planDateRepository = planDateRepository;
        this.memberService = memberService;
        this.cityService = cityService;
        this.boardService = boardService;
    }
    /**
     * 일정 등록
     */
    public Plan createPlan(Plan plan) {
        plan.setMember(memberService.getLoginMember());
        plan.setCity(cityService.findCity(plan.getCityName()));
        return planRepository.save(plan);
    }

    /**
     * 일정 수정
     */
    public Plan updatePlan(Plan plan) {
        Plan findPlan = findVerifiedPlan(plan.getPlanId());

        //작성자만 수정 가능
        if (!findPlan.getMember().equals(memberService.getLoginMember())) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN);
        }

        Optional.ofNullable(plan.getPlanTitle())
                .ifPresent(planTitle -> findPlan.setPlanTitle(planTitle));
        Optional.ofNullable(plan.getStartDate())
                .ifPresent(startDate -> findPlan.setStartDate(startDate));
        Optional.ofNullable(plan.getEndDate())
                .ifPresent(endDate -> findPlan.setEndDate(endDate));
        return planRepository.save(findPlan);
    }

    /**
     * 각 날짜 subTitle 수정
     */
    public PlanDates updatePlanDateSubTitle(PlanDates planDates) {
        PlanDates findPlanDate = findPlanDates(planDates.getPlanDateId());

        Optional.ofNullable(planDates.getSubTitle())
                .ifPresent(subTitle -> findPlanDate.setSubTitle(subTitle));

        return planDateRepository.save(findPlanDate);
    }

    /**
     * 일정-날짜 등록
     */

    public void createPlanDate(Plan plan) {
        //일정 생성과 동시에 날짜 나눠서 테이블에 값 넣음
        planDateRepository.saveAll(plan.getPlanDates());
    }

    /**
     * 일정-날짜 수정, 삭제
     * 동시에 같은 plan_id 값을 가진 plan_date 의 값들이 수정 - 삭제 후 다시 생성
     * 같은 값이면 삭제 안되도록 처리
     */

    public void updatePlanDate(Plan plan) {
        List<String> dateList = DateCalculation.dateCal(plan.getStartDate(), plan.getEndDate());

        for(String date : dateList) {
            PlanDates planDate = new PlanDates();
            planDate.setPlanDate(date); // 시작일정-끝일정 사이의 일정들을 전부 등록
            planDate.setPlan(plan);
            planDateRepository.save(planDate);
        }
    }

    public void deletePlanDate(Plan plan) {
        planDateRepository.deleteAllByPlan(plan);
    }



    /**
     * 일정 삭제
     */
    public void deletePlan(Long planId) {
        Plan findPlan = findVerifiedPlan(planId);
        //작성자만 삭제 가능
        if (!findPlan.getMember().equals(memberService.getLoginMember())) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN);
        }

        //이 일정에 관련된 게시물이 있으면 게시물 삭제 먼저 하도록 예외 처리
        if(!boardService.findPlanBoards(findPlan.getPlanId()).isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.BOARD_CHECK_EXISTS);
        }

        planRepository.delete(findPlan);
    }

    /**
     * 일정 존재 여부 확인
     */
    private Plan findVerifiedPlan(Long planId) {
        Optional<Plan> optionalPlan = planRepository.findById(planId);
        return optionalPlan.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PLAN_NOT_FOUND));
    }

    /**
     * 특정 일정 조회
     */
    public Plan findPlan(Long planId) {
        return findVerifiedPlan(planId);
    }

    public PlanDates findPlanDates(Long planDataId) {
        Optional<PlanDates> optionalPlanDates = planDateRepository.findById(planDataId);
        return optionalPlanDates.orElseThrow(() -> new BusinessLogicException(ExceptionCode.PLAN_DATE_NOT_FOUND));
    }

    /**
     * 해당 유저가 작성한 일정들 조회
     */
    public List<Plan> findPlans(Member member){
        return planRepository.findAllByMember(member);
    }

    /**
     * 해당 유저가 작성한 일정 조회
     */
    public Plan findPlanAndMember(Long planId, Member member) {
        Optional<Plan> optionalPlan = planRepository.findByPlanIdAndMember(planId, member);
        return optionalPlan.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN));
    }
}
