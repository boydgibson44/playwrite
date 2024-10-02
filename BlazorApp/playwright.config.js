// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests', // Your test directory
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,  // Add retries here
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: process.env.URL || 'http://localhost:5128',  // Use environment variable or default to localhost
        timeout: 90000,
        trace: 'on',
        waitUntil: 'networkidle',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        //{
        //    name: 'webkit',
        //    use: {
        //        ...devices['Desktop Safari'],
        //        timeout: 120000,
        //        actionTimeout: 30000,
        //        screenshot: 'on',
        //        trace: 'on-first-retry',
        //    },
        //},
        //{
        //    name: 'Mobile Safari',
        //    use: {
        //        ...devices['iPhone 12'],
        //        timeout: 120000,
        //        actionTimeout: 30000,
        //        screenshot: 'on',
        //        trace: 'on-first-retry',
        //    },
        //},
    ],

    /* Ignore the dist folder and node_modules */
    testIgnore: ['**/dist/**', '**/node_modules/**'], // Ignore compiled files and node_modules
});
