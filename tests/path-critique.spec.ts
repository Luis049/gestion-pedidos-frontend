import { test, expect } from '@playwright/test';
import { executeSeed } from './scripts/execute';
import { AuthTest } from './auth/auth';
import { CompanyTest } from './companies/companies';
import { StoreTest } from './stores/stores';
import { OperatorTest } from './operators/operators';
import { MachineTest } from './machines/machines';
import { OrderTest } from './orders/orders';

test.describe('Gestion de ordenes', () => {
  test.slow();
  test.beforeAll(async () => {
    await executeSeed();
  });
  test('Crear una empresa', async ({ browser }) => {
    const pageSuperAdmin = await browser.newPage();
    const pageAdmin = await browser.newPage();
    const pageClient = await browser.newPage();

    // SUPER ADMIN
    const authSuperAdminTest = new AuthTest(pageSuperAdmin);
    const companyTest = new CompanyTest(pageSuperAdmin);
    // Login con superAdmin
    await authSuperAdminTest.login('SuperAdmin', 'SuperAdmin');

    // Crear una empresa con superAdmin
    await companyTest.createCompany('Vantino', '123456890A');

    // // Cerrar sesión
    // await authSuperAdminTest.closeSession();

    // ADMIN
    const authAdminTest = new AuthTest(pageAdmin);
    const storeTest = new StoreTest(pageAdmin);
    const operatorTest = new OperatorTest(pageAdmin);
    const machineTest = new MachineTest(pageAdmin);
    // Login Vantino con admin
    await authAdminTest.login('Vantino', '123456890A');

    // Crear una tiendas con admin
    await storeTest.createStore('Tienda 1', 'Calle Principal 1', 'encargado1', '12345');
    await storeTest.createStore('Tienda 2', 'Calle Principal 2', 'encargado2', '12345');

    // Verificar que se muestra un mensaje de error cuando se intenta crear una tienda con el mismo nombre de la tienda
    await storeTest.createStore('Tienda 1', 'Calle Principal 3', 'encargado2', '12345');
    const messageErrorNameStore = pageAdmin.locator('[data-test-id="messageError"]');
    expect(messageErrorNameStore).toHaveText('El nombre de la tienda ya está en uso');
    await pageAdmin.locator('[data-test-id="btn-cancel-store"]').click();

    // Verificar que se muestra un mensaje de error cuando se intenta crear una tienda con el mismo nombre del encargado
    await storeTest.createStore('Tienda 3', 'Calle Principal 3', 'encargado1', '12345');
    const messageErrorNameEncargado = pageAdmin.locator('[data-test-id="messageError"]');
    expect(messageErrorNameEncargado).toHaveText('El nombre de usuario ya existe');
    await pageAdmin.locator('[data-test-id="btn-cancel-store"]').click();

    // Crear un operador
    await operatorTest.createOperatorInStore('Operador 1', '12345','blue', 'Tienda 1');
    await operatorTest.createOperatorInStore('Operador 2', '12345','red', 'Tienda 1');
    await operatorTest.createOperatorInStore('Operador 3', '12345','green', 'Tienda 1');
    await operatorTest.createOperatorInStore('Operador 4', '12345','purple', 'Tienda 2');
    await operatorTest.createOperatorInStore('Operador 5', '12345', 'yellow', 'Tienda 2');

    // Crear una maquina
    await machineTest.createMachineInStore('Maquina 1', 'blue', 'Tienda 1');
    await machineTest.createMachineInStore('Maquina 2', 'red', 'Tienda 1');
    await machineTest.createMachineInStore('Maquina 1', 'green', 'Tienda 2');
    await machineTest.createMachineInStore('Maquina 2', 'purple', 'Tienda 2');

    await machineTest.createMachineInStore('Maquina 1', 'purple', 'Tienda 1');
    const messageErrorNameMachine = pageAdmin.locator('[data-test-id="messageError"]');
    expect(messageErrorNameMachine).toHaveText('El nombre de la maquina ya está en uso');
    await pageAdmin.locator('[data-test-id="btn-cancel-machine"]').click();


    // CLIENTE
    const authClientTest = new AuthTest(pageClient);
    const orderTest = new OrderTest(pageClient);

    await authClientTest.loginClient('Yan Hernandez', '3008096234');

    await orderTest.createOrderInStore('Pedido 1', 'Tienda 2', 'C:\\Users\\Yan Hernandez\\Documents\\Pruebas Vantino\\ALBERTO QUIBDO 58X124CM.pdf');
    let validateOrder = pageClient.locator(`[data-test-id="order-ref-1"]`);
    expect(validateOrder).toHaveText('Referencia: 1');
    // Validar que el admin vantino no puede ver el pedido


    await orderTest.createOrderInStore('Pedido 2', 'Tienda 2', 'C:\\Users\\Yan Hernandez\\Documents\\Pruebas Vantino\\ALBERTO QUIBDO 58X124CM.pdf');
    validateOrder = pageClient.locator(`[data-test-id="order-ref-2"]`);
    expect(validateOrder).toHaveText('Referencia: 2');

  });
});
