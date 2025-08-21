import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { AppProvider } from "../context/AppProvider";
import { MemoryRouter } from "react-router-dom";

jest.mock("../charts/Sparkline", () => () => <div data-testid="sparkline" />);
jest.mock("../charts/WeeklyComboChart", () => () => (
  <div data-testid="weekly-combo" />
));

describe("Dashboard", () => {
  it("shows today cards and charts", () => {
    render(
      <AppProvider>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </AppProvider>
    );

    expect(screen.getByTestId("sparkline")).toBeInTheDocument();
    expect(screen.getByTestId("weekly-combo")).toBeInTheDocument();

    // If you display today’s stats:
    // expect(screen.getByText(/today/i)).toBeInTheDocument();
  });
});
