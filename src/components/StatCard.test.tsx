import { render, screen } from "@testing-library/react";
import StatCard from "./StatCard";

describe("StatCard", () => {
  it("renders title and value", () => {
    render(<StatCard label="Steps" value="8,500" delta={12} />);
    expect(screen.getByText("Steps")).toBeInTheDocument();
    expect(screen.getByText("8,500")).toBeInTheDocument();
    expect(screen.getByText("+12%")).toBeInTheDocument();
  });
});
