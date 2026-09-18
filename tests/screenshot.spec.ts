import { test, expect } from '@playwright/test';

test.use({video: 'on'});
//full page screenshot
test('Capture full page screenshot', async ({ page }, testInfo) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
  await page.screenshot({
    path: testInfo.outputPath('full-page.png'),
    fullPage: true
  });
});

//element screenshot
test('Capture element screenshot', async ({ page }, testInfo) => {
  await page.goto('https://playwright.dev/');
  const heading = page.getByRole(
    'heading',
    {
      name: /Playwright enables reliable/
    }
  );
  await heading.screenshot({path: testInfo.outputPath('heading.png')});
});
 
//screenshot and video
test('Capture screenshot and record video', async ({page}, testInfo) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', {name: 'Get started'}).click();
  await expect(page).toHaveURL(/.*docs\/intro/);
  // Screenshot
  await page.screenshot({
    path: testInfo.outputPath(
      'after-navigation.png'
    ),
    fullPage: true
  });
});

//attach screenshot to report
test('Attach screenshot to report', async ({page}, testInfo) => {
  await page.goto('https://playwright.dev/');
  const screenshot =await page.screenshot();
  await testInfo.attach(
    'playwright-home',
    {
      body: screenshot,
      contentType: 'image/png'
    }
  );
});