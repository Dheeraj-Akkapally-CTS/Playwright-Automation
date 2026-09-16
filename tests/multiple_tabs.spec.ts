import { test, expect } from '@playwright/test';

test('Handle multiple pages in a browser context', async ({browser}) => {
  const context = await browser.newContext();
  const page1 = await context.newPage();
  await page1.goto('https://demoqa.com/');
  const page2 = await context.newPage();
  await page2.goto('https://the-internet.herokuapp.com/windows');
  await expect(page1).toHaveTitle('demosite');
  await expect(page2).toHaveTitle(/The Internet/);
  //switch page 1
  await page1.bringToFront();
  await expect(page1).toHaveTitle('demosite');
  //switch page 2
  await page2.bringToFront();
  await expect(page2).toHaveTitle(/The Internet/);
  await context.close();
});