package com.newyear.mainproject.expense.service;

import com.newyear.mainproject.budget.entity.Budget;
import com.newyear.mainproject.budget.service.BudgetService;
import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.expense.entity.Expenses;
import com.newyear.mainproject.expense.repository.ExpenseRepository;
import com.newyear.mainproject.member.service.MemberService;
import com.newyear.mainproject.place.entity.Place;
import com.newyear.mainproject.place.service.PlaceService;
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
    private final PlaceService placeService;
    private final MemberService memberService;

    public Expenses createExpense(Expenses expenses, long budgetId, Long placeId) {
        //장소 연결
        if(placeId != null) {
            if(expenseRepository.findAllByPlacePlaceId(placeId).size() != 0){
                if(expenseRepository.findAll().stream().anyMatch(expenses1 -> expenses1.getPlace().getPlaceId().equals(placeId))){
                    throw new BusinessLogicException(ExceptionCode.PLACE_EXPENSE_EXISTS);
                }
            }

            Place place = placeService.findPlace(placeId);
            expenses.setPlace(place);
        }

        Budget budget = budgetService.findBudget(budgetId);
        expenses.setBudget(budget);
        accessExpense(expenses);

        return expenseRepository.save(expenses);
    }

    public Expenses updateExpense(Expenses expenses) {
        Expenses findExpenses = findExistExpense(expenses.getExpenseId());

        accessExpense(findExpenses);

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
        accessExpense(findExpense);
        expenseRepository.delete(findExpense);
    }

    private Expenses findExistExpense(long expenseId) {
        return expenseRepository.findById(expenseId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.EXPENSE_NOT_FOUND));
    }

    private void accessExpense(Expenses expenses) {
        if (!expenses.getBudget().getPlan().getMember().equals(memberService.getLoginMember())) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN);
        }
    }
}
