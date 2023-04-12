import React from "react";
import Chart from "./Chart.js";

export default function ExpensesChart(props){
    if(props.selectedYear === "All Time") {

            let expenses = props.expenses;
            let years = props.years;
            let chartDataPoints = []
            years.forEach((year) => {
                chartDataPoints.push({label: year, value:0}) 
            })
            expenses.forEach((expense) => {
                let date = new Date (expense.date);
                let expenseYear = date.getFullYear();
                let dataPoint = chartDataPoints.find((point) => +point.label === +expenseYear)
                if(dataPoint !== undefined) {
                dataPoint.value += +expense.amount;
                }
            })

            return <Chart class="years" dataPoints={chartDataPoints}/>

    } else {

        const chartDataPoints = [
            {label:"Jan", value:0},
            {label:"Feb", value:0},
            {label:"Mar", value:0},
            {label:"Apr", value:0},
            {label:"May", value:0},
            {label:"Jun", value:0},
            {label:"Jul", value:0},
            {label:"Aug", value:0},
            {label:"Sep", value:0},
            {label:"Oct", value:0},
            {label:"Nov", value:0},
            {label:"Dec", value:0},
        ]

        let filteredExpenses = props.expenses.filter((expense) => +(new Date(expense.date).getFullYear()) === +props.selectedYear)
        filteredExpenses.forEach((expense) => {
            const expenseMonth = new Date(expense.date).getMonth();
            chartDataPoints[expenseMonth].value += +expense.amount;
        })

        return <Chart class="months" dataPoints={chartDataPoints}/>
    }

}