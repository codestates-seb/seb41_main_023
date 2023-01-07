package com.newyear.mainproject.plan.mapper;

import com.newyear.mainproject.plan.dto.PlanDto;
import com.newyear.mainproject.plan.entity.Plan;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PlanMapper {
    default Plan planPostDtoToPlan(PlanDto.Post post) {
        Plan plan = new Plan();

        plan.setCityName(post.getCityName());
        plan.setStartDate(post.getStartDate());
        plan.setEndDate(post.getEndDate());
        plan.setPlanTitle("Trip to "+ post.getCityName());

        return plan;
    }
    default Plan planPatchDtoToPlan(PlanDto.Patch patch) {
        Plan plan = new Plan();

        plan.setPlanId(patch.getPlanId());
        plan.setPlanTitle(patch.getPlanTitle());
        plan.setStartDate(patch.getStartDate());
        plan.setEndDate(patch.getEndDate());

        return plan;
    }
    Plan planToPlanResponseDto(Plan plan);
}
