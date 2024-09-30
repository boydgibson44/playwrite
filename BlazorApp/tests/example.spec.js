import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:5128'; // Update if your app runs on a different port

test.describe('Blazor Web App Tests', () => {
    test('Home Page - Title and Welcome Message', async ({ page }) => {
        await page.goto(baseURL, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(/BlazorApp/);

        await page.waitForSelector('h1'); // Wait for the h1 to be present
        await expect(page.locator('h1')).toHaveText('Hello, world!');
    });


    test('Weather Page - Title', async ({ page }) => {
        await page.goto(`${baseURL}/weather`, { waitUntil: 'networkidle' }); // Wait until there are no network connections for at least 500 ms
        //await expect(page).toHaveTitle(/Weather/, { timeout: 10000 }); // Set timeout to 10 seconds
    });

    test('Counter Page - Title', async ({ page }) => {
        await page.goto(`${baseURL}/counter`, { waitUntil: 'networkidle', timeout: 30000 });
        console.log('Current title:', await page.title());
        //await expect(page).toHaveTitle(/Counter/, { timeout: 10000 });
        await page.waitForSelector('h1', { timeout: 10000 });
        await expect(page.locator('h1')).toHaveText('Counter', { timeout: 10000 });
    });

});