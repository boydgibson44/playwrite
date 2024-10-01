﻿import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:5128/');
    await page.getByRole('link', { name: 'Counter' }).click();
    await page.getByRole('button', { name: 'Click me' }).click({
        clickCount: 4
    });
    await page.getByRole('link', { name: 'Weather' }).click();
    await page.getByRole('heading', { name: 'Weather' }).click();
    await page.getByRole('link', { name: 'Counter' }).click();
    await page.getByRole('button', { name: 'Click me' }).click({
        clickCount: 3
    });
    await page.getByRole('link', { name: 'Home' }).click();
    await page.getByRole('link', { name: 'BlazorApp' }).click();
    await page.getByRole('link', { name: 'Counter' }).click();
    await page.getByRole('link', { name: 'BlazorApp' }).click();
});