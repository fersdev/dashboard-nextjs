import { promises as fs } from "fs";
import path from "path";
import Papa from "papaparse";

type Dataset = {
  Vendedor: string;
  DataVenda: string;
  Produto: string;
  TotalVenda: string;
  TotalRecebido: string;
};

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "../data/report.csv");
    const fileContents = await fs.readFile(filePath, "utf8");

    const parsePromise = new Promise((resolve, reject) => {
      Papa.parse(fileContents, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          resolve(results.data);
        },
        error: function (err: Error) {
          reject(err.message);
        },
      });
    });

    const data: Dataset[] = (await parsePromise) as Dataset[];

    const groupByPeriod = data.reduce(
      (acc: { [produto: string]: number }, item: Dataset) => {
        const parts = item.DataVenda.split("/");
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        const totalVenda = parseInt(item.TotalVenda, 10);
        const key = `${year}-${month}`;

        if (!acc[key]) {
          acc[key] = totalVenda;
        } else {
          acc[key] += totalVenda;
        }

        return acc;
      },
      {} as { [key: string]: number }
    );

    const keys = Object.keys(groupByPeriod);

    const values = Object.values(groupByPeriod);

    const PeriodGrouped = {
      labels: keys,
      values: values,
    };

    return Response.json(
      { PeriodGrouped },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      { error },
      {
        status: 500,
      }
    );
  }
}
