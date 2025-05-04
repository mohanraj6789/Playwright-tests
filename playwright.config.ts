import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://testapp.fairlo.se',
    browserName: 'chromium',
    headless: false,
    storageState: undefined,
    actionTimeout: 0,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    viewport: { width: 1920, height: 1080 }
  },
  reporter: [
    ['list'],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      disableRetries: true, 
    }],
    ['html', { open: 'never' }]
  ],  
  testDir: './tests',
  retries: 0
});
