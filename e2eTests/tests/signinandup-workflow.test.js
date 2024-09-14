const { test, expect } = require("@playwright/test");
require("dotenv").config();

test("test can load signin page and Click Sign in with Reannz button", async ({ page }) => {
  await page.goto('http://localhost:5173/signin');

  // Wait for the instructional text to load
  await page.waitForSelector('text=Institutional members can sign in with their institutional ID through www.reannz.co.nz');

  // Wait for the "Sign in with Reannz" button to be visible
  await page.waitForSelector('button:has-text("Sign in with Reannz")');

  // Click the "Sign in with Reannz" button
  await page.click('button:has-text("Sign in with Reannz")');

  // Verify that we are redirected to the correct URL
  await expect(page).toHaveURL('https://www.reannz.co.nz');

  // Return to the login page
  await page.goBack();
  await expect(page).toHaveURL('http://localhost:5173');
});

test('should allow users to successfully create a business account', async ({ page }) => {
  await page.goto('http://localhost:5173/signup');

  // Wait for the page to load
  await page.waitForSelector('text="Create a business account"');
  await page.waitForSelector('text="Non members can create account through their business ID"');

  // Fill in the form fields
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#organization', 'Test Corp');
  await page.fill('input[type="email"], input[name="email"], input[placeholder="Email"]', 'john.doe@example.com');

  // Submit the form
  await page.click('button:has-text("Create account")');

  // Wait for the success message or redirection
  await page.waitForSelector('text="Business account created successfully!"');
  await expect(page).toHaveURL('http://localhost:5173/signin');
});

test('Signin with Email', async ({ page }) => {
  await page.goto('http://localhost:5173/signin');

  // Wait for the page to load
  await page.waitForSelector('text="Sign in with business account"');

  // Enter Email and Password
  await page.fill('input[type="email"], input[name="email"], input[placeholder="Email"]', 'test@example.com');
  await page.fill('input[type="password"], input[name="password"], input[placeholder="Password"]', 'testpassword');

  // Click the Submit button
  await page.click('button:has-text("Sign in")');

  // After confirming the form submission, jump to the correct page (assuming that the login is successful and redirects to the home page)
  await expect(page).toHaveURL('http://localhost:5173');
});

test('Click LinkedIn login button', async ({ page }) => {
  await page.goto('http://localhost:5173/signin'); // Page URL

  // Wait for the LinkedIn button to appear
  await page.waitForSelector('img[alt="Sign in with Linked In"]');

  // Expect that LinkedIn login is triggered
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'), // LinkedIn login pop-up in a new window
    page.click('img[alt="Sign in with Linked In"]'), // Click LinkedIn button
  ]);

  // Assert that the new page opened is LinkedIn's auth page
  await expect(newPage).toHaveURL(/linkedin\.com\/oauth\/v2\/authorization/); // Check if LinkedIn OAuth page is opened
});
