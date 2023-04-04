import React, {useEffect} from "react";
import './style/App.css';
import Expenses from "./components/Expenses";
import NewExpense from "./components/NewExpense";
import ExpensesFilter from "./components/ExpensesFilter";
import ExpensesChart from "./components/ExpensesChart"

function App() {
  const [expenses, setExpenses] = React.useState(
    localStorage.getItem("expenses") ? 
      JSON.parse(localStorage.getItem("expenses")).map((expense) => ({
        ...expense, date: new Date(expense.date)
      }))
    : 
     []
  );
  const [selectedCurrency, setCurreny] = React.useState(
    localStorage.getItem("currency") ? 
      JSON.parse(localStorage.getItem("currency"))
    :
      "€"
  );
  const [selectedYear, setSelectedYear] = React.useState("All Time");
  const [years, setYears] = React.useState([]);
  

  function handleAddExpense(newExpenseData) {
    setExpenses((prevExpenses) => [newExpenseData, ...prevExpenses])
  }

  function sendCurrency(currency){
    setCurreny(currency)
    window.localStorage.setItem("currency",JSON.stringify(currency))
  }

  
  useEffect(() => {
    const yearsArray = []
    expenses.forEach((expense) => {
      const year = expense.date.getFullYear()
      if(!yearsArray.includes(year)){
        yearsArray.push(year);
      }
    })
    setYears(yearsArray.sort());
    window.localStorage.setItem("expenses",JSON.stringify(expenses))
  },[expenses]);

  
  function SelectedYear(year) {
    setSelectedYear(year)
  }

  function sendNewExpensesArray(newExpensesArray){
    setExpenses(newExpensesArray);
  }

  function itemEdit(newTitle, newAmount, id){
    const fixedExpenses = expenses.map(expense => 
      expense.id === id  ? {...expense, title : `${newTitle}`, amount : `${newAmount}`} : {...expense}
    )
    setExpenses(fixedExpenses);
  }



   return (
    <div className="bg-gradient p-3">
      <img src="https://images.cooltext.com/5650973.png" alt="expenses-chart-title" className="title-image"/>
      <NewExpense onAddExpense={handleAddExpense} selectedCurrency={selectedCurrency} sendCurrency={sendCurrency}/>
      {expenses.length > 0 ? <ExpensesFilter years={years} sendSelectedYear={SelectedYear} selectedYear={selectedYear}/> : null }
      {expenses.length > 0 ? <ExpensesChart expenses={expenses} years={years} selectedYear={selectedYear}/> : null}
      <Expenses data={expenses} currency={selectedCurrency} selectedYear={selectedYear} sendNewExpensesArray={sendNewExpensesArray} itemEdit={itemEdit}/>
    </div>
  );
}

export default App;
