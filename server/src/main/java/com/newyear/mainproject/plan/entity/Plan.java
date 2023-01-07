package com.newyear.mainproject.plan.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planId;

    @Column(nullable = false)
    private String planTitle; // 일정 제목

    @Column(nullable = false, unique = true, updatable = false)
    private String cityName; // 지역 이름

    @Column(nullable = false)
    private String startDate; // 여행 시작 일자

    @Column(nullable = false)
    private String endDate; // 여행 끝 일자

    @JsonIgnore
    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL)
    private List<PlanDate> planDates = new ArrayList<>();
}
