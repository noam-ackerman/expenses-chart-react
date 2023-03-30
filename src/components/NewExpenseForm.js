import React, { useState } from "react";
import "../style/NewExpenseForm.css";

export default function NewExpenseForm(props) {
  const [typedTitle, setTitle] = useState("");
  const [typedAmount, setAmount] = useState("");
  const [typedDate, setDate] = useState("");
  const [typedCurrency, setCurreny] = useState("€");
  const [valid, setValid] = useState(false);

  React.useEffect(() => {
    if(!valid && typedTitle !== "" && typedAmount !== "" && typedDate !== "") {
      setValid(true);
    } else if (valid && (typedTitle === "" || typedAmount === "" || typedDate === "")) {
        setValid(false);
    }
  }, [valid, typedTitle, typedAmount, typedDate])

  const currencies = ["€", "$",  "£", "₪", "¥", "₺", "R", "฿"];

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }
  function handleCurrencyChange(e) {
    setCurreny(e.target.value);
  }

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  function handleDateChange(e) {
    setDate(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newExpenseData = {
      title: typedTitle,
      amount: typedAmount,
      date: new Date(typedDate),
      currency:typedCurrency,
    };
    props.onSaveData(newExpenseData);
    setTitle("");
    setAmount("");
    setDate("");
    props.expenseWasAdded();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="newExpenseInputs">
        <div className="newExpenseInput">
          <label className="text-white">Title</label>
          <input type="text" value={typedTitle} onChange={handleTitleChange} />
        </div>
        <div className="newExpenseInput">
          <label className="text-white">Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={handleAmountChange}
            value={typedAmount}
          />
        </div>
        <div className="newExpenseInput">
          <label className="text-white">Date</label>
          <input
            type="date"
            min="2022-01-01"
            max="2030-12-31"
            onChange={handleDateChange}
            value={typedDate}
          />
        </div>
        <div className="newExpenseInput">
          <label className="text-white">Currency</label>
          <select value={typedCurrency} onChange={handleCurrencyChange}>
             {currencies.map((currency, index) => {
              return (
                <option key={index}>{currency}</option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="newExpenseAction">
        <button
          type="submit"
          className={`submitBtn mt-2 py-2 px-3 bg-dark bg-gradient text-white shadow ${!valid ? "disabled" : ""}`}
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}
