import { test } from '@playwright/test';
import { ApplicationStartPage } from '../pages/ApplicationStartPage';
import { PersonalInfoPage } from '../pages/PersonalInfoPage';
import { EmploymentPage } from '../pages/EmploymentPage';
import { FinancialInfoPage } from '../pages/FinancialInfoPage';
import { LoanConfirmationPage } from '../pages/LoanConfirmationPage';
import { LoanRejectionPage } from '../pages/LoanRejectionPage';
import { testUser, invalidTestUser } from '../utils/testData';

// Group all tests related to the loan application workflow
test.describe('Loan Application Flow', () => {
  // Declare reusable page object variables
  let startPage: ApplicationStartPage;
  let personalPage: PersonalInfoPage;
  let employmentPage: EmploymentPage;
  let financialPage: FinancialInfoPage;
  let confirmationPage: LoanConfirmationPage;
  let rejectionPage: LoanRejectionPage;

  // This setup runs before each test to launch the app and navigate to the form
  test.beforeEach(async ({ page }) => {
    startPage = new ApplicationStartPage(page);
    personalPage = new PersonalInfoPage(page);
    employmentPage = new EmploymentPage(page);
    financialPage = new FinancialInfoPage(page);
    confirmationPage = new LoanConfirmationPage(page);
    rejectionPage = new LoanRejectionPage(page);

    console.log('Navigating to application start page');
    await startPage.goto();
    await startPage.assertStartPageLoaded(); // Confirm page has loaded properly

    console.log('Clicking "Ansök nu" (Apply now) button');
    await startPage.clickApplyNow(); // Begin application process
  });

  // Happy Path Test & Edge case: Submitting a valid application and receiving approval
  test('Full happy path Successful loan application flow', async () => {
    await personalPage.personalDetails(testUser.email, testUser.phone, testUser.ssn); 
    await employmentPage.selectEmploymentType(testUser.employmentStatus); 
    await financialPage.fillFinancialDetails(testUser); 
    await confirmationPage.verifyLoanApproval(); // Expect to reach approval screen
    console.log('Full happy path Successful loan application test completed');

  });

  // Negative Test: Submitting an invalid personnummer and validating the error message
  test('Should show validation error for invalid personnummer', async () => {
    await personalPage.fillInvalidSSN(
      invalidTestUser.email,
      invalidTestUser.phone,
      invalidTestUser.invalidSsn // Invalid SSN value
    );
    await personalPage.assertInvalidSSNErrorVisible(); 
    await personalPage.captureSSNErrorScreenshot(); // Capture screenshot for debugging
    console.log('Invalid SSN test completed');

  });

  // Negative Test: Student older than 30 should not be approved
  test('Validate loan rejection for student applicants older than 30 years', async () => {
    await personalPage.SSN_olderThan30(
      testUser.email_above30,
      testUser.phone_above30,
      testUser.ssn_above30 // Age > 30 encoded in SSN
    );
    await employmentPage.selectEmploymentType(testUser.employmentStatus); 
    await financialPage.fillFinancialDetails(testUser); 
    await rejectionPage.verifyRejectionMessage(); // Expect rejection message or absence of approval
    console.log('Verified loan rejection for older than 30 years');
  });
});
