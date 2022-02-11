import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Dropdown from "../components/Dropdown/Dropdown";
import useStore from "../store";

type FormData = {
  bit_amount: number | null;
  fiat_amount: number | null;
};

export default function Trade() {
  const { register, setValue, getValues, trigger, handleSubmit } =
    useForm<FormData>();

  const { cryptoAssets, getCryptoAssets } = useStore((state) => ({
    cryptoAssets: state.cryptoAssets,
    getCryptoAssets: state.getCryptoAssets,
  }));

  const [isSwapped, setIsSwapped] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoAssets[0] || {});

  useEffect(() => {
    register("bit_amount");
    register("fiat_amount");
  }, [register]);

  useEffect(() => {
    if (cryptoAssets.length === 0) {
      getCryptoAssets(1);
    }
  }, [getCryptoAssets, cryptoAssets]);

  const onSelectionCrypto = (value: any) => {
    setSelectedCrypto(value);
    const fiatAmount = getValues("fiat_amount");
    if (fiatAmount != null) {
      const bitValue =
        +fiatAmount / Number.parseFloat(value.metrics.market_data.price_usd);
      setValue("bit_amount", parseFloat(bitValue.toFixed(8)), {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });
      trigger("bit_amount");
    }
  };

  const onSubmit = () => {
    setIsSwapped(!isSwapped);
  };

  const onBitAmountChange = (event: any) => {
    const bitValue = event.target.value;
    if (bitValue != null) {
      const value =
        +bitValue *
        Number.parseFloat(selectedCrypto.metrics.market_data.price_usd);
      setValue("fiat_amount", parseFloat(value.toFixed(2)), {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });
    } else {
      setValue("fiat_amount", null, {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });
    }
    trigger("fiat_amount");
  };

  const onFiatAmountChange = (event: any) => {
    const fiatValue = event.target.value;
    if (fiatValue != null) {
      const value =
        +fiatValue /
        Number.parseFloat(selectedCrypto.metrics.market_data.price_usd);
      setValue("bit_amount", parseFloat(value.toFixed(8)), {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });
    } else {
      setValue("bit_amount", null, {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });
    }
    trigger("bit_amount");
  };

  function limitDecimalPlaces(event: any, count: number) {
    const value = event.target.value;
    if (value.indexOf(".") === -1) {
      return;
    }
    if (value.length - value.indexOf(".") > count) {
      setValue(
        event.target.name,
        parseFloat(value.substring(0, value.indexOf(".") + count + 1))
      );
      trigger(event.target.name);
    }
  }

  return (
    <div className="flex w-full justify-center">
      <div className="w-full h-min max-w-md p-5 border border-gray-300 rounded-md">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <div className="font-bold w-full text-lg">Swap</div>

            <div
              className={`flex ${isSwapped ? "order-2" : "order-1"} flex-row`}
            >
              <div className="relative mt-2 z-10 mb-6 w-full group">
                <label
                  htmlFor="bit_amount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Amount ({selectedCrypto?.symbol})
                </label>
                <input
                  type="number"
                  id="bit_amount"
                  min={0}
                  {...register("bit_amount")}
                  onChange={onBitAmountChange}
                  onInput={(event) => limitDecimalPlaces(event, 8)}
                  className="block p-4 pr-36 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />

                <div className="absolute z-10 top-1.5 right-px w-1/3">
                  <Dropdown
                    cryptos={cryptoAssets}
                    onSelectionCrypto={onSelectionCrypto}
                  />
                </div>
              </div>
            </div>

            <div
              className={`flex ${isSwapped ? "order-1" : "order-2"} flex-row`}
            >
              <div className="relative mt-2 z-0 mb-6 w-full group">
                <label
                  htmlFor="fiat_amount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Amount (Fiat)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id="fiat_amount"
                    {...register("fiat_amount")}
                    onChange={onFiatAmountChange}
                    min={0}
                    onInput={(event) => limitDecimalPlaces(event, 2)}
                    className="block p-4 pr-12 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

                  <div className="absolute z-10 font-bold text-lg right-2 top-3.5 text-green-500 pl-3 pointer-events-none">
                    USD
                  </div>
                </div>
              </div>
            </div>

            <div className="order-3 w-full mt-3">
              <button className="w-full p-4 font-bold border text-blue-500 border-blue-200 hover:bg-blue-500 hover:text-white rounded-lg">
                Quick Swap
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
