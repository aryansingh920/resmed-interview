import React from "react";
import { useApp } from "../context/AppContext";

const Sidebar: React.FC = () => {
  const { sidebarOpen, theme, dispatch } = useApp();
  return (
    <aside className={`sidebar ${theme} ${sidebarOpen ? "open" : "closed"}`}>
      <nav>
        <a href="#dashboard" className="nav-link">
          Dashboard
        </a>
        <a href="#reports" className="nav-link">
          Reports
        </a>
        <a href="#settings" className="nav-link">
          Settings
        </a>
      </nav>
      <div className="sidebar-footer">
        <button
          className="link"
          onClick={() => dispatch({ type: "SET_USERNAME", payload: null })}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
