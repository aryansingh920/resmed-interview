import { average } from "./stats";

describe("average()", () => {
  it("returns 0 for empty array", () => {
    expect(average([])).toBe(0);
  });

  it("computes mean for positive numbers", () => {
    expect(average([2, 4, 6])).toBe(4);
  });

  it("ignores null/undefined safely", () => {
    // Adjust based on your implementation; here we filter falsy except 0
    expect(average([1, null as any, 3, undefined as any, 0])).toBeCloseTo(
      (1 + 3 + 0) / 3
    );
  });
});
