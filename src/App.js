import React from "react";
import './style/App.css';
import Expenses from "./components/Expenses";
import NewExpense from "./components/NewExpense";

function App() {
  let [expenses, setExpenses] = React.useState([]);

  function handleAddExpense(newExpenseData) {
    setExpenses([...expenses, newExpenseData])
  }


   return (
    <div className="bg-gradient p-3">
      <img src="https://images.cooltext.com/5650973.png" alt="expenses-chart-title" className="title-image"/>
      <NewExpense onAddExpense={handleAddExpense} />
      <Expenses data={expenses}/>
    </div>
  );
}

export default App;
