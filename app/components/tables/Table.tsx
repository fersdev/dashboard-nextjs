interface Dataset {
  Vendedor: string;
  DataVenda: string;
  Produto: string;
  TotalVenda: string;
  TotalRecebido: string;
}

export function TableComponent({ dataset }: { dataset: Dataset[] }) {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <h1 className="text-center font-bold text-lg">Últimos pedidos</h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Vendedor
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Data da Venda
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Produto
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Valor da Venda
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Valor Recebido
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(dataset) &&
                  dataset.map((item: Dataset, index: number) => (
                    <tr key={index} className="border-b dark:border-gray-700">
                      <td className="px-4 py-3">{item.Vendedor}</td>
                      <td className="px-4 py-3">{item.DataVenda}</td>
                      <td className="px-4 py-3">{item.Produto}</td>
                      <td className="px-4 py-3">
                        {parseFloat(item.TotalVenda).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        {parseFloat(item.TotalRecebido).toFixed(2)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
