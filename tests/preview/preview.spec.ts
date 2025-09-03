import { test } from "@playwright/test";

const BASE = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";

async function shot(page: any, path: string, file: string, width: number, height: number) {
  await page.setViewportSize({ width, height });
  await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `previews/${file}`, fullPage: false });
}

test("landing desktop & mobile", async ({ page }) => {
  await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
  await page.getByText("Fast, code-compliant EV-charger installs across the GTA").waitFor({ timeout: 10000 });
  await shot(page, "/", "landing-desktop.png", 1440, 900);
  await shot(page, "/", "landing-mobile.png", 390, 844);
});

test("quote desktop & mobile", async ({ page }) => {
  await page.goto(`${BASE}/quote`, { waitUntil: "domcontentloaded" });
  await page.getByText("Instant Quote").waitFor({ timeout: 10000 });
  await page.getByText("1) Address 2) Run length 3) Panel photos").waitFor({ timeout: 5000 });
  await shot(page, "/quote", "quote-desktop.png", 1440, 900);
  await shot(page, "/quote", "quote-mobile.png", 390, 844);
});