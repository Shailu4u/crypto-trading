import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Header />

        <main className="container mx-auto flex flex-1 overflow-y-auto py-4">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/trade" element={<div>Trade</div>} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <footer className="py-3 bg-gray-700 text-center text-white">
          CoinMena is Awesome 😎
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
