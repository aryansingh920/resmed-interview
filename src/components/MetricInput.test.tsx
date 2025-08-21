import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MetricInput from "./MetricInput";
import { AppProvider } from "../context/AppProvider";

describe("MetricInput", () => {
  it("adds a new row on submit", async () => {
    render(
      <AppProvider>
        <MetricInput label={""} value={undefined} onChange={function (n: number | undefined): void {
                throw new Error("Function not implemented.");
            } } />
      </AppProvider>
    );

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/date/i), "2025-08-06");
    await user.type(screen.getByLabelText(/steps/i), "5600");
    await user.type(screen.getByLabelText(/calories/i), "410");
    await user.type(screen.getByLabelText(/duration/i), "33");

    await user.click(screen.getByRole("button", { name: /add/i }));

    // Expect confirmation, or that context got updated and UI reflects it.
    // If MetricInput shows a toast or clears inputs, assert that here.
    expect((screen.getByLabelText(/steps/i) as HTMLInputElement).value).toBe(
      ""
    );
  });
});
