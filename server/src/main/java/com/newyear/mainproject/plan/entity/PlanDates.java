package com.newyear.mainproject.plan.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.newyear.mainproject.place.entity.Place;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class PlanDates {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planDateId;

    @Column(nullable = false)
    private String planDate; //시작 일자 - 종료 일자 사이의 각각 일자들

    @JsonIgnore
    @OneToMany(mappedBy = "planDates", cascade = CascadeType.ALL)
    private List<Place> places = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "PLAN_ID")
    private Plan plan;
    public void setPlan(Plan plan) {
        this.plan = plan;
    }
}
