import { Page, expect } from '@playwright/test';

export class LoanConfirmationPage {
  constructor(private page: Page) {}

  // Verifies that the loan has been approved by checking for a confirmation message, a valid URL pattern, and the presence of the "withdraw funds" CTA link.

  async verifyLoanApproval() {   // Wait for the "Grattis!" (Congratulations) message to appear
    console.log('Waiting for loan approval confirmation message...');
    await this.page.waitForSelector('text=Grattis!', { timeout: 80000 });  
    await this.page.waitForSelector('text=Grattis!');

    console.log(' Verifying URL contains "/application/.../status"');
    await expect(this.page).toHaveURL(/\/application\/.*\/status/);

    console.log(' Checking if "Anslut nu och gör ett uttag" link is visible');
    await expect(
      this.page.getByRole('link', { name: 'Anslut nu och gör ett uttag' })
    ).toBeVisible();

    console.log(' Loan approval page verified successfully');

  }
}
