import { test, expect } from '@playwright/test';
 
test('User can navigate to Playwright website', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
  await expect(
    page.getByRole('link', { name: 'Get started' })
  ).toBeVisible();
  await page.waitForTimeout(3000);
});