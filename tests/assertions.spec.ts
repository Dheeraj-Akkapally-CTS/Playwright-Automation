import { test, expect } from '@playwright/test';
 
test('User can validate UI states using assertions', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  const username = page.getByPlaceholder('Username');
  const password = page.getByPlaceholder('Password');
  const loginButton = page.getByRole('button', { name: 'Login' });
  // Visibility assertion
  await expect(username).toBeVisible();
  //enabled assertion
  await expect(loginButton).toBeEnabled();
  await username.fill('Admin');
  await password.fill('admin123');
  await loginButton.click();
  //url assertion
  await expect(page).toHaveURL(/dashboard/);
  //text assertion
  await expect(page.getByText('Dashboard').last()).toBeVisible();
  await page.waitForTimeout(3000);
});