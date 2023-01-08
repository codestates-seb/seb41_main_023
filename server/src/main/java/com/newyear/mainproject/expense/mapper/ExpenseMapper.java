package com.newyear.mainproject.expense.mapper;

import com.newyear.mainproject.expense.dto.ExpenseDto;
import com.newyear.mainproject.expense.entity.Expenses;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ExpenseMapper {

    Expenses postDtoToExpenses(ExpenseDto.Post post);

    Expenses patchDtoToExpenses(ExpenseDto.Patch patch);

    ExpenseDto.Response expensesToResponseDto(Expenses expenses);
}
