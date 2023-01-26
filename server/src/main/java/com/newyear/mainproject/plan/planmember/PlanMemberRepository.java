package com.newyear.mainproject.plan.planmember;

import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.plan.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanMemberRepository extends JpaRepository<PlanMember, Long> {
    PlanMember findByPlanAndMember(Plan plan, Member member);
}
