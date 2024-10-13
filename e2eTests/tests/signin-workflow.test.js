
const { test, expect } = require("@playwright/test");
require('dotenv').config();

test.beforeEach(async ({ page }) => {
  // 1. Navigate to the home page
  await page.goto(`${process.env.REACT_APP_URL}`);

  // 2. Click the menu icon
  await page.getByRole('button', { name: 'menuicon' }).click();

  // 3. Ensure the URL changes to the signup page
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signup`);

  // 4. Wait for specific signup page elements to load
  await page.waitForSelector('text="Already have a business Account?"');
  await page.waitForSelector('text="Sign in"');

  // 5. Click on the 'Sign in' text link
  await page.locator('text="Sign in"').click();

  // 6. Confirm the navigation to the signin page
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signin`);
});

test("Sign in with email", async ({ page }) => {
  // 1. Wait for the 'Sign in with Email' text to appear
  await page.waitForSelector('text="Sign in with Email"');

  // 2. Fill in the login form
  await page.getByLabel('Email *').fill('test@example.com');
  await page.getByLabel('Password *').fill('test@example.com');

  // 3. Intercept the /email-signin API call and simulate a successful response
  await page.route('**/api/auth/email-signin', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(true), // Simulate successful login
    });
  });

  // 4. Mock the /current-user API response with user data
  await page.route('**/api/auth/current-user', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 1,
        usertypeid: 3,
        first_name: "John",
        last_name: "Doe",
        primary_email: "test@example.com",
        is_verified: true,
      }),
    });
  });

  // 5. Click the 'Sign in' button
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();

  // 6. Verify navigation to the search profile page
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/search-profile`);

  // 7. Ensure the welcome message is visible
  await expect(page.locator('text=Welcome, John Doe')).toBeVisible();
});

test("Sign in with Reannz button", async ({ page }) => {
  // 1. Wait for the instructional text to appear
  await page.waitForSelector('text=Institutional members can sign in with their institutional ID through www.reannz.co.nz');

  // 2. Intercept the Tuakiri authentication API call
  await page.route('**/api/auth/tuakiri', async route => {
    const response = await route.fetch();
    const contentType = response.headers()['content-type'];
    if (contentType && contentType.includes('text/html')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ first_name: 'John', last_name: 'Doe', id: 100 })
      });
    } else {
      const json = await response.json();
      await route.fulfill({ response, json });
    }
  });

  // 3. Mock the /current-user API with user data
  await page.route('**/api/auth/current-user', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 1,
        first_name: "John",
        last_name: "Doe",
        primary_email: "test@example.com",
        is_verified: true,
      }),
    });
  });

  // 4. Click the 'Sign in with Reannz' button
  await page.click('button:has-text("Sign in with Reannz")');

  // 5. Wait for the search profile page to load
  await page.waitForTimeout(500);

  // 6. Confirm the URL
  await page.goto(`${process.env.REACT_APP_URL}/search-profile`);

  // 7. Verify the username is displayed
  await expect(page.getByText('John Doe')).toBeVisible();
});

test('Sign in with LinkedIn', async ({ page }) => {
  // 1. Intercept the LinkedIn authentication API call
  await page.route('**/api/auth/linkedin', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        first_name: 'John',
        last_name: 'Doe',
        id: 100, // LinkedIn user ID
        token: 'mock-linkedin-token', // Simulate LinkedIn token
      }),
    });
  });

  // 2. Mock the /current-user API using LinkedIn user data
  await page.route('**/api/auth/current-user', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 100,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        is_verified: true,
      }),
    });
  });

  // 3. Wait for the LinkedIn sign-in button and click it
  await page.waitForSelector('img[alt="Sign in with Linked In"]');
  await page.click('img[alt="Sign in with Linked In"]');

  // 4. Confirm navigation to the search profile page
  await page.goto(`${process.env.REACT_APP_URL}/search-profile`);

  // 5. Verify the username is visible
  await expect(page.getByText('John Doe')).toBeVisible();
});
