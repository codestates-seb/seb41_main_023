package com.newyear.mainproject.plan.planmember;

import com.newyear.mainproject.member.entity.Member;
import com.newyear.mainproject.plan.entity.Plan;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter @Setter
public class PlanMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planMemberId;

    @Column(nullable = false)
    private boolean isOwner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id")
    private Plan plan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

}
