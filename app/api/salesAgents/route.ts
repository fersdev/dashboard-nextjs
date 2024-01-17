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
    const filePath = path.join(
      process.cwd(),
      "data",
      "../data/salesAgents.csv"
    );
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

    const data = await parsePromise;
    return Response.json(
      { data },
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
