import React, { useRef , useEffect} from "react";
import "../style/expensesFilter.css";


export default function ExpensesFilter(props) {
   const years = props.years;

   function handleYearChange(event) {
    props.sendSelectedYear(event.target.value);
   }

   const selector = useRef();

   useEffect(() => {
      let yearValue = selector.current.value;
      if(props.selectedYear !==  yearValue) {
        props.sendSelectedYear(yearValue)
      }
   })

   return (
    <div className="filter-wrapper bg-gradient shadow-sm">
        <div className="filter-title text-white fs-6">FILTER BY YEAR</div>
        <select className="year-selector" ref={selector} value={props.selectedYear} onChange={handleYearChange}>
            <option>All Time</option>
            {years.map((year, index) => {
                return <option key={index}>{year}</option>
            })}
        </select>
    </div>
   )

}