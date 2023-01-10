package com.newyear.mainproject.expense.entity;

import com.newyear.mainproject.audit.Auditable;
import com.newyear.mainproject.budget.entity.Budget;
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

    @Column(nullable = false)
    private String item;

    @Column(nullable = false)
    private int price;

    @ManyToOne
    @JoinColumn(name = "budget_id")
    private Budget budget;

    public void setBudget(Budget budget) {
        this.budget = budget;
        budget.getExpenses().add(this);
    }
}
