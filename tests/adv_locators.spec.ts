import { test, expect } from '@playwright/test';
 
test('User can use chained locators', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  //chained locator
  const username = page
    .locator('input')
    .filter({ has: page.locator('[placeholder="Username"]') });
  const usernameInput = page.getByPlaceholder('Username');
  await expect(usernameInput).toBeVisible();
  await usernameInput.fill('Admin');
  //CSS locator
  const passwordInput = page.locator('input[placeholder="Password"]');
  await passwordInput.fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Dashboard').last()).toBeVisible();
  await page.waitForTimeout(3000);
});