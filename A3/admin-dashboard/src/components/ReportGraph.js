import React from "react";
import { Line, Bar } from "react-chartjs-2";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ErrorCard from "./ErrorCard";
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
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "User 2",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "User 3",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(0, 250, 154)",
        backgroundColor: "rgba(127, 249, 180, 0.8)",
      },
      {
        label: "User 4",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
      {
        label: "User 5",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
      {
        label: "User 6",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.8)",
      },
      {
        label: "User 7",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(255, 178, 102)",
        backgroundColor: "rgba(255, 178, 102, 0.8)",
      },
      {
        label: "User 8",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(178, 102, 255)",
        backgroundColor: "rgba(178, 102, 255, 0.8)",
      },
      {
        label: "User 9",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(255, 219, 77)",
        backgroundColor: "rgba(255, 219, 77, 0.8)",
      },
      {
        label: "User 10",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "User 11",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "User 12",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(0, 250, 154)",
        backgroundColor: "rgba(127, 249, 180, 0.8)",
      },
      {
        label: "User 13",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.8)",
      },
      {
        label: "User 14",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.8)",
      },
      {
        label: "User 15",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.8)",
      },
      {
        label: "User 16",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(255, 178, 102)",
        backgroundColor: "rgba(255, 178, 102, 0.8)",
      },
      {
        label: "User 17",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(178, 102, 255)",
        backgroundColor: "rgba(178, 102, 255, 0.8)",
      },
      {
        label: "User 18",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(255, 219, 77)",
        backgroundColor: "rgba(255, 219, 77, 0.8)",
      },
      {
        label: "User 19",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "User 20",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "User 21",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(0, 250, 154)",
        backgroundColor: "rgba(127, 249, 180, 0.8)",
      },
      {
        label: "User 22",
        data: labels.map(() => faker.datatype.number({ min: 0, max: 25 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.8)",
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
    "GET /pokemons",
    "GET /pokemons/:id",
    "GET /pokemonImage",
    "POST /pokemon",
    "DELETE /pokemon/:id",
    "PUT /pokemon/:id",
    "PATCH /pokemon/:id",
    "GET /report/:id",
  ];

  const data_top_users_each_endpoint = {
    labels: labels_bar,
    datasets: [
      {
        label: "admin 1",
        data: labels_bar.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "admin 2",
        data: labels_bar.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "admin 3",
        data: labels_bar.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: "rgb(53, 162, 235)",
      },
      {
        label: "admin 4",
        data: labels_bar.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: "rgb(255, 178, 102)",
      },
      {
        label: "admin 5",
        data: labels_bar.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: "rgb(178, 102, 255)",
      },
      {
        label: "admin 6",
        data: labels_bar.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: "rgb(255, 219, 77)",
      },
    ],
  };

  const options_4xx_errors_each_endpoint = {
    plugins: {
      title: {
        display: true,
        text: "4xx Errors By Endpoint",
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

  const labels_bar_4xx = [
    "GET /pokemons",
    "GET /pokemons/:id",
    "GET /pokemonImage/:id",
    "POST /pokemon",
    "DELETE /pokemon/:id",
    "PUT /pokemon/:id",
    "PATCH /pokemon/:id",
    "GET /report/:id",
  ];

  const data_4xx_errors_each_endpoint = {
    labels: labels_bar_4xx,
    datasets: [
      {
        label: "admin 1",
        data: labels_bar_4xx.map(() =>
          faker.datatype.number({ min: 0, max: 600 })
        ),
        backgroundColor: "rgb(255, 26, 26)",
      },
      {
        label: "admin 2",
        data: labels_bar_4xx.map(() =>
          faker.datatype.number({ min: 0, max: 600 })
        ),
        backgroundColor: "rgb(255, 51, 51)",
      },
      {
        label: "admin 3",
        data: labels_bar_4xx.map(() =>
          faker.datatype.number({ min: 0, max: 600 })
        ),
        backgroundColor: "rgb(255, 77, 77)",
      },
      {
        label: "admin 4",
        data: labels_bar_4xx.map(() =>
          faker.datatype.number({ min: 0, max: 600 })
        ),
        backgroundColor: "rgb(255, 102, 102)",
      },
      {
        label: "admin 5",
        data: labels_bar_4xx.map(() =>
          faker.datatype.number({ min: 0, max: 600 })
        ),
        backgroundColor: "rgb(255, 128, 128)",
      },
      {
        label: "admin 6",
        data: labels_bar_4xx.map(() =>
          faker.datatype.number({ min: 0, max: 600 })
        ),
        backgroundColor: "rgb(255, 153, 153)",
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
      {report === 4 && (
        <>
          <p>4xx Errors By Endpoint</p>
          <Bar
            options={options_4xx_errors_each_endpoint}
            data={data_4xx_errors_each_endpoint}
          />
        </>
      )}
      {report === 5 && (
        <>
          <p>Recent 4xx/5xx Errors</p>
          <ErrorCard />
        </>
      )}
      {report === 6 && (
        <>
          <p>Overview</p>
          <Container>
            <Row>
              <Col>
                <p>Unique API users over a period of time</p>
                <Line options={options} data={data_unique_api_users} />
              </Col>
              <Col>
                {" "}
                <p>Top API users over period of time</p>
                <Line options={options2} data={data} />
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Top users for each Endpoint</p>
                <Bar
                  options={options_top_users_each_endpoint}
                  data={data_top_users_each_endpoint}
                />
              </Col>
              <Col>
                <p>4xx Errors By Endpoint</p>
                <Bar
                  options={options_4xx_errors_each_endpoint}
                  data={data_4xx_errors_each_endpoint}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Recent 4xx/5xx Errors</p>
                <ErrorCard />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}

export default ReportGraph;
