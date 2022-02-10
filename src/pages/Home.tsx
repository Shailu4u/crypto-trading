import React, { memo, useEffect, useState } from "react";
import useStore from "../store";
import { formatCash } from "../utils";

type HomeProps = {};

function Home({}: HomeProps) {
  const {
    currentPageNumber,
    prevPageNumber,
    cryptoAssets,
    getCryptoAssets,
    isCryptosLoading,
  } = useStore((state) => ({
    prevPageNumber: state.prevPageNumber,
    currentPageNumber: state.currentPageNumber,
    cryptoAssets: state.cryptoAssets,
    isCryptosLoading: state.isCryptosLoading,
    getCryptoAssets: state.getCryptoAssets,
  }));
  const [pageNum, setPageNumber] = useState(currentPageNumber);

  useEffect(() => {
    if (prevPageNumber !== pageNum) {
      getCryptoAssets(pageNum);
    }
  }, [getCryptoAssets, pageNum, prevPageNumber]);

  const onLoadMore = () => {
    if (!isCryptosLoading) {
      setPageNumber(pageNum + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col">
        <div
          className="overflow-x-auto sm:-mx-6 lg:-mx-8"
          style={{ height: "calc(100vh - 200px)" }}
        >
          <div className="inline-block py-2 min-w-full">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Rank
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      MarketCap
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoAssets.map((crypt) => (
                    <tr
                      key={crypt.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td className="py-4 px-6 text-sm text-center text-gray-500 whitespace-nowrap dark:text-gray-400">
                        {crypt.metrics.marketcap.rank}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        <div className="flex items-center">
                          <img
                            src={`https://messari.io/asset-images/${crypt.id}/32.png?v=2`}
                            className="h-32px w-32px"
                          />
                          <span className="ml-2">{crypt.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        ${crypt.metrics.market_data.price_usd.toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                        $
                        {formatCash(
                          crypt.metrics.marketcap.current_marketcap_usd
                        )}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                        <button
                          type="button"
                          className="p-2 border border-slate-100 rounded-md text-blue-600 bg-slate-50 dark:text-blue-500 hover:bg-sky-100"
                        >
                          Buy/Sell
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            disabled={isCryptosLoading}
            onClick={onLoadMore}
            className="py-2.5 px-5 mr-2 inline-flex items-center text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {isCryptosLoading && (
              <svg
                role="status"
                className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
            )}
            {isCryptosLoading ? (
              <span>Loading...</span>
            ) : (
              <span>Load more</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(Home);
