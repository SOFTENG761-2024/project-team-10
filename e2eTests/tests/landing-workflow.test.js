const { test, expect, afterEach, beforeEach } = require("@playwright/test");
require('dotenv').config({ path: './.env' });
test.beforeEach(async ({ page }) => {

  await page.goto(`${process.env.REACT_APP_URL}`);
  await page.waitForTimeout(500);
});
test("test can switch theme of landing page", async ({ page }) => {

  // Get the initial theme
  const initialTheme = await page.evaluate(() => document.body.getAttribute('data-theme'));

  await page.getByRole('button', { name: 'themeicon' }).click();
  // Wait for the theme to change (may require a short delay)
  await page.waitForTimeout(500);

  // Get the switched theme
  const newTheme = await page.evaluate(() => document.body.getAttribute('data-theme'));
  // Verify that the theme has changed
  expect(newTheme).not.toBe(initialTheme);
  console.log(`Theme changed from ${initialTheme} to ${newTheme}`);
  // Click the theme switch button again
  await page.getByRole('button', { name: 'themeicon' }).click();

  // Wait for the theme to change again
  await page.waitForTimeout(500);

  // Get the theme after switching again
  const finalTheme = await page.evaluate(() => document.body.getAttribute('data-theme'));

  // Verify that the theme has been switched back to the initial state
  expect(finalTheme).toBe(initialTheme);
  console.log(`Theme changed back to ${finalTheme}`);
});

