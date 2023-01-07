package com.newyear.mainproject.plan.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class PlanDate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planDateId;

    @Column(nullable = false)
    private String planDate; //시작 일자 - 종료 일자 사이의 각각 일자들

    @ManyToOne
    @JoinColumn(name = "PLAN_ID")
    private Plan plan;

    public void setPlan(Plan plan) {
        this.plan = plan;
    }
}
