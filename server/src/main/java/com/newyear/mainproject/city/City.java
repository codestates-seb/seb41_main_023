package com.newyear.mainproject.city;

import com.newyear.mainproject.plan.entity.Plan;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String cityName;

    @Column(nullable = false)
    private String cityImage;

    @OneToOne(mappedBy = "city", cascade = CascadeType.ALL)
    private Plan plan;
}