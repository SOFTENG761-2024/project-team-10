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
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();

  // After confirming the form submission, jump to the correct page
  await expect(page).toHaveURL(`${process.env.REACT_APP_URL}/search-profile`);
  await page.waitForTimeout(500);

});


test('Test can search profile by institution', async ({ page }) => {
  await page.waitForTimeout(500);

  // 模拟返回用户资料搜索结果，而不是 true
  await page.route('**/api/search?keyword=University', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          institution: { id: 1, name: 'University of Example' },
          faculty_id: 1,
          department: 'Science',
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          profile_picture: 'http://example.com/john.jpg',
        },
        {
          institution: { id: 1, name: 'University of Example' },
          faculty_id: 2,
          department: 'Engineering',
          id: 2,
          first_name: 'Jane',
          last_name: 'Smith',
          profile_picture: 'http://example.com/jane.jpg',
        },
        {
          institution: { id: 2, name: 'Technical University' },
          faculty_id: 3,
          department: 'Mathematics',
          id: 3,
          first_name: 'Alice',
          last_name: 'Johnson',
          profile_picture: 'http://example.com/alice.jpg',
        },
        {
          institution: { id: 2, name: 'Technical University' },
          faculty_id: 4,
          department: 'Physics',
          id: 4,
          first_name: 'Bob',
          last_name: 'Williams',
          profile_picture: 'http://example.com/bob.jpg',
        }
      ]),
      // 返回模拟的搜索结果
    });
  });
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('University');

  await page.getByPlaceholder('Search').press('Enter');
  await page.waitForTimeout(500);
  const institutionText = await page.getByText('University of Example');
  await expect(institutionText).toBeVisible(); // 断言文本应该可见
  await page.getByText('University of Example').click();
  await page.getByText('Science').click();
  await page.getByText('John Doe').click();
});

test('Test can search profile by department’', async ({ page }) => {
  await page.waitForTimeout(500);

  // 模拟返回用户资料搜索结果，而不是 true
  await page.route('**/api/search?keyword=Science', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          institution: { id: 1, name: 'University of Example' },
          faculty_id: 1,
          department: 'Science',
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          profile_picture: 'http://example.com/john.jpg',
        },
        {
          institution: { id: 1, name: 'University of Example' },
          faculty_id: 2,
          department: 'Engineering',
          id: 2,
          first_name: 'Jane',
          last_name: 'Smith',
          profile_picture: 'http://example.com/jane.jpg',
        },
        {
          institution: { id: 2, name: 'Technical University' },
          faculty_id: 3,
          department: 'Mathematics',
          id: 3,
          first_name: 'Alice',
          last_name: 'Johnson',
          profile_picture: 'http://example.com/alice.jpg',
        },
        {
          institution: { id: 2, name: 'Technical University' },
          faculty_id: 4,
          department: 'Physics',
          id: 4,
          first_name: 'Bob',
          last_name: 'Williams',
          profile_picture: 'http://example.com/bob.jpg',
        }
      ]),
      // 返回模拟的搜索结果
    });
  });
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('Science');
  await page.getByPlaceholder('Search').press('Enter');
  await page.waitForTimeout(500);


  const institutionText = await page.getByText('University of Example');
  await expect(institutionText).toBeVisible();
  //const institutionText2 = await page.getByText('Technical University');
  //await expect(institutionText2).not.toBeVisible();  // 断言文本应该不可见
  await page.getByText('University of Example').click();
  await page.getByText('Science').click();

});

test('Test can search profile by name’', async ({ page }) => {
  await page.waitForTimeout(500);

  // 模拟返回用户资料搜索结果，而不是 true
  await page.route('**/api/search?keyword=John', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          institution: { id: 1, name: 'University of Example' },
          faculty_id: 1,
          department: 'Science',
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          profile_picture: 'http://example.com/john.jpg',
        },
        {
          institution: { id: 1, name: 'University of Example' },
          faculty_id: 2,
          department: 'Engineering',
          id: 2,
          first_name: 'Jane',
          last_name: 'Smith',
          profile_picture: 'http://example.com/jane.jpg',
        },
        {
          institution: { id: 2, name: 'Technical University' },
          faculty_id: 3,
          department: 'Mathematics',
          id: 3,
          first_name: 'Alice',
          last_name: 'Johnson',
          profile_picture: 'http://example.com/alice.jpg',
        },
        {
          institution: { id: 2, name: 'Technical University' },
          faculty_id: 4,
          department: 'Physics',
          id: 4,
          first_name: 'Bob',
          last_name: 'Williams',
          profile_picture: 'http://example.com/bob.jpg',
        }
      ]),
      // 返回模拟的搜索结果
    });
  });
  await page.getByPlaceholder('Search').click();
  await page.getByPlaceholder('Search').fill('John');

  await page.getByPlaceholder('Search').press('Enter');
  await page.waitForTimeout(500);
  const institutionText = await page.getByText('University of Example');
  await expect(institutionText).toBeVisible();

  // 点击机构名，进入部门页面
  await page.getByText('University of Example').click();
  await page.waitForTimeout(500);

  // 验证部门名是否显示
  const departmentText = await page.getByText('Science');
  await expect(departmentText).toBeVisible();

  // 点击部门名，进入具体用户页面
  await page.getByText('Science').click();
  await page.waitForTimeout(500);

  // 验证具体用户名是否显示
  const userNameText = await page.getByText('John Doe');
  await expect(userNameText).toBeVisible();

});

