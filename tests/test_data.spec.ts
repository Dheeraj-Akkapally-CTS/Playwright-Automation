import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(
  process.cwd(),
  'test-data',
  'loginData.json'
);
const loginData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
for (const data of loginData) {
  test(data.testName, async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.getByLabel('Username').fill(data.username);
    await page.getByLabel('Password').fill(data.password);
    await page.getByRole('button', {name: 'Login'}).click();
    if (data.testName === 'Valid login') {
      await expect(
        page.locator('#flash')
      ).toContainText(data.expectedMessage);
    }
    else {
      await expect(
        page.locator('#flash')
      ).toContainText(data.expectedMessage);
    }
  });
}