import { Page, expect} from '@playwright/test';


// Represents the Personal Information step in the loan application.
export class PersonalInfoPage {
  constructor(private page: Page) {}

  async assertPageLoaded() {
    await expect(this.page.getByText('Lite uppgifter om dig')).toBeVisible(); // Verifies that the personal info form is visible on the page
  }

  async personalDetails(email: string, phone: string, ssn: string) {
    console.log('Filling form with Personal details');
    await this.page.getByLabel('E-post').fill(email);
    await this.page.getByLabel('Mobilnummer').fill(phone);
    await this.page.getByLabel('Personnummer').fill(ssn);
    await this.page.getByRole('button', { name: 'Fortsätt' }).click();
  }

  async fillInvalidSSN(email: string, phone: string, invalidSsn: string) {
    console.log(' Filling form with E-post & Mobilnummer');
    await this.assertPageLoaded();
    await this.page.getByLabel('E-post').fill(email);
    await this.page.getByLabel('Mobilnummer').fill(phone);

    console.log(' Filling form with invalid SSN');
    await this.page.getByLabel('Personnummer').fill(invalidSsn);
  }
  async assertInvalidSSNErrorVisible() {
    console.log(' Checking for SSN validation error message');
    await expect(
      this.page.locator('text=Ange personnummer med 10 elle 12 siffror, med eller utan bindestreck.')
    ).toBeVisible();
  }
  async captureSSNErrorScreenshot() {
    await this.page.screenshot({ path: 'screenshots/ssn-error.png' });
  }
  async SSN_olderThan30(email_above30: string, phone_above30: string, ssn_above30: string) {
    console.log(' Filling form with E-post & Mobilnummer');
    await this.assertPageLoaded();
    await this.page.getByLabel('E-post').fill(email_above30);
    await this.page.getByLabel('Mobilnummer').fill(phone_above30);

    console.log(' Filling form with SSN older than 30');
    await this.page.getByLabel('Personnummer').fill(ssn_above30);
    await this.page.getByRole('button', { name: 'Fortsätt' }).click();
  }
  
}

