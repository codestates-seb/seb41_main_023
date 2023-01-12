package com.newyear.mainproject.budget.mapper;

import com.newyear.mainproject.budget.dto.BudgetDto;
import com.newyear.mainproject.budget.entity.Budget;
import com.newyear.mainproject.expense.dto.ExpenseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BudgetMapper {

    Budget postDtoToBudget(BudgetDto.Post post);

    Budget patchDtoToBudget(BudgetDto.Patch patch);

    default BudgetDto.Response budgetToResponseDto(Budget budget) {
        BudgetDto.Response response = new BudgetDto.Response();
        response.setBudgetId(budget.getBudgetId());
        response.setExpectedBudget(budget.getExpectedBudget());
        budget.getExpenses().forEach(expense -> {
            ExpenseDto.Response expenseDto = new ExpenseDto.Response(expense.getExpenseId(), expense.getItem(), expense.getPrice(), expense.getCategory(), expense.getCreatedAt().toString().substring(0, 10));
                response.setTotalExpenses(expense.getPrice() + response.getTotalExpenses());
                response.getExpenses().add(expenseDto);
            }
        );
        return response;
    }

    BudgetDto.SimpleResponse budgetToSimpleResponse(Budget budget);
}
