"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('test', async ({ page }) => {
    await page.goto('http://localhost:5128/');
    await page.getByRole('link', { name: 'Counter' }).click();
    await page.getByRole('button', { name: 'Click me' }).click();
    await page.getByRole('button', { name: 'Click me' }).click();
    await page.getByRole('heading', { name: 'Counter' }).click();
    await page.getByText('Current count:').click();
    await page.getByRole('link', { name: 'Weather' }).click();
    await page.getByRole('heading', { name: 'Weather' }).click();
    await page.getByText('This component demonstrates').click();
});
