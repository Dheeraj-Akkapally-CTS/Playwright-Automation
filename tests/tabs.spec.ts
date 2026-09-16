import { test, expect } from '@playwright/test';
 
test('Handle a new browser tab', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');
  const popup = page.waitForEvent('popup');
  await page.getByText('Click Here').click();
  const newTab = await popup;
  await newTab.waitForLoadState();
  await expect(newTab).toHaveTitle('New Window');
  await expect(newTab.getByRole('heading', { name: 'New Window' })).toBeVisible();
  //switch to original tab
  await page.bringToFront();
  await expect(page.getByRole('heading', {name: 'Opening a new window'})).toBeVisible();
});