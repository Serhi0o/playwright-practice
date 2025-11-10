import { test, expect } from '@playwright/test';

test.describe('inventory tests', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://www.saucedemo.com/');
        const userNameField = page.locator('input[data-test="username"]');
        const passwordField = page.locator('//input[@name="password"]');

        await userNameField.fill('standard_user');
        await passwordField.fill('secret_sauce');

        await page.locator('#login-button').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await page.locator('[data-test="title"]').textContent('Products');
    });

    test('6 products displayed by default', async ({page}) => {
        const items = page.locator('.inventory_item');
        await expect(items).toHaveCount(6);
        expect(await items.count()).toBe(6);
    });

test('UI things are displayed', async ({page}) => {
await page.waitForTimeout
await expect(page.locator("#react-burger-menu-btn")).toBeVisible();
await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
        
    });

});
