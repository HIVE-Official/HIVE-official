import { test, expect } from '@playwright/test';

// Basic smoke coverage for core Phase 2 surfaces without relying on auth

test.describe('Smoke: Core pages', () => {
  test('Feed loads and shows either sign-in or feed shell', async ({ page }) => {
    await page.goto('/feed');
    // Accept either signed-out or signed-in states
    const signedOut = page.getByText('Sign in to view Feed');
    const feedTitle = page.getByText('Campus Feed');
    await expect(signedOut.or(feedTitle)).toBeVisible();
  });

  test('Rituals loads and shows tabs or skeleton', async ({ page }) => {
    await page.goto('/rituals');
    // Tabs may render as Active/Upcoming/Completed or a loading state
    const activeTab = page.getByText(/Active/i);
    const upcomingTab = page.getByText(/Upcoming/i);
    const completedTab = page.getByText(/Completed/i);
    await expect(activeTab.or(upcomingTab).or(completedTab)).toBeVisible();
  });
});

