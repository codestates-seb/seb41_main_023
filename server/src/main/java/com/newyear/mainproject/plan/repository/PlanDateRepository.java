package com.newyear.mainproject.plan.repository;

import com.newyear.mainproject.plan.entity.Plan;
import com.newyear.mainproject.plan.entity.PlanDates;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanDateRepository extends JpaRepository<PlanDates, Long> {
    void deleteAllByPlan(Plan plan);
}
