import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
    BarElement,
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
        text: "Unique API users over a period of time",
      },
    },
  };
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top API users over period of time",
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

  const data_unique_api_users = {
    labels,
    datasets: [
      {
        label: "api calls",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 250 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const options_top_users_each_endpoint = {
    plugins: {
      title: {
        display: true,
        text: "Top users for each Endpoint",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels_bar = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data_top_users_each_endpoint = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Dataset 3",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };

  return (
    <div>
      <h3>Report Graph {report}</h3>
      {report === 1 && (
        <>
          <p>Unique API users over a period of time</p>
          <Line options={options} data={data_unique_api_users} />
        </>
      )}
      {report === 2 && (
        <>
          <p>Top API users over period of time</p>
          <Line options={options2} data={data} />
        </>
      )}
      {report === 3 && (
        <>
          <p>Top users for each Endpoint</p>
          <Bar
            options={options_top_users_each_endpoint}
            data={data_top_users_each_endpoint}
          />
        </>
      )}
    </div>
  );
}

export default ReportGraph;
