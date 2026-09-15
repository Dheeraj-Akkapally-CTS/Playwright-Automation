import { test, expect } from '@playwright/test';
 
test('User can perform basic actions', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  //click
  await page.getByRole('link', { name: 'Form Authentication' }).click();
  await expect(page).toHaveURL(/login/);
  //fill username
  await page.getByLabel('Username').fill('tomsmith');
  //pressSequentially
  await page.getByLabel('Password').pressSequentially('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('You logged into a secure area!')).toBeVisible();
  await page.waitForTimeout(3000);
});
 
test('User can check a checkbox', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');
  const firstCheckbox = page.locator('input[type="checkbox"]').first();
  //checkbox
  await firstCheckbox.check();
  await expect(firstCheckbox).toBeChecked();
  await page.waitForTimeout(3000);
});

test('User can uncheck a checkbox', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');
  const firstCheckbox = page.locator('input[type="checkbox"]').first();
  //uncheck
  await firstCheckbox.uncheck();
  await expect(firstCheckbox).not.toBeChecked();
  await page.waitForTimeout(3000);
});
 
test('User can select a dropdown option', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown');
  const dropdown = page.locator('#dropdown');
  await dropdown.selectOption('1');
  await expect(dropdown).toHaveValue('1');
  await page.waitForTimeout(3000);
});