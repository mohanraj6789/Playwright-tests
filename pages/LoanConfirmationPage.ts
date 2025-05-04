import { Page, expect } from '@playwright/test';
import { TEXT } from '../utils/constants';


export class LoanConfirmationPage {
  constructor(private page: Page) {}

  async assertLoadingMessageVisible() {
    console.log('Waiting for loan processing message...');
    await expect(this.page.getByTestId('message')).toBeVisible();
  }

  // Verifies that the loan has been approved by checking for a confirmation message, a valid URL pattern, and the presence of the "withdraw funds" CTA link.

  async verifyLoanApproval() {
    await this.assertLoadingMessageVisible();  
    console.log('Waiting for loan approval confirmation message...');  // Wait for the "Grattis!" (Congratulations) message to appear
    await this.page.waitForSelector(`text=${TEXT.approvalMessage}`, { timeout: 60000 });

    console.log(' Verifying URL contains "/application/.../status"');
    await expect(this.page).toHaveURL(/\/application\/.*\/status/);

    console.log(' Checking if "${TEXT.approvalLinkText}" link is visible');
    await expect(this.page.getByRole('link', { name: TEXT.approvalLinkText })).toBeVisible();

    console.log(' Loan approval page verified successfully');

  }
}
