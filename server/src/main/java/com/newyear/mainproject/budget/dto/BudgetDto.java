package com.newyear.mainproject.budget.dto;

import com.newyear.mainproject.expense.dto.ExpenseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

public class BudgetDto {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        @NotNull
        @Positive
        private int expectedBudget;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private long budgetId;
        private int expectedBudget;
        private ExpenseDto expense;
    }

    //조회시
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long budgetId;
        private int expectedBudget;
        private int totalExpenses;
        private List<ExpenseDto> expenses = new ArrayList<>();
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SimpleResponse {
        private long budgetId;
        private int expectedBudget;
    }

}
