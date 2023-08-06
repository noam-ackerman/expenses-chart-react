import React from "react";
import { useExpensesContext } from "../context/expensesContext";
import ExpenseItem from "./ExpenseItem";

export default function Expenses() {
  const { expenses, selectedYear } = useExpensesContext();

  return (
    <div className="expenseItemsGroup">
      {selectedYear === "All Time"
        ? expenses.map((expense) => {
            return (
              <div key={expense.id}>
                <ExpenseItem data={expense} />
              </div>
            );
          })
        : expenses
            .filter((expense) => {
              return +selectedYear === new Date(expense.date).getFullYear();
            })
            .map((expense) => {
              return (
                <div key={expense.id}>
                  <ExpenseItem data={expense} />
                </div>
              );
            })}
    </div>
  );
}
