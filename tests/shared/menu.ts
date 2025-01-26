import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
export class MenuTest {
  constructor(private page: Page) {}

  async goToMenu(nameMenu: string){
    const menu = this.page.locator(`[data-test-id="menu-item-${nameMenu}"]`);
    await menu.click();
  }
}
