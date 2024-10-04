const { test, expect, afterEach, beforeEach } = require("@playwright/test");
require('dotenv').config({ path: './e2eTests/.env' });

test.beforeEach(async ({ page }) => {
  // the user has logged in
  const email = process.env.DB_ADMIN_EMAIL;
  const password = process.env.DB_ADMIN_PASSWORD;

  await page.goto(`${process.env.REACT_APP_URL}/signin`);


  // Wait for the  text to load
  await page.waitForSelector('text="Sign in with Email"');

  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);


  // Click the Submit button
  const signInButton = page.locator('text="Sign in"');
  await signInButton.click();
  await page.goto(`${process.env.REACT_APP_URL}/profile-setting`);

});


test('displays the correct welcome message', async ({ page }) => {

  // 选择欢迎文本的元素
  await page.waitForSelector('#fname');
  const initialName = await page.inputValue('#fname');
  const welcomeText = await page.locator(`text="Welcome, ${initialName}"`);
  await expect(welcomeText).toBeVisible();

});

test('displays the correct date', async ({ page }) => {


});




test('Test can edit name', async ({ page }) => {

  // Step 1: Navigate to the profile settings page
  await page.waitForSelector('#fname');
  const initialName = await page.inputValue('#fname');
  const welcomeText = await page.locator(`text="Welcome, ${initialName}"`);
  await expect(welcomeText).toBeVisible();
  const namesToTest = [initialName, 'Ama Admin', 'Jane Admin', 'John Admin'];

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

  // Click the button and verify that the new form appears（not set up）
  await page.click('button:has-text("+Add Secondary Email Address")');

});

test('should navigate between profile and career pages', async ({ page }) => {

  // Click the Next button
  await page.click('button:has-text("Next")');

  // Click on the Publications tab
  await page.click('text=Publications');
  const careerEditButton = page.locator('#career-edit-button');
  await expect(careerEditButton).toBeVisible();
  //await page.click('#career-edit-button');
  // Click the Back button
  await page.click('button:has-text("Back")');
});

test('should show validation error when required fields are empty', async ({ page }) => {

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

