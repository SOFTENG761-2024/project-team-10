const { test, expect } = require("@playwright/test");
require('dotenv').config({ path: './e2eTests/.env' });
test.beforeEach(async ({ page }) => {
  await page.goto(`${process.env.REACT_APP_URL}`);
  await page.getByRole('button', { name: 'menuicon' }).click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signup`);
  await page.waitForSelector('text="Already have a business Account?"');
  await page.waitForSelector('text="Sign in"');
  await page.locator('text="Sign in"').click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signin`);
});



test("Sign in with email", async ({ page }) => {


  // Wait for the  text to load
  await page.waitForSelector('text="Sign in with Email"');
  // 填写登录表单
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('test@example.com');
  await page.getByLabel('Password *').click();
  await page.getByLabel('Password *').fill('test@example.com');

  // 拦截 /email-signin 请求，并返回成功响应
  await page.route('**/api/auth/email-signin', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(true), // 模拟成功登录
    });
  });
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();

  // After confirming the form submission, jump to the correct page
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/search-profile`);

});



test("Sign in with Reannz button", async ({ page }) => {


  // Wait for the instructional text to load
  await page.waitForSelector('text=Institutional members can sign in with their institutional ID through www.reannz.co.nz');

  // Wait for the "Sign in with Reannz" button to be visible
  await page.waitForSelector('button:has-text("Sign in with Reannz")');

  // Click the "Sign in with Reannz" button
  await page.click('button:has-text("Sign in with Reannz")');

  // Verify that we are redirected to the correct URL
  await expect(page).toHaveURL('https://www.reannz.co.nz');

});


test('Sign in with LinkedIn', async ({ page }) => {
  await page.goto(`${process.env.REACT_APP_URL}/signin`); // Page URL

  // Wait for the LinkedIn button to appear
  await page.waitForSelector('img[alt="Sign in with Linked In"]');
  await page.click('img[alt="Sign in with Linked In"]');

  await expect(page.getByText("Welcome! Since this is your first time accessing the platform, please create an account by providing your organization name and official email address.")).toBeTruthy();
  await expect(page.getByText("Once your account is approved, you'll receive a confirmation email where you can set your password or log in using your LinkedIn ID.")).toBeTruthy();
  await expect(page.getByText("For any questions, reach out to us at Support@academicfellows.com.")).toBeTruthy();

});
