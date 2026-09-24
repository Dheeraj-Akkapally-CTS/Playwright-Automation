import { test as setup, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
 
const authDir = path.resolve(
  process.cwd(),
  'playwright',
  '.auth'
);
 
const authFile = path.resolve(
  authDir,
  'user.json'
);
 
setup('Authenticate user', async ({ page }) => {
  fs.mkdirSync(authDir, {
    recursive: true
  });
  await page.goto('https://www.saucedemo.com/');
  // Login
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  // Verify login
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.locator('.title')).toHaveText('Products');
  // Save auth state
  await page.context().storageState({path: authFile});
  console.log(`Auth file: ${authFile}`);
});