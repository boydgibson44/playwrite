import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:5128'; // Update port | URL as necessary

test.describe('Weather Page Tests', () => {

    // Test 1: Ensure the Weather Page Title is Correct
    test('Weather Page - Title', async ({ page }) => {
        await page.goto(`${baseURL}/weather`, { waitUntil: 'networkidle' }); // Wait until there are no network connections for at least 500 ms
    });




    // Test 2: Ensure Weather Data is Loaded and "Loading..." Message is Shown Initially
    test('Weather Page - Loading Message and Weather Data Loaded', async ({ page }) => {
        await page.goto(`${baseURL}/weather`, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Check for the Loading Message
        const loadingMessage = page.locator('text=Loading...');
        const isLoadingVisible = await loadingMessage.isVisible();

        if (isLoadingVisible) {
            console.log('Loading message is visible.');
            await expect(loadingMessage).toBeVisible({ timeout: 5000 });
        } else {
            console.log('Loading message not found (may have loaded too quickly).');
        }

        // Now wait for the weather data table to appear
        const dataTable = page.locator('table');
        await expect(dataTable).toBeVisible({ timeout: 30000 });  // Increased timeout to ensure data loads

        // Ensure the table has data rows
        const rows = await page.locator('tbody tr').count();
        expect(rows).toBeGreaterThan(0); // Assert that there is at least one row of weather data
    });




    // Test 3: Cross-Page Navigation - Weather to Counter
    test('Cross-Page Navigation - Weather to Counter', async ({ page }) => {
        await page.goto(`${baseURL}/weather`, { waitUntil: 'networkidle', timeout: 60000 });

        // Wait for the weather data table to ensure the page is loaded
        await page.waitForSelector('table', { timeout: 15000 });

        // Find and click the "Counter" link
        const counterLink = await page.$('a[href="/counter"]');
        if (counterLink) {
            await counterLink.click();
            await expect(page).toHaveTitle(/Counter/, { timeout: 15000 });
        } else {
            console.error('Counter link not found.');
        }
    });




    // Test 4: Cross-Page Navigation - Weather to Home
    test('Cross-Page Navigation - Weather to Home', async ({ page }) => {
        await page.goto(`${baseURL}/weather`, { waitUntil: 'networkidle', timeout: 60000 });

        // Wait for the weather data table to ensure the page is loaded
        await page.waitForSelector('table', { timeout: 15000 });

        // Find and click the "Home" link
        const homeLink = await page.$('a[href="/"]');
        if (homeLink) {
            await homeLink.click();
            await expect(page).toHaveTitle(/BlazorApp/, { timeout: 15000 });
        } else {
            console.error('Home link not found.');
        }
    });

});
