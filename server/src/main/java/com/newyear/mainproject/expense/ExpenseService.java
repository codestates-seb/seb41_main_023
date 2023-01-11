package com.newyear.mainproject.expense;

import com.newyear.mainproject.budget.entity.Budget;
import com.newyear.mainproject.budget.service.BudgetService;
import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.expense.entity.Expenses;
import com.newyear.mainproject.expense.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final BudgetService budgetService;

    public Expenses createExpense(Expenses expenses, long budgetId) {
        Budget budget = budgetService.findBudget(budgetId);
        expenses.setBudget(budget);
        return expenseRepository.save(expenses);
    }

    public Expenses updateExpense(Expenses expenses) {
        Expenses findExpenses = findExistExpense(expenses.getExpenseId());

        Optional.ofNullable(expenses.getItem())
                .ifPresent(findExpenses::setItem);
        Optional.of(expenses.getPrice())
                .ifPresent(findExpenses::setPrice);
        Optional.ofNullable(expenses.getCategory())
                .ifPresent(findExpenses::setCategory);

        return expenseRepository.save(findExpenses);
    }

    public void deleteExpense(long expenseId) {
        Expenses findExpense = findExistExpense(expenseId);
        expenseRepository.delete(findExpense);
    }

    private Expenses findExistExpense(long expenseId) {
        return expenseRepository.findById(expenseId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.EXPENSE_NOT_FOUND));
    }
}
