import { Page, expect } from '@playwright/test';

export class EmploymentPage {
  constructor(private page: Page) {}

  async assertPageLoaded() {
    console.log('Checking that Employment Type page is loaded');   // Verifies that the employment type selection page is visible
    await expect(this.page.getByText('Din anställningstyp')).toBeVisible();
  }

  async selectEmploymentType(type: string) {    //Selects an employment type (e.g., Student) and proceeds to the next step.
   await this.assertPageLoaded();
  console.log(` Selecting employment type: ${type}`);
   await this.page.locator(`label:has-text("${type}")`).click();
   console.log(' Clicking continue button after selecting employment type');
   await this.page.locator('xpath=//*[@class="sc-VHjGu lfrKtM"]').click();
  }
}