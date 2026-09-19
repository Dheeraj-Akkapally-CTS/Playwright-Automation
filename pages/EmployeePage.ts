import { Page, Locator, expect } from '@playwright/test';
 
export class EmployeePage {
  readonly page: Page;
  readonly employeeNameInput: Locator;
  readonly searchButton: Locator;
  readonly employeeTable: Locator;
  constructor(page: Page) {
    this.page = page;
    this.employeeNameInput = page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Employee Name' })
      .getByPlaceholder('Type for hints...');
    this.searchButton = page.getByRole('button', {
      name: 'Search'
    });
    this.employeeTable = page.locator('.oxd-table-body');
  }
  async searchEmployee(employeeName: string) {
    await this.employeeNameInput.fill(employeeName);
    const suggestion = this.page
      .locator('.oxd-autocomplete-dropdown')
      .getByText(employeeName, { exact: false })
      .first();
    await expect(suggestion).toBeVisible({timeout:15000});
    await suggestion.click();
    await this.searchButton.click();
  }
}