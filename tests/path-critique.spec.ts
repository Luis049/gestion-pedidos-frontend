import { test, expect } from '@playwright/test';
import { executeSeed } from './scripts/execute';
import { AuthTest } from './auth/auth';
import { CompanyTest } from './companies/companies';
import { StoreTest } from './stores/stores';
import { OperatorTest } from './operators/operators';
import { MachineTest } from './machines/machines';
import { OrderTest } from './orders/orders';
import { MenuTest } from './shared/menu';
import { EnumColors } from './shared/colors';

test.describe('Gestion de ordenes', () => {
  test.beforeAll(async () => {
    await executeSeed();
  });
  test('Crear una empresa', async ({ browser }) => {
    const pageSuperAdmin = await browser.newPage();
    const pageAdmin = await browser.newPage();
    const pageOperator = await browser.newPage();
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
    await storeTest.createStore('Tienda 1', 'Calle Principal 1', 'encargado1', '123456890A');
    // await storeTest.createStore('Tienda 2', 'Calle Principal 2', 'encargado2', '123456890A');

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
    await operatorTest.createOperatorInStore('Operador1', '12345', EnumColors.AZUL, 'Tienda 1');
    await operatorTest.createOperatorInStore('Operador2', '12345', EnumColors.ROJO, 'Tienda 1');
    await operatorTest.createOperatorInStore('Operador3', '12345', EnumColors.VERDE, 'Tienda 1');
    await operatorTest.createOperatorInStore('Operador4', '12345', EnumColors.MORADO, 'Tienda 1');
    await operatorTest.createOperatorInStore('Operador5', '12345', EnumColors.AMARILLO, 'Tienda 1');

    // Crear una maquina
    await machineTest.createMachineInStore('Maquina 1', EnumColors.AZUL, 'Tienda 1');
    await machineTest.createMachineInStore('Maquina 2', EnumColors.ROJO, 'Tienda 1');
    await machineTest.createMachineInStore('Maquina 3', EnumColors.VERDE, 'Tienda 1');
    await machineTest.createMachineInStore('Maquina 4', EnumColors.MORADO, 'Tienda 1');
    await machineTest.createMachineInStore('Maquina 5', EnumColors.AMARILLO, 'Tienda 1');
    await machineTest.createMachineInStore('Maquina 6', EnumColors.ROSA, 'Tienda 1');
    await machineTest.createMachineInStore('Maquina 7', EnumColors.TURQUESA, 'Tienda 1');
    await machineTest.createMachineInStore('Maquina 8', EnumColors.INDIGO, 'Tienda 1');
    await machineTest.createMachineInStore('Maquina 9', EnumColors.ESMERALDA, 'Tienda 1');
    await machineTest.createMachineInStore('Maquina 10', EnumColors.CORAL, 'Tienda 1');
    await machineTest.createMachineInStore('Maquina 11', EnumColors.LIMA, 'Tienda 1');
    await machineTest.createMachineInStore('Maquina 12', EnumColors.CIELO, 'Tienda 1');
    await machineTest.createMachineInStore('Maquina 13', EnumColors.AMBAR, 'Tienda 1');

    await machineTest.createMachineInStore('Maquina 1', EnumColors.AMARILLO, 'Tienda 1');
    const messageErrorNameMachine = pageAdmin.locator('[data-test-id="messageError"]');
    expect(messageErrorNameMachine).toHaveText('El nombre de la maquina ya está en uso');
    await pageAdmin.locator('[data-test-id="btn-cancel-machine"]').click();


    // CLIENTE
    const authClientTest = new AuthTest(pageClient);
    const orderClientTest = new OrderTest(pageClient);

      await authClientTest.loginClient('YanHernandez', '3008096234');

    await orderClientTest.createOrderInStore('Pedido 1', 'Tienda 1', 'C:\\Users\\Yan Hernandez\\Documents\\Pruebas Vantino\\ALBERTO QUIBDO 58X124CM.pdf');
    await orderClientTest.createOrderInStore('Pedido 2', 'Tienda 1', 'C:\\Users\\Yan Hernandez\\Documents\\Pruebas Vantino\\ALBERTO QUIBDO 58X124CM.pdf');
    await orderClientTest.createOrderInStore('Pedido 3', 'Tienda 1', 'C:\\Users\\Yan Hernandez\\Documents\\Pruebas Vantino\\ALBERTO QUIBDO 58X124CM.pdf');
    await orderClientTest.createOrderInStore('Pedido 4', 'Tienda 1', 'C:\\Users\\Yan Hernandez\\Documents\\Pruebas Vantino\\ALBERTO QUIBDO 58X124CM.pdf');

    await orderClientTest.createOrderInStore('Pedido 5', 'Tienda 1', 'C:\\Users\\Yan Hernandez\\Documents\\Pruebas Vantino\\ALBERTO QUIBDO 58X124CM.pdf');
    await orderClientTest.createOrderInStore('Pedido 6', 'Tienda 1', 'C:\\Users\\Yan Hernandez\\Documents\\Pruebas Vantino\\ALBERTO QUIBDO 58X124CM.pdf');
    await orderClientTest.createOrderInStore('Pedido 7', 'Tienda 1', 'C:\\Users\\Yan Hernandez\\Documents\\Pruebas Vantino\\ALBERTO QUIBDO 58X124CM.pdf');
    await orderClientTest.createOrderInStore('Pedido 8', 'Tienda 1', 'C:\\Users\\Yan Hernandez\\Documents\\Pruebas Vantino\\ALBERTO QUIBDO 58X124CM.pdf');

    let validateOrder = pageClient.locator(`[data-test-id="order-ref-1"]`);
    expect(validateOrder).toHaveText('Referencia: 1');
    // Validar que el admin vantino no puede ver el pedido

    // Ir con el admin vantino a la lista de ordenes y validar que no se muestra el pedido
    const menuTest = new MenuTest(pageAdmin);
    await menuTest.goToMenu('pedidos');
    // let validateListOrders = pageAdmin.locator('[data-test-id="table-tbody"]');
    // expect(validateListOrders).toHaveCount(1);


    await orderClientTest.createOrderInStore('Pedido 2', 'Tienda 1', 'C:\\Users\\Yan Hernandez\\Documents\\Pruebas Vantino\\ALBERTO QUIBDO 58X124CM.pdf');
    validateOrder = pageClient.locator(`[data-test-id="order-ref-2"]`);
    expect(validateOrder).toHaveText('Referencia: 2');

    // Validar que el elemento validateListOrders tenga 2 hijos
    // expect(validateListOrders).toHaveCount(2);


    // Ir a la lista de Operadores
    await menuTest.goToMenu('operadores');
    await operatorTest.createOperator('Operador6', '12345', EnumColors.CELESTE, 'Tienda 1');
    await operatorTest.createOperator('Operador7', '12345', EnumColors.AMARILLO, 'Tienda 1');

    const authOperatorTest = new AuthTest(pageOperator);
    const orderOperatorTest = new OrderTest(pageOperator);

    await authOperatorTest.login('Operador1', '12345');

    await orderOperatorTest.makeOrder('1');
    await orderOperatorTest.makeOrder('2');
    await orderOperatorTest.makeOrder('3');
    await orderOperatorTest.makeOrder('4');

    expect(true).toBe(true);
  });

});
1
