import { test, expect } from '@playwright/test';
import { executeSeed } from './scripts/execute';

test.describe('Gestion de ordenes', () => {
  test.slow();
  test.beforeAll(async () => {
    console.log('Starting beforeAll');
    await executeSeed();
    console.log('Seed completed');
  });
  test('Crear una empresa', async ({ page }) => {
    // // Ir a la ruta de admin-login
    // await page.goto('/admin-login');
    // // Identificar los inputs de username y password
    // const inputUsername = page.locator('[data-test-id="username"]');
    // const inputPassword = page.locator('[data-test-id="password"]');

    // // Ingresar datos de username y password
    // await inputUsername.fill('SuperAdmin');
    // await inputPassword.fill('SuperAdmin');

    // // Identificar el botón de login y hacer clic en él
    // const btnLogin = page.locator('[data-test-id="btn-login"]');
    // await btnLogin.click();

    // // Verificar que se está en la página de dashboard/home
    // await expect(page).toHaveURL('/dashboard/home');

    // // Identificar el botón de menu de empresas y hacer clic en él
    // const menu = page.locator('[data-test-id="menu-item-empresas"]');
    // await menu.click();


    // await expect(page).toHaveURL('/dashboard/empresas');

    // const btnAddCompany = page.locator('[data-test-id="btn-add-company"]');
    // await btnAddCompany.click();

    // const inputNameCompany = page.locator('[data-test-id="input-name-company"]');
    // const inputPasswordCompany = page.locator('[data-test-id="input-password-company"]');

    // await inputNameCompany.fill('Vantino');
    // await inputPasswordCompany.fill('12345689A');


    // const btnCreateCompany = page.locator('[data-test-id="btn-create-company"]');
    // await btnCreateCompany.click();

  });
});
