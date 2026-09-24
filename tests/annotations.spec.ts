import { test, expect } from '@playwright/test';
 
test('Skip test', async ({ page }) => {
 
  test.skip(true, 'Skipping for demo');
 
  await page.goto('https://playwright.dev/');
});
 
test('Conditional skip', async ({ page, browserName }) => {
 
  test.skip(
    browserName === 'firefox',
    'Skip on Firefox'
  );
 
  await page.goto('https://playwright.dev/');
 
  await expect(page).toHaveTitle(/Playwright/);
});
 
test('Fixme test', async ({ page }) => {
 
  test.fixme(true, 'Feature needs fixing');
 
  await page.goto('https://playwright.dev/');
});
 
test('Expected failure', async () => {
 
  test.fail(true, 'Failure is expected');
 
  expect(1).toBe(2);
});
 
test('Slow test', async ({ page }) => {
 
  test.slow(true, 'Test needs more time');
 
  await page.goto('https://playwright.dev/');
 
  await expect(page).toHaveTitle(/Playwright/);
});
 
test('Smoke test @smoke', async ({ page }) => {
 
  await page.goto('https://playwright.dev/');
 
  await expect(page).toHaveTitle(/Playwright/);
});
 
test('Regression test @regression', async ({ page }) => {
 
  await page.goto('https://playwright.dev/');
 
  await expect(page).toHaveTitle(/Playwright/);
});
 
test.describe('Login tests', () => {
 
  test('Valid login @smoke', async ({ page }) => {
 
    await page.goto(
      'https://the-internet.herokuapp.com/login'
    );
 
    await page.getByLabel('Username').fill('tomsmith');
 
    await page.getByLabel('Password').fill(
      'SuperSecretPassword!'
    );
 
    await page.getByRole('button', {
      name: 'Login'
    }).click();
 
    await expect(
      page.locator('#flash')
    ).toContainText(
      'You logged into a secure area!'
    );
  });
 
  test('Login page @regression', async ({ page }) => {
 
    await page.goto(
      'https://the-internet.herokuapp.com/login'
    );
 
    await expect(
      page.getByLabel('Username')
    ).toBeVisible();
 
    await expect(
      page.getByLabel('Password')
    ).toBeVisible();
  });
});
 
test('Custom annotations', async ({ page }, testInfo) => {
 
  testInfo.annotations.push({
    type: 'owner',
    description: 'QA Automation'
  });
 
  testInfo.annotations.push({
    type: 'jira',
    description: 'QA-1234'
  });
 
  await page.goto('https://playwright.dev/');
 
  await expect(page).toHaveTitle(/Playwright/);
});
 
test('Test information', async ({ page }, testInfo) => {
 
  console.log('Title:', testInfo.title);
  console.log('Project:', testInfo.project.name);
  console.log('File:', testInfo.file);
  console.log('Worker:', testInfo.workerIndex);
  console.log('Retry:', testInfo.retry);
 
  await page.goto('https://playwright.dev/');
});
 