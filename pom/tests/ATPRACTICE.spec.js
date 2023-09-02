// @ts-nocheck
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login-pages');
import dotenv from 'dotenv'
dotenv.config()

test('LoginExitoso', async ({ page }) => {
  await page.goto(process.env.URLPAGE)
  const loginpage = new LoginPage(page);
  await loginpage.submitloginform(process.env.USER, process.env.PASSWORD);
  await page.waitForSelector(`text=Hello softwarepruebas7 (not softwarepruebas7? Sign out) From your account dashbo`);

});

test('LoginFallidoPasswordDiferente', async ({ page }) => {
  await page.goto(process.env.URLPAGE)
  const loginpage = new LoginPage(page);
  await loginpage.submitloginform(process.env.USER, process.env.BADPASSWORD);
  await page.waitForSelector(`text=Error: The password you entered for the username softwarepruebas7@gmail.com`);
});

test('LoginFallidoCampoDePasswordVacio', async ({ page }) => {
  await page.goto(process.env.URLPAGE)
  const loginpage = new LoginPage(page);
  await loginpage.submitloginform(process.env.USER, '');
  await page.waitForSelector(`text=Error: Password is required`);
});

test('LoginFallidoCampoDeUserVacio', async ({ page }) => {
  await page.goto(process.env.URLPAGE)
  const loginpage = new LoginPage(page);
  await loginpage.submitloginform('', process.env.PASSWORD);
  await page.waitForSelector(`text=Error: Username is required`);
});

test('LoginFallidoCamposVacios', async ({ page }) => {
  await page.goto(process.env.URLPAGE)
  const loginpage = new LoginPage(page);
  await loginpage.submitloginform('', '');
  await page.waitForSelector(`text=Error: Username is required`);
});

test('ValidarLoginCase-Sensitive', async ({ page }) => {
  await page.goto(process.env.URLPAGE)
  const loginpage = new LoginPage(page);
  await loginpage.submitloginform(process.env.USER, process.env.PASSWORDMAYUSC);
  await page.waitForSelector(`text=Error: The password you entered for the username softwarepruebas7@gmail.com is incorrect.`);
});

test('Login-Logout', async ({ page }) => {
  await page.goto(process.env.URLPAGE)
  const loginpage = new LoginPage(page);
  await loginpage.submitloginform(process.env.USER, process.env.PASSWORD);
  await page.waitForSelector(`text=Hello softwarepruebas7 (not softwarepruebas7? Sign out) From your account dashbo`);
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.waitForSelector('#customer_login');
});