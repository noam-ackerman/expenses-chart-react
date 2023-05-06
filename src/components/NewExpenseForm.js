import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../style/NewExpenseForm.css";
import Calculator from "./Calculator";
import {CalculatorLogo} from "../Logos"



export default function NewExpenseForm(props) {
  const [typedTitle, setTitle] = useState("");
  const [typedAmount, setAmount] = useState("");
  let date, month, year;
    date = ("0" + (new Date().getDate())).slice(-2)
    month = ("0" + (new Date().getMonth() + 1)).slice(-2)
    year = new Date().getFullYear();
  const [typedDate, setDate] = useState(`${year}-${month}-${date}`);
  const [valid, setValid] = useState(false);
  const [calculatorMode, setcalculatorMode] = useState(false);

  React.useEffect(() => {
    if(!valid && typedTitle !== "" && typedAmount !== "" && typedDate !== "") {
      setValid(true);
    } else if (valid && (typedTitle === "" || typedAmount === "" || typedDate === "")) {
      setValid(false);
    }
  }, [valid, typedTitle, typedAmount, typedDate])

  React.useEffect(() => {
    calculatorMode ? document.querySelector("body").classList.add("modal-open") : document.querySelector("body").classList.remove("modal-open")
  }, [calculatorMode])


  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleAmountChange(e) {
    setAmount(e.target.value);
  }

  function handleDateChange(e) {
    setDate(e.target.value);
  }
  const currencies = ["€", "$",  "£", "₪"];
  function handleCurrencyChange(e) {
    props.sendCurrency(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newExpenseData = {
      title: typedTitle,
      amount: typedAmount,
      date: new Date(typedDate),
    };
    props.onSaveData(newExpenseData);
    setTitle("");
    setAmount("");
    setDate(`${year}-${month}-${date}`);
  }

  function toggleCalculator(){
    setcalculatorMode(!calculatorMode);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="newExpenseInputs">
        <div className="newExpenseInput">
          <label className="text-white">Title</label>
          <input type="text" value={typedTitle} onChange={handleTitleChange} required/>
        </div>
        <div className="newExpenseInput">
          <label className="text-white">Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={handleAmountChange}
            value={typedAmount}
            required
          />
        </div>
        <div className="newExpenseInput">
          <label className="text-white">Date</label>
          <input
            type="date"
            min="2022-01-01"
            onChange={handleDateChange}
            value={typedDate}
            required
          />
        </div>
        <div className="newExpenseInput">
          <label className="text-white">App Currency</label>
          <select value={props.selectedCurrency} onChange={handleCurrencyChange}>
             {currencies.map((currency, index) => {
              return (
                <option key={index}>{currency}</option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="newExpenseAction">
      {calculatorMode &&
         ReactDOM.createPortal(
         <Calculator toggleCalculator={toggleCalculator} calculatorMode={calculatorMode} hasError={false}/>,
         document.getElementById("modal-root")
         )
      }
        <div className="calculatorBtn" onClick={toggleCalculator}>
         <CalculatorLogo/>
        </div>
        <button
          type="submit"
          className={`submitBtn py-2 px-3 bg-dark bg-gradient text-white shadow ${!valid ? "disabled" : ""}`}
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}
