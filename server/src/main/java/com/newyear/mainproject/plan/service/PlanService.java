package com.newyear.mainproject.plan.service;

import com.newyear.mainproject.board.service.BoardService;
import com.newyear.mainproject.city.CityService;
import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.member.service.MemberService;
import com.newyear.mainproject.plan.entity.Plan;
import com.newyear.mainproject.plan.entity.PlanDates;
import com.newyear.mainproject.plan.planmember.PlanMember;
import com.newyear.mainproject.plan.planmember.PlanMemberRepository;
import com.newyear.mainproject.plan.repository.PlanDateRepository;
import com.newyear.mainproject.plan.repository.PlanRepository;
import com.newyear.mainproject.util.DateCalculation;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class PlanService {
   private final PlanRepository planRepository;
   private final PlanDateRepository planDateRepository;
   private final MemberService memberService;
   private final CityService cityService;
   private final BoardService boardService;
   private final PlanMemberRepository planMemberRepository;

    public PlanService(PlanRepository planRepository, PlanDateRepository planDateRepository, MemberService memberService, CityService cityService, @Lazy BoardService boardService, PlanMemberRepository planMemberRepository) {
        this.planRepository = planRepository;
        this.planDateRepository = planDateRepository;
        this.memberService = memberService;
        this.cityService = cityService;
        this.boardService = boardService;
        this.planMemberRepository = planMemberRepository;
    }

    /**
     * 일정 등록
     */
    public Plan createPlan(Plan plan) {
        PlanMember planMember = new PlanMember();
        planMember.setPlan(plan);
        planMember.setMember(memberService.getLoginMember());
        planMember.setOwner(true); //일정 생성하는 유저가 방장권한을 가진다
        plan.setCity(cityService.findCity(plan.getCityName()));
        plan.addPlanMember(planMember);

        return planRepository.save(plan);
    }

    /**
     * 일정 수정
     */
    public Plan updatePlan(Plan plan) {
        Plan findPlan = findVerifiedPlan(plan.getPlanId());

        //작성자 + 공유된 자만 수정 가능
        containsMember(findPlan);

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

        PlanMember findPlanMember = planMemberRepository.findByPlanAndMember(findPlan, memberService.getLoginMember());
        //이 일정에 관련된 게시물이 있으면 게시물 삭제 먼저 하도록 예외 처리
        if(!boardService.findPlanBoards(findPlan.getPlanId()).isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.BOARD_CHECK_EXISTS);
        }

        if(findPlanMember.isOwner()) { //방장일 때 -> 일정 전체 삭제
            //작성자만 삭제 가능
            containsMember(findPlan);
            planRepository.delete(findPlan);
        }else { //손님일 때 -> 본인 일정만 삭제
            planMemberRepository.delete(findPlanMember);
        }
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
        return member.getPlanMembers().stream().map(pm -> pm.getPlan()).collect(Collectors.toList());
    }

    /**
     * 해당 유저가 작성한 일정 조회
     */
    public Plan findPlanAndMember(Long planId) {
        Plan plan = planRepository.findById(planId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN));
        containsMember(plan);

        return plan;
    }

    //일정 공유
    public void sharePlan(long planId, String email) {
        Plan plan = findPlan(planId);
        Member member = memberService.verifyExistsEmail(email);

        if (plan.getPlanMembers().stream().anyMatch(member.getPlanMembers()::contains)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
        containsMember(plan);

        PlanMember planMember = new PlanMember();
        planMember.setOwner(false); //손님 권한
        member.addPlanMember(planMember);
        plan.addPlanMember(planMember);
        planRepository.save(plan);
    }

    private void containsMember(Plan plan) {
        boolean contains = plan.getPlanMembers()
                .stream().anyMatch(memberService.getLoginMember().getPlanMembers()::contains);

        if (!contains) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN);
        }
    }
}
