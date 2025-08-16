import React from "react";
import { useApp } from "../context/AppContext";

const Header: React.FC = () => {
  const { theme, userName, dispatch } = useApp();
  return (
    <header className={`header ${theme}`}>
      <div className="left">
        <button
          onClick={() => dispatch({ type: "TOGGLE_SIDEBAR" })}
          className="icon-btn"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <h1>Starter Layout</h1>
      </div>
      <div className="right">
        <span className="muted">Hi, {userName ?? "Guest"}</span>
        <button
          onClick={() => dispatch({ type: "TOGGLE_THEME" })}
          className="btn"
        >
          {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
    </header>
  );
};

export default Header;
