import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, PolarArea, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function Dashboard() {
  const toys = useSelector((storeState) => storeState.toyModule.toys);
  // Populate users array

  let counter = [];
  const labelPrice = toys.reduce((acc, curr) => {
    curr.labels.map((label) => {
      acc[label] = label in acc ? acc[label] + curr.price : curr.price;
      counter[label] = label in counter ? counter[label] + 1 : 1;
    });
    return acc;
  }, []);
  for (let key in labelPrice) {
    labelPrice[key] = labelPrice[key] / counter[key];
  }

  const labels = Object.keys(labelPrice);

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: Object.values(labelPrice),
        backgroundColor: "rgba(255, 206, 86, 0.2)",
      },
    ],
  };

  return (
    <div style={{ width: "60%", margin: "auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
