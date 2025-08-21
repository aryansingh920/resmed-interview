import { renderHook, act } from "@testing-library/react";
import { AppProvider } from "./AppProvider";
import { useApp } from "../hooks/useApp";

function wrapper({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}

describe("App context", () => {
  it("provides default state", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    expect(result.current.data).toBeDefined();
    expect(result.current.range).toBeDefined();
  });

  it("updates selected date", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => result.current.setSelectedDate?.("2025-08-05"));
    expect(result.current.selectedDate).toBe("2025-08-05");
  });

  it("updates range", () => {
    const { result } = renderHook(() => useApp(), { wrapper });
    act(() => result.current.setRange?.("7D"));
    expect(result.current.range).toBe("7D");
  });
});
