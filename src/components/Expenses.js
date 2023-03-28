import React from "react";
import ExpenseItem from "./ExpenseItem";

export default function Expenses(props) {
  return (
    <div className="expenseItemsGroup">
      {props.data.map((expense) => {
        return (
          <div key={expense.id}>
            <ExpenseItem data={expense} />
          </div>
        );
      })}
      ;
    </div>
  );
}
