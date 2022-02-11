import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useStore from "./store";

export default function AuthRoute() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
