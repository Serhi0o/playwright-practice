import { test, expect } from '@playwright/test';

test.describe('Authorization tests - homework1', () => {

    test('Successful authorization', async ({page}) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await expect('#login-button').toBeDefined();
        await page.locator('#login-button').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
 
    test('Authorization without username', async({page}) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('.error-message-container')).toHaveText('Epic sadface: Username is required');
    });

     test('Authorization without password', async({page}) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('');
        await expect(page.locator('#login-button')).toHaveText('Login');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect.soft(page.locator('.error-message-container')).toHaveText('Epic sadface: Password is required');
        await expect(page.locator('.svg-inline--fa fa-times-circle fa-w-16 error_icon')).toBeDefined();
        await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user');
        await expect(page.locator('[data-test="password"]')).toBeEmpty;
    });

      test('Incorrect password', async({page}) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('randomtext');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('.error-message-container')).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

     test('Locked out user', async({page}) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('locked_out_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('.error-message-container')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });
}
)