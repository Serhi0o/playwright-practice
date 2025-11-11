import {test, expect} from '@playwright/test';
import {chromium} from 'playwright';

let browser: any;
let context: any;
let page: any;

test.describe('Combining all tests', () => {

test.beforeAll (async () => {
    browser = await chromium.launch({headless: true});
    console.log("BEFORE ALL HOOK LAUNCHED CHROMIUM BROWSER");
});

test.beforeEach (async () => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/');
    console.log('BEFORE EACH LAUNCHED NEW PAGE');
    await page.pause();
});

test.afterEach (async () => {
    await page.close();
    await context.close();
    console.log("AFTER EACH HOOK CLOSED PAGE");
    });

test.afterAll (async () => {
    await browser.close();
    console.log("AFTER ALL HOOK CLOSED BROWSER");
});

test ('A/B Testing', async () => {
    await page.click('text="A/B Testing"')
    const header = await page.textContent('h3');
    expect(header).toBe('A/B Test Variation 1');
});

test ('Checkboxes', async () => {
    await page.getByText('Checkboxes').click();

    const checkbox1 = page.getByRole('checkbox').first();
    await expect(checkbox1).not.toBeChecked();

    const checkbox2 = page.getByRole('checkbox').nth(1);
    await expect(checkbox2).toBeChecked();
});

 test ('Geolocation', async () => {
    context = await browser.newContext({
        permissions: ['geolocation'],
        geolocation: {latitude: 37.774929, longitude: -122.419416},
        viewport: { width: 1280, height: 720 }
    });

    page = await context.newPage();
    console.log("USING CONTEXT AND PAGE CREATED WITHIN TEST AND NOT WITHIN HOOKS");
    await page.pause();
    await page.goto('https://the-internet.herokuapp.com/geolocation');
    await page.click('button');
    const lat = await page.textContent("#lat-value");
    const long = await page.textContent("#long-value");
    expect (parseFloat(lat)).toBeCloseTo(37.774929);
    expect (parseFloat(long)).toBeCloseTo(-122.419416);
 })
})
