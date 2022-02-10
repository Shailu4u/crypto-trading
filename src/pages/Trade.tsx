import { useState } from "react";
import { Tab } from "@headlessui/react";

import Dropdown from "../components/Dropdown/Dropdown";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Trade() {
  let [categories] = useState(["Buy", "Sell"]);

  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-md px-2 py-12 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
            {categories.map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                    selected
                      ? "bg-white shadow"
                      : "text-black hover:text-blue-700"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                "bg-slate-50 border border-slate-100 rounded-sm p-3"
              )}
            >
              <div className="flex flex-row">
                <div className="relative mt-2 z-0 mb-6 w-1/2 group">
                  <input
                    type="number"
                    name="bit_amount"
                    id="bit_amount"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="bit_amount"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Amount (BTC)
                  </label>
                </div>
                <div className="w-1/2">
                  <Dropdown />
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                "bg-slate-50 border border-slate-100 rounded-sm p-3"
              )}
            >
              Content 2
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
