const { test, expect, afterEach, beforeEach } = require("@playwright/test");
require('dotenv').config({ path: './e2eTests/.env' });

test.beforeEach(async ({ page }) => {
  // Navigate to the landing page before each test
  await page.goto(`${process.env.REACT_APP_URL}`);
  await page.waitForTimeout(500); // Wait for 500ms to ensure the page is fully loaded
});

test('should render the landing page correctly', async ({ page }) => {
  // Check if the main content of the landing page is visible
  await expect(page.getByText('Promote Interdisciplinary Collaboration')).toBeVisible();
  await expect(page.getByPlaceholder('Search')).toBeVisible(); // Verify the search bar is visible
});

test('should display no results message for empty search', async ({ page }) => {
  // Simulate a search with nonexistent content
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('nonexistent');
  await page.getByPlaceholder('Search').press('Enter');

  // Verify that an error message appears
  await expect(page.getByText('An error occurred while fetching data.')).toBeVisible();
});

test('should navigate to signup page when menu button is clicked', async ({ page }) => {
  // Click the menu button and ensure it navigates to the signup page
  await page.getByRole('button', { name: 'menuicon' }).click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signup`);
});

test('should change active section on scroll', async ({ page }) => {
  // Scroll to the Network section and check if it becomes active
  await page.evaluate(() => document.getElementById('network').scrollIntoView());
  await expect(page.locator('nav a[href="#network"]')).toHaveClass(/active/);

  // Scroll to the Members section and verify its active state
  await page.evaluate(() => document.getElementById('member').scrollIntoView());
  await expect(page.locator('nav a[href="#member"]')).toHaveClass(/active/);
});

test("test can switch theme of landing page", async ({ page }) => {
  // Retrieve the initial theme
  const initialTheme = await page.evaluate(() => document.body.getAttribute('data-theme'));

  // Switch theme and wait for the change to reflect
  await page.getByRole('button', { name: 'themeicon' }).click();
  await page.waitForTimeout(500);

  // Check if the theme changed
  const newTheme = await page.evaluate(() => document.body.getAttribute('data-theme'));
  expect(newTheme).not.toBe(initialTheme); // Ensure the theme is different
  console.log(`Theme changed from ${initialTheme} to ${newTheme}`);

  // Switch back to the initial theme
  await page.getByRole('button', { name: 'themeicon' }).click();
  await page.waitForTimeout(500);

  const finalTheme = await page.evaluate(() => document.body.getAttribute('data-theme'));
  expect(finalTheme).toBe(initialTheme); // Verify the theme returned to the original
  console.log(`Theme changed back to ${finalTheme}`);
});

test('User can search profile by institution without logging in.', async ({ page }) => {
  // Perform a search for institutions
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('University');
  await page.getByPlaceholder('Search').press('Enter');
  await page.waitForTimeout(500);

  // Verify institutions are listed
  await expect(page.getByText('University of Canterbury')).toBeVisible();
  await expect(page.getByText('Lincoln University')).toBeVisible();

  // Navigate through the search results
  await page.getByText('Lincoln University').click();
  await page.getByText('Lincoln Business School').click();
  await page.getByText('Gloria Hao').click();
  await page.waitForTimeout(500);

  // Check for guest access 
  await expect(page.locator(`text="Welcome, Guest"`)).toBeVisible();
  await page.getByRole('button', { name: 'Outputs' }).click();
  await page.waitForTimeout(500);
  await expect(page.getByText('No publications available.')).toBeVisible();
});

test('User can search profile by department without logging in.', async ({ page }) => {
  // Search by department name
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill(' Faculty');
  await page.getByPlaceholder('Search').press('Enter');
  await page.waitForTimeout(500);

  // Verify search results
  await expect(page.getByText('University of Canterbury')).toBeVisible();
  await expect(page.getByText('Lincoln University')).not.toBeVisible();

  await page.getByText('University of Canterbury').click();
  await expect(page.getByText('Faculty of Law')).toBeVisible();
  await expect(page.getByText('UC Business School')).not.toBeVisible();

  // Click on a specific result
  await page.getByText('Faculty of Law').click();
  await page.waitForTimeout(500);

  // Verify profile visibility
  await expect(page.getByText('Natalie Baird')).toBeVisible();
  await expect(page.getByText('Paul Ballantine')).not.toBeVisible();
  await expect(page.getByText('Gloria Hao')).not.toBeVisible();

  await page.getByText('Natalie Baird').click();
  await page.waitForTimeout(500);

  // Ensure guest users can see detailed publications
  await page.getByRole('button', { name: 'Outputs' }).click();
  await page.waitForTimeout(500);
  await expect(page.getByText('No publications available.')).toBeVisible();
});

test('User can search profile by name without logging in.', async ({ page }) => {
  // Search by name
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('Natalie');
  await page.getByPlaceholder('Search').press('Enter');
  await page.waitForTimeout(500);

  // Verify institution grouping
  await expect(page.getByText('University of Canterbury')).toBeVisible();
  await expect(page.getByText('Lincoln University')).not.toBeVisible();

  await page.getByText('University of Canterbury').click();
  await page.waitForTimeout(500);

  // Verify department grouping
  await expect(page.getByText('Faculty of Law')).toBeVisible();
  await expect(page.getByText('UC Business School')).not.toBeVisible();

  // Check for relevant profile visibility
  await page.getByText('Faculty of Law').click();
  await page.waitForTimeout(500);
  await expect(page.getByText('Natalie Baird')).toBeVisible();

  // Ensure irrelevant profiles are not shown
  await expect(page.getByText('Paul Ballantine')).not.toBeVisible();
  await expect(page.getByText('Gloria Hao')).not.toBeVisible();

  await page.getByText('Natalie Baird').click();
  await page.waitForTimeout(500);

  // Verify guest access on outputs
  await page.getByRole('button', { name: 'Outputs' }).click();
  await page.waitForTimeout(500);
  await expect(page.getByText('No publications available.')).toBeVisible();
});
