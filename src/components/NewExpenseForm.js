import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../style/NewExpenseForm.css";
import Calculator from "./Calculator";



export default function NewExpenseForm(props) {
  const [typedTitle, setTitle] = useState("");
  const [typedAmount, setAmount] = useState("");
  const [typedDate, setDate] = useState("");
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
    setDate("");
  }

  function toggleCalculator(){
    setcalculatorMode(!calculatorMode);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="newExpenseInputs">
        <div className="newExpenseInput">
          <label className="text-white">Title</label>
          <input type="text" value={typedTitle} onChange={handleTitleChange} onKeyDown={(e) =>  e.which === 13 ? e.preventDefault() : null}/>
        </div>
        <div className="newExpenseInput">
          <label className="text-white">Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={handleAmountChange}
            value={typedAmount}
            onKeyDown={(e) =>  e.which === 13 ? e.preventDefault() : null}
          />
        </div>
        <div className="newExpenseInput">
          <label className="text-white">Date</label>
          <input
            type="date"
            min="2022-01-01"
            onChange={handleDateChange}
            value={typedDate}
            onKeyDown={(e) =>  e.which === 13 ? e.preventDefault() : null}
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
        <svg className="calculatorBtn" onClick={toggleCalculator} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384">
          <defs>
          </defs>
          <path className="cls-1" d="M384,384H0V0H384V384Zm-48.01-192.07c0-45.64,.05-91.28-.02-136.92-.04-24.85-18.29-43.11-43.12-43.13-67.26-.05-134.52-.05-201.79,0-24.82,.02-43.11,18.31-43.12,43.12-.04,91.28-.04,182.56,0,273.83,.01,24.81,18.31,43.12,43.12,43.14,67.26,.05,134.52,.04,201.79-.03,3.59,0,7.27-.37,10.75-1.2,19.62-4.72,32.35-21.2,32.37-41.9,.05-45.64,.02-91.28,.02-136.92Z"/>
          <path d="M335.99,191.93c0,45.64,.03,91.28-.02,136.92-.02,20.69-12.75,37.18-32.37,41.9-3.48,.84-7.16,1.2-10.75,1.2-67.26,.07-134.52,.08-201.79,.03-24.81-.02-43.11-18.32-43.12-43.14-.04-91.28-.04-182.56,0-273.83,.01-24.82,18.3-43.11,43.12-43.12,67.26-.05,134.52-.05,201.79,0,24.83,.02,43.09,18.27,43.12,43.13,.06,45.64,.02,91.28,.02,136.92Zm-12,.09c0-45.26,0-90.52,0-135.78,0-19.8-12.53-32.36-32.27-32.36-66.51,0-133.01,0-199.52,0-19.74,0-32.26,12.57-32.26,32.36,0,90.4,0,180.79,0,271.19,0,20.05,12.47,32.56,32.45,32.56,66.38,0,132.76,0,199.15,0,19.99,0,32.46-12.5,32.46-32.56,0-45.14,0-90.27,0-135.41Z"/>
          <path className="cls-1" d="M323.99,192.02c0,45.14,0,90.27,0,135.41,0,20.06-12.46,32.56-32.46,32.56-66.38,0-132.76,0-199.15,0-19.99,0-32.45-12.51-32.45-32.56,0-90.4,0-180.79,0-271.19,0-19.8,12.52-32.36,32.26-32.36,66.51,0,133.01,0,199.52,0,19.74,0,32.27,12.56,32.27,32.36,0,45.26,0,90.52,0,135.78ZM191.78,119.91c33.5,0,67,0,100.5,0,12.27,0,19.69-7.35,19.7-19.52,.02-15,.02-30,0-45-.02-12.16-7.44-19.5-19.72-19.5-66.87,0-133.75,0-200.62,0-12.4,0-19.7,7.37-19.71,19.89-.01,14.63,0,29.25,0,43.88,0,13.03,7.16,20.25,20.1,20.26,33.25,0,66.5,0,99.75,0Zm120.21,162.05c0-15.62,.03-31.25,0-46.87-.03-11.52-7.54-19.1-18.94-19.14-11.37-.04-22.75-.04-34.12,0-11.24,.04-18.92,7.6-18.93,18.76-.04,31.5-.04,63,0,94.49,.01,11.17,7.68,18.73,18.93,18.77,11,.04,22,.02,32.99,0,12.78,0,20.06-7.22,20.07-19.9,.01-15.37,0-30.75,0-46.12ZM108.09,143.92c-5.87,0-11.75-.04-17.62,0-10.75,.09-18.43,7.7-18.53,18.41-.07,7.62-.05,15.25,0,22.87,.07,10.98,7.67,18.66,18.6,18.72,11.62,.06,23.24,.07,34.86,0,10.77-.06,18.42-7.68,18.53-18.41,.07-7.75,.08-15.5,0-23.24-.11-10.53-7.75-18.21-18.22-18.34-5.87-.07-11.74-.01-17.62-.01Zm83.81,60.01c6.12,0,12.25,.11,18.37-.02,9.83-.21,17.49-7.88,17.66-17.74,.14-8.12,.13-16.25,0-24.37-.15-10.05-7.87-17.75-17.93-17.85-11.99-.11-23.99-.11-35.98,0-10.26,.09-17.93,7.83-18.05,18.12-.09,7.87-.09,15.75,0,23.62,.11,10.48,7.8,18.12,18.31,18.25,5.87,.07,11.74,.01,17.62,0Zm83.88,0c5.87,0,11.75,.04,17.62,0,10.79-.1,18.46-7.67,18.57-18.38,.08-7.75,.08-15.5,0-23.24-.11-10.71-7.78-18.32-18.56-18.38-11.62-.06-23.24-.06-34.86,0-10.76,.06-18.47,7.69-18.57,18.37-.07,7.75-.07,15.5,0,23.24,.1,10.69,7.79,18.29,18.56,18.39,5.75,.05,11.49,0,17.24,0Zm-167.9,12.01c-5.87,0-11.75-.05-17.62,.01-10.51,.11-18.21,7.75-18.32,18.24-.08,7.75-.07,15.5,0,23.24,.09,10.74,7.71,18.44,18.43,18.51,11.74,.08,23.49,.08,35.23,0,10.53-.08,18.2-7.74,18.32-18.23,.09-7.87,.09-15.75,0-23.62-.13-10.3-7.79-17.98-18.04-18.13-6-.09-11.99-.02-17.99-.02Zm84.02,0c-5.87,0-11.75-.05-17.62,.01-10.51,.11-18.21,7.75-18.33,18.23-.08,7.75-.07,15.5,0,23.24,.08,10.75,7.71,18.44,18.42,18.51,11.74,.08,23.49,.08,35.23,0,10.53-.08,18.2-7.73,18.32-18.23,.09-7.87,.09-15.75,0-23.62-.13-10.3-7.79-17.98-18.04-18.13-6-.09-11.99-.02-17.99-.02Zm-84.16,132.04c5.87,0,11.75,.04,17.62,0,10.79-.1,18.46-7.67,18.56-18.38,.08-7.75,.08-15.5,0-23.24-.11-10.71-7.78-18.32-18.56-18.37-11.62-.06-23.24-.06-34.86,0-10.76,.06-18.47,7.69-18.56,18.37-.07,7.75-.07,15.5,0,23.24,.1,10.69,7.79,18.28,18.56,18.38,5.75,.05,11.49,0,17.24,0Zm84.25,0c5.87,0,11.75,.06,17.62-.01,10.53-.12,18.21-7.73,18.33-18.23,.09-7.75,.07-15.5,0-23.24-.09-10.76-7.71-18.45-18.42-18.51-11.74-.07-23.49-.08-35.23,0-10.52,.07-18.22,7.74-18.33,18.22-.08,7.87-.09,15.75,0,23.62,.12,10.29,7.78,17.98,18.04,18.14,6,.09,11.99,.02,17.99,.02Z"/>
          <path d="M191.78,119.91c-33.25,0-66.5,0-99.75,0-12.93,0-20.09-7.22-20.1-20.26,0-14.63-.01-29.25,0-43.88,.01-12.52,7.3-19.89,19.71-19.89,66.87,0,133.75,0,200.62,0,12.28,0,19.7,7.34,19.72,19.5,.02,15,.02,30,0,45-.02,12.17-7.43,19.52-19.7,19.52-33.5,.01-67,0-100.5,0Zm.18-72.03c-33.38,0-66.76,0-100.14,0-5.89,0-7.87,1.98-7.87,7.87-.02,14.75-.02,29.51,0,44.26,0,5.88,1.99,7.88,7.87,7.88,66.76,0,133.53,0,200.29,0,5.88,0,7.87-2,7.88-7.88,.02-14.5,0-29.01,0-43.51,0-6.89-1.74-8.62-8.63-8.62-33.13,0-66.26,0-99.39,0Z"/>
          <path d="M311.98,281.96c0,15.37,.01,30.75,0,46.12-.01,12.68-7.29,19.89-20.07,19.9-11,0-22,.04-32.99,0-11.25-.04-18.92-7.6-18.93-18.77-.04-31.5-.04-63,0-94.49,.01-11.16,7.69-18.73,18.93-18.76,11.37-.04,22.75-.04,34.12,0,11.4,.04,18.91,7.62,18.94,19.14,.04,15.62,0,31.25,0,46.87Zm-12,.25c0-15.5,.01-31.01,0-46.51,0-5.67-2.04-7.73-7.63-7.74-10.88-.02-21.75-.02-32.63,0-5.67,.01-7.74,2.03-7.74,7.62-.02,30.88-.01,61.77,0,92.65,0,5.66,2.04,7.74,7.62,7.75,10.75,.03,21.5,.02,32.26,0,6.16,0,8.12-1.93,8.13-8.01,.01-15.25,0-30.51,0-45.76Z"/>
          <path d="M108.09,143.92c5.87,0,11.75-.06,17.62,.01,10.47,.13,18.11,7.8,18.22,18.34,.08,7.75,.08,15.5,0,23.24-.1,10.73-7.75,18.35-18.53,18.41-11.62,.07-23.24,.07-34.86,0-10.94-.06-18.53-7.73-18.6-18.72-.05-7.62-.06-15.25,0-22.87,.1-10.71,7.77-18.32,18.53-18.41,5.87-.05,11.74,0,17.62,0Zm-.12,12c-5.63,0-11.25-.04-16.88,.01-4.93,.04-7.11,2.19-7.15,7.08-.05,7.25-.05,14.5,0,21.75,.03,4.92,2.19,7.13,7.08,7.15,11.25,.05,22.5,.04,33.75,0,4.92-.02,7.12-2.2,7.15-7.08,.05-7.25,.05-14.5,0-21.75-.03-4.92-2.2-7.1-7.08-7.15-5.62-.05-11.25-.01-16.88-.01Z"/>
          <path d="M191.9,203.93c-5.87,0-11.75,.06-17.62,0-10.52-.13-18.2-7.77-18.31-18.25-.08-7.87-.09-15.75,0-23.62,.12-10.28,7.79-18.03,18.05-18.12,11.99-.1,23.99-.11,35.98,0,10.06,.1,17.77,7.8,17.93,17.85,.13,8.12,.13,16.25,0,24.37-.17,9.86-7.83,17.52-17.66,17.74-6.12,.13-12.24,.02-18.37,.03Zm.35-12c5.5,0,11,.04,16.5-.01,4.94-.04,7.15-2.19,7.19-7.04,.06-7.25,.05-14.5,0-21.75-.03-4.95-2.18-7.17-7.04-7.19-11.25-.05-22.5-.04-33.75,0-4.95,.02-7.15,2.17-7.19,7.03-.06,7.25-.05,14.5,0,21.75,.03,5.07,2.21,7.17,7.41,7.2,5.63,.04,11.25,0,16.88,0Z"/>
          <path d="M275.78,203.94c-5.75,0-11.5,.04-17.24,0-10.77-.1-18.46-7.7-18.56-18.39-.07-7.75-.07-15.5,0-23.24,.1-10.68,7.8-18.31,18.57-18.37,11.62-.06,23.24-.06,34.86,0,10.78,.06,18.45,7.66,18.56,18.38,.08,7.75,.08,15.5,0,23.24-.11,10.71-7.78,18.28-18.57,18.38-5.87,.05-11.74,0-17.62,0Zm.53-48.01c-5.88,0-11.75-.06-17.63,.02-4.42,.06-6.65,2.31-6.7,6.76-.07,7.5-.08,15,0,22.5,.05,4.42,2.31,6.68,6.76,6.7,11.5,.06,23,.07,34.5,0,4.41-.03,6.66-2.32,6.7-6.77,.07-7.5,.08-15,0-22.5-.05-4.42-2.32-6.64-6.77-6.7-5.62-.07-11.25-.02-16.88-.02Z"/>
          <path d="M107.89,215.94c6,0,12-.07,17.99,.02,10.26,.15,17.92,7.83,18.04,18.13,.1,7.87,.09,15.75,0,23.62-.12,10.5-7.79,18.16-18.32,18.23-11.74,.09-23.49,.08-35.23,0-10.71-.07-18.34-7.77-18.43-18.51-.06-7.75-.08-15.5,0-23.24,.11-10.48,7.81-18.12,18.32-18.24,5.87-.06,11.74-.01,17.62-.01Zm-.21,48.01c5.75,0,11.5,.05,17.25-.01,4.7-.05,6.95-2.23,6.99-6.86,.07-7.38,.06-14.75,0-22.13-.04-4.71-2.23-6.96-6.86-6.99-11.38-.06-22.75-.05-34.13,0-4.71,.02-6.95,2.21-6.99,6.85-.07,7.38-.06,14.75,0,22.13,.04,4.84,2.26,6.96,7.23,7,5.5,.05,11,.01,16.5,0Z"/>
          <path d="M191.91,215.94c6,0,12-.07,17.99,.02,10.25,.15,17.91,7.83,18.04,18.13,.1,7.87,.09,15.75,0,23.62-.12,10.5-7.79,18.15-18.32,18.23-11.74,.08-23.49,.08-35.23,0-10.71-.07-18.34-7.77-18.42-18.51-.06-7.75-.08-15.5,0-23.24,.11-10.48,7.81-18.12,18.33-18.23,5.87-.06,11.74-.01,17.62-.01Zm0,12c-5.75,0-11.5-.06-17.25,.02-4.42,.06-6.65,2.31-6.69,6.76-.07,7.5-.08,15,0,22.5,.05,4.42,2.31,6.68,6.76,6.7,11.5,.06,23,.07,34.5,0,4.41-.03,6.66-2.32,6.7-6.77,.07-7.38,.06-14.75,0-22.13-.04-4.88-2.23-7.04-7.15-7.08-5.63-.05-11.25-.01-16.88,0Z"/>
          <path d="M107.75,347.99c-5.75,0-11.5,.04-17.24,0-10.77-.1-18.46-7.7-18.56-18.38-.07-7.75-.07-15.5,0-23.24,.1-10.68,7.8-18.31,18.56-18.37,11.62-.06,23.24-.06,34.86,0,10.78,.06,18.45,7.66,18.56,18.37,.08,7.75,.08,15.5,0,23.24-.11,10.71-7.78,18.28-18.56,18.38-5.87,.05-11.74,0-17.62,0Zm.18-48.01c-5.63,0-11.25-.04-16.88,.01-4.91,.05-7.07,2.2-7.11,7.12-.05,7.25-.05,14.5,0,21.75,.03,4.9,2.21,7.09,7.11,7.11,11.25,.05,22.5,.05,33.75,0,4.89-.02,7.08-2.22,7.11-7.12,.05-7.25,.05-14.5,0-21.75-.04-4.9-2.22-7.07-7.12-7.11-5.63-.05-11.25-.01-16.88-.01Z"/>
          <path d="M192,347.98c-6,0-12,.08-17.99-.02-10.26-.16-17.92-7.85-18.04-18.14-.09-7.87-.09-15.75,0-23.62,.11-10.48,7.81-18.15,18.33-18.22,11.74-.08,23.49-.07,35.23,0,10.71,.07,18.33,7.75,18.42,18.51,.07,7.75,.08,15.5,0,23.24-.12,10.5-7.79,18.11-18.33,18.23-5.87,.07-11.74,.01-17.62,.01Zm-.17-12c5.75,0,11.5,.05,17.25-.02,4.48-.05,6.8-2.26,6.85-6.62,.09-7.63,.09-15.25,0-22.88-.05-4.18-2.37-6.45-6.6-6.47-11.63-.07-23.25-.07-34.88,0-4.19,.03-6.43,2.35-6.47,6.6-.08,7.5-.07,15,0,22.5,.04,4.64,2.28,6.81,6.98,6.86,5.62,.06,11.25,.01,16.88,.01Z"/>
          <path className="cls-1" d="M191.95,47.88c33.13,0,66.26,0,99.39,0,6.89,0,8.63,1.74,8.63,8.62,0,14.5,.01,29.01,0,43.51,0,5.88-2,7.88-7.88,7.88-66.76,0-133.53,0-200.29,0-5.88,0-7.87-2-7.87-7.88-.02-14.75-.02-29.51,0-44.26,0-5.89,1.98-7.87,7.87-7.87,33.38-.01,66.76,0,100.14,0Zm101.99,30.07c0-2.37,.11-4.75-.02-7.12-.52-9.52-8.53-17-18.07-16.95-9.52,.05-17.48,7.65-17.83,17.19-.17,4.61-.19,9.25,.02,13.86,.42,9.35,8.33,16.84,17.68,16.95,9.54,.12,17.62-7.31,18.2-16.82,.14-2.36,.02-4.74,.03-7.12Z"/>
          <path className="cls-1" d="M299.98,282.21c0,15.25,0,30.51,0,45.76,0,6.08-1.96,8-8.13,8.01-10.75,.01-21.5,.02-32.26,0-5.58-.01-7.62-2.09-7.62-7.75-.01-30.88-.01-61.77,0-92.65,0-5.59,2.07-7.61,7.74-7.62,10.88-.02,21.75-.02,32.63,0,5.59,.01,7.62,2.08,7.63,7.74,.02,15.5,0,31.01,0,46.51Z"/>
          <path className="cls-1" d="M107.97,155.92c5.63,0,11.25-.04,16.88,.01,4.88,.05,7.05,2.22,7.08,7.15,.05,7.25,.05,14.5,0,21.75-.04,4.88-2.24,7.06-7.15,7.08-11.25,.04-22.5,.05-33.75,0-4.88-.02-7.04-2.23-7.08-7.15-.05-7.25-.05-14.5,0-21.75,.04-4.89,2.22-7.03,7.15-7.08,5.63-.05,11.25-.01,16.88-.01Z"/>
          <path className="cls-1" d="M192.25,191.93c-5.63,0-11.25,.03-16.88,0-5.2-.03-7.38-2.13-7.41-7.2-.05-7.25-.05-14.5,0-21.75,.04-4.87,2.23-7.02,7.19-7.03,11.25-.04,22.5-.05,33.75,0,4.86,.02,7.01,2.24,7.04,7.19,.05,7.25,.05,14.5,0,21.75-.04,4.86-2.25,7-7.19,7.04-5.5,.05-11,.01-16.5,.01Z"/>
          <path className="cls-1" d="M276.31,155.92c5.63,0,11.25-.06,16.88,.02,4.45,.06,6.72,2.28,6.77,6.7,.08,7.5,.07,15,0,22.5-.04,4.44-2.29,6.74-6.7,6.77-11.5,.07-23,.06-34.5,0-4.45-.02-6.71-2.28-6.76-6.7-.08-7.5-.07-15,0-22.5,.04-4.46,2.27-6.7,6.7-6.76,5.87-.08,11.75-.02,17.63-.02Z"/>
          <path className="cls-1" d="M107.68,263.96c-5.5,0-11,.04-16.5,0-4.97-.04-7.19-2.16-7.23-7-.06-7.38-.06-14.75,0-22.13,.04-4.64,2.28-6.83,6.99-6.85,11.38-.05,22.75-.05,34.13,0,4.63,.02,6.82,2.28,6.86,6.99,.06,7.38,.07,14.75,0,22.13-.04,4.63-2.3,6.81-6.99,6.86-5.75,.06-11.5,.01-17.25,.01Z"/>
          <path className="cls-1" d="M191.92,227.95c5.63,0,11.25-.04,16.88,.01,4.92,.04,7.12,2.2,7.15,7.08,.05,7.38,.07,14.75,0,22.13-.04,4.44-2.29,6.74-6.7,6.77-11.5,.07-23,.06-34.5,0-4.45-.02-6.72-2.28-6.76-6.7-.08-7.5-.07-15,0-22.5,.04-4.46,2.27-6.7,6.69-6.76,5.75-.08,11.5-.02,17.25-.02Z"/>
          <path className="cls-1" d="M107.93,299.97c5.63,0,11.25-.04,16.88,.01,4.9,.04,7.09,2.21,7.12,7.11,.05,7.25,.05,14.5,0,21.75-.04,4.9-2.22,7.1-7.11,7.12-11.25,.05-22.5,.05-33.75,0-4.9-.02-7.08-2.21-7.11-7.11-.05-7.25-.05-14.5,0-21.75,.03-4.91,2.2-7.07,7.11-7.12,5.63-.05,11.25-.01,16.88-.01Z"/>
          <path className="cls-1" d="M191.83,335.98c-5.63,0-11.25,.05-16.88-.01-4.7-.05-6.94-2.23-6.98-6.86-.07-7.5-.08-15,0-22.5,.05-4.25,2.29-6.57,6.47-6.6,11.63-.08,23.25-.07,34.88,0,4.23,.02,6.55,2.29,6.6,6.47,.1,7.63,.09,15.25,0,22.88-.05,4.36-2.37,6.56-6.85,6.62-5.75,.07-11.5,.02-17.25,.02Z"/>
          <path d="M293.94,77.96c0,2.37,.12,4.75-.02,7.12-.58,9.5-8.66,16.93-18.2,16.82-9.35-.11-17.26-7.6-17.68-16.95-.21-4.61-.18-9.25-.02-13.86,.35-9.54,8.32-17.13,17.83-17.19,9.54-.05,17.56,7.43,18.07,16.95,.13,2.37,.02,4.74,.02,7.12Zm-23.92-.21s-.01,0-.02,0c0,2.12-.12,4.26,.03,6.37,.24,3.34,2.68,5.67,5.79,5.75,3.1,.08,5.88-2.19,6.05-5.46,.22-4.36,.28-8.76-.02-13.11-.23-3.26-2.42-5.15-5.73-5.35-3.1-.19-5.76,2.16-6.06,5.43-.2,2.11-.04,4.25-.04,6.37Z"/>
          <path className="cls-1" d="M270.02,77.74c0-2.12-.16-4.26,.04-6.37,.3-3.27,2.96-5.62,6.06-5.43,3.31,.2,5.51,2.09,5.73,5.35,.3,4.35,.25,8.75,.02,13.11-.17,3.26-2.95,5.54-6.05,5.46-3.11-.08-5.55-2.41-5.79-5.75-.15-2.11-.03-4.25-.03-6.37,0,0,.01,0,.02,0Z"/>
        </svg>
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
