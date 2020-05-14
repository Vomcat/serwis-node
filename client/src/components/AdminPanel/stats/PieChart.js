import React, { PureComponent } from "react";

import { Bar, Line, Pie } from "react-chartjs-2";
/* import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"; */

const renderPieChart = (props) => {
  const data = {
    labels: props.mie,
    labels: ["Gwarancja", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  return (
    <div>
      <h2>Line Example</h2>
      <Bar
        data={data}
        width={70}
        height={100}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
export default renderPieChart;
