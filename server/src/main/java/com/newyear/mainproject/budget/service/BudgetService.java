package com.newyear.mainproject.budget.service;

import com.newyear.mainproject.budget.entity.Budget;
import com.newyear.mainproject.budget.repository.BudgetRepository;
import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BudgetService {
    private final BudgetRepository budgetRepository;
    private final MemberService memberService;

    public Budget createBudget(Budget budget) {
        return budgetRepository.save(budget);
    }

    public Budget editBudget(Budget budget) {
        Budget findBudget = findVerifiedBudget(budget.getBudgetId());
        //자신의 예산이 아니면 수정 불가
        accessBudget(findBudget);

        Optional.of(budget.getExpectedBudget())
                .ifPresent(findBudget::setExpectedBudget);

        return budgetRepository.save(findBudget);
    }

    @Transactional(readOnly = true)
    public Budget findBudget(long budgetId) {
        Budget findBudget = findVerifiedBudget(budgetId);
        accessBudget(findBudget);
        return findBudget;
    }

    public void deleteBudget(long budgetId) {
        Budget findBudget = findVerifiedBudget(budgetId);
        accessBudget(findBudget);
        budgetRepository.deleteById(budgetId);
    }

    private Budget findVerifiedBudget(long budgetId) {
        Optional<Budget> optionalBudget = budgetRepository.findById(budgetId);
        return optionalBudget.orElseThrow(() -> new BusinessLogicException(ExceptionCode.BUDGET_NOT_FOUND));
    }

    //자신의 예산이 아니면 수정 불가
    private void accessBudget(Budget findBudget) {
        if (!findBudget.getPlan().getMember().equals(memberService.getLoginMember())) {
            throw new BusinessLogicException(ExceptionCode.ACCESS_FORBIDDEN);
        }
    }

}
