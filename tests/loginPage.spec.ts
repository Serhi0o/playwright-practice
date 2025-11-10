import {test, expect} from '@playwright/test'

await page.getByText('CLICK ME').click();

await page.getByRole('button', {name: /click me/i}).click();

