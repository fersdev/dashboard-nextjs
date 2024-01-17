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

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

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

    const groupByProduct = data.reduce(
      (acc: { [produto: string]: number }, item: Dataset) => {
        const produto = item.Produto;
        const totalVenda = parseFloat(item.TotalRecebido);

        acc[produto] = (acc[produto] || 0) + totalVenda;

        return acc;
      },
      {} as { [produto: string]: number }
    );

    const keys = Object.keys(groupByProduct);

    const values = Object.values(groupByProduct);

    const backgroundColor = keys.map(() => getRandomColor());
    const borderColor = keys.map(() => getRandomColor());

    const ProductsGrouped = {
      labels: keys,
      values: values,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
    };

    return Response.json(
      { ProductsGrouped },
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
