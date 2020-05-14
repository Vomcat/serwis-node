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

const renderLineChart = (props) => {
  const data = {
    labels: props.mie,
    datasets: [
      {
        label: "Kwota przychodu",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",

        data: props.value,
      },
    ],
  };
  return (
    <div>
      <h2>Line Example</h2>
      <Line data={data} />
    </div>
  );
};
export default renderLineChart;
