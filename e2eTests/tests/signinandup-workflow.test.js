const { test, expect } = require("@playwright/test");
require('dotenv').config({ path: './e2eTests/.env' });

test('Ability to jump between the sign up page and the sign in page', async ({ page }) => {
  await page.goto(`${process.env.REACT_APP_URL}/signup`);
  await page.waitForSelector('text="Already have a business Account?"');
  await page.waitForSelector('text="Sign in"');
  await page.locator('text="Sign in"').click();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signin`);
  page.goBack();
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/signup`);
});

test('test can sign up with email', async ({ page }) => {
  await page.goto(`${process.env.REACT_APP_URL}/signup`);

  // Wait for the page to load
  await page.waitForSelector('text="Create a business account"');
  await page.waitForSelector('text="Non members can create account through their business ID"');

  // Fill in the form fields
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#organization', 'Test Corp');
  await page.fill('input[type="email"], input[placeholder="Email"]', 'john.doe@example.com');
  // 模拟 API 调用
  await page.route('**/api/create-business-account', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, message: 'Business account created successfully!' })
    });
  });
  // Submit the form
  await page.locator('text="Create account"').click();

  // Listen for dialog events
  page.on('dialog', async dialog => {
    // Check the dialog message
    expect(dialog.message()).toBe('Business account created successfully!');

    // Accept the dialog to close it
    await dialog.accept();

  });

});

test("Sign in with email", async ({ page }) => {
  // 从环境变量获取凭证
  const email = process.env.DB_ADMIN_EMAIL;
  const password = process.env.DB_ADMIN_PASSWORD;

  await page.goto(`${process.env.REACT_APP_URL}/signin`);


  // Wait for the  text to load
  await page.waitForSelector('text="Sign in with Email"');

  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);


  // Click the Submit button
  await page.click('text=Sign in');

  // ????After confirming the form submission, jump to the correct page
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/search-profile`);

});


test("Sign in with Reannz button", async ({ page }) => {

  await page.goto(`${process.env.REACT_APP_URL}/signin`);


  // Wait for the instructional text to load
  await page.waitForSelector('text=Institutional members can sign in with their institutional ID through www.reannz.co.nz');

  // Wait for the "Sign in with Reannz" button to be visible
  await page.waitForSelector('button:has-text("Sign in with Reannz")');

  // Click the "Sign in with Reannz" button
  await page.click('button:has-text("Sign in with Reannz")');

  // Verify that we are redirected to the correct URL
  await expect(page).toHaveURL('https://www.reannz.co.nz');

});


test('Sign in with LinkedIn', async ({ page }) => {
  await page.goto(`${process.env.REACT_APP_URL}/signin`); // Page URL
  await page.evaluate(() => {
    window.import = {
      meta: { env: { VITE_BACKEND_API_BASE_URL: 'http://api.example.com' } }
    };
  });

  // 3. 拦截 LinkedIn 重定向请求
  await page.route('**/api/auth/linkedin', (route) => {
    route.fulfill({
      status: 302,
      headers: {
        'Location': 'https://www.linkedin.com/oauth/v2/authorization?' +
          'response_type=code&client_id=your_client_id&' +
          'redirect_uri=http://localhost:3000/auth/linkedin/callback&' +
          'state=some_state_value&scope=r_liteprofile%20r_emailaddress'
      }
    });
  });

  // Wait for the LinkedIn button to appear
  await page.waitForSelector('img[alt="Sign in with Linked In"]');
  await page.click('img[alt="Sign in with Linked In"]');

  // 5. 模拟 LinkedIn OAuth 授权页面
  await page.route('https://www.linkedin.com/oauth/v2/authorization**', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<html><body>' +
        '<form action="http://localhost:3000/auth/linkedin/callback">' +
        '<input type="hidden" name="code" value="test_auth_code">' +
        '<button type="submit">Authorize</button>' +
        '</form></body></html>'
    });
  });
  // 6. 模拟用户在 LinkedIn 授权页面点击授权按钮
  await Promise.all([
    page.click('button:has-text("登陆")')
  ]);

  // 7. 拦截回调请求，模拟后端处理 OAuth 回调并返回成功响应
  await page.route('**/auth/linkedin/callback**', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        user: { id: '123', name: 'John Doe', email: 'john@example.com' }
      })
    });
  });

  await expect(page.getByText("Welcome! Since this is your first time accessing the platform, please create an account by providing your organization name and official email address.")).toBeTruthy();
  await expect(page.getByText("Once your account is approved, you'll receive a confirmation email where you can set your password or log in using your LinkedIn ID.")).toBeTruthy();
  await expect(page.getByText("For any questions, reach out to us at Support@academicfellows.com.")).toBeTruthy();

});
