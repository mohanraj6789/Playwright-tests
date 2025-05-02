
import { Page, expect } from '@playwright/test';

export class LoanRejectionPage {
  constructor(private page: Page) {}

  async assertPageLoaded() {
    console.log(" Waiting for result screen to load (approval or rejection)");

    await Promise.race([
      this.page.waitForSelector('text=Tyvärr', { timeout: 20000 }),
      this.page.waitForSelector('text=Grattis', { timeout: 20000 })
    ]);
  }

    /*
   * Confirms that a rejection message is shown.
   * If not, throws an error and captures a screenshot, indicating the applicant was incorrectly approved.
   */
  async verifyRejectionMessage() {
    await this.assertPageLoaded();
    console.log(" Verifying if rejection message is displayed");

    const rejectionText = this.page.locator('text=Tyvärr');
    const approvalText = this.page.locator('h1');

    if (await rejectionText.count() > 0) {
      console.log(" Rejection message found for ineligible applicant");
      await expect(rejectionText).toBeVisible();
    } else {
      console.warn(" No rejection message found — loan may have been approved!");
      const message = await approvalText.innerText();
      console.log(` Message on page: "${message}"`);
      await this.page.screenshot({ path: 'screenshots/loan-incorrectly-approved.png' });
      throw new Error(" Loan was incorrectly approved for student over age 30");
    }
  }
}
