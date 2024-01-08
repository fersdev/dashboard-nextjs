export function TableComponent() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Brand
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-4 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple iMac 27&#34;
                  </th>
                  <td className="px-4 py-3">PC</td>
                  <td className="px-4 py-3">Apple</td>
                  <td className="px-4 py-3">300</td>
                  <td className="px-4 py-3">$2999</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple iMac 20&#34;
                  </th>
                  <td className="px-4 py-3">PC</td>
                  <td className="px-4 py-3">Apple</td>
                  <td className="px-4 py-3">200</td>
                  <td className="px-4 py-3">$1499</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple iPhone 14
                  </th>
                  <td className="px-4 py-3">Phone</td>
                  <td className="px-4 py-3">Apple</td>
                  <td className="px-4 py-3">1237</td>
                  <td className="px-4 py-3">$999</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple iPad Air
                  </th>
                  <td className="px-4 py-3">Tablet</td>
                  <td className="px-4 py-3">Apple</td>
                  <td className="px-4 py-3">4578</td>
                  <td className="px-4 py-3">$1199</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Xbox Series S
                  </th>
                  <td className="px-4 py-3">Gaming/Console</td>
                  <td className="px-4 py-3">Microsoft</td>
                  <td className="px-4 py-3">56</td>
                  <td className="px-4 py-3">$299</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    PlayStation 5
                  </th>
                  <td className="px-4 py-3">Gaming/Console</td>
                  <td className="px-4 py-3">Sony</td>
                  <td className="px-4 py-3">78</td>
                  <td className="px-4 py-3">$799</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Xbox Series X
                  </th>
                  <td className="px-4 py-3">Gaming/Console</td>
                  <td className="px-4 py-3">Microsoft</td>
                  <td className="px-4 py-3">200</td>
                  <td className="px-4 py-3">$699</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Apple Watch SE
                  </th>
                  <td className="px-4 py-3">Watch</td>
                  <td className="px-4 py-3">Apple</td>
                  <td className="px-4 py-3">657</td>
                  <td className="px-4 py-3">$399</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    NIKON D850
                  </th>
                  <td className="px-4 py-3">Photo</td>
                  <td className="px-4 py-3">Nikon</td>
                  <td className="px-4 py-3">465</td>
                  <td className="px-4 py-3">$599</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Monitor BenQ EX2710Q
                  </th>
                  <td className="px-4 py-3">TV/Monitor</td>
                  <td className="px-4 py-3">BenQ</td>
                  <td className="px-4 py-3">354</td>
                  <td className="px-4 py-3">$499</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
