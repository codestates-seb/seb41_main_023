package com.newyear.mainproject.expense.mapper;

import com.newyear.mainproject.expense.dto.ExpenseDto;
import com.newyear.mainproject.expense.entity.Expenses;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ExpenseMapper {

    Expenses postDtoToExpenses(ExpenseDto.Post post);

    Expenses patchDtoToExpenses(ExpenseDto.Patch patch);

    default ExpenseDto.Response expensesToResponseDto(Expenses expenses) {
        if ( expenses == null ) {
            return null;
        }

        ExpenseDto.Response response = new ExpenseDto.Response();

        if ( expenses.getExpenseId() != null ) {
            response.setExpenseId( expenses.getExpenseId() );
        }
        response.setItem( expenses.getItem() );
        response.setPrice( expenses.getPrice() );
        if ( expenses.getCreatedAt() != null ) {
            response.setCreatedAt(expenses.getCreatedAt().toString().substring(0, 10));
        }
        return response;
    }
}
