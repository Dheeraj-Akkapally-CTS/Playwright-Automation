import { test, expect } from '@playwright/test';
 
test.describe('Handle Dialogs', () => {
 
  test('Handle alert dialog', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('I am a JS Alert');
      await dialog.accept();
    });
    await page.getByRole('button', {name: 'Click for JS Alert'}).click();
    await expect(page.getByText('You successfully clicked an alert')).toBeVisible();
  });
 
  test('Handle accept dialog - accept', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept();
    });
    await page.getByRole('button', {name: 'Click for JS Confirm'}).click();
    await expect(page.getByText('You clicked: Ok')).toBeVisible();
  });
 
  test('Handle dismiss dialog', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.dismiss();
    });
    await page.getByRole('button', { name: 'Click for JS Confirm'}).click();
    await expect(page.getByText('You clicked: Cancel')).toBeVisible();
  });
 
  test('Handle prompt dialog', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      expect(dialog.message()).toBe('I am a JS prompt');
      expect(dialog.defaultValue()).toBe('');
      await dialog.accept('Dheeraj');
    });
    await page.getByRole('button', {name: 'Click for JS Prompt'}).click();
    await expect(page.getByText('You entered: Dheeraj')).toBeVisible();
  });
 
});