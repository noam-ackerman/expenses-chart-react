import React from "react";
import ChartBar from "./ChartBar";
import "../style/Chart.css";

export default function Chart(props) {
  const dataPointValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  const totalMax = dataPointValues.reduce((a, b) => a + b, 0);

  return (
    <div className={`chart-wrapper bg-gradient shadow-sm ${props.class}`}>
      {props.dataPoints.map((dataPoint) => {
        return (
          <ChartBar
            key={dataPoint.label}
            label={dataPoint.label}
            value={dataPoint.value}
            maxValue={totalMax}
          />
        );
      })}
    </div>
  );
}
