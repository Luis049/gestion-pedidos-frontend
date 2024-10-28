import { Page } from "@playwright/test";

export class MachineTest {
  constructor(
    private page: Page
  ) {}

  async createMachineInStore(
    name: string,
    color: string,
    nameStore: string,
  ) {
    // Buscamos la tarjeta con el nombre de la tienda
    const cardStore = this.page.locator(
      `[data-test-id="card-store-${nameStore}"]`,
    );
    const btnAddMachine = cardStore.locator(
      `[data-test-id="btn-add-machine-${nameStore}"]`,
    );
    await btnAddMachine.click();

    const inputNameMachine = this.page.locator(
      `[data-test-id="input-name-machine"]`,
    );

    const inputColorMachine = this.page.locator(
      `[data-test-id="input-color-machine"]`,
    );

    await inputNameMachine.fill(name);
    await inputColorMachine.click();
    await inputColorMachine.locator(`[data-test-id="item-color-${color}"]`).click();

    const btnSaveMachine = this.page.locator(
      `[data-test-id="btn-save-machine"]`,
    );
    await btnSaveMachine.click();
  }
}
