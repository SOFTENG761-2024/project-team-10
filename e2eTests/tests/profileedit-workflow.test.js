const { test, expect, afterEach, beforeEach } = require("@playwright/test");
require('dotenv').config();

test.beforeEach(async ({ page }) => {

  // Intercept the /email-signin request and return a successful response
  await page.route('**/api/auth/email-signin', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(true), // Simulate successful login
    });
  });

  // Simulate fetching the current user information
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
  await page.clock.setFixedTime(new Date('2024-09-04T10:00:00'));
  // Navigate to the correct page after confirming form submission
  await page.goto(`${process.env.REACT_APP_URL}/search-profile`);
  await page.waitForTimeout(500);
  await page.locator('li:nth-child(7)').click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/profile-setting`);
});

test('can jump to the correct page', async ({ page }) => {
  await page.locator('.MuiButtonBase-root').first().click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/dashboard`);
  await page.locator('li:nth-child(4)').click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/calendar`);
  await page.locator('li:nth-child(7)').click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/profile-setting`);
});

test('renders calendar with correct month and year', async ({ page }) => {
  await page.reload();
  await page.waitForTimeout(500);
  await page.locator('li:nth-child(4)').click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/calendar`);
  await expect(page.getByRole('heading', { name: 'September' })).toBeVisible();
});

test('navigates to previous and next month', async ({ page }) => {
  await page.goto(`${process.env.REACT_APP_URL}/calendar`);
  await page.click('#previous');
  await expect(page.getByText('August 2024')).toBeVisible();
  await page.click('#next');
  await page.click('#next');
  await expect(page.getByText('October 2024')).toBeVisible();
});

test('renders dashboard and switches between tabs', async ({ page }) => {
  await page.goto(`${process.env.REACT_APP_URL}/dashboard`);
  // Verify page title
  await expect(page.getByText('List of Groups')).toBeVisible();

  // Switch to the Tasks tab and verify its content
  await page.click('button:has-text("Tasks")');
  await expect(page.getByText('List of Tasks')).toBeVisible();

  // Switch to the Projects tab and verify its content
  await page.click('button:has-text("Projects")');
  await expect(page.getByText('List of Projects')).toBeVisible();

  // Switch to the Events tab and verify its content
  await page.click('button:has-text("Events")');
  await expect(page.getByText('List of Events')).toBeVisible();

  // Switch back to the Groups tab and verify content
  await page.click('button:has-text("Groups")');
  await expect(page.getByText('List of Groups')).toBeVisible();
  await expect(page.getByText('List of Events')).not.toBeVisible();
  await page.locator('.MuiSvgIcon-root > path').first().click();
});

test('shows group details when a group is clicked', async ({ page }) => {
  await page.goto(`${process.env.REACT_APP_URL}/dashboard`);
  await page.click('text=Commodity and Stock Analysis');
  await expect(page.getByText('John Doe', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Back' })).toBeVisible();

  // Click the back button
  await page.click('button:has-text("Back")');
  await expect(page.getByText('List of Groups')).toBeVisible();
});

test('displays the correct welcome message', async ({ page }) => {
  await page.waitForTimeout(500);
  const initialName = await page.inputValue('#fname');
  const welcomeText = await page.locator(`text="Welcome, ${initialName}"`);
  console.log(`Initial Name: ${initialName}`);
  await expect(welcomeText).toBeVisible();
});

test('displays the date', async ({ page }) => {
  await page.reload();
  await page.waitForTimeout(500);
  const displayedDate = await page.locator('#headerdate').innerText();
  console.log('Displayed:', displayedDate);
  await expect(page.locator('#headerdate')).toHaveText('Wed 04 September 2024');
});

test('Test can edit name', async ({ page }) => {
  await page.waitForSelector('#fname');
  const initialName = await page.inputValue('#fname');
  console.log(`Initial Name: ${initialName}`);

  const isEditableBefore = await page.isEditable('#fname');
  expect(isEditableBefore).toBe(false);

  await page.click('#edit-save-button');
  const isEditableAfter = await page.isEditable('#fname');
  expect(isEditableAfter).toBe(true);

  await page.fill('#fname', 'John Admin');
  const newName = await page.inputValue('#fname');
  console.log('Attempting to change name to:', newName);

  await page.click('#edit-save-button');
  const isEditableAfterSave = await page.isEditable('#fname');
  expect(isEditableAfterSave).toBe(false);
});

test('Test that read-only fields are not editable in edit mode', async ({ page }) => {
  const noteText = await page.locator('text="Please note! Most of the details are populated via Tuakiri and cannot be changed here."');
  await expect(noteText).toBeVisible();
  await page.click('#edit-save-button');

  expect(await page.isEditable('#email')).toBe(false);
  expect(await page.isEditable('#orcid')).toBe(false);
  expect(await page.isEditable('#linkedin')).toBe(false);
});

test('Test can logout', async ({ page }) => {
  await page.route('**/api/auth/current-user', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 1, usertypeid: 3, first_name: "", last_name: "", is_verified: true
      })
    });
  });

  await page.getByRole('button', { name: 'Menu Icon' }).click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}`);
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('University');
  await page.getByPlaceholder('Search').press('Enter');
  await page.waitForTimeout(500);
  await expect(page.getByText('University of Canterbury')).toBeVisible();
  await page.getByText('Lincoln University').click();
  await page.getByText('Lincoln Business School').click();
  await page.getByText('Gloria Hao').click();
  await page.waitForTimeout(500);
  await expect(page.locator(`text="Welcome, Guest"`)).toBeVisible();

});

test('Test can navigate between profile and career pages and can edit skill', async ({ page }) => {
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.waitForTimeout(500);
  await page.fill('input[type="text"]', 'science');
  await page.getByRole('button', { name: 'Save' }).click();
});

test('should navigate career pages', async ({ page }) => {
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Publications' }).click();
  await page.getByRole('button', { name: 'Edit' }).click();
  const contentBox = page.getByText('Content for box 1');
  await contentBox.click();
  await contentBox.fill('publication');
  await page.getByRole('button', { name: 'Save' }).click();
});

