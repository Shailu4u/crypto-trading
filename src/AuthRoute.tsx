import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useStore from "./store";

type Props = {};

export default function AuthRoute({}: Props) {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
