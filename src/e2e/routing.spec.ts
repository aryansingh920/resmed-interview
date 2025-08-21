/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from "@playwright/test";

test("navigates to Details and back", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /details/i }).click();
  await expect(page.getByRole("heading", { name: /details/i })).toBeVisible();

  await page.getByRole("link", { name: /dashboard/i }).click();
  await expect(
    page.getByRole("heading", { name: /fitness steps tracker/i })
  ).toBeVisible();
});
