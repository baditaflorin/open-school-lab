import { expect, test } from "@playwright/test";

test("homepage loads and a lab interaction works", async ({ page }) => {
  await page.goto("./");
  await expect(
    page.getByRole("heading", { name: /put the lab/i }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Motion Sandbox/i }).click();
  await expect(
    page.getByRole("heading", { name: /Motion Sandbox/i }),
  ).toBeVisible();
  const slider = page.getByLabel(/Launch velocity/i);
  await slider.fill("30");
  await page.getByRole("button", { name: /^Run$/i }).click();
  await expect(page.getByRole("status")).toContainText(/adapter ready/i);
});
