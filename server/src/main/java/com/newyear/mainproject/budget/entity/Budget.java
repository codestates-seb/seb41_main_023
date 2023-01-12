package com.newyear.mainproject.budget.entity;

import com.newyear.mainproject.expense.entity.Expenses;
import com.newyear.mainproject.plan.entity.Plan;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@Entity
public class Budget {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long budgetId;

    @Column(nullable = false)
    private int expectedBudget;

    @OneToMany(mappedBy = "budget", cascade = CascadeType.ALL)
    private List<Expenses> expenses = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    public void addExpense(Expenses expense) {
        expenses.add(expense);
        expense.setBudget(this);
    }

}
