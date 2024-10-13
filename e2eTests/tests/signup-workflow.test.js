const { test, expect } = require("@playwright/test");
require('dotenv').config({ path: './e2eTests/.env' });

test.beforeEach(async ({ page }) => {
  // Navigate to the homepage using the URL from the environment variables
  await page.goto(`${process.env.REACT_APP_URL}`);

  // Click the menu icon button
  await page.getByRole('button', { name: 'menuicon' }).click();

  // Ensure the page navigates to the signup page
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signup`);
});

test('Ability to jump between the sign up page and the sign in page', async ({ page }) => {
  // Wait for the text "Already have a business Account?" to appear
  await page.waitForSelector('text="Already have a business Account?"');

  // Wait for the "Sign in" link to appear and click it
  await page.waitForSelector('text="Sign in"');
  await page.locator('text="Sign in"').click();

  // Verify the page navigates to the sign-in page
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signin`);

  // Click the "Create account" link
  await page.getByRole('link', { name: 'Create account' }).click();

  // Verify the page navigates back to the signup page
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signup`);
});

test('Test can sign up with email', async ({ page }) => {
  // Wait for the signup page to load
  await page.waitForSelector('text="Create a business account"');
  await page.waitForSelector('text="Non members can create account through their business ID"');

  // Fill out the signup form fields
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#organization', 'Test Corp');
  await page.fill('input[type="email"], input[placeholder="Email"]', 'john.doe@example.com');

  // Wait briefly to simulate real user interaction
  await page.waitForTimeout(500);

  // Intercept the API call for creating a business account and return a success response
  await page.route('**/api/auth/biz-account-create', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(true),
    });
  });

  // Click the "Create account" button
  await page.getByRole('button', { name: 'Create account', exact: true }).click();

  // Verify the page navigates to the account creation screen
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/create-account`);

  // Fill out the remaining form fields on the account creation page
  await page.getByLabel('First Name').fill('John');
  await page.getByLabel('Last Name').fill('Doe');
  await page.getByLabel('Organization *').fill('Test Corp');
  await page.getByLabel('Email Address *').fill('john.doe@example.com');

  // Intercept the API call for account screen submission and return a success response
  await page.route('**/api/auth/account-screen', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(true),
    });
  });

  // Submit the account creation form
  await page.getByRole('button', { name: 'Submit' }).click();

  // Wait for the success message to appear, indicating the account is in verification
  await page.waitForSelector('text="Your account is in the verification process. You can now navigate to the landing page."');

  // Close the success message modal
  await page.getByRole('button', { name: 'Close' }).click();

  // Verify the page navigates back to the homepage
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}`);
});
