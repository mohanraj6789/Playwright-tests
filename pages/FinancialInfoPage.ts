import { Page, expect } from '@playwright/test';
import { TEXT } from '../utils/constants';

export class FinancialInfoPage {
  constructor(private page: Page) {}

  async assertPageLoaded() { 
    console.log('Checking that Financial Info page is loaded');   // Verifies that the financial info page is visible and ready for input

    await expect(this.page.getByText(TEXT.financialInfoHeading)).toBeVisible();
  }

  async fillFinancialDetails(income: string, monthlyHouseCost: string, transportationCost: string, otherLoanCost: string) {
    await this.assertPageLoaded();
    console.log(` Filling in monthly income: testUser.income`);
    await this.page.locator('#monthlyIncome').fill(income);

    console.log(` Filling in monthly house cost: testUser.monthlyHouseCost}`);
    await this.page.locator('#monthlyHouseCost').fill(monthlyHouseCost);

    console.log(` Filling in transportation cost: testUser.transportationCost}`);
    await this.page.locator('#transportationCost').fill(transportationCost);

    console.log(` Filling in other loan cost: testUser.otherLoanCost}`);
    await this.page.locator('#otherLoanCost').fill(otherLoanCost);

    console.log(' Clicking continue button to proceed');
    await this.page.getByRole('button', { name: TEXT.submitApplicationButton }).click();

  }
}