package com.newyear.mainproject.budget.dto;

import com.newyear.mainproject.expense.dto.ExpenseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Min;
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
        @Min(0) // 일정 등록시 초기 셋팅
        private int expectedBudget;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private long budgetId;
        @NotNull
        @Positive(message = "예산은 0원보다 커야합니다.")
        private int expectedBudget;
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
        private List<ExpenseDto.Response> expenses = new ArrayList<>();
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class SimpleResponse {
        private long budgetId;
        private int expectedBudget;
    }

}
