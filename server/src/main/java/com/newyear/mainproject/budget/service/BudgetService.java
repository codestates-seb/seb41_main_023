package com.newyear.mainproject.budget.service;

import com.newyear.mainproject.budget.entity.Budget;
import com.newyear.mainproject.budget.repository.BudgetRepository;
import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BudgetService {
    private final BudgetRepository budgetRepository;

    public void createBudget(Budget budget) {
        budgetRepository.save(budget);
    }

    public void editBudget(Budget budget) {
        Budget findBudget = findVerifiedBudget(budget.getBudgetId());

        findBudget.setExpenses(budget.getExpenses());

        if (budget.getExpenses().isEmpty()) {
            findBudget.setExpectedBudget(budget.getExpectedBudget());
        }
        budgetRepository.save(findBudget);
    }

    public Budget findBudget(long budgetId) {
        return findVerifiedBudget(budgetId);
    }

    public void deleteBudget(long budgetId) {
        findVerifiedBudget(budgetId);
        budgetRepository.deleteById(budgetId);
    }

    private Budget findVerifiedBudget(long budgetId) {
        Optional<Budget> optionalBudget = budgetRepository.findById(budgetId);
        return optionalBudget.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BUDGET_NOT_FOUND));
    }

}
