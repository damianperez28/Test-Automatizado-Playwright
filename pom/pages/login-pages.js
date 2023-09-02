const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.user = page.getByLabel('Username or email address *');
    this.password = page.locator('#password');
    this.botonlogin = page.getByRole('button', { name: 'Login' });
  }
  
  async submitloginform(usuario, contraseña) {
    await this.user.fill(usuario);
    await this.password.fill(contraseña);
    await this.botonlogin.click();
  }
};