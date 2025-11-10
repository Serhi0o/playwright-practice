// Файл: tests/locatorsSeparation.spec.ts

import { test, expect } from '@playwright/test';
// Імпортуємо наш новий клас
import { LoginPage } from '../pom/pages/LoginPage'; 

test('вхід користувача (POM)', async ({ page }) => {
    
    // 1. Створюємо екземпляр класу LoginPage
    const loginPage = new LoginPage(page);
    
    // 2. Використовуємо методи класу, а не прямі page.fill/page.click
    
    // Перейти на сторінку
    await loginPage.gotoLoginPage();

    // Виконати вхід
    await loginPage.login('Serhiiiiiii7!', 'Serhiiiiiii7!');
    // Зверни увагу: якщо ти впевнений у паролі, можна використовувати більш прості локатори
    // Але краще використовувати різні змінні для імені користувача та пароля.

    // 3. Перевірка результату
    await expect(page).toHaveURL(loginPage.urlAfterLogin);
});