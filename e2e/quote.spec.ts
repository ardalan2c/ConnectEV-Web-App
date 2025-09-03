import { test, expect } from '@playwright/test';

test('quote flow shows price band', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /Get.*Instant Quote/i }).click();
  await expect(page).toHaveURL(/quote/);
  
  // Check that the quote page shows the expected content
  await expect(page.getByText('Instant Quote')).toBeVisible();
  await expect(page.getByText('Estimated price: $1,100–$2,200 + HST')).toBeVisible();
  await expect(page.getByText('1) Address 2) Run length 3) Panel photos')).toBeVisible();
});

test('admin leads page loads', async ({ page }) => {
  await page.goto('/admin/leads');
  // Just verify the page loads without 404
  await expect(page).not.toHaveTitle(/404/);
});

