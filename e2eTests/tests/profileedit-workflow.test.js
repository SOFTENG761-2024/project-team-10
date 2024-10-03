const { test, expect, afterEach } = require("@playwright/test");
require("dotenv").config();

test.beforeEach(async ({ page }) => {
  // Assuming there's a login function implemented

  await page.goto('http://localhost:5173/profile-setting');
});

test('should allow editing some fields in ProfileCantEdit', async ({ page }) => {
  // Step 1: Visit the Profiledit page

  // Step 2: Check that the page is loaded and displays the initial profile data
  await page.waitForSelector('#fname'); // Confirm that the full name text box has loaded
  const initialFullName = await page.inputValue('#fname');
  expect(initialFullName).toBe('John Doe'); // Check based on initial data
  // Step 3: Confirm that the input box is in a non-editable state (not editable)
  const isEditableBefore = await page.isEditable('#fname');
  expect(isEditableBefore).toBe(false);
  // Step 4: Click the "Edit" button to enter edit mode
  await page.click('#edit-save-button');
  // Step 5: Confirm that the input box becomes editable
  const isEditableAfter = await page.isEditable('#fname');
  expect(isEditableAfter).toBe(true);
  // Step 6: Change the full name (e.g. to "Jane Doe")
  await page.fill('#fname', 'Jane Doe');
  // Step 7: Click the "Save" button to save the changes
  await page.click('#edit-save-button');
  // Step 8: Confirm that the text box returns to a non-editable state
  const isEditableAfterSave = await page.isEditable('#fname');
  expect(isEditableAfterSave).toBe(false);
  // Step 9: Verify that the updated full name is successfully saved
  const updatedFullName = await page.inputValue('#fname');
  expect(updatedFullName).toBe('Jane Doe');

});

test('should keep readonly fields uneditable in edit mode', async ({ page }) => {
  await page.goto('http://localhost:5173/profile-setting');

  //Click the Edit button await page.
  await page.click('#edit-save-button');

  // Confirm that the email, ORCID, and LinkedIn fields are still not editable 
  expect(await page.isEditable('input[value="john.doe@example.com"]')).toBe(false);
  expect(await page.isEditable('input[value="0000-0001-2345-6789"]')).toBe(false);
  expect(await page.isEditable('input[value="john-doe"]')).toBe(false);
});

test('should allow adding secondary email and affiliation', async ({ page }) => {
  await page.goto('http://localhost:5173/profile-setting');

  //Click the Edit button await page.
  await page.click('#edit-save-button');

  // Verify that the button is enabled in edit mode
  const addSecondaryEmailButton = await page.isEnabled('button:has-text("+Add Secondary Email Address")');
  const addSecondaryAffiliationButton = await page.isEnabled('button:has-text("+Add Secondary Affiliation")');
  expect(addSecondaryEmailButton).toBe(true);
  expect(addSecondaryAffiliationButton).toBe(true);

  // Click the button and verify that the new form appears（not set up）
  await page.click('button:has-text("+Add Secondary Email Address")');

});

test('should navigate between profile and career pages', async ({ page }) => {
  await page.goto('http://localhost:5173/profile-setting');

  // Click the Next button
  await page.click('button:has-text("Next")');

  // Click on the Publications tab
  await page.click('text=Publications');
  await page.click('#career-edit-button');
  // Click the Back button
  await page.click('button:has-text("Back")');
});

test('should show validation error when required fields are empty', async ({ page }) => {
  await page.goto('http://localhost:5173/profile-setting');

  // 点击 Edit 按钮进入编辑模式
  await page.click('#edit-save-button');

  // 清空必填字段，例如全名
  await page.fill('#fname', '');

  // 点击 Save 按钮
  await page.click('#edit-save-button');

  // 验证错误提示是否出现
  await page.waitForSelector('text="Full name is required"');
});

test('should display profile photo and allow changing it', async ({ page }) => {
  await page.goto('http://localhost:5173/profile-setting');

  // 确认头像显示
  const profilePhoto = await page.getAttribute('img', 'src');
  expect(profilePhoto).toBe('https://example.com/your-profile-pic.jpg');

  // 如果支持上传头像，可以测试上传图片（还没有）
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.click('button:has-text("Upload Photo")'),
  ]);
  await fileChooser.setFiles('path/to/new/photo.jpg'); // 上传文件
});

test('验证主题切换按钮', async ({ page }) => {
  await page.goto('http://localhost:5173/profile-settings');

  // 点击主题切换按钮
  const themeToggleButton = page.locator('button[data-testid="theme-toggle"]');
  await themeToggleButton.click();

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

