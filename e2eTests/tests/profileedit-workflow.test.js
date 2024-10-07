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
  await page.waitForTimeout(500);
  // Use data attributes to locate the Settings icon
  //const settingsIcon = await page.locator('[data-testid="sidebar-icon-settings"]');

  // Click the Settings icon
  // await settingsIcon.click();
  await page.click('ul > li:last-child');
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


test('displays the date', async ({ page }) => {
  await page.clock.setFixedTime(new Date('2024-10-04T10:00:00'));

  // Reload the page to apply the new date settings
  await page.reload();
  await page.waitForSelector('#headerDate');
  // Get the date text displayed in the page
  const displayedDate = await page.locator('#headerDate').innerText();
  console.log('Displayed:', displayedDate);
  await expect(page.locator('#headerDate')).toHaveText('Fri 04 October 2024');
});



test('Test can edit name', async ({ page }) => {
  // Step 1: Navigate to the profile settings page and wait for the name field
  await page.waitForSelector('#fname');

  // Get the initial name
  const initialName = await page.inputValue('#fname');
  console.log(`Initial Name: ${initialName}`);

  // Verify the welcome text is visible with the initial name
  const welcomeText = await page.locator(`text="Welcome, ${initialName}"`);
  await expect(welcomeText).toBeVisible();

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

  // Step 7: Reload the page to verify that the updated full name is saved
  await page.reload();
  await page.waitForSelector('#fname');
  const updatedName = await page.inputValue('#fname');
  console.log('Updated Name:', updatedName);

  expect(updatedName).toBe(newName);

  // Verify the welcome text is updated with the new name
  const updatedWelcomeText = await page.locator(`text="Welcome, ${newName}"`);
  await expect(updatedWelcomeText).toBeVisible();
  console.log(`Name successfully changed to: ${newName}`);
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
  await page.waitForTimeout(500);

  // Click the input box and fill in the value 'sing'
  await page.fill('input[type="text"], input[id="skills-input"]', 'sing');

  // Click the "Save" button
  await page.getByRole('button', { name: 'Save' }).click();

  // Reload the page
  await page.reload();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(500);

  // Verify that the value of the input box is 'sing' after reloading
  const inputValue = await page.inputValue('input[type="text"], input[id="skills-input"]');
  expect(inputValue).toBe('sing');

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


test('test can switch theme', async ({ page }) => {

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

});


