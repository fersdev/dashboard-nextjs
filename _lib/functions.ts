const dataset = [
  {
    Vendedor: "João",
    IDVenda: "1",
    DataVenda: "01/01/2023",
    Produto: "Smartphone",
    Quantidade: "5",
    UnitPrice: " 2300 ",
    TotalVenda: " 11500 ",
    Comiss: "5",
    ValorComiss: " 575 ",
    TotalRecebido: " 10925 ",
  },
  {
    Vendedor: "Maria",
    IDVenda: "2",
    DataVenda: "02/01/2023",
    Produto: "Notebook",
    Quantidade: "2",
    UnitPrice: " 3200 ",
    TotalVenda: " 6400 ",
    Comiss: "7",
    ValorComiss: " 448 ",
    TotalRecebido: " 5952 ",
  },
  {
    Vendedor: "João",
    IDVenda: "3",
    DataVenda: "03/01/2023",
    Produto: "Tablet",
    Quantidade: "8",
    UnitPrice: " 1800 ",
    TotalVenda: " 14400 ",
    Comiss: "6",
    ValorComiss: " 864 ",
    TotalRecebido: " 13536 ",
  },
];

// // Obter o Total vendido por mês/ano.
// const groupedByYearAndMonth = dataset.reduce((acc, sale) => {
//   const parts = sale.DataVenda.split("/");
//   const day = parts[0];
//   const month = parts[1];
//   const year = parts[2];
//   const totalVenda = parseInt(sale.TotalVenda, 10);

//   const key = `${year}-${month}`;

//   if (!acc[key]) {
//     acc[key] = totalVenda;
//   } else {
//     acc[key] += totalVenda;
//   }

//   return acc;
// }, {} as Record<string, number>);

// console.log(groupedByYearAndMonth);

// // Obter o nome das chaves do objeto para utilizar como label dos gráficos.
// const keys = Object.keys(groupedByYearAndMonth);
// console.log(keys);

// // Obter os valores do objeto para utilizar como dataset dos gráficos.
// const values = Object.values(groupedByYearAndMonth);
// console.log(values);

import fetchData from "./fetchData";

fetchData("http://localhost:3000/api/readCsv")
  .then((dataset) => {
    const groupedByYearAndMonth = dataset.reduce((acc: any, sale: any) => {
      const parts = sale.DataVenda.split("/");
      const day = parts[0];
      const month = parts[1];
      const year = parts[2];
      const totalVenda = parseInt(sale.TotalVenda, 10);

      const key = `${year}-${month}`;

      if (!acc[key]) {
        acc[key] = totalVenda;
      } else {
        acc[key] += totalVenda;
      }

      return acc;
    }, {} as Record<string, number>);

    console.log(groupedByYearAndMonth);

    const keys = Object.keys(groupedByYearAndMonth);
    console.log(keys);

    const values = Object.values(groupedByYearAndMonth);
    console.log(values);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
