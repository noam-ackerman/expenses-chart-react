import React from "react";
import ExpenseItem from "./ExpenseItem";

export default function Expenses(props) {
  props.data.sort(function (a, b) {
    var aTime = new Date(a.date).getTime(),
      bTime = new Date(b.date).getTime();
    return bTime - aTime;
  });

  return (
    <div className="expenseItemsGroup">
      {props.selectedYear === "All Time"
        ? props.data.map((expense) => {
            return (
              <div key={expense.id}>
                <ExpenseItem
                  data={expense}
                  currency={props.currency}
                  sendDeletedItem={props.sendDeletedItem}
                  itemEdit={props.itemEdit}
                />
              </div>
            );
          })
        : props.data
            .filter((expense) => {
              return (
                +props.selectedYear === new Date(expense.date).getFullYear()
              );
            })
            .map((expense) => {
              return (
                <div key={expense.id}>
                  <ExpenseItem
                    data={expense}
                    currency={props.currency}
                    sendDeletedItem={props.sendDeletedItem}
                    itemEdit={props.itemEdit}
                  />
                </div>
              );
            })}
    </div>
  );
}
