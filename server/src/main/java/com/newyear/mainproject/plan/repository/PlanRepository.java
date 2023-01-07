package com.newyear.mainproject.plan.repository;

import com.newyear.mainproject.plan.entity.Plan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanRepository extends JpaRepository<Plan, Long> {
}
