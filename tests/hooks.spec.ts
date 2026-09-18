import { test, expect, type BrowserContext, type Page } from '@playwright/test';
 
let context: BrowserContext;
let setupPage: Page;

//run once before all
test.beforeAll(async ({ browser }) => {
  console.log('------- BEFORE ALL -------');
  context = await browser.newContext();
  setupPage = await context.newPage();
  await setupPage.goto('https://playwright.dev/');
  console.log('Common setup completed');
});
//run before every test
test.beforeEach(async ({ page }) => {
 
  console.log('-------- BEFORE EACH --------');
  await page.goto('https://playwright.dev/');
  console.log('Navigated to Playwright website');
});

test('Verify page title', async ({ page }) => {
  await expect(page).toHaveTitle(/Playwright/);
});

test('Verify page URL', async ({ page }) => {
  await expect(page).toHaveURL('https://playwright.dev/');
});
//run after every test
test.afterEach(async ({ page }, testInfo) => {
  console.log('-------- AFTER EACH ---------');
  console.log(`Test: ${testInfo.title}`);
  console.log(`Status: ${testInfo.status}`);
  if (testInfo.status !== testInfo.expectedStatus) {
    await testInfo.attach('failure-screenshot', {
      body: await page.screenshot({
        fullPage: true
      }),
      contentType: 'image/png'
    });
    console.log('Failure screenshot attached');
  }
});
//run once after all
test.afterAll(async () => {
  console.log('------- AFTER ALL -------');
  await setupPage.close();
  await context.close();
  console.log('Common test resources cleaned up');
});