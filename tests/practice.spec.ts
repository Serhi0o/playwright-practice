import { test, expect } from '@playwright/test';

test.describe('Login tests', () => {
test('checkboxes and radiobuttons', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/checkboxes');

  await page.getByLabel('Checkbox 2').uncheck();
  await page.getByLabel('Checkbox 1').check();
  await expect(page.getByLabel('Checkbox 2')).not.toBeChecked;
  await expect(page.getByLabel('Checkbox 1')).toBeChecked; 
});

test('dropdown', async ({page}) => {
  await page.goto('https://practice.expandtesting.com/dropdown');
  await page.locator('#dropdown').selectOption('Option 1');
})
})
