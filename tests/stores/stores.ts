import { Page } from "@playwright/test";

export class StoreTest {
  constructor(private page: Page) {}

  async createStore(name: string, address: string, username: string, password: string) {
    const menu = this.page.locator('[data-test-id="menu-item-tiendas"]');
    await menu.click();

    const btnAddStore = this.page.locator('[data-test-id="btn-add-store"]');
    await btnAddStore.click();

    const inputNameStore = this.page.locator('[data-test-id="input-name-store"]');
    const inputAddressStore = this.page.locator('[data-test-id="input-address-store"]');
    const inputUsernameStore = this.page.locator('[data-test-id="input-username-store"]');
    const inputPasswordStore = this.page.locator('[data-test-id="input-password-store"]');

    await inputNameStore.fill(name);
    await inputAddressStore.fill(address);
    await inputUsernameStore.fill(username);
    await inputPasswordStore.fill(password);

     // Interceptar la petición de creación
     const responsePromise = this.page.waitForResponse(
      response => response.url().includes('/stores')
    );

    const btnSaveStore = this.page.locator('[data-test-id="btn-save-store"]');
    await btnSaveStore.click();

    await responsePromise;
  }
}
