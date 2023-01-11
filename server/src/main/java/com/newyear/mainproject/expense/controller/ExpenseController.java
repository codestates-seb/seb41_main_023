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

    @PostMapping("/budget/{budget-id}/places/{place-id}")
    public ResponseEntity postExpensePlace(@RequestBody @Valid ExpenseDto.Post post,
                                      @PathVariable("budget-id") long budgetId,
                                      @PathVariable("place-id") long placeId) {
        Expenses expense = expenseService.createExpensePlan(mapper.postDtoToExpenses(post), budgetId, placeId);
        return new ResponseEntity<>(mapper.expensesToPlaceResponseDto(expense), HttpStatus.OK);
    }

    @PostMapping("/budget/{budget-id}")
    public ResponseEntity postExpense(@RequestBody @Valid ExpenseDto.Post post,
                                      @PathVariable("budget-id") long budgetId) {
        Expenses expense = expenseService.createExpense(mapper.postDtoToExpenses(post), budgetId);
        return new ResponseEntity<>(mapper.expensesToResponseDto(expense), HttpStatus.OK);
    }
    @PatchMapping("/{expense-id}/places/{place-id}")
    public ResponseEntity patchExpensePlace(@PathVariable("expense-id") @Positive long expenseId,
                                       @PathVariable("place-id") long placeId,
                                       @RequestBody @Valid ExpenseDto.Patch patch) {
        patch.setExpenseId(expenseId);
        Expenses expense = expenseService.updateExpensePlan(mapper.patchDtoToExpenses(patch), placeId);
        return new ResponseEntity<>(mapper.expensesToPlaceResponseDto(expense), HttpStatus.OK);
    }

    @PatchMapping("/{expense-id}")
    public ResponseEntity patchExpense(@PathVariable("expense-id") @Positive long expenseId,
                                       @RequestBody @Valid ExpenseDto.Patch patch) {
        patch.setExpenseId(expenseId);
        Expenses expense = expenseService.updateExpense(mapper.patchDtoToExpenses(patch));
        return new ResponseEntity<>(mapper.expensesToResponseDto(expense), HttpStatus.OK);
    }

    @DeleteMapping("/{expense-id}/places/{place-id}")
    public ResponseEntity deleteExpensePlace(@PathVariable("expense-id") @Positive long expenseId,
                                            @PathVariable("place-id") long placeId) {
        expenseService.deleteExpensePlan(expenseId, placeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("{expense-id}")
    public ResponseEntity deleteExpense(@PathVariable("expense-id") @Positive long expenseId) {
        expenseService.deleteExpense(expenseId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
