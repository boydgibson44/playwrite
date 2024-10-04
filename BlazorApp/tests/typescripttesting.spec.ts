import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:5128/');

    // Click on the 'Counter' link and interact with the button
    await page.getByRole('link', { name: 'Counter' }).click();
    await page.getByRole('button', { name: 'Click me' }).click();
    await page.getByRole('button', { name: 'Click me' }).click();

    // Ensure the heading and counter text are visible
    await expect(page.getByRole('heading', { name: 'Counter' })).toBeVisible();
    await expect(page.getByText('Current count:')).toBeVisible();

    // Click on the 'Weather' link
    await page.getByRole('link', { name: 'Weather' }).click();

    // Check that the 'Weather' heading and text content are visible
    await expect(page.getByRole('heading', { name: 'Weather' })).toBeVisible();
    await expect(page.getByText('This component demonstrates')).toBeVisible();
});


//import { test, expect } from '@playwright/test';

//test('test', async ({ page }) => {
//    //await page.goto('/');
//    await page.goto('http://localhost:5128/');
//    await page.getByRole('link', { name: 'Counter' }).click();
//    await page.getByRole('button', { name: 'Click me' }).click();
//    await page.getByRole('button', { name: 'Click me' }).click();
//    await page.getByRole('heading', { name: 'Counter' }).click();
//    await page.getByText('Current count:').click();
//    await page.getByRole('link', { name: 'Weather' }).click();
//    await page.getByRole('heading', { name: 'Weather' }).click();
//    await page.getByText('This component demonstrates').click();
//});

////making change to test the commit block 2