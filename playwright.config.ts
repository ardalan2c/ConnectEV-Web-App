import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Allow running tests from both e2e/ and tests/preview via explicit path
  testDir: './',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],
});
