import React from "react";
import ExpenseDate from "./ExpenseDate";
import "../style/ExpenseItem.css";

export default function ExpenseItem(props) {
    console.log(props.data.date)
  return (
    <div className="expenseItem p-1 bg-gradient shadow-sm">
      <ExpenseDate date={props.data.date} />
      <div className="expenseItemDescription">
        <div className="expenseItemTitle ms-1 p-1 fs-4">{props.data.title}</div>
        <div className="expenseItemAmount me-4 fs-5 px-3 py-2 border border-2 border-light bg-dark bg-gradient shadow text-white">
          €{props.data.amount}
        </div>
      </div>
    </div>
  );
}