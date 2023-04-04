import React from "react";
import ExpenseItem from "./ExpenseItem";

export default function Expenses(props) {
  
  console.log(props.data);
  props.data.sort(function (a, b) {
    var aTime = a.date.getTime(),
      bTime = a.date.getTime();
    return bTime - aTime;
  })

  function sendDeletedItem(item){
    let newExpensesArray = props.data.filter((x) => x.id !== item.id)
    props.sendNewExpensesArray(newExpensesArray);
  }



  if(props.selectedYear === "All Time") {
    return (
      <div className="expenseItemsGroup">
        {props.data.map((expense) => {
          return (
            <div key={expense.id}>
              <ExpenseItem data={expense} currency={props.currency} sendDeletedItem={sendDeletedItem} itemEdit={props.itemEdit}/>
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
              <ExpenseItem data={expense} currency={props.currency} sendDeletedItem={sendDeletedItem} itemEdit={props.itemEdit}/>
            </div>
          );
        })}
      </div>
    )
  }
}
