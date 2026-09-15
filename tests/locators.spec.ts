import { test, expect } from '@playwright/test';
 
test('User can locate elements using user-centric locators', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
//using placeholder
  const username = page.getByPlaceholder('Username');
  const password = page.getByPlaceholder('Password');
  await expect(username).toBeVisible();
  await expect(password).toBeVisible();
//usng role
  const loginButton = page.getByRole('button', { name: 'Login' });
  await expect(loginButton).toBeVisible();
  await username.fill('Admin');
  await password.fill('admin123');
  await loginButton.click();
//using text
  await expect(page.getByText('Dashboard').last()).toBeVisible();
  await page.waitForTimeout(3000);
});