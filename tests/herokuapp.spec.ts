import {test, expect} from '@playwright/test';

test('Main page contents', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/');

    await expect(page.getByText('Welcome to the-Internet')).toBeVisible();
    await expect(page.getByAltText('fork me on github')).toBeVisible();
    await page.getByRole('link', { name: /Checkboxes/i }).click(); 
}); 

test('Checkboxes', async ({ page }) => { 
    await page.goto('https://the-internet.herokuapp.com/checkboxes'); 

    await expect(page.getByText(/Checkbox 1/i)).toBeVisible();
    await expect(page.getByText(/Checkbox 2/i)).toBeVisible();

    const locator1 = page.getByRole('checkbox').first();
    await locator1.click();
    await expect(locator1).toBeChecked();
});

test('Add/Remove Elements @smoke', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await expect (page.getByText('Add/Remove Elements')).toBeVisible();
    await page.getByText('Add/Remove Elements').click();

    await expect (page.getByRole('button', {name: /Add Element/i })).toBeVisible();
    await page.getByRole('button', {name: /Add Element/i }).click();

    await expect (page.getByRole('button', {name: /Delete/i })).toBeVisible();
    await page.getByRole('button', {name: /Delete/i}).click();

    await expect (page.getByRole('button', {name: /Delete/i})).not.toBeVisible();

});