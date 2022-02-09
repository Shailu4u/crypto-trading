import React from "react";
import { NavLink } from "react-router-dom";
import Login from "../Login/Login";

type Props = {};

export default function Header({}: Props) {
  return (
    <nav className="h-16 rounded border-b border-gray-200 dark:border-gray-600 bg-white px-2 py-2.5 dark:bg-gray-800 sm:px-4">
      <div className="container mx-auto flex h-full flex-wrap items-center justify-between">
        <a href="#" className="flex">
          <svg
            className="mr-3 h-10"
            viewBox="0 0 52 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.87695 53H28.7791C41.5357 53 51.877 42.7025 51.877 30H24.9748C12.2182 30 1.87695 40.2975 1.87695 53Z"
              fill="#76A9FA"
            ></path>
            <path
              d="M0.000409561 32.1646L0.000409561 66.4111C12.8618 66.4111 23.2881 55.9849 23.2881 43.1235L23.2881 8.87689C10.9966 8.98066 1.39567 19.5573 0.000409561 32.1646Z"
              fill="#A4CAFE"
            ></path>
            <path
              d="M50.877 5H23.9748C11.2182 5 0.876953 15.2975 0.876953 28H27.7791C40.5357 28 50.877 17.7025 50.877 5Z"
              fill="#1C64F2"
            ></path>
          </svg>
          <span className="self-center whitespace-nowrap text-lg font-semibold dark:text-white">
            COINMENA
          </span>
        </a>
        <div className="flex items-center justify-between">
          <div className="flex items-center md:order-2">
            <Login isLoggedIn={false} />
          </div>
          <div
            className="mr-6 hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
            id="mobile-menu-2"
          >
            <ul className="flex-end mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
              <li>
                <NavLink 
                  className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} 
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/trade" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                  Trade
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
