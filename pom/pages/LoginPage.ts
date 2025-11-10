// Файл: pom/pages/LoginPage.ts

import { Page, Locator } from '@playwright/test';

// Створюємо клас, який інкапсулює логіку сторінки
export class LoginPage {
    // 1. Оголошуємо властивість page, яка зберігатиме об'єкт Page
    public readonly page: Page;

    // 2. Визначаємо локатори як властивості класу (бажано приватні)
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    
    // Примітка: URL не є локатором, він використовується для перевірки.
    readonly urlAfterLogin = 'https://demoqa.com/profile'; 

    constructor(page: Page) {
        this.page = page;
        // Ініціалізуємо локатори, використовуючи найкращі Playwright-методи
        // Я візьму твої CSS-селектори, але оберну їх у page.locator:
        this.emailInput = page.locator('#userName'); // '#userName' з твого файлу
        this.passwordInput = page.locator('#password'); // '#password' з твого файлу
        this.loginButton = page.locator('#login'); // '#login' з твого файлу (якщо це ID кнопки)
    }

    /**
     * Метод: Перехід на сторінку логіну
     */
    async gotoLoginPage() {
        await this.page.goto('https://demoqa.com/login');
    }

    /**
     * Метод: Виконує повний процес входу. Це і є суть POM!
     */
    async login(username: string, password: string) {
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}