package com.newyear.mainproject.expense.repository;

import com.newyear.mainproject.expense.entity.Expenses;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseRepository extends JpaRepository<Expenses, Long> {
}
