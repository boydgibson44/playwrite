// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        timeout: 60000, // 60 seconds for all actions
        trace: 'on',
        // Automatically wait until no network activity before interacting
        waitUntil: 'networkidle',
        // Use fixtures to ensure Blazor app is loaded
        // Will be added in test setup instead of `beforeEach` in config
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                timeout: 120000, // 120 seconds for the entire test
                actionTimeout: 30000, // Increase action timeout to 30 seconds
                screenshot: 'on',
                trace: 'on-first-retry',
            },
        },
        {
            name: 'Mobile Safari',
            use: {
                ...devices['iPhone 12'],
                timeout: 120000, // 120 seconds for the entire test
                actionTimeout: 30000, // Increase action timeout to 30 seconds
                screenshot: 'on',
                trace: 'on-first-retry',
            },
        },
    ],

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
