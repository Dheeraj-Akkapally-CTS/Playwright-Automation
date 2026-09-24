import { test, expect } from '@playwright/test';
import path from 'path';
 
const authFile = path.resolve(
  process.cwd(),
  'playwright',
  '.auth',
  'user.json'
);
 
test.use({
  storageState: authFile
});
 
test(
  'Access inventory using stored authentication',
  async ({ page }) => {
 
    await page.goto(
      'https://www.saucedemo.com/inventory.html'
    );
 
    // Verify login
    await expect(page).toHaveURL(
      /inventory\.html/
    );
 
    await expect(
      page.locator('.title')
    ).toHaveText('Products');
  }
);
 
test(
  'Verify logout for authenticated user',
  async ({ page }) => {
 
    await page.goto(
      'https://www.saucedemo.com/inventory.html'
    );
 
    // Open menu
    await page.locator('#react-burger-menu-btn').click();
 
    const logout = page.getByText('Logout', {
      exact: true
    });
 
    await expect(logout).toBeVisible();
  }
);
 
test(
  'Logout authenticated user',
  async ({ page }) => {
 
    await page.goto(
      'https://www.saucedemo.com/inventory.html'
    );
 
    // Open menu
    await page.locator('#react-burger-menu-btn').click();
 
    const logout = page.getByText('Logout', {
      exact: true
    });
 
    await expect(logout).toBeVisible();
 
    await logout.click();
 
    // Verify logout
    await expect(page).toHaveURL(
      'https://www.saucedemo.com/'
    );
 
    await expect(
      page.locator('#login-button')
    ).toBeVisible();
  }
);
 