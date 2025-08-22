import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { AppProvider } from "../context/AppProvider";
// import { MemoryRouter } from "react-router-dom";


const mockNavigate = jest.fn();

jest.mock(
  "react-router-dom",
  () => ({
    useNavigate: () => mockNavigate,
  }),
  { virtual: true }
);

jest.mock("../charts/Sparkline", () => () => <div data-testid="sparkline" />);
jest.mock("../charts/WeeklyComboChart", () => () => (
  <div data-testid="weekly-combo" />
));

describe.only("Dashboard", () => {
  it("shows today cards and charts", () => {
    render(
      <AppProvider>
        {/* <MemoryRouter> */}
        <Dashboard />
        {/* </MemoryRouter> */}
      </AppProvider>
    );

    expect(screen.getByTestId("sparkline")).toBeInTheDocument();
    expect(screen.getByTestId("weekly-combo")).toBeInTheDocument();

    // Check StatCard shows today's steps
    expect(screen.getByText("8000")).toBeInTheDocument();

    // Depending how StatCard formats delta, check for string like "+16" or "16%"
    expect(
      screen.getByText((content) => content.includes("16"))
    ).toBeInTheDocument();

    // ChartCard is rendered
    expect(screen.getByText("Weekly Overview")).toBeInTheDocument();
    expect(screen.getByTestId("weekly-combo")).toBeInTheDocument();
  });
});


