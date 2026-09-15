import { test, expect } from '@playwright/test';
 
test('User can hover over an element', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/hovers');
  const firstImage = page.locator('.figure').first();
  //hover
  await firstImage.hover();
  await expect(firstImage.getByText('name: user1')).toBeVisible();
  const secondImage = page.locator('.figure').nth(1);
  await secondImage.hover();
  await expect(secondImage.getByText('name: user2')).toBeVisible();
  await page.waitForTimeout(3000);
});
 
test('User can navigate by clicking link an element', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  const link = page.getByRole('link', { name: 'Add/Remove Elements' });
  await link.dblclick();
  await expect(page).toHaveURL(/add_remove_elements/);
  await page.waitForTimeout(3000);
});
 
test('User can drag and drop an element', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
  const columnA = page.locator('#column-a');
  const columnB = page.locator('#column-b');
  await columnA.dragTo(columnB);
  await page.waitForTimeout(3000);
});
 
test('User can use force option when necessary', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  const link = page.getByRole('link', { name: 'Checkboxes' });
  await link.click({ force: true });
  await expect(page).toHaveURL(/checkboxes/);
  const firstCheckbox = page.locator('input[type="checkbox"]').first();
  //checkbox
  await firstCheckbox.check();
  await expect(firstCheckbox).toBeChecked();
  await page.waitForTimeout(3000);
});