import { test, expect } from '@playwright/test';
 
test('Handle iframe using frameLocator', async ({ page }) => {
  await page.goto('https://playground.qajourney.net/iframes/');
  //form inside iframe
  const frame = page.frameLocator('[data-testid="form-iframe"]' );
  //input inside iframe
  const input = frame.locator('[data-testid="iframe-input"]');
  await input.click();
  //fill input
  await input.fill('Hello World!');
  await expect(input).toHaveValue('Hello World!');
  //submit button inside iframe
  const submitBtn = frame.locator('[data-testid="iframe-submit"]');
  await submitBtn.click();
  const result = frame.locator('[data-testid="iframe-result"]');
  await expect(result).toContainText('Hello World!');
});