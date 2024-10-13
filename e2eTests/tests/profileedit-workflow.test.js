const { test, expect, afterEach, beforeEach } = require("@playwright/test");
require('dotenv').config({ path: './e2eTests/.env' });

test.beforeEach(async ({ page }) => {


  await page.goto(`${process.env.REACT_APP_URL}`);
  await page.getByRole('button', { name: 'menuicon' }).click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signup`);
  await page.waitForSelector('text="Already have a business Account?"');
  await page.waitForSelector('text="Sign in"');
  await page.locator('text="Sign in"').click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signin`);


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
  // 模拟获取当前用户信息
  await page.route('**/api/auth/current-user', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 1,
        usertypeid: 3,
        institution_id: null,
        faculty_id: null,
        organization_id: null,
        first_name: "John",
        last_name: "Doe",
        preferred_name: null,
        title: "Ms.",
        primary_email: "test@example.com",
        password: "12345rf",
        is_verified: true,
        signup_datetime: "2006-02-26T10:13:02.000Z",

      })
    });
  });
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();

  // After confirming the form submission, jump to the correct page
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/search-profile`);
  await page.waitForTimeout(500);
  await page.locator('li:nth-child(7)').click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/profile-setting`);
  await page.waitForTimeout(500);
});


test('displays the correct welcome message', async ({ page }) => {
  await page.waitForTimeout(500);
  const initialName = await page.inputValue('#fname');
  const welcomeText = await page.locator(`text="Welcome, ${initialName}"`);

  console.log(`Initial Name: ${initialName}`);
  await expect(welcomeText).toBeVisible();
});


test('displays the date', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-10-04T10:00:00'));
  // Reload the page to apply the new date settings
  await page.reload();
  await page.waitForTimeout(500);
  // Get the date text displayed in the page
  const displayedDate = await page.locator('#headerdate').innerText();
  console.log('Displayed:', displayedDate);
  await expect(page.locator('#headerdate')).toHaveText('Fri 04 October 2024');
});



test('Test can edit name', async ({ page }) => {
  // Step 1: Navigate to the profile settings page and wait for the name field
  await page.waitForSelector('#fname');

  // Get the initial name
  const initialName = await page.inputValue('#fname');
  console.log(`Initial Name: ${initialName}`);

  // Step 2: Confirm that the input box is initially non-editable
  const isEditableBefore = await page.isEditable('#fname');
  expect(isEditableBefore).toBe(false);

  // Step 3: Click the "Edit" button to make the input box editable
  await page.click('#edit-save-button');
  const isEditableAfter = await page.isEditable('#fname');
  expect(isEditableAfter).toBe(true);

  // Step 4: Change the full name

  await page.fill('#fname', 'John Admin');
  const newName = await page.inputValue('#fname')
  console.log('Attempting to change name to:', newName);

  // Step 5: Click the "Save" button to save the changes
  await page.click('#edit-save-button');

  // Step 6: Confirm that the input box returns to a non-editable state
  const isEditableAfterSave = await page.isEditable('#fname');
  expect(isEditableAfterSave).toBe(false);



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


test('Test can logout', async ({ page }) => {

  // 模拟获取当前用户信息
  await page.route('**/api/auth/current-user', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 1,
        usertypeid: 3,
        institution_id: null,
        faculty_id: null,
        organization_id: null,
        first_name: "",
        last_name: "",
        preferred_name: null,
        title: "",
        primary_email: "",
        password: "",
        is_verified: true,
        signup_datetime: "",

      })
    });
  });
  await page.getByRole('button', { name: 'Menu Icon' }).click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}`);
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('University');
  await page.getByPlaceholder('Search').press('Enter');
  await page.waitForTimeout(500);
  const institutionText = await page.getByText('University of Canterbury');
  await expect(institutionText).toBeVisible();
  const institutionText2 = await page.getByText('Lincoln University');
  await expect(institutionText2).toBeVisible();
  await page.getByText('Lincoln University').click();
  await page.getByText('Lincoln Business School').click();
  await page.getByText('Gloria Hao').click();
  await page.waitForTimeout(500);
  //未登陆不可以看到outputs
  await expect(page.locator(`text="Welcome, Guest"`)).toBeVisible();
  await page.getByRole('button', { name: 'Outputs' }).click();
  await page.waitForTimeout(500);
  await expect(page.getByText('No publications available.')).toBeVisible();
});

test('Test can navigate between profile and career pages and can edit skill', async ({ page }) => {
  // Click the "Next" button
  await page.getByRole('button', { name: 'Next' }).click();

  // Click the "Edit" button
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.waitForTimeout(500);

  // Click the input box and fill in the value 'sing'
  await page.fill('input[type="text"]', 'science');

  // Click the "Save" button
  await page.getByRole('button', { name: 'Save' }).click();

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

});

/*test('test can switch theme', async ({ page }) => {

// Get the initial style
const initialTextcolor = await page.evaluate(() => {
  const element = document.querySelector('#welcomeText'); // The selector is ID
  return window.getComputedStyle(element).color; // Get color attributes
});

console.log(`Text Color: ${initialTextcolor}`);

// Click the theme switch button
const themeButton = page.locator('button:has(img[alt="Theme Icon"])');
await themeButton.click();

// Wait for the theme to change (may require a short delay)
await page.waitForTimeout(500);

// Verify the welcome text color change
const newTextcolor = await page.evaluate(() => {
  const element = document.querySelector('#welcomeText'); // The selector is ID
  return window.getComputedStyle(element).color; // Get color attributes
});

console.log(`Text Color: ${newTextcolor}`); console.log(`Theme changed from ${initialTextcolor} to ${newTextcolor}`); expect(newTextcolor).not.toBe(initialTextcolor); console.log('Theme successfully toggled');

});*/




