package com.newyear.mainproject.expense.controller;

import com.newyear.mainproject.expense.ExpenseService;
import com.newyear.mainproject.expense.mapper.ExpenseMapper;
import com.newyear.mainproject.expense.dto.ExpenseDto;
import com.newyear.mainproject.expense.entity.Expenses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/expenses")
@RequiredArgsConstructor
@Validated
public class ExpenseController {

    private final ExpenseMapper mapper;
    private final ExpenseService expenseService;

    @PostMapping(value = {"/budget/{budget-id}", "/budget/{budget-id}/places/{place-id}"})
    public ResponseEntity postExpenseAndPlace(@RequestBody @Valid ExpenseDto.Post post,
                                      @PathVariable("budget-id") long budgetId,
                                      @PathVariable(required = false, value = "place-id") Long placeId) {
        Expenses expense = expenseService.createExpense(mapper.postDtoToExpenses(post), budgetId, placeId);
        return new ResponseEntity<>(mapper.expensesToPlaceResponseDto(expense), HttpStatus.OK);
    }

    @PatchMapping("/{expense-id}")
    public ResponseEntity patchExpenseAndPlace(@RequestBody @Valid ExpenseDto.Patch patch,
                                            @PathVariable("expense-id") @Positive long expenseId) {
        patch.setExpenseId(expenseId);
        Expenses expense = expenseService.updateExpense(mapper.patchDtoToExpenses(patch));
        return new ResponseEntity<>(mapper.expensesToPlaceResponseDto(expense), HttpStatus.OK);
    }

    @DeleteMapping(value = {"/{expense-id}"})
    public ResponseEntity deleteExpenseAndPlace(@PathVariable("expense-id") @Positive long expenseId) {
        expenseService.deleteExpense(expenseId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
