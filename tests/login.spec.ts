import { test, expect } from '@playwright/test';

test.describe('Login tests', () => {
test ('Successful login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const userNameField = page.locator('input[data-test="username"]');
  const passwordField = page.locator('//input[@name="password"]');

await userNameField.fill('standard_user');
await passwordField.fill('secret_sauce');

await page.locator('#login-button').click();
await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
await expect(page.getByTestId('title')).toHaveText('Products');
});
});