package com.newyear.mainproject.plan.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.newyear.mainproject.board.entity.Board;
import com.newyear.mainproject.budget.entity.Budget;
import com.newyear.mainproject.city.entity.City;
import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.place.entity.Place;
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

    @Column(nullable = false, updatable = false)
    private String cityName; // 지역 이름

    @Column(nullable = false)
    private String startDate; // 여행 시작 일자

    @Column(nullable = false)
    private String endDate; // 여행 끝 일자

    @Column(nullable = false)
    private Boolean boardCheck; //게시물 작성 여부

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setMember(Member member) {
        this.member = member;
    }

    @JsonIgnore
    @OneToMany(mappedBy = "plan", cascade = CascadeType.REMOVE)
    private List<PlanDates> planDates = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "plan", cascade = CascadeType.REMOVE)
    private List<Place> places = new ArrayList<>();

    @OneToOne(mappedBy = "plan", cascade = CascadeType.ALL)
    private Budget budget;

    @OneToOne(mappedBy = "plan")
    private Board board;

    @OneToOne
    @JoinColumn(name = "city_id")
    private City city;

}
