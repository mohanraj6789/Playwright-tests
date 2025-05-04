import { Page, expect} from '@playwright/test';
import { TEXT } from '../utils/constants';

// Represents the Personal Information step in the loan application.
export class PersonalInfoPage {
  constructor(private page: Page) {}

  async assertPageLoaded() {
    await expect(this.page.getByText(TEXT.personalInfoHeading)).toBeVisible(); // Verifies that the personal info form is visible on the page
  }

  async personalDetails(email: string, phone: string, SSN: string) {
    console.log('Filling form with Personal details');
    await this.page.locator('#email').fill(email);
    await this.page.locator('#mobile').fill(phone);
    await this.page.locator('#nationalNumber').fill(SSN);
    await this.page.getByRole('button', { name: TEXT.continueButton }).click();
  }

  async fillInvalidSSN(email: string, phone: string, SSN: string) {
    console.log(' Filling form with E-post & Mobilnummer');
    await this.assertPageLoaded();
    await this.page.locator('#email').fill(email);
    await this.page.locator('#mobile').fill(phone);

    console.log(' Filling form with invalid SSN');
    await this.page.locator('#nationalNumber').fill(SSN);
  }
  
  async assertInvalidSSNErrorVisible() {
    console.log(' Checking for SSN validation error message');
    await expect(this.page.locator(`text=${TEXT.invalidSSNError}`)).toBeVisible();
  }

  async fillOverAge30Details(email: string, phone: string, SSN: string) {
    console.log('Filling form with ineligible student info (age > 30)');
    await this.assertPageLoaded();
    await this.page.locator('#email').fill(email);
    await this.page.locator('#mobile').fill(phone);
    await this.page.locator('#nationalNumber').fill(SSN);
    await this.page.getByRole('button', { name: TEXT.continueButton }).click();
  }
  
}

