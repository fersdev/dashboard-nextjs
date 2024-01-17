"use client";
import { useState, useEffect } from "react";
import { AreaChart } from "./components/charts/Area";
import { VerticalBar } from "./components/charts/VerticalBar";
import { PieChart } from "./components/charts/Pie";
import { TableComponent } from "./components/tables/Table";
import { HorizontalBar } from "./components/charts/HorizontalBar";
import { StatsComponent } from "./components/stats/Stats";

type Dataset = {
  data: {
    Vendedor: string;
    DataVenda: string;
    Produto: string;
    TotalVenda: string;
    TotalRecebido: string;
  }[];
  productsQuant: string;
  orderQuant: string;
  grossAmount: string;
  netAmount: string;
};

export default function Home() {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // fetch(`${process.env..NEXT_PUBLIC_API_URL}/api/readCsv`)
    fetch(`http://localhost:3000/api/readReportCsv`)
      .then((response) => response.json())
      .then((json) => setDataset(json.dataset))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  let grossAmount = dataset?.grossAmount ? parseFloat(dataset.grossAmount) : 0;
  let formattedGrossAmount = grossAmount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  let netAmount = dataset?.netAmount ? parseFloat(dataset.netAmount) : 0;
  let formattedNetAmount = netAmount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="container m-auto grid grid-cols-8 gap-4 grid-rows-16 p-5">
      <div className="col-span-full">
        <h1>DASHBOARD DE VENDAS</h1>
      </div>
      <div className="rounded bg-white sm:col-span-2 col-span-4 flex flex-col items-center justify-center p-4">
        <StatsComponent
          statNumber={dataset?.productsQuant}
          statText={"produtos"}
        />
      </div>
      <div className="rounded bg-white sm:col-span-2 col-span-4 flex flex-col items-center justify-center p-4">
        <StatsComponent statNumber={dataset?.orderQuant} statText={"pedidos"} />
      </div>
      <div className="rounded bg-white sm:col-span-2 col-span-4 flex flex-col items-center justify-center p-4">
        <StatsComponent
          statNumber={formattedGrossAmount}
          statText={"total vendido"}
        />
      </div>
      <div className="rounded bg-white sm:col-span-2 col-span-4 flex flex-col items-center justify-center p-4">
        <StatsComponent
          statNumber={formattedNetAmount}
          statText={"total recebido"}
        />
      </div>
      <div className="rounded bg-white col-span-full sm:col-span-3">
        <PieChart />
      </div>
      <div className="rounded bg-white col-span-full sm:col-span-5">
        <AreaChart />
      </div>
      <div className="rounded  bg-white  col-span-full sm:col-span-4">
        <VerticalBar />
      </div>
      <div className="rounded bg-white col-span-full sm:col-span-4">
        <HorizontalBar />
      </div>
      <div className="rounded  bg-white col-span-full">
        <TableComponent dataset={dataset ? dataset.data : []} />
      </div>
      <div className="rounded col-span-full">
        <h1></h1>
      </div>
    </div>
  );
}
