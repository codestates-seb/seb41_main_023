package com.newyear.mainproject.expense.repository;

import com.newyear.mainproject.expense.entity.Expenses;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expenses, Long> {
    List<Expenses> findAllByPlacePlaceId(Long placeId);
}
