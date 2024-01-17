import { promises as fs } from "fs";
import path from "path";
import Papa from "papaparse";

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

    type Produtos = {
      Produto: string;
    };

    const data: any = await parsePromise;

    // Usa um conjunto (Set) para armazenar produtos distintos
    const produtosDistintos = new Set();

    // Adiciona cada produto ao conjunto
    data.forEach((venda: Produtos) => {
      const produto = venda.Produto;
      produtosDistintos.add(produto);
    });

    // Obtém o número total de produtos distintos
    const productsQuant = produtosDistintos.size;

    // 2) Total de Vendas (campo: TotalVenda)
    const grossAmount = data.reduce(
      (total: number, venda: any) =>
        total + parseFloat(venda.TotalVenda.trim()),
      0
    );

    // 3) Total de Pedidos (registros)
    const orderQuant = data.length;

    // 4) Total Líquido (campo: TotalRecebido)
    const netAmount = data.reduce(
      (total: number, venda: any) =>
        total + parseFloat(venda.TotalRecebido.trim()),
      0
    );

    console.log(productsQuant);
    console.log(grossAmount);
    console.log(orderQuant);
    console.log(netAmount);

    const dataset = {
      data,
      productsQuant: productsQuant,
      orderQuant: orderQuant,
      grossAmount: grossAmount,
      netAmount: netAmount,
    };

    return Response.json(
      { dataset },
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
