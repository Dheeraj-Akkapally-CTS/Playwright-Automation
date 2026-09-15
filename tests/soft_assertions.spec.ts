import { test, expect } from '@playwright/test';
 
test('User can use soft assertions', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  //test will continue
  await expect.soft(
    page.getByPlaceholder('Username')
  ).toBeVisible();
  await expect.soft(
    page.getByPlaceholder('Password')
  ).toBeVisible();
  await expect.soft(
    page.getByRole('button', { name: 'Login' })
  ).toBeVisible();
  //test continues after soft assertions.
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await page.waitForTimeout(3000);
});