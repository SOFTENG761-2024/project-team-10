const { test, expect, afterEach, beforeEach } = require("@playwright/test");
require('dotenv').config({ path: './e2eTests/.env' });


test('User can search profile by institution, cannot see detail without logging in.', async ({ page }) => {
  await page.goto(`${process.env.REACT_APP_URL}`);

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

test('User can search profile by department, cannot see detail without logging in.', async ({ page }) => {
  await page.goto(`${process.env.REACT_APP_URL}`);
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
  await page.waitForTimeout(500);
  // 验证搜索结果
  await expect(page.getByText('Natalie Baird')).toBeVisible();

  // 验证不相关的结果没有显示
  await expect(page.getByText('Paul Ballantine')).not.toBeVisible();
  await expect(page.getByText('Gloria Hao')).not.toBeVisible();
  await page.getByText('Natalie Baird').click();
  await page.waitForTimeout(500);
  //未登陆不可以看到outputs
  await page.getByRole('button', { name: 'Outputs' }).click();
  await page.waitForTimeout(500);
  await expect(page.getByText('No publications available.')).toBeVisible();

});

test('User can search profile by name, cannot see detail without logging in.', async ({ page }) => {
  await page.goto(`${process.env.REACT_APP_URL}`);
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
  //未登陆不可以看到outputs
  await page.getByRole('button', { name: 'Outputs' }).click();
  await page.waitForTimeout(500);
  await expect(page.getByText('No publications available.')).toBeVisible();

});


