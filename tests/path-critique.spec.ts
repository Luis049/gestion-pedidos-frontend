import { test, expect } from '@playwright/test';
import { executeSeed } from './scripts/execute';
import { AuthTest } from './auth/auth';
import { CompanyTest } from './companies/companies';
import { StoreTest } from './stores/stores';
import { OperatorTest } from './operators/operators';
import { MachineTest } from './machines/machines';

test.describe('Gestion de ordenes', () => {
  test.slow();
  test.beforeAll(async () => {
    await executeSeed();
  });
  test('Crear una empresa', async ({ page }) => {
    const storeTest = new StoreTest(page);
    const authTest = new AuthTest(page);
    const companyTest = new CompanyTest(page);
    const operatorTest = new OperatorTest(page);
    const machineTest = new MachineTest(page);
    // Login superAdmin
    await authTest.login('SuperAdmin', 'SuperAdmin');
    // Crear una empresa
    await companyTest.createCompany('Vantino', '123456890A');
    // Cerrar sesión
    await authTest.closeSession();

    // Login Vantino
    await authTest.login('Vantino', '123456890A');

    // Crear una tienda
    await storeTest.createStore('Tienda 1', 'Calle Principal 1', 'encargado1', '12345');

    // Crear un operador
    await operatorTest.createOperatorInStore('Operador 1', '123456', 'Tienda 1');

    // Crear una maquina
    await machineTest.createMachineInStore('Maquina 1', 'blue', 'Tienda 1');
  });
});
