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
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: props.value,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
  return (
    <div>
      <Pie data={data} />
    </div>
  );
};
export default renderPieChart;
