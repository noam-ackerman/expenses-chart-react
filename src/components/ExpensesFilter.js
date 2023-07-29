import React, { useRef } from "react";
import { useExpensesContext } from "../context/expensesContext";
import "../style/expensesFilter.css";

export default function ExpensesFilter() {
  const { years, selectedYear, setSelectedYear } = useExpensesContext();
  const selector = useRef();

  function handleYearChange() {
    setSelectedYear(selector.current.value);
  }

  React.useEffect(() => {
    if (selectedYear !== selector.current.value) {
      setSelectedYear(selector.current.value);
    }
  });

  return (
    <div className="filter-wrapper bg-gradient shadow-sm">
      <div className="filter-title text-white fs-6">FILTER BY YEAR</div>
      <select
        className="year-selector"
        ref={selector}
        value={selectedYear}
        onChange={handleYearChange}
      >
        <option>All Time</option>
        {years.map((year, index) => {
          return <option key={index}>{year}</option>;
        })}
      </select>
    </div>
  );
}
