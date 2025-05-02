import { Page, expect } from '@playwright/test';

export class ApplicationStartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://testapp.fairlo.se/application');  // Navigates to the application URL
  }

  async assertStartPageLoaded() {
    await expect(
      this.page.getByText(/En snäppet schysstare livet-händer-buffert/i)  // // Verifies that the start page has loaded successfully by checking for key content
    ).toBeVisible();
  }

  async clickApplyNow() {
    await this.page.getByText('Ansök nu').click();
  }
}
