import React from "react";
import "../style/ExpenseItem.css";

export default function ExpenseDate(props) {
  const day = props.date.toLocaleString("en-US", { day: "2-digit" });
  const month = props.date.toLocaleString("en-US", { month: "long" });
  const year = props.date.getFullYear();

  return (
    <div className="expenseItemDate d-flex m-2 border border-2 border-light bg-dark bg-gradient text-white shadow">
      <div className="day">{day}</div>
      <div className="month">{month}</div>
      <div className="year">{year}</div>
    </div>
  );
}
