import { test, expect } from '@playwright/test';

test.describe('Basic Authentication', () => {
  
  test('should display login form elements', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Check basic page elements
    await expect(page.getByRole('heading', { name: /welcome to hive/i })).toBeVisible();
    await expect(page.getByText(/university at buffalo/i)).toBeVisible();
    
    // Check form elements
    const emailInput = page.getByRole('textbox', { name: /email/i });
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute('placeholder', 'your.email@buffalo.edu');
    
    const submitButton = page.getByRole('button', { name: /send magic link/i });
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeDisabled(); // Should be disabled when empty
    
    // Check dev login button
    const devButton = page.getByRole('button', { name: /dev login/i });
    await expect(devButton).toBeVisible();
  });

  test('should validate email input', async ({ page }) => {
    await page.goto('/auth/login');
    
    const emailInput = page.getByRole('textbox', { name: /email/i });
    const submitButton = page.getByRole('button', { name: /send magic link/i });
    
    // Empty email - button should remain disabled
    await expect(submitButton).toBeDisabled();
    
    // Invalid email format - button should remain disabled  
    await emailInput.fill('invalid-email');
    await expect(submitButton).toBeDisabled();
    
    // Non-UB email - button should remain disabled
    await emailInput.clear();
    await emailInput.fill('test@gmail.com');
    await expect(submitButton).toBeDisabled();
    
    // Valid UB email - button should be enabled
    await emailInput.clear();
    await emailInput.fill('test@buffalo.edu');
    await expect(submitButton).toBeEnabled();
  });

  test('should handle dev login flow', async ({ page }) => {
    await page.goto('/auth/login');
    
    const devButton = page.getByRole('button', { name: /dev login/i });
    await devButton.click();
    
    // Should redirect somewhere after dev login
    await page.waitForTimeout(1000); // Wait for any redirects
    
    // The exact redirect behavior depends on your dev login implementation
    // This test ensures the button works without throwing errors
  });

  test('should be mobile responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/auth/login');
    
    // Elements should still be visible and accessible on mobile
    await expect(page.getByRole('heading', { name: /welcome to hive/i })).toBeVisible();
    await expect(page.getByRole('textbox', { name: /email/i })).toBeVisible();
    
    const submitButton = page.getByRole('button', { name: /send magic link/i });
    const buttonBox = await submitButton.boundingBox();
    
    // Button should be touch-friendly (at least 44px height)
    expect(buttonBox?.height).toBeGreaterThanOrEqual(44);
  });

  test('should display proper legal text', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Check for terms and privacy policy text
    await expect(page.getByText(/terms of service/i)).toBeVisible();
    await expect(page.getByText(/privacy policy/i)).toBeVisible();
    
    // Check for development mode indicator
    await expect(page.getByText(/development mode/i)).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Start from beginning
    await page.keyboard.press('Tab');
    
    // Should focus email input first
    await expect(page.getByRole('textbox', { name: /email/i })).toBeFocused();
    
    // Tab to submit button
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: /send magic link/i })).toBeFocused();
    
    // Tab to dev login button
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: /dev login/i })).toBeFocused();
  });
});

test.describe('Basic Page Navigation', () => {
  
  test('should load home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/hive/i);
    // Should not crash, exact content depends on your home page
  });
  
  test('should handle back navigation from auth page', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Look for back button
    const backButton = page.getByRole('button', { name: /back/i });
    if (await backButton.isVisible()) {
      await backButton.click();
      // Should navigate back to previous page
      await page.waitForTimeout(500);
    }
  });
});