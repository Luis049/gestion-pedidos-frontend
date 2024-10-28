import { Page } from "@playwright/test";

export class AuthTest{
  constructor(private page: Page){

  }
  async login(username: string, password: string){
     // Ir a la ruta de admin-login
     await this.page.goto('/admin-login');
     // Identificar los inputs de username y password
     const inputUsername = this.page.locator('[data-test-id="username"]');
     const inputPassword = this.page.locator('[data-test-id="password"]');

     // Ingresar datos de username y password
     await inputUsername.fill(username);
     await inputPassword.fill(password);

     // Identificar el botón de login y hacer clic en él
     const btnLogin = this.page.locator('[data-test-id="btn-login"]');
     await btnLogin.click();
  }

  async closeSession(){
    const btnLogout = this.page.locator('[data-test-id="btn-logout"]');
    await btnLogout.click();
  }
}
