import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
export class OrderTest {
  constructor(private page: Page) {}

  async createOrderInStore(
    description: string,
    nameStore: string,
    fileUrl: string,
  ) {
    if(!this.page.url().includes('dashboard/mis-pedidos')){
      // Identificar el botón de menu de empresas y hacer clic en él
      const menu = this.page.locator('[data-test-id="menu-item-mis-pedidos"]');
      await menu.click();
    }

    const btnAddOrder = this.page.locator('[data-test-id="btn-add-my-order"]');
    await btnAddOrder.click();

    const inputDescriptionOrder = this.page.locator('[data-test-id="input-description-order"]');
    const inputStoreOrder = this.page.locator('[data-test-id="input-store-order"]');
    const inputFileOrder = this.page.locator('[data-test-id="input-file-order"]');

    await inputDescriptionOrder.fill(description);
    await inputStoreOrder.selectOption({
      label: nameStore,
    });
    await inputFileOrder.setInputFiles(fileUrl);

    // Interceptar la petición de creación
    const responsePromise = this.page.waitForResponse(
      response => response.url().includes('/orders') && response.status() === 201
    );

    // Enviar el formulario
    const btnCreateOrder = this.page.locator('[data-test-id="btn-create-order"]');
    await btnCreateOrder.click();

    // Esperar la respuesta
    await responsePromise;

  }

  async validatedExistOrder(ref: string) {
    // Validar si es usuario logueado es admin
    let menuPedidos = null;
    let isAdmin = true;
    const labelRole = this.page.locator('[data-test-id="user-role"]');
    if(await labelRole.textContent() !== 'admin'){
      menuPedidos = this.page.locator('[data-test-id="menu-item-pedidos"]');
    }else{
      isAdmin = false;
      menuPedidos = this.page.locator('[data-test-id="menu-item-mis-pedidos"]');
    }

    if(menuPedidos){
      await menuPedidos.click();
    }

    // Verificar que el pedido existe
    const order = this.page.locator(`[data-test-id="order-ref-${ref}"]`);
    expect(order).toHaveText(`Referencia: ${ref}`);
  }

  async makeOrder(ref: string){
    if(!this.page.url().includes('dashboard/home')){
      // Identificar el botón de menu de empresas y hacer clic en él
      const menu = this.page.locator('[data-test-id="menu-item-pedidos"]');
      await menu.click();
    }
  }
}
