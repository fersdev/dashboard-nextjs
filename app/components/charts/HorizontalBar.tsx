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

interface SalesPersonGrouped {
  labels: string[];
  values: number[];
}

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
      // position: "right" as const,
    },
    title: {
      display: true,
      text: "Vendas por Vendedor",
    },
  },
};

export function HorizontalBar() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${apiUrl}/api/groupSalesPerson`)
      .then((response) => response.json())
      .then((response: { SalesPersonGrouped: SalesPersonGrouped }) => {
        const data = response.SalesPersonGrouped;
        const mappedData = {
          labels: data.labels,
          datasets: [
            {
              label: "Total ( em R$)",
              data: data.values,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(255, 99, 132, 0.5)",
              borderWidth: 1,
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
