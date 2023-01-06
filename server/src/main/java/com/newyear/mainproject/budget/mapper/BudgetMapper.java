package com.newyear.mainproject.budget.mapper;

import com.newyear.mainproject.budget.dto.BudgetDto;
import com.newyear.mainproject.budget.entity.Budget;
import com.newyear.mainproject.expense.dto.ExpenseDto;
import com.newyear.mainproject.expense.entity.Expenses;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BudgetMapper {

    Budget postDtoToBudget(BudgetDto.Post post);

    default Budget patchDtoToBudget(BudgetDto.Patch patch) {
        Budget budget = new Budget();
        budget.setBudgetId(patch.getBudgetId());
        budget.setExpectedBudget(patch.getExpectedBudget());

        Expenses expense = new Expenses();
        try {
            expense.setItem(patch.getExpense().getItem());
            expense.setPrice(patch.getExpense().getPrice());
            budget.addExpense(expense);
        } catch (NullPointerException ignored) {}

        return budget;
    }

    default BudgetDto.Response budgetToResponseDto(Budget budget) {
        BudgetDto.Response response = new BudgetDto.Response();
        response.setBudgetId(budget.getBudgetId());
        response.setExpectedBudget(budget.getExpectedBudget());
        budget.getExpenses().forEach(expense -> {
            ExpenseDto expenseDto = new ExpenseDto(expense.getExpenseId(), expense.getItem(), expense.getPrice());
                response.setTotalExpenses(expense.getPrice() + response.getTotalExpenses());
                response.getExpenses().add(expenseDto);
            }
        );
        return response;
    }

    BudgetDto.SimpleResponse budgetToSimpleResponse(Budget budget);
}
