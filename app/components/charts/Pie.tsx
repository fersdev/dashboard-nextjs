import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
interface ProductsGrouped {
  labels: string[];
  values: number[];
  backgroundColor: string[];
  borderColor: string[];
}

export function PieChart() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState<{
    labels: string[];
    datasets: {
      data: number[];
      label: string;
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    }[];
  }>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/groupProducts")
      .then((response) => response.json())
      .then((response: { ProductsGrouped: ProductsGrouped }) => {
        const data = response.ProductsGrouped;
        const mappedData = {
          labels: data.labels,
          datasets: [
            {
              label: "Vendas em R$",
              data: data.values,
              backgroundColor: data.backgroundColor,
              borderColor: data.borderColor,
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

  return <Pie data={data} />;
}
