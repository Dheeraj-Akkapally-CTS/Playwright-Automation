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
 
test('Access inventory using stored authentication',async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html',{
       waitUntil: 'domcontentloaded' }
    );
    await expect(page).toHaveURL(/inventory\.html/,
      { timeout: 10000 }
    );
    await expect(
      page.locator('.title')
    ).toHaveText('Products', {
      timeout: 10000
    });
  }
);
 
test('Verify logout for authenticated user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html',{
       waitUntil: 'domcontentloaded' }
    );
    await expect(
      page.locator('.title')
    ).toHaveText('Products', {
      timeout: 10000
    });
    const menuButton = page.locator('#react-burger-menu-btn');
    await expect(menuButton).toBeVisible({timeout: 10000});
    await menuButton.click();
    const logout = page.getByText('Logout', {
      exact: true
    });
    await expect(logout).toBeVisible({timeout: 10000});
  }
);
 
test('Logout authenticated user',async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html',
      { waitUntil: 'domcontentloaded' }
    );
    await expect(page.locator('.title')).toHaveText('Products', {timeout: 10000});
    const menuButton = page.locator(
      '#react-burger-menu-btn'
    );
    await expect(menuButton).toBeVisible({timeout: 10000});
    await menuButton.click();
    const logout = page.getByText('Logout', {
      exact: true
    });
    await expect(logout).toBeVisible({timeout: 10000});
    await logout.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/',{ timeout: 10000 });
    await expect(page.locator('#login-button')).toBeVisible({timeout: 10000});
  }
);
 