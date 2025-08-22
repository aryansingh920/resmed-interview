/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test";

test("loads dashboard, adds an entry, and sees it listed", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /fitness steps tracker/i })
  ).toBeVisible();

  // Fill the form
  await page.getByLabel(/date/i).fill("2025-08-06");
  await page.getByLabel(/steps/i).fill("5600");
  await page.getByLabel(/calories/i).fill("410");
  await page.getByLabel(/duration/i).fill("33");

  await page.getByRole("button", { name: /add/i }).click();

  // Verify it appears in the table/list
  const table = page.getByTestId("data-table");
  await expect(table).toBeVisible();
  await expect(table.getByText("2025-08-06")).toBeVisible();
  await expect(table.getByText("5600")).toBeVisible();
  await expect(table.getByText("410")).toBeVisible();
  await expect(table.getByText("33")).toBeVisible();
});

test("range filter changes chart window", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /7d/i }).click();

  const points = page.getByTestId("chart-points-count");
  await expect(points).toHaveText(/\b7\b/);
});

test.beforeEach(async ({ page }) => {
  await page.route('**/api/stats', async (route) => {
    // Return stable mock data for the app
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { date: '2025-08-10', calories: 500, durationMinutes: 40, steps: 6200 },
        { date: '2025-08-11', calories: 600, durationMinutes: 55, steps: 9100 },
      ]),
    });
  });
});

test('dashboard renders', async ({ page }) => {
  await page.goto('http://localhost:3000'); // or your dev server URL
  await expect(page.getByText(/Steps/i)).toBeVisible();
});
