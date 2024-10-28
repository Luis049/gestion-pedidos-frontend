import { Page } from '@playwright/test';

export class CompanyTest {
  constructor(private page: Page) {}

  async createCompany(name: string, password: string) {
    // Identificar el botón de menu de empresas y hacer clic en él
    const menu = this.page.locator('[data-test-id="menu-item-empresas"]');
    await menu.click();

    const btnAddCompany = this.page.locator('[data-test-id="btn-add-company"]');
    await btnAddCompany.click();

    const inputNameCompany = this.page.locator('[data-test-id="input-name-company"]');
    const inputPasswordCompany = this.page.locator('[data-test-id="input-password-company"]');

    await inputNameCompany.fill(name);
    await inputPasswordCompany.fill(password);

    const btnCreateCompany = this.page.locator('[data-test-id="btn-create-company"]');
    await btnCreateCompany.click();

  }
}
