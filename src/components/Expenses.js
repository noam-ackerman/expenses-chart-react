import React from "react";
import ExpenseItem from "./ExpenseItem";

export default function Expenses(props) {
  props.data.sort(function (a, b) {
    var aTime = a.date.getTime(),
      bTime = b.date.getTime();
    return bTime - aTime;
  })

  function sendDeletedItem(item){
    let newExpensesArray = props.data.filter((x) => x.id !== item.id)
    props.sendNewExpensesArray(newExpensesArray);
    console.log(newExpensesArray)
  }

  function titleChanged(newTitle, id) {
     props.titleChanged(newTitle, id);
  }


  if(props.selectedYear === "All Time") {
    return (
      <div className="expenseItemsGroup">
        {props.data.map((expense) => {
          return (
            <div key={expense.id}>
              <ExpenseItem data={expense} sendDeletedItem={sendDeletedItem} titleChanged={titleChanged}/>
            </div>
          );
        })}
      </div>
    )
  } else {
    return (
      <div className="expenseItemsGroup">
        {props.data.filter((expense) => {
          return +props.selectedYear === expense.date.getFullYear();
        }).map((expense) => {
          return (
            <div key={expense.id}>
              <ExpenseItem data={expense} sendDeletedItem={sendDeletedItem} titleChanged={titleChanged}/>
            </div>
          );
        })}
      </div>
    )
  }
}
