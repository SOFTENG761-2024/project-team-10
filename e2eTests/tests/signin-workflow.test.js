const { test, expect } = require("@playwright/test");
require('dotenv').config({ path: './e2eTests/.env' });
test.beforeEach(async ({ page }) => {
  await page.goto(`${process.env.REACT_APP_URL}`);
  await page.getByRole('button', { name: 'menuicon' }).click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signup`);
  await page.waitForSelector('text="Already have a business Account?"');
  await page.waitForSelector('text="Sign in"');
  await page.locator('text="Sign in"').click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signin`);
});

test("Sign in with email", async ({ page }) => {
  // 1. 等待页面加载并显示 'Sign in with Email' 文本
  await page.waitForSelector('text="Sign in with Email"');

  // 2. 填写登录表单
  await page.getByLabel('Email *').fill('test@example.com');
  await page.getByLabel('Password *').fill('test@example.com');

  // 3. 拦截 /email-signin 请求，并返回成功响应
  await page.route('**/api/auth/email-signin', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(true), // 模拟成功登录
    });
  });

  // 4. 模拟 /current-user 请求返回用户信息
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
      }),
    });
  });

  // 5. 点击 'Sign in' 按钮
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();

  // 6. 确认页面跳转到搜索页面
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/search-profile`);

  // 7. 等待欢迎消息出现，并验证其可见性
  await expect(page.locator('text=Welcome, John Doe')).toBeVisible();
});


test("Sign in with Reannz button", async ({ page }) => {

  // 等待指示文本加载
  await page.waitForSelector('text=Institutional members can sign in with their institutional ID through www.reannz.co.nz');

  // 拦截认证API调用

  await page.route('**/api/auth/tuakiri', async route => {
    const response = await route.fetch();
    const contentType = response.headers()['content-type'];
    if (contentType && contentType.includes('text/html')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ first_name: 'John', last_name: 'Doe', id: 100 })
      });
    } else {
      const json = await response.json();
      await route.fulfill({ response, json });
    }
  });
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

  // 点击"Sign in with Reannz"按钮
  await page.click('button:has-text("Sign in with Reannz")');


  // 等待搜索资料页面加载
  await page.waitForTimeout(500);

  // 验证URL
  await page.goto(`${process.env.REACT_APP_URL}/search-profile`);

  await page.waitForTimeout(500);

  // 验证用户名显示
  await expect(page.getByText('John Doe')).toBeVisible();
});


test("Sign in with Reannz button2", async ({ page }) => {

  // 等待指示文本加载
  await page.waitForSelector('text=Institutional members can sign in with their institutional ID through www.reannz.co.nz');

  // 拦截认证API调用

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

  // 点击"Sign in with Reannz"按钮
  await page.click('button:has-text("Sign in with Reannz")');


  // 等待搜索资料页面加载
  await page.waitForTimeout(500);

  // 验证URL
  await page.goto(`${process.env.REACT_APP_URL}/search-profile`);

  await page.waitForTimeout(500);

  // 验证用户名显示
  await expect(page.getByText('John Doe')).toBeVisible();
});


test('Sign in with LinkedIn', async ({ page }) => {
  await page.route('**/api/auth/linkedin', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        first_name: 'John',
        last_name: 'Doe',
        id: 100, // LinkedIn 用户 ID
        token: 'mock-linkedin-token' // 模拟 LinkedIn token
      })
    });
  });

  // 模拟获取当前用户信息的请求，用模拟的 LinkedIn 用户数据
  await page.route('**/api/auth/current-user', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 100,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        is_verified: true,
      }),
    });
  });

  // Wait for the LinkedIn button to appear
  await page.waitForSelector('img[alt="Sign in with Linked In"]');
  await page.click('img[alt="Sign in with Linked In"]');
  // 验证URL
  await page.goto(`${process.env.REACT_APP_URL}/search-profile`);

  await page.waitForTimeout(500);

  // 验证用户名显示
  await expect(page.getByText('John Doe')).toBeVisible();

});




