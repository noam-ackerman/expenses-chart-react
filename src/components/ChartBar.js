import React from "react"
import "../style/Chart.css"

export default function ChartBar(props) {
    let barFillHeight = "0%"

    if(props.maxValue > 0) {
        barFillHeight = Math.round((props.value / props.maxValue) * 100) + "%";
    }

    return (
    <div className="chart-bar">
        <div className="chart-bar-inner">
            <div className="chart-bar-fill" style={{height:barFillHeight}}></div>
        </div>
        <div className="chart-bar-label mt-2 text-white">{props.label}</div>
    </div>
    )
}