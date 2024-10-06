const { test, expect } = require("@playwright/test");
require('dotenv').config({ path: './.env' });
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
  // 从环境变量获取凭证
  const email = process.env.DB_ADMIN_EMAIL;
  const password = process.env.DB_ADMIN_PASSWORD;

  // Wait for the  text to load
  await page.waitForSelector('text="Sign in with Email"');

  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);


  // Click the Submit button
  await page.click("#signin");
  await page.waitForTimeout(500);

  // ????After confirming the form submission, jump to the correct page
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
