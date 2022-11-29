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
} from "chart.js";
import { faker } from "@faker-js/faker";

function ReportGraph({ report }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const labels = [
    "Nov 25",
    "Nov 26",
    "Nov 27",
    "Nov 28",
    "Nov 29",
    "Nov 30",
    "Dec 1",
  ];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "User 1",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "User 2",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "User 3",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
        borderColor: "rgb(0, 250, 154)",
        backgroundColor: "rgba(127, 249, 180, 0.8)",
      },
    ],
  };

  return (
    <div>
      <h1>Report Graph {report}</h1>
      {report === 1 && <p>Unique API users over a period of time</p>}
      {report === 2 && <p>Top API users over period of time</p>}
      {report === 3 && <p>Top users for each Endpoint</p>}
      <Line options={options} data={data} />
    </div>
  );
}

export default ReportGraph;
