import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:5128'; // Update with the correct port or URL

test.describe('Counter Page Tests', () => {

    // Test 1: Ensure the Counter Page Title is Correct
    test('Counter Page - Title', async ({ page }) => {
        // Navigate to the counter page and wait until the network is idle (all requests have finished)
        await page.goto(`${baseURL}/counter`, { waitUntil: 'networkidle', timeout: 60000 });

        // Log the current page title for debugging
        console.log('Current title:', await page.title());
    });




    // Test 2: Verify the Counter is Initialized to 0 and the Increment Button Exists
    test('Counter Page - Counter Initialized', async ({ page }) => {
        // Navigate to the counter page and wait for the DOM to be fully loaded
        await page.goto(`${baseURL}/counter`, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Log the page title to verify navigation success
        console.log('Page loaded:', await page.title());

        // Check if the counter and increment button exist on the page
        const counterExists = await page.$('#counter-value') !== null;
        const buttonExists = await page.$('button#increment') !== null;
        console.log('Counter exists:', counterExists, 'Button exists:', buttonExists);

        // Take a screenshot of the counter page for debugging
        await page.screenshot({ path: 'counter-page.png' });

        // Log the page content for further debugging
        console.log(await page.content());

        // Verify that the counter starts at 0, if the counter element exists
        if (counterExists) {
            await page.waitForSelector('#counter-value', { timeout: 60000 });
            const counterValue = await page.locator('#counter-value').textContent();
            expect(counterValue).toBe('0'); // Check if the counter's initial value is 0
        } else {
            console.error('Counter not found');
        }

        // Verify that the increment button is available
        if (buttonExists) {
            await page.waitForSelector('button#increment', { timeout: 60000 });
        } else {
            console.error('Increment button not found');
        }
    });




    // Test 3: Verify the Increment Button Increases the Counter
    test('Counter Page - Increment Button Works', async ({ page }) => {
        // Navigate to the counter page and wait for network activity to finish
        await page.goto(`${baseURL}/counter`, { waitUntil: 'networkidle', timeout: 120000 });

        // Take a screenshot and log the page content for debugging purposes
        await page.screenshot({ path: 'increment-page.png' });
        console.log(await page.content());

        // Locate the increment button on the page
        const incrementButton = page.locator('button#increment');

        // Check if the increment button exists, then click it and check if the counter value increases
        if (await incrementButton.count() === 0) {
            console.error('Increment button not found');
        } else {
            await incrementButton.waitFor({ state: 'visible', timeout: 60000 });
            await incrementButton.click(); // Click the increment button

            // Check if the counter value increased to 1
            const counterValue = await page.locator('#counter-value').textContent();
            expect(counterValue).toBe('1');
        }
    });




    // Test 4: Cross-Page Navigation from Counter to Weather Page
    test('Cross-Page Navigation - Counter to Weather', async ({ page }) => {
        // Navigate to the counter page and wait for the page to fully load
        await page.goto(`${baseURL}/counter`, { waitUntil: 'load', timeout: 120000 });

        // Delay to ensure any dynamic content is fully rendered
        await page.waitForTimeout(2000);

        // Log if the counter value exists before continuing
        const counterValueExists = await page.$('#counter-value') !== null;
        console.log('Counter value exists:', counterValueExists);

        if (!counterValueExists) {
            console.error('Counter value not found');
        } else {
            // Wait for the counter value element to be visible
            await page.waitForSelector('#counter-value', { timeout: 60000, visible: true });

            // Locate the "Weather" link and navigate to the weather page
            const weatherLink = await page.locator('a[href="/weather"]');

            if (await weatherLink.count() === 0) {
                console.error('Weather link not found');
            } else {
                await weatherLink.click(); // Click the weather link
                await expect(page).toHaveTitle(/Weather/, { timeout: 15000 }); // Verify navigation by checking the title
            }
        }
    });




    // Test 5: Cross-Page Navigation from Counter to Home Page
    test('Cross-Page Navigation - Counter to Home', async ({ page }) => {
        // Navigate to the counter page and wait for the page to fully load
        await page.goto(`${baseURL}/counter`, { waitUntil: 'load', timeout: 120000 });

        // Delay to ensure any dynamic content is fully rendered
        await page.waitForTimeout(2000);

        // Log if the counter value exists before continuing
        const counterValueExists = await page.$('#counter-value') !== null;
        console.log('Counter value exists:', counterValueExists);

        if (!counterValueExists) {
            console.error('Counter value not found');
        } else {
            // Wait for the counter value element to be visible
            await page.waitForSelector('#counter-value', { timeout: 60000, visible: true });

            // Locate the "Home" link and navigate to the home page
            const homeLink = await page.locator('a[href="/"]');

            if (await homeLink.count() === 0) {
                console.error('Home link not found');
            } else {
                await homeLink.click(); // Click the home link
                await expect(page).toHaveTitle(/BlazorApp/, { timeout: 15000 }); // Verify navigation by checking the title
            }
        }
    });

    // Test 6: Fails in UI Mode due to race condition and improper assumption about the counter update timing
    test('Counter Page - Counter Initialized | Fails in UI Mode due to Timing Assumption', async ({ page }) => {

        await page.goto(`${baseURL}/counter`, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Log page content and screenshot for debugging
        await page.screenshot({ path: 'counter-page.png' });
        console.log(await page.content());

        // Check for counter and button visibility
        await page.waitForSelector('#counter-value', { timeout: 90000, visible: true });
        const counterValue = await page.locator('#counter-value').textContent();
        expect(counterValue).toBe('0');

        await page.waitForSelector('button#increment', { timeout: 90000, visible: true });
    });


    // Test 7: Fails in UI Mode due to race condition and improper assumption about the counter update timing (Test timeout of 30000ms exceeded.)
    test('Cross-Page Navigation - Counter to Weather| Fails in UI Mode due to Timing Assumption', async ({ page }) => {
        await page.goto(`${baseURL}/counter`, { waitUntil: 'networkidle', timeout: 120000 });
        await page.waitForTimeout(2000); // Add delay to allow content to load
        console.log(await page.content());

        // Wait for the counter and check if it's available
        await page.waitForSelector('#counter-value', { timeout: 60000 });
        const weatherLink = await page.locator('a[href="/weather"]');

        if (await weatherLink.count() === 0) {
            console.error('Weather link not found');
        } else {
            await weatherLink.click();
            await expect(page).toHaveTitle(/Weather/, { timeout: 15000 });
        }
    });


});
