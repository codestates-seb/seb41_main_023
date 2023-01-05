package com.newyear.mainproject.expense.controller;

import com.newyear.mainproject.exception.BusinessLogicException;
import com.newyear.mainproject.exception.ExceptionCode;
import com.newyear.mainproject.expense.dto.ExpenseDto;
import com.newyear.mainproject.expense.entity.Expenses;
import com.newyear.mainproject.expense.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.Optional;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
@Validated
public class ExpenseController {

    private final ExpenseRepository expenseRepository;

    @PatchMapping("/edit/{expense-id}")
    public ResponseEntity patchExpense(@PathVariable("expense-id") @Positive long expenseId,
                                       @RequestBody @Valid ExpenseDto patchDto) {
        Expenses expense = expenseRepository.findById(expenseId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.EXPENSE_NOT_FOUND));

        Optional.ofNullable(patchDto.getItem())
                .ifPresent(expense::setItem);
        Optional.of(patchDto.getPrice())
                .ifPresent(expense::setPrice);
        expenseRepository.save(expense);

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("{expense-id}")
    public ResponseEntity deleteExpense(@PathVariable("expense-id") @Positive long expenseId) {
        Expenses expense = expenseRepository.findById(expenseId).orElseThrow(() -> new BusinessLogicException(ExceptionCode.EXPENSE_NOT_FOUND));
        expenseRepository.delete(expense);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
