import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/globals.css";
import { AppProvider } from "./context/AppProvider";
import AppHeader from "./components/AppHeader";
import Dashboard from "./pages/Dashboard";
import DailyLog from "./pages/DailyLog";
import Trends from "./pages/Trends";
import DataPage from "./pages/DataPage";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppHeader />
        <main className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/log" element={<DailyLog />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/data" element={<DataPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </AppProvider>
    </BrowserRouter>
  );
}
