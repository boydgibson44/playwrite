import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:5128'; // Update with the correct port or URL

test.describe('Home Page Tests', () => {

    // Test 1: Ensure Home Page Title and Welcome Message are Correct
    test('Home Page - Title and Welcome Message', async ({ page }) => {
        // Navigate to the home page and wait until the DOM content is fully loaded
        await page.goto(baseURL, { waitUntil: 'domcontentloaded' });

        // Verify that the page title is "BlazorApp"
        await expect(page).toHaveTitle(/BlazorApp/);

        // Wait for the main heading (h1) to appear
        await page.waitForSelector('h1');

        // Verify that the heading has the correct text "Hello, world!"
        await expect(page.locator('h1')).toHaveText('Hello, world!');
    });




    // Test 2: Cross-Page Navigation - Navigate from Home to Weather Page
    test('Home Page - Navigate to Weather Page', async ({ page }) => {
        // Navigate to the home page and wait for the page to fully load
        await page.goto(`${baseURL}/`, { waitUntil: 'load', timeout: 120000 });

        // Check if the "Weather" link is present on the home page
        const weatherLink = await page.$('a[href="/weather"]');

        // If the weather link is not found, log an error message
        if (!weatherLink) {
            console.error('Weather link not found');
        } else {
            // If the link is found, click it to navigate to the Weather page
            await weatherLink.click();

            // Verify that the title of the Weather page is correct after navigation
            await expect(page).toHaveTitle(/Weather/, { timeout: 15000 });
        }
    });




    // Test 3: Cross-Page Navigation - Navigate from Home to Counter Page
    test('Home Page - Navigate to Counter Page', async ({ page }) => {
        // Navigate to the home page and wait for the page to fully load
        await page.goto(`${baseURL}/`, { waitUntil: 'load', timeout: 120000 });

        // Check if the "Counter" link is present on the home page
        const counterLink = await page.$('a[href="/counter"]');

        // If the counter link is not found, log an error message
        if (!counterLink) {
            console.error('Counter link not found');
        } else {
            // If the link is found, click it to navigate to the Counter page
            await counterLink.click();

            // Verify that the title of the Counter page is correct after navigation
            await expect(page).toHaveTitle(/Counter/, { timeout: 15000 });
        }
    });

});
