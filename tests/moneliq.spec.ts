import { test, expect } from '@playwright/test';

test.describe('Moneliq tests', () => {

  test('Opening Personal account', async ({ page, context }) => {
    // Navigate to the main page
    await page.goto('https://www.moneliq.com/');

    // Click 'Open Moneliq account' and wait for the new page
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: 'Open Moneliq account' }).first().click(),
    ]);

    // Check URL of the new page
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(/register/);
    
    // Click 'Get started'
    const getStartedButton = newPage.getByRole('button', { name: 'Get Started' });
    await expect(getStartedButton).toBeVisible();
    await getStartedButton.click();
// ... (previous steps to navigate to the personal info page)

// Wait for the new URL to load after clicking 'Get started'
await expect(newPage).toHaveURL(/personal-info/);

const Name = newPage.locator('input[aria-label="Name"]');
    await Name.fill('Dan');
    await Name.blur();

    const Surname = newPage.locator('input[aria-label="Surname"]');
    await Surname.fill('Lee');
    await Surname.blur();

const dateOfBirthGroup = newPage.getByRole('group', { name: 'Date of birth' });

// Now, locate the placeholders within that group
const dayInput = dateOfBirthGroup.getByPlaceholder('dd');
const monthInput = dateOfBirthGroup.getByPlaceholder('mm');
const yearInput = dateOfBirthGroup.getByPlaceholder('yyyy');

// Add an assertion to check if the group is visible
await expect(dateOfBirthGroup).toBeVisible();

// Now you can fill the date of birth fields
await dayInput.fill('01');
await monthInput.fill('01');
await yearInput.fill('1990');

  });
});

