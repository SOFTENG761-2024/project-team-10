const { test, expect } = require("@playwright/test");
require('dotenv').config({ path: './e2eTests/.env' });
test.beforeEach(async ({ page }) => {

  await page.goto(`${process.env.REACT_APP_URL}`);
  await page.getByRole('button', { name: 'menuicon' }).click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signup`);
});

test('Ability to jump between the sign up page and the sign in page', async ({ page }) => {
  await page.waitForSelector('text="Already have a business Account?"');
  await page.waitForSelector('text="Sign in"');
  await page.locator('text="Sign in"').click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signin`);
  await page.getByRole('link', { name: 'Create account' }).click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signup`);
});

test('test can sign up with email', async ({ page }) => {

  // Wait for the page to load
  await page.waitForSelector('text="Create a business account"');
  await page.waitForSelector('text="Non members can create account through their business ID"');

  // Fill in the form fields
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#organization', 'Test Corp');
  await page.fill('input[type="email"], input[placeholder="Email"]', 'john.doe@example.com');
  await page.waitForTimeout(500);
  // 模拟 API 调用
  await page.route('**/api/auth/biz-account-create', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(true),
    });
  });
  // Submit the form
  await page.getByRole('button', { name: 'Create account', exact: true }).click();

  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/create-account`);
  await page.getByLabel('First Name').fill('John');
  await page.getByLabel('Last Name').fill('Doe');
  await page.getByLabel('Organization *').fill('Test Corp');
  await page.getByLabel('Email Address *').fill('john.doe@example.com');

  await page.route('**/api/auth/account-screen', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(true),
    });
  });
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForSelector('text="Your account is in the verification process. You can now navigate to the landing page."');
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}`);

});

