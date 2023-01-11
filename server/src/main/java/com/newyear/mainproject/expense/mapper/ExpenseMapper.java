package com.newyear.mainproject.expense.mapper;

import com.newyear.mainproject.expense.dto.ExpenseDto;
import com.newyear.mainproject.expense.entity.Expenses;
import com.newyear.mainproject.place.dto.PlaceDto;
import com.newyear.mainproject.place.entity.Place;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ExpenseMapper {

    Expenses postDtoToExpenses(ExpenseDto.Post post);

    Expenses patchDtoToExpenses(ExpenseDto.Patch patch);

    default ExpenseDto.Response expensesToResponseDto(Expenses expenses) {
        ExpenseDto.Response response = new ExpenseDto.Response();
        response.setExpenseId( expenses.getExpenseId() );
        response.setItem( expenses.getItem() );
        response.setPrice( expenses.getPrice() );
        response.setCategory(expenses.getCategory());
        response.setCreatedAt(expenses.getCreatedAt().toString().substring(0, 10));

        return response;
    }

    default ExpenseDto.PlaceResponse expensesToPlaceResponseDto(Expenses expenses){
        ExpenseDto.PlaceResponse response = new ExpenseDto.PlaceResponse();
        response.setExpenseId(expenses.getExpenseId());
        response.setItem(expenses.getItem());
        response.setPrice(expenses.getPrice());
        response.setCategory(expenses.getCategory());
        response.setCreatedAt(expenses.getCreatedAt().toString().substring(0, 10));
        response.setPlaces(placeToPlaceSimpleResponseDto(expenses.getPlace()));

        return response;
    }

    PlaceDto.SimpleResponse placeToPlaceSimpleResponseDto(Place place);

}
