import { Page, expect } from '@playwright/test';
import { TEXT } from '../utils/constants';


export class ApplicationStartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/application');  // Navigates to the application URL
  }

  async assertStartPageLoaded() {
    await expect(this.page.getByText(TEXT.startPageHeading)).toBeVisible();  // Verifies that the start page has loaded successfully by checking for key content
  }

  async clickApplyNow() {
    await this.page.getByText(TEXT.applyNowButton).click();
  }
}
