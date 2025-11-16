 import { test, expect } from '@playwright/test';
 import PomManager from '../pages/PomManager.js';

 let pm;

 test.describe('Login Tests', () => {

    test.beforeEach(async ({page}) => {
        pm = new PomManager(page)
    })

    test.afterEach(async ({page}) => {
        await page.close()
    })

    test('Login with valid credentials', async () => {
        await pm.loginPage.openLink();
        await pm.loginPage.login('tomsmith', 'SuperSecretPassword!')
        await pm.securePage.assertLoggedInMessage('You logged into a secure area!')
    })

    test ('Login with invalid credentials', async () => {
        await pm.loginPage.openLink();
        await pm.loginPage.login('tomsmith', 'invalidSecretPassword!')
        await pm.loginPage.assertErrorMessage('Your password is invalid!')
    })

 })

 test.describe('Login Tests', () => {

    test.beforeEach(async ({page}) => {
        pm = new PomManager(page)
    })

    test.afterEach(async ({page}) => {
        await page.close()
    })

    test('Check and uncheck checkboxes', async () => {
        await pm.checkboxesPage.openLink()
        await pm.checkboxesPage.verifyCheckbox(1)
        await pm.checkboxesPage.assertCheckbox(1, true)

        await pm.checkboxesPage.openLink()
        await pm.checkboxesPage.verifyCheckbox(2)
        await pm.checkboxesPage.assertCheckbox(2, false)
    })
})