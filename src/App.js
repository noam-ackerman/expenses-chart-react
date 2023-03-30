import React, { useEffect } from "react";
import './style/App.css';
import Expenses from "./components/Expenses";
import NewExpense from "./components/NewExpense";
import ExpensesFilter from "./components/ExpensesFilter";

function App() {
  const [expenses, setExpenses] = React.useState([]);
  const [years, setYears] = React.useState([]);
  const [selectedYear, setSelectedYear] = React.useState("All Time");

  function handleAddExpense(newExpenseData) {
    setExpenses([...expenses, newExpenseData])
  }
  
  useEffect(() => {
    const yearsArray = []
    expenses.forEach((expense) => {
      const year = expense.date.getFullYear()
      if(!yearsArray.some(x => x === year)){
        yearsArray.push(year);
      }
    })
    setYears(yearsArray);
    console.log(expenses);
  },[expenses]);


  function expenseWasAdded(){
    setSelectedYear("All Time");
  }

  function SelectedYear(year) {
    setSelectedYear(year)
  }

  function sendNewExpensesArray(newExpensesArray){
    setExpenses(newExpensesArray);
  }

  function titleChanged(newTitle, id){
    const fixedExpenses = expenses.map(expense => 
      expense.id === id ? {...expense, title : `${newTitle}`} : {...expense}
    )
    setExpenses(fixedExpenses);
  }



   return (
    <div className="bg-gradient p-3">
      <img src="https://images.cooltext.com/5650973.png" alt="expenses-chart-title" className="title-image"/>
      <NewExpense onAddExpense={handleAddExpense} expenseWasAdded={expenseWasAdded}/>
      <ExpensesFilter years={years} sendSelectedYear={SelectedYear} selectedYear={selectedYear}/>
      <Expenses data={expenses} selectedYear={selectedYear} sendNewExpensesArray={sendNewExpensesArray} titleChanged={titleChanged}/>
    </div>
  );
}

export default App;
