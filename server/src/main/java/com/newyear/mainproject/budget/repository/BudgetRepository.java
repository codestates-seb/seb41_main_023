package com.newyear.mainproject.budget.repository;

import com.newyear.mainproject.budget.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
}
