package com.newyear.mainproject.plan.repository;

import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.plan.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findAllByMember(Member member);
    Optional<Plan> findByPlanIdAndMember(Long planId, Member member);
}
