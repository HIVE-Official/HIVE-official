import { test, expect } from '@playwright/test';

test.describe('Waitlist Flow', () => {
  test('a user can join the waitlist for a non-active school', async ({ page }) => {
    // Navigate to the welcome page
    await page.goto('/welcome');

    // Type the name of a waitlisted school
    const searchInput = page.getByRole('searchbox', { name: /search for your school/i });
    await searchInput.fill('Rochester Institute of Technology');

    // Click the school in the list
    await page.getByRole('listitem').filter({ hasText: 'Rochester Institute of Technology' }).click();

    // Verify the URL is correct for the waitlist page
    await expect(page).toHaveURL(/\/waitlist\/.+/);

    // Verify the school name is displayed
    await expect(page.getByRole('heading', { name: 'Rochester Institute of Technology' })).toBeVisible();

    // Fill out the email form
    const emailInput = page.getByLabel('Email');
    await emailInput.fill('test@rit.edu');

    // Click the join button
    await page.getByRole('button', { name: /join waitlist/i }).click();

    // Assert that the success message is shown
    await expect(page.getByRole('heading', { name: /you're in/i })).toBeVisible();
  });
}); 