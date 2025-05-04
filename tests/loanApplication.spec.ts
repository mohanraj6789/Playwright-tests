import { test } from '@playwright/test';
import { ApplicationStartPage } from '../pages/ApplicationStartPage';
import { PersonalInfoPage } from '../pages/PersonalInfoPage';
import { EmploymentPage } from '../pages/EmploymentPage';
import { FinancialInfoPage } from '../pages/FinancialInfoPage';
import { LoanConfirmationPage } from '../pages/LoanConfirmationPage';
import { LoanRejectionPage } from '../pages/LoanRejectionPage';
import { testUser, happyPathUser, SSN10DigitUser, edgeCase25User, invalidSSNUser, over30User } from '../utils/testData';

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

 // Happy Path Test: Submitting a valid application and receiving approval
 test('Full happy path Successful loan application flow', async () => {
   await personalPage.personalDetails(happyPathUser.email, happyPathUser.phone, happyPathUser.SSN); 
   await employmentPage.selectEmploymentType(testUser.employmentStatus); 
   await financialPage.fillFinancialDetails(testUser.income, testUser.monthlyHouseCost, testUser.transportationCost, testUser.otherLoanCost); 
   await confirmationPage.verifyLoanApproval(); // Expect to reach approval screen
   console.log('Full happy path Successful loan application test completed');
  });

 //Format Validation Test: Accepts a valid 10-digit personnummer (SSN) with optional hyphen format.
 test('Accept valid 10-digit with hyphens personnummer format', async () => {
   await personalPage.personalDetails(SSN10DigitUser.email, SSN10DigitUser.phone, SSN10DigitUser.SSN); 
   await employmentPage.selectEmploymentType(testUser.employmentStatus); 
   await financialPage.fillFinancialDetails(testUser.income, testUser.monthlyHouseCost, testUser.transportationCost, testUser.otherLoanCost); 
   await confirmationPage.verifyLoanApproval(); // Expect to reach approval screen
   console.log('Valid 10-digit with hyphens personnummer test completed');
  });

 // Edge Case Test: Submitting a valid application and receiving approval
 test('Student applicant exactly 25 years old should be approved', async () => {
   await personalPage.personalDetails(edgeCase25User.email, edgeCase25User.phone, edgeCase25User.SSN); 
   await employmentPage.selectEmploymentType(testUser.employmentStatus); 
   await financialPage.fillFinancialDetails(testUser.income, testUser.monthlyHouseCost, testUser.transportationCost, testUser.otherLoanCost); 
   await confirmationPage.verifyLoanApproval(); // Expect to reach approval screen
   console.log('Edge Case: Verified approval for applicant exactly 25 years old');
  });

  // Negative Test: Submitting an invalid personnummer and validating the error message
 test('Should show validation error for invalid personnummer', async () => {
   await personalPage.fillInvalidSSN(invalidSSNUser.email, invalidSSNUser.phone, invalidSSNUser.SSN); // Invalid SSN value
   await personalPage.assertInvalidSSNErrorVisible(); 
   console.log('Invalid SSN test completed');
  });

  // Negative Test: Student older than 30 should not be approved
 test('Validate loan rejection for student applicants older than 30 years', async () => {
   await personalPage.fillOverAge30Details(over30User.email,over30User.phone,over30User.SSN); // Age > 30 encoded in SSN
   await employmentPage.selectEmploymentType(testUser.employmentStatus); 
   await financialPage.fillFinancialDetails(testUser.income, testUser.monthlyHouseCost, testUser.transportationCost, testUser.otherLoanCost); 
   await rejectionPage.verifyRejectionMessage(); // Expect rejection message or absence of approval
   console.log('Verified loan rejection for older than 30 years');
  });
});