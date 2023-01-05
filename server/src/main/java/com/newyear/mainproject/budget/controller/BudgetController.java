package com.newyear.mainproject.budget.controller;

import com.newyear.mainproject.budget.dto.BudgetDto;
import com.newyear.mainproject.budget.entity.Budget;
import com.newyear.mainproject.budget.mapper.BudgetMapper;
import com.newyear.mainproject.budget.service.BudgetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/budget")
@RequiredArgsConstructor
@Validated
public class BudgetController {

    private final BudgetMapper mapper;
    private final BudgetService budgetService;

    @PostMapping
    public ResponseEntity postBudget(@RequestBody @Valid BudgetDto.Post post) {
        budgetService.createBudget(mapper.postDtoToBudget(post));
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PatchMapping("/edit/{budget-id}")
    public ResponseEntity patchBudget(@PathVariable("budget-id") @Positive long budgetId,
                                      @RequestBody @Valid BudgetDto.Patch patch) {
        patch.setBudgetId(budgetId);
        budgetService.editBudget(mapper.patchDtoToBudget(patch));
        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("{budget-id}")
    public ResponseEntity deleteBudget(@PathVariable("budget-id") @Positive long budgetId) {
        budgetService.deleteBudget(budgetId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("{budget-id}")
    public ResponseEntity getBudget(@PathVariable("budget-id") long budgetId) {
        Budget budget = budgetService.findBudget(budgetId);
        return new ResponseEntity(mapper.budgetToResponseDto(budget), HttpStatus.OK);
    }
}
