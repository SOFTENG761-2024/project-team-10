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
  page.goBack();
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
  // 模拟 API 调用
  await page.route('**/api/create-business-account', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'Business account created successfully!' })
    });
  });
  // Submit the form
  await page.locator('text="Create account"').click();
  await page.waitForTimeout(2000);



});

