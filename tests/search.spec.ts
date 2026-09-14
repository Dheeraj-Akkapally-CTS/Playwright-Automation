import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { EmployeePage } from '../pages/EmployeePage';

test.setTimeout(50000);
test('User can search for an employee', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const employeePage = new EmployeePage(page);
  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');
  await expect(page).toHaveURL(/dashboard/);
  await homePage.openPIM();
  await expect(page).toHaveURL(/pim/);
  await employeePage.searchEmployee('Joy Smith');
  await expect(employeePage.employeeTable)
    .toContainText('Joy Smith');
  await page.waitForTimeout(6000);
});
 