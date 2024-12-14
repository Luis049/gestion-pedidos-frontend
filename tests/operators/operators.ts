import { Page } from '@playwright/test';

export class OperatorTest {
  constructor(private page: Page) {}

  async createOperatorInStore(
    name: string,
    password: string,
    color: string,
    nameStore: string,
  ) {
    // Buscamos la tarjeta con el nombre de la tienda
    const cardStore = this.page.locator(
      `[data-test-id="card-store-${nameStore}"]`,
    );
    const btnAddOperator = cardStore.locator(
      `[data-test-id="btn-add-operator-${nameStore}"]`,
    );
    await btnAddOperator.click();

    const inputNameOperator = this.page.locator(
      `[data-test-id="input-name-operator"]`,
    );
    const inputPasswordOperator = this.page.locator(
      `[data-test-id="input-password-operator"]`,
    );

    await inputNameOperator.fill(name);
    await inputPasswordOperator.fill(password);

    const inputColorOperator = this.page.locator(
      `[data-test-id="input-color-operator"]`,
    );

    await inputColorOperator.click();

    const item = this.page.locator(`[data-test-id="item-color-${color}"]`)
    await item.click();


    const btnSaveOperator = this.page.locator(
      `[data-test-id="btn-save-operator"]`,
    );
    await btnSaveOperator.click();

  }
}
