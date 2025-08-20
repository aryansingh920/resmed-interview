import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useApp } from "../hooks/useApp";

type RangeChip = "7D" | "14D" | "30D" | "ALL";

export default function AppHeader() {
  const { range, setRange, theme, toggleTheme } = useApp();
  const Chip = ({ r }: { r: RangeChip }) => (
    <button
      className={`chip ${range === r ? "active" : ""}`}
      onClick={() => setRange(r)}
    >
      {r}
    </button>
  );
  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "active" : "";
  return (
    <header className="app-h">
      <Link to="/" className="brand">
        Steps Tracker
      </Link>
      <nav className="nav">
        <NavLink to="/" end className={navClass}>
          Dashboard
        </NavLink>
        <NavLink to="/log" className={navClass}>
          Daily Log
        </NavLink>
        <NavLink to="/trends" className={navClass}>
          Trends
        </NavLink>
        <NavLink to="/data" className={navClass}>
          Data
        </NavLink>
        <NavLink to="/about" className={navClass}>
          About
        </NavLink>
      </nav>
      <div className="grow" />
      <div className="chips">
        <Chip r="7D" /> <Chip r="14D" /> <Chip r="30D" /> <Chip r="ALL" />
      </div>
      <button className="theme" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === "light" ? "🌞" : "🌙"}
      </button>
    </header>
  );
}
