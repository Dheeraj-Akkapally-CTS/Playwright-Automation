import { Page, Locator } from '@playwright/test';
 
export class HomePage {
  readonly page: Page;
  readonly dashboardHeading: Locator;
  readonly pimMenu: Locator;
  constructor(page: Page) {
    this.page = page;
    this.dashboardHeading = page.getByRole('heading', {
      name: 'Dashboard'
    });
    this.pimMenu = page.getByText('PIM', { exact: true });
  }
  async openPIM() {
    await this.pimMenu.click();
  }
}