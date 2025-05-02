import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    viewport: { width: 1920, height: 1080 }
  },
  testDir: './tests',
  retries: 0
});
