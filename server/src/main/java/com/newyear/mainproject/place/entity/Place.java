package com.newyear.mainproject.place.entity;

import com.newyear.mainproject.expense.entity.Expenses;
import com.newyear.mainproject.plan.entity.Plan;
import com.newyear.mainproject.plan.entity.PlanDates;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@DynamicUpdate // 변경된 값만 update
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placeId;

    @Column(nullable = false)
    private String placeName; //장소 이름

    private String startTime; // 이 장소에서 시작한 일정 시작 시간

    private String endTime; // 이 장소에서 시작한 일정 종료 시간

    private String description; // 이 장소에서 시작한 일정에 대한 설명(장소(note), 게시판에서 사용)

    @Column(nullable = false)
    private Double latitude; //위도

    @Column(nullable = false)
    private Double longitude; //경도

    @Column(nullable = false)
    private String placeAddress; // 주소

    @ManyToOne
    @JoinColumn(name = "plan_date_id")
    private PlanDates planDates;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @OneToOne(mappedBy = "place", cascade = CascadeType.REMOVE)
    private Expenses expenses;

    public void setPlan(Plan plan) {
        this.plan = plan;
    }

    public void setPlanDate(PlanDates planDates) {
        this.planDates = planDates;
    }
}
