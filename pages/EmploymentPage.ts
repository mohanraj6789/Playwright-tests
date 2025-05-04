import { Page, expect } from '@playwright/test';
import { TEXT } from '../utils/constants';

export class EmploymentPage {
  constructor(private page: Page) {}

  async assertPageLoaded() {
    console.log('Checking that Employment Type page is loaded');   // Verifies that the employment type selection page is visible
    await expect(this.page.getByText(TEXT.employmentHeading)).toBeVisible();
  }

  async selectEmploymentType(type: string) {    //Selects an employment type (e.g., Student) and proceeds to the next step.
   await this.assertPageLoaded();
   console.log(` Selecting employment type: ${type}`);
   await this.page.locator(`label:has-text("${type}")`).click();
   console.log(' Clicking continue button after selecting employment type');
   await this.page.getByRole('button', { name: TEXT.continueButton }).click();
  }
}