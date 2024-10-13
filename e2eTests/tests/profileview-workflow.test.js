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

});


test('Test can search profile by institution', async ({ page }) => {
  await page.waitForTimeout(500);

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

});

test('Test can search profile by department’', async ({ page }) => {
  await page.waitForTimeout(500);
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill(' Faculty');
  await page.getByPlaceholder('Search').press('Enter');
  await page.waitForTimeout(500);


  const institutionText = await page.getByText('University of Canterbury');
  await expect(institutionText).toBeVisible();
  const institutionText2 = await page.getByText('Lincoln University');
  await expect(institutionText2).not.toBeVisible();
  await page.getByText('University of Canterbury').click();
  await expect(page.getByText('Faculty of Law')).toBeVisible();
  await expect(page.getByText('UC Business School')).not.toBeVisible();
  await page.getByText('Faculty of Law').click();

});

test('Test can search profile by name’', async ({ page }) => {
  await page.waitForTimeout(500);
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('Natalie');
  await page.getByPlaceholder('Search').press('Enter');
  await page.waitForTimeout(500);


  // 验证机构分组
  const institutionText = await page.getByText('University of Canterbury');
  await expect(institutionText).toBeVisible(); // 断言文本应该可见
  const institutionText2 = await page.getByText('Lincoln University');
  await expect(institutionText2).not.toBeVisible();
  await page.getByText('University of Canterbury').click();
  await page.waitForTimeout(500);

  // 验证院系分组
  await expect(page.getByText('Faculty of Law')).toBeVisible();
  await expect(page.getByText('UC Business School')).not.toBeVisible();
  await page.getByText('Faculty of Law').click();
  await page.waitForTimeout(500);

  // 验证搜索结果
  await expect(page.getByText('Natalie Baird')).toBeVisible();

  // 验证不相关的结果没有显示
  await expect(page.getByText('Paul Ballantine')).not.toBeVisible();
  await expect(page.getByText('Gloria Hao')).not.toBeVisible();
  await page.getByText('Natalie Baird').click();
  await page.waitForTimeout(500);
  //登陆后可以看到outputs
  await page.getByRole('button', { name: 'Outputs' }).click();

});


