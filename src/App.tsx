import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { AppProvider } from "./context/AppContext";
import "./styles.css";

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="app-shell">
        <Header />
        <div className="body">
          <Sidebar />
          <Main />
        </div>
        <footer className="footer">© {new Date().getFullYear()} Starter</footer>
      </div>
    </AppProvider>
  );
};

export default App;
