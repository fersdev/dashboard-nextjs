import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface PeriodGrouped {
  labels: string[];
  values: number[];
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Vendas por Período",
    },
  },
};

export function AreaChart() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState<{
    labels: string[];
    datasets: {
      fill: boolean;
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        fill: true,
        label: "",
        data: [],
        borderColor: "",
        backgroundColor: "",
      },
    ],
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/groupPeriod")
      .then((response) => response.json())
      .then((response: { PeriodGrouped: PeriodGrouped }) => {
        const data = response.PeriodGrouped;
        const mappedData = {
          labels: data.labels,
          datasets: [
            {
              fill: true,
              label: "Total Vendido ( R$ )",
              data: data.values,
              borderColor: "rgb(53, 162, 235)",
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

  return <Line options={options} data={data} />;
}
