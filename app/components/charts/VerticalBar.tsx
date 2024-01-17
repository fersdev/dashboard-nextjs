import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalesAgents {
  Representante: string;
  Objetivo: number;
  Realizado: number;
}
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Objetivo / Realizado por Representante ( R$ )",
    },
  },
};

// const labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Objetivo",
//       data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//     },
//     {
//       label: "Realizado",
//       data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
//       backgroundColor: "rgba(53, 162, 235, 0.5)",
//     },
//   ],
// };

export function VerticalBar() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/readSalesAgentsCsv`)
      .then((response) => response.json())
      .then((response: { data: SalesAgents[] }) => {
        const data = response.data;
        const mappedData = {
          labels: data.map((item) => item.Representante),
          datasets: [
            {
              label: "Objetivo",
              data: data.map((item) => Number(item.Objetivo)),
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Realizado",
              data: data.map((item) => Number(item.Realizado)),
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        };
        setData(mappedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!data || !data.labels || !data.datasets) {
    return <div>Dados indisponíveis</div>;
  }

  return <Bar options={options} data={data} />;
}
