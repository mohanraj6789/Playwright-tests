import { Page, expect } from '@playwright/test';

export class FinancialInfoPage {
  constructor(private page: Page) {}

  async assertPageLoaded() { 
    console.log('Checking that Financial Info page is loaded');   // Verifies that the financial info page is visible and ready for input

    await expect(this.page.getByText('Din ekonomi')).toBeVisible();
  }

  async fillFinancialDetails(user: {income: string, monthlyHouseCost: string, transportationCost: string, otherLoanCost: string}) {
    await this.assertPageLoaded();
    console.log(` Filling in monthly income: ${user.income}`);
    await this.page.locator('#monthlyIncome').fill(user.income);

    console.log(` Filling in monthly house cost: ${user.monthlyHouseCost}`);
    await this.page.locator('#monthlyHouseCost').fill(user.monthlyHouseCost);

    console.log(` Filling in transportation cost: ${user.transportationCost}`);
    await this.page.locator('#transportationCost').fill(user.transportationCost);

    console.log(` Filling in other loan cost: ${user.otherLoanCost}`);
    await this.page.locator('#otherLoanCost').fill(user.otherLoanCost);

    console.log(' Clicking continue button to proceed');
    await this.page.locator('xpath=//*[@class="sc-VHjGu lfrKtM"]').click();
  }
}