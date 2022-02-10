import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import AuthRoute from "./AuthRoute";
import Header from "./components/Header/Header";
import Notification from "./components/Notification/Notification";
import Home from "./pages/Home";
import Trade from "./pages/Trade";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Header />
        <Notification />

        <main className="container mx-auto flex flex-1 overflow-y-auto py-4">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/trade" element={<AuthRoute />}>
              <Route index element={<Trade />} />
            </Route>
          </Routes>
        </main>
        <footer className="py-3 bg-gray-700 text-center text-white">
          Made with love. All rights reserved @copyright
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
