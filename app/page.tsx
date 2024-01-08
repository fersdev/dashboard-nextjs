"use client";
import { AreaChart } from "./components/charts/Area";
import { VerticalBar } from "./components/charts/VerticalBar";
import { PieChart } from "./components/charts/Pie";
import { TableComponent } from "./components/tables/Table";
import { HorizontalBar } from "./components/charts/HorizontalBar";
import { DoughnutChart } from "./components/charts/Doughnut";
import { StatsComponent } from "./components/stats/Stats";

export default function Home() {
  return (
    <div className="container m-auto grid grid-cols-8 gap-4 grid-rows-16 p-5">
      <div className="col-span-full">
        <h1>NAVBAR</h1>
      </div>
      <div className="rounded bg-white sm:col-span-2 col-span-4 flex flex-col items-center justify-center p-4">
        <StatsComponent statNumber={12} statText={"representantes"} />
      </div>
      <div className="rounded bg-white sm:col-span-2 col-span-4 flex flex-col items-center justify-center p-4">
        <StatsComponent statNumber={89} statText={"milhões faturados"} />
      </div>
      <div className="rounded bg-white sm:col-span-2 col-span-4 flex flex-col items-center justify-center p-4">
        <StatsComponent statNumber={53} statText={"cidades atendidas"} />
      </div>
      <div className="rounded bg-white sm:col-span-2 col-span-4 flex flex-col items-center justify-center p-4">
        <StatsComponent statNumber={353} statText={"pedidos"} />
      </div>
      <div className="rounded bg-white col-span-full sm:col-span-2">
        <PieChart />
      </div>
      <div className="rounded bg-white col-span-full sm:col-span-4">
        <VerticalBar />
      </div>
      <div className="rounded  bg-white col-span-full sm:col-span-2">
        <DoughnutChart />
      </div>
      <div className="rounded  bg-white  col-span-full sm:col-span-4">
        <AreaChart />
      </div>
      <div className="rounded bg-white col-span-full sm:col-span-4">
        <HorizontalBar />
      </div>
      <div className="rounded  bg-white col-span-full">
        <TableComponent />
      </div>
      <div className="rounded col-span-full">
        <h1>FOOTER</h1>
      </div>
    </div>
  );
}
