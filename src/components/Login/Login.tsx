import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import ProfileImg from "../../assets/img/profile-picture-3.jpg";
import LoginModal from "./LoginModal";
import useStore from "../../store";

export default function Login() {
  let [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    setIsLoggedIn: state.setIsLoggedIn,
  }));

  const onLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="mr-3 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mr-0"
        >
          Login
        </button>

        <LoginModal open={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex mr-3 items-center text-sm rounded-full md:mr-0">
        <span className="sr-only">Open user menu</span>
        <img className="w-11 h-11 rounded-full" src={ProfileImg} alt="user" />
        <ChevronDownIcon
          className="w-5 h-5 mr-1 text-gray-400 hover:text-gray-200"
          aria-hidden="true"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <div className="px-2 text-base font-bold color-blue-500">
              Shailendra Kumar
            </div>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? "bg-blue-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => onLogout()}
                  className={`${
                    active ? "bg-blue-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
