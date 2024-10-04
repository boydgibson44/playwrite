// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',  // Your test directory
    fullyParallel: true,  // Enable parallel execution for all tests
    forbidOnly: !!process.env.CI,  // Prevent accidental use of test.only in CI
    retries: process.env.CI ? 2 : 0,  // Retry on CI for better reliability
    workers: process.env.CI ? 4 : undefined, // Increase to 4 workers in CI
    //workers: process.env.CI ? 2 : undefined,  // Use 2 worker in CI for stability
    reporter: process.env.CI ? [['html'], ['junit', { outputFile: 'test-results/results.xml' }]] : 'html',  // Use JUnit in CI along with HTML

    use: {
        baseURL: process.env.URL || 'http://localhost:5128',  // Base URL from env or fallback to localhost
        timeout: 90000,  // 90 seconds timeout per test
        trace: 'on',  // Always capture traces
        waitUntil: 'networkidle',  // Wait until the network is idle before running interactions
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },  // Desktop Chrome configuration
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },  // Desktop Firefox configuration
        },


        // Uncomment to run tests on WebKit (Safari) ; wasnt working
        // {
        //     name: 'webkit',
        //     use: {
        //         ...devices['Desktop Safari'],
        //         timeout: 120000,
        //         actionTimeout: 30000,
        //         screenshot: 'on',
        //         trace: 'on-first-retry',
        //     },
        // },




        // Uncomment to run tests on Mobile Safari ; wasnt working
        // {
        //     name: 'Mobile Safari',
        //     use: {
        //         ...devices['iPhone 12'],
        //         timeout: 120000,
        //         actionTimeout: 30000,
        //         screenshot: 'on',
        //         trace: 'on-first-retry',
        //     },
        // },
    ],

    /* Ignore the dist folder and node_modules */
    testIgnore: ['**/dist/**', '**/node_modules/**'],  // Ignore build artifacts and dependencies
});
