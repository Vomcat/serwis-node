import React, { PureComponent } from "react";
import { Pie } from "react-chartjs-2";
const renderPieChart = (props) => {
  const data = {
    labels: props.label,
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