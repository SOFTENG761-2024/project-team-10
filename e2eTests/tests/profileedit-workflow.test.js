const { test, expect, afterEach, beforeEach } = require("@playwright/test");
require('dotenv').config({ path: './e2eTests/.env' });

test.beforeEach(async ({ page }) => {
  // the user has logged in
  const email = process.env.DB_ADMIN_EMAIL;
  const password = process.env.DB_ADMIN_PASSWORD;
  await page.goto(`${process.env.REACT_APP_URL}`);
  await page.waitForSelector('#outline');
  await page.click("#outline");
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signup`);
  await page.waitForSelector('text="Already have a business Account?"');
  await page.waitForSelector('text="Sign in"');
  await page.locator('text="Sign in"').click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signin`);


  // Wait for the  text to load
  await page.waitForSelector('text="Sign in with Email"');

  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);


  // Click the Submit button
  await page.click("#signin");
  await page.waitForSelector('ul');
  await page.locator('li:nth-child(7)').click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/profile-setting`);
  await page.waitForTimeout(2000);


});


test('displays the correct welcome message', async ({ page }) => {
  await page.waitForSelector('#fname');
  const initialName = await page.inputValue('#fname');
  const welcomeText = await page.locator(`text="Welcome, ${initialName}"`);

  console.log(`Initial Name: ${initialName}`);
  await expect(welcomeText).toBeVisible();
});

test('displays the correct date', async ({ page }) => {

});




test('Test can edit name', async ({ page }) => {
  // Step 1: Navigate to the profile settings page
  await page.waitForSelector('#fname');
  const initialName = await page.inputValue('#fname');
  const welcomeText = await page.locator(`text="Welcome, ${initialName}"`);
  console.log(`Initial Name: ${initialName}`);
  await expect(welcomeText).toBeVisible();

  const namesToTest = ['Ama Admin', 'Jane Admin', 'Admin Admin'];

  for (const name of namesToTest) {
    // Step 2: Check that the page is loaded and the initial profile data is displayed
    await page.waitForSelector('#fname');
    // Step 3: Confirm that the input box is initially non-editable
    const isEditableBefore = await page.isEditable('#fname');
    expect(isEditableBefore).toBe(false);
    // Step 4: Click the "Edit" button to make the input box editable
    await page.click('#edit-save-button');
    const isEditableAfter = await page.isEditable('#fname');
    expect(isEditableAfter).toBe(true);
    // Step 5: Change the full name
    await page.fill('#fname', name);
    // Step 6: Click the "Save" button to save the changes
    await page.click('#edit-save-button');
    // Step 7: Confirm that the input box returns to a non-editable state
    const isEditableAfterSave = await page.isEditable('#fname');
    expect(isEditableAfterSave).toBe(false);
    // Step 8: Reload the page to verify that the updated full name is saved
    await page.reload();
    await page.waitForSelector('#fname');
    const updatedName = await page.inputValue('#fname');
    expect(updatedName).toBe(name);
  }
});



test('Test that read-only fields are not editable in edit mode', async ({ page }) => {
  //Wait for the note to load and check its visibility
  const noteText = await page.locator('text="Please note! Most of the details are populated via Tuakiri and cannot be changed here."');
  //  Assert that the note is visible
  await expect(noteText).toBeVisible();
  //Click the Edit button await page.
  await page.click('#edit-save-button');

  // Confirm that the email, ORCID, and LinkedIn fields are still not editable 
  expect(await page.isEditable('#email')).toBe(false);
  expect(await page.isEditable('#orcid')).toBe(false);
  expect(await page.isEditable('#linkedin')).toBe(false);
});

test('Test allow adding secondary email and affiliation', async ({ page }) => {


  //Click the Edit button await page.
  await page.click('#edit-save-button');

  // Verify that the button is enabled in edit mode
  const addSecondaryEmailButton = await page.isEnabled('button:has-text("+Add Secondary Email Address")');
  const addSecondaryAffiliationButton = await page.isEnabled('button:has-text("+Add Secondary Affiliation")');
  expect(addSecondaryEmailButton).toBe(true);
  expect(addSecondaryAffiliationButton).toBe(true);

  // ？？？Click the button and verify that the new form appears（not set up）
  await page.click('button:has-text("+Add Secondary Email Address")');

});

test('Test can logout', async ({ page }) => {

  await page.getByRole('button', { name: 'Menu Icon' }).click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}`);

});

test('should navigate between profile and career pages', async ({ page }) => {
  // Click the "Next" button
  await page.getByRole('button', { name: 'Next' }).click();

  // Click the "Edit" button
  await page.getByRole('button', { name: 'Edit' }).click();

  // Click the input box and fill in the value 'sing'
  const inputLocator = page.locator('[id="\\:ra\\:"]');
  await inputLocator.click();
  await inputLocator.fill('sing');

  // Click the "Save" button
  await page.getByRole('button', { name: 'Save' }).click();

  // Reload the page
  await page.reload();
  await page.getByRole('button', { name: 'Next' }).click();

  // Verify that the value of the input box is 'sing' after reloading
  const inputValue = await inputLocator.inputValue(); expect(inputValue).toBe('sing');

});

test('should navigate career pages', async ({ page }) => {
  // Click the "Next" button
  await page.getByRole('button', { name: 'Next' }).click();

  // Click the "Publications" button
  await page.getByRole('button', { name: 'Publications' }).click();

  // Click the "Edit" button
  await page.getByRole('button', { name: 'Edit' }).click();

  // Click and fill in 'Content for box 1'
  const contentBox = page.getByText('Content for box 1');
  await contentBox.click();
  await contentBox.fill('publication'); // Fill in new content

  // Click the "Save" button
  await page.getByRole('button', { name: 'Save' }).click();

  // Reload the page
  await page.reload();
  // Click the "Next" button
  await page.getByRole('button', { name: 'Next' }).click();

  // Click on the Publications tab
  await page.getByRole('button', { name: 'Publications' }).click();

  // Verify that the content is 'publication' after reload
  const updatedContent = await contentBox.textContent(); // Get the updated text content
  expect(updatedContent).toBe('publication');
});


test('验证主题切换按钮', async ({ page }) => {

  // 点击主题切换按钮

  await page.getByRole('button', { name: 'Theme Icon' }).click();

  // 验证页面的主题是否改变
  const body = page.locator('body');
  await expect(body).toHaveClass(/dark-theme/);
});
test('应该显示正确的当前日期', async ({ page }) => {
  await page.goto('http://localhost:5173/profile-settings');

  // 获取当前日期并格式化
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // 检查页面上是否正确显示日期
  const dateText = await page.locator('text=' + formattedDate);
  await expect(dateText).toBeVisible();
});


test('应该显示正确的欢迎文本', async ({ page }) => {
  await page.goto('http://localhost:5173/profile-settings');  // 替换为实际 URL

  // 检查页面上是否显示 "Welcome, Alzxa Rawlus"
  const welcomeText = await page.locator('text=Welcome, Alzxa Rawlus');
  await expect(welcomeText).toBeVisible();
});

