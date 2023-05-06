import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../style/NewExpenseForm.css";
import Calculator from "./Calculator";
import {CalculatorLogo} from "../Logos"



export default function NewExpenseForm(props) {
  const [calculatorMode, setcalculatorMode] = useState(false);
  let date, month, year;
  date = ("0" + (new Date().getDate())).slice(-2)
  month = ("0" + (new Date().getMonth() + 1)).slice(-2)
  year = new Date().getFullYear();
  const inputTitle = React.useRef();
  const inputAmount = React.useRef();
  const inputDate = React.useRef();

  React.useEffect(() => {
    calculatorMode ? document.querySelector("body").classList.add("modal-open") : document.querySelector("body").classList.remove("modal-open")
  }, [calculatorMode])

  React.useLayoutEffect(() => {
    inputDate.current.value = `${year}-${month}-${date}`;
  },[year, month, date])

  const currencies = ["€", "$",  "£", "₪"];
  function handleCurrencyChange(e) {
    props.sendCurrency(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newExpenseData = {
      title: inputTitle.current.value,
      amount: inputAmount.current.value,
      date: new Date(inputDate.current.value),
    };
    props.onSaveData(newExpenseData);
    inputTitle.current.value = "";
    inputAmount.current.value = "";
    inputDate.current.value = `${year}-${month}-${date}`;
  }

  function toggleCalculator(){
    setcalculatorMode(!calculatorMode);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="newExpenseInputs">
        <div className="newExpenseInput">
          <label className="text-white">Title</label>
          <input 
            type="text" 
            ref={inputTitle} 
            required/>
        </div>
        <div className="newExpenseInput">
          <label className="text-white">Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            ref={inputAmount}
            required
          />
        </div>
        <div className="newExpenseInput">
          <label className="text-white">Date</label>
          <input
            type="date"
            min="2022-01-01"
            ref={inputDate}
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
          className="submitBtn py-2 px-3 bg-dark bg-gradient text-white shadow"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}
