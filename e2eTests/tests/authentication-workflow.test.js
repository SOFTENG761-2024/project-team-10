const { test, expect, afterEach } = require("@playwright/test");
require("dotenv").config();

test("test can load login page", async ({ page }) => {
  await page.goto(`${process.env.REACT_APP_URL}`);
});
