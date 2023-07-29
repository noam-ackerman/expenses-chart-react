import React, { useContext } from "react";

const ExpensesContext = React.createContext();

const useExpensesContext = () => {
  return useContext(ExpensesContext);
};

const ExpensesContextProvider = ({ children }) => {
  const [expenses, setExpenses] = React.useState(
    localStorage.getItem("expenses")
      ? JSON.parse(localStorage.getItem("expenses")).map((expense) => ({
          ...expense,
          date: new Date(expense.date),
        }))
      : []
  );

  const [selectedCurrency, setCurrency] = React.useState(
    localStorage.getItem("currency")
      ? JSON.parse(localStorage.getItem("currency"))
      : "€"
  );
  const [selectedYear, setSelectedYear] = React.useState("All Time");
  const [years, setYears] = React.useState([]);
  const currencies = ["€", "$", "£", "₪"];

  function addExpense(newExpenseData) {
    setExpenses((prevExpenses) => [newExpenseData, ...prevExpenses]);
  }

  function deleteExpense(expenseId) {
    let newExpensesArray = expenses.filter((x) => x.id !== expenseId);
    setExpenses(newExpensesArray);
  }

  function editExpense(fixedExpenseData, expenseId) {
    const fixedExpenses = expenses.map((expense) =>
      expense.id === expenseId
        ? {
            ...fixedExpenseData,
            id: expenseId,
          }
        : { ...expense }
    );
    setExpenses(fixedExpenses);
  }

  React.useEffect(() => {
    const yearsArray = [];
    expenses.forEach((expense) => {
      const year = new Date(expense.date).getFullYear();
      if (!yearsArray.includes(year)) {
        yearsArray.push(year);
      }
    });
    setYears(yearsArray.sort());
    window.localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  React.useEffect(() => {
    window.localStorage.setItem("currency", JSON.stringify(selectedCurrency));
  }, [selectedCurrency]);

  let contextValue = {
    expenses,
    setExpenses,
    addExpense,
    deleteExpense,
    editExpense,
    currencies,
    selectedCurrency,
    setCurrency,
    selectedYear,
    setSelectedYear,
    years,
  };
  return (
    <ExpensesContext.Provider value={contextValue}>
      {children}
    </ExpensesContext.Provider>
  );
};

export { ExpensesContextProvider, useExpensesContext };
