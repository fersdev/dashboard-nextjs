import { promises as fs } from "fs";
import path from "path";
import Papa from "papaparse";

type Dataset = {
  Vendedor: string;
  DataVenda: string;
  vendedor: string;
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

    const groupBySalesPerson = data.reduce(
      (acc: { [vendedor: string]: number }, item: Dataset) => {
        const vendedor = item.Vendedor;
        const totalVenda = parseFloat(item.TotalVenda);

        acc[vendedor] = (acc[vendedor] || 0) + totalVenda;

        return acc;
      },
      {} as { [vendedor: string]: number }
    );

    const keys = Object.keys(groupBySalesPerson);

    const values = Object.values(groupBySalesPerson);

    const SalesPersonGrouped = {
      labels: keys,
      values: values,
    };

    return Response.json(
      { SalesPersonGrouped },
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
