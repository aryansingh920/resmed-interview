import React from "react";
import { useApp } from "../context/AppContext";

const Main: React.FC = () => {
  const { theme, dispatch } = useApp();
  return (
    <main className={`main ${theme}`}>
      <section className="card">
        <h2>Content</h2>
        <p>
          This is your main area. Context is wired up. Try toggling theme or
          sidebar. You can also set the user name:
        </p>
        <div className="row">
          <input
            placeholder="Set user name"
            onChange={(e) =>
              dispatch({ type: "SET_USERNAME", payload: e.target.value })
            }
          />
        </div>
      </section>

      <section className="card">
        <h3>Next steps</h3>
        <ul>
          <li>Add routes (react-router) if needed.</li>
          <li>Fetch data or integrate your API layer.</li>
          <li>
            Extend context or split into multiple contexts (Auth/UI/Data).
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Main;
