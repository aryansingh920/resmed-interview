import { render, screen } from "@testing-library/react";
import App from "./App";
import { AppProvider } from "./context/AppProvider";
import { MemoryRouter } from "react-router-dom";

const renderApp = (initialEntries = ["/"]) =>
  render(
    <AppProvider>
      <MemoryRouter initialEntries={initialEntries}>
        <App />
      </MemoryRouter>
    </AppProvider>
  );

describe("App", () => {
  it("renders header", () => {
    renderApp();
    // Prefer byRole if you have headings with accessible names
    expect(
      screen.getByRole("heading", { name: /fitness steps tracker/i })
    ).toBeInTheDocument();
  });

  it("navigates to details page", () => {
    renderApp(["/details"]);
    // Adjust text to something that appears on /details
    expect(
      screen.getByRole("heading", { name: /details/i })
    ).toBeInTheDocument();
  });
});
