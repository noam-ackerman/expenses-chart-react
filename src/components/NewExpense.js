import React from "react";
import NewExpenseForm from "./NewExpenseForm";
import "../style/NewExpenseForm.css";

export default function NewExpense(props) {
  function HandleSavedExpenseData(newExpenseData) {
    const expenseData = {
      ...newExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
  }
  return (
    <div className="newExpense bg-gradient shadow-sm">
     <NewExpenseForm onSaveData={HandleSavedExpenseData} expenseWasAdded={props.expenseWasAdded}/> 
    </div>
  );
}
