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
      const year = new Date(expense.date).getFullYear()
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

  function sendDeletedItem(item){
    let newExpensesArray = expenses.filter((x) => x.id !== item.id)
    setExpenses(newExpensesArray);
  }

  function itemEdit(data, id){
    let newTitle = data.title;
    let newAmount = data.amount.trim();
    let newDate = data.date;
    const fixedExpenses = expenses.map(expense => 
      expense.id === id  ? {title : `${newTitle}`, amount : `${newAmount}`, date:`${newDate}`, id : `${id}`} : {...expense}
    )
    setExpenses(fixedExpenses);
  }



   return (
    <div className="bg-gradient p-3">
      <img src="https://images.cooltext.com/5650973.png" alt="expenses-chart-title" className="title-image"/>
      <NewExpense onAddExpense={handleAddExpense} selectedCurrency={selectedCurrency} sendCurrency={sendCurrency}/>
      {expenses.length > 0 ? <ExpensesFilter years={years} sendSelectedYear={SelectedYear} selectedYear={selectedYear}/> : null }
      {expenses.length > 0 ? <ExpensesChart expenses={expenses} years={years} selectedYear={selectedYear}/> : null}
      <Expenses data={expenses} currency={selectedCurrency} selectedYear={selectedYear} sendDeletedItem={sendDeletedItem} itemEdit={itemEdit}/>
    </div>
  );
}

export default App;
