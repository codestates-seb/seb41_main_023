package com.newyear.mainproject.expense.entity;

import com.newyear.mainproject.audit.Auditable;
import com.newyear.mainproject.budget.entity.Budget;
import com.newyear.mainproject.place.entity.Place;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@Entity
@NoArgsConstructor
public class Expenses extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long expenseId;

    @Column
    private String item;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private String category;

    @ManyToOne
    @JoinColumn(name = "budget_id")
    private Budget budget;

    @OneToOne
    @JoinColumn(name = "place_id")
    private Place place;

    public void setBudget(Budget budget) {
        this.budget = budget;
        budget.getExpenses().add(this);
    }
}
