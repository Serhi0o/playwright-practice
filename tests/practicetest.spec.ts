// test_cart.spec.ts
import { test, expect } from '@playwright/test';

test('перевірка додавання товару до кошика', async ({ page }) => {
    // 1. Перейди на сторінку
    await page.goto('/products');

    // 2. Перевір, що лічильник спочатку 0 (Використовуй getByTestId)
    await expect(page.getByTestId('[data-testid="cart-count"]')).toHaveText('0');

    // 3. Натисни кнопку 'Додати до кошика' (Використовуй getByRole)
    // Орієнтуйся на роль 'button' та видимий текст
    await page.getByRole('button', { name: 'Додати до кошика' }).click();

    // 4. Перевір, що лічильник оновився до 1
    await expect(page.getByTestId('[data-testid="cart-count"]')).toHaveText('1');
});