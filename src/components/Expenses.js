import React from "react";
import ExpenseItem from "./ExpenseItem";

export default function Expenses(props) {
  props.data.sort(function (a, b) {
    var aTime = a.date.getTime(),
      bTime = b.date.getTime();
    return bTime - aTime;
  })
  return (
    <div className="expenseItemsGroup">
      {props.data.map((expense) => {
        return (
          <div key={expense.id}>
            <ExpenseItem data={expense} />
          </div>
        );
      })}
    </div>
  );
}
