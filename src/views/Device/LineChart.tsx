import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ labels = [], realValues = [], values = [],max = 10, min = -10 }) => {
  // Define the data
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Dự đoán",
        // data: [150, 200, 180, 220, 240, 260],
        data: values,
        borderColor: "#f1c40f",
        backgroundColor: "#fbe58e",
        tension: 0.4, // Curvature of the line
        borderWidth: 1,
        pointRadius: 2, // Hides the dots
      },
      {
        label: "Ngưỡng cảnh báo",
        // data: [150, 200, 180, 220, 240, 260],
        data: values.map(i => 0.5),
        borderColor: "#dc3545",
        backgroundColor: "#e58d96",
        tension: 0.4, // Curvature of the line
        borderWidth: 0.5,
        pointRadius: 0, // Hides the dots
      },
      {
        label: "Giá trị thực",
        // data: [150, 200, 180, 220, 240, 260],
        data: realValues,
        borderColor: "#007bff",
        backgroundColor: "#74b7ff",
        tension: 0.4, // Curvature of the line
        borderWidth: 1,
        pointRadius: 3, // Hides the dots
      },
    ],
  };

  // Define options
  const options: ChartOptions<any> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Dự đoán độ rung trên trục X",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        max,
        min
      },
    },
  };

  return <Line data={data} options={options} style={{ maxHeight: "50vw" }} />;
};

export default LineChart;
