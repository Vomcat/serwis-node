import React, { PureComponent } from "react";

import { Bar } from "react-chartjs-2";

const renderLineChart = (props) => {
  const data = {
    labels: props.mie,
    datasets: [
      {
        label: "Suma przychodu",
        backgroundColor: "rgba(0, 255, 255,0.2)",
        borderColor: "rgba(0, 255, 255,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(22, 196, 196,0.4)",
        hoverBorderColor: "rgba(22, 196, 196,1)",

        data: props.value,
      },
    ],
  };
  return (
    <div>
      <Bar
        data={data}
        width={70}
        height={200}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};
export default renderLineChart;
