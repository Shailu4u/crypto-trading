import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

type Props = {
  cryptos: any[];
  onSelectionCrypto: (value: any) => void;
};

export default function Dropdown({ cryptos, onSelectionCrypto }: Props) {
  const [selected, setSelected] = useState(cryptos[0]);

  const onChange = (value: any) => {
    onSelectionCrypto(value);
    setSelected(value);
  };

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={onChange}>
        <div className="relative">
          <Listbox.Label>&nbsp;</Listbox.Label>
          <Listbox.Button className="relative w-full py-2.5 pl-3 pr-10 text-left bg-white text-gray-900 text-sm rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 sm:text-sm">
            <div
              className={`${
                selected ? "font-medium" : "font-normal"
              } flex items-center truncate`}
            >
              <img
                src={`https://messari.io/asset-images/${selected.id}/32.png?v=2`}
                className="h-32px w-32px"
                alt="icon"
              />
              <span className="ml-2 font-bold text-md">{selected.symbol}</span>
            </div>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {cryptos.map((crypto) => (
                <Listbox.Option
                  key={crypto.id}
                  className={({ active }) =>
                    `${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-2 pr-2`
                  }
                  value={crypto}
                >
                  {({ selected, active }) => (
                    <>
                      <div
                        className={`${
                          selected ? "font-medium" : "font-normal"
                        } flex items-center truncate`}
                      >
                        <img
                          src={`https://messari.io/asset-images/${crypto.id}/16.png?v=2`}
                          className="h-16px w-16px"
                          alt="icon"
                        />
                        <div className="flex flex-col ml-1">
                          <span className="font-semibold text-md">
                            {crypto.symbol}
                          </span>
                          <span className="text-sm">{crypto.name}</span>
                        </div>
                      </div>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
