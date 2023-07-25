import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export function LineChart(props) {
  const data = {
    labels: props.dates,
    datasets: [
      {
        label: "Dates",
        data: props.stockClose,
        //fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  return (
    <div className="line-chart">
      <div style={{ width: "1000px", height: "500px", margin: "0 auto" }}>
        <Line data={data} />
      </div>
    </div>
  );
}
