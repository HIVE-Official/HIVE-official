/**
 * Standalone E2E test for Entry, Authentication, and Onboarding
 * This test can be run independently without global setup
 */

const { test, expect } = require('@playwright/test');

// Simple test without describe blocks to avoid conflicts
test('Entry page displays correctly', async ({ page }) => {
  await page.goto('http://localhost:3003/');
  
  // Check logo
  const logo = page.locator('img[alt="HIVE"]');
  await expect(logo).toBeVisible();
  
  // Check brand name and tagline
  await expect(page.locator('h1:has-text("HIVE")')).toBeVisible();
  await expect(page.locator('text=Your Campus, Connected')).toBeVisible();
  
  // Check primary CTA button
  await expect(page.locator('button:has-text("Get Started")')).toBeVisible();
  
  // Check sign in link
  await expect(page.locator('a:has-text("Sign In")')).toBeVisible();
});

test('Navigate from entry to schools page', async ({ page }) => {
  await page.goto('http://localhost:3003/');
  
  // Click Get Started
  await page.click('button:has-text("Get Started")');
  
  // Should navigate to schools page
  await expect(page).toHaveURL(/\/schools/);
});

test('Navigate from entry to login page', async ({ page }) => {
  await page.goto('http://localhost:3003/');
  
  // Click Sign In
  await page.click('a:has-text("Sign In")');
  
  // Should navigate to login page
  await expect(page).toHaveURL(/\/auth\/login/);
});

test('Login page validates Buffalo email', async ({ page }) => {
  await page.goto('http://localhost:3003/auth/login');
  
  const emailInput = page.locator('input[type="email"]');
  const submitButton = page.locator('button:has-text("Send Magic Link")');
  
  // Test invalid domain
  await emailInput.fill('user@gmail.com');
  await submitButton.click();
  
  // Should show error (check for various possible error messages)
  const errorMessage = page.locator('text=/buffalo\.edu|@buffalo\.edu|UB email/i');
  await expect(errorMessage).toBeVisible({ timeout: 5000 });
});

test('Login page accepts valid Buffalo email', async ({ page }) => {
  await page.goto('http://localhost:3003/auth/login');
  
  const emailInput = page.locator('input[type="email"]');
  const submitButton = page.locator('button:has-text("Send Magic Link")');
  
  // Test valid domain
  await emailInput.fill('student@buffalo.edu');
  await submitButton.click();
  
  // Should either show success or rate limit message
  const successMessage = page.locator('text=/magic link|check your email|sent/i');
  const rateLimitMessage = page.locator('text=/too many|rate limit|try again/i');
  
  // Wait for either message
  await expect(successMessage.or(rateLimitMessage)).toBeVisible({ timeout: 10000 });
});

test('Entry page is mobile responsive', async ({ page }) => {
  // Test mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('http://localhost:3003/');
  
  // All elements should still be visible
  await expect(page.locator('h1:has-text("HIVE")')).toBeVisible();
  await expect(page.locator('button:has-text("Get Started")')).toBeVisible();
  
  // Test tablet viewport
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page.locator('h1:has-text("HIVE")')).toBeVisible();
  
  // Test desktop viewport
  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(page.locator('h1:has-text("HIVE")')).toBeVisible();
});

test('Onboarding redirects unauthenticated users', async ({ page }) => {
  await page.goto('http://localhost:3003/onboarding');
  
  // Should redirect to login or show auth prompt
  await expect(page).toHaveURL(/\/auth|\/login|\/sign/);
});

test('Magic link verification handles invalid token', async ({ page }) => {
  await page.goto('http://localhost:3003/auth/verify?token=invalid-token');
  
  // Should show error message
  await expect(page.locator('text=/invalid|expired|error/i')).toBeVisible({ timeout: 10000 });
});

test('Schools page shows University at Buffalo', async ({ page }) => {
  await page.goto('http://localhost:3003/schools');
  
  // Should show school selection
  await expect(page.locator('text=/University at Buffalo|UB|Buffalo/i')).toBeVisible({ timeout: 10000 });
});

test('Login page handles network errors gracefully', async ({ page }) => {
  // Simulate network failure
  await page.route('**/api/auth/**', route => route.abort());
  
  await page.goto('http://localhost:3003/auth/login');
  await page.fill('input[type="email"]', 'test@buffalo.edu');
  await page.click('button:has-text("Send Magic Link")');
  
  // Should show error message
  await expect(page.locator('text=/error|failed|try again/i')).toBeVisible({ timeout: 10000 });
});

test('Entry page loads quickly', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('http://localhost:3003/');
  await page.waitForLoadState('networkidle');
  const loadTime = Date.now() - startTime;
  
  // Should load within 5 seconds (giving some buffer for dev server)
  expect(loadTime).toBeLessThan(5000);
});

test('Entry page is keyboard navigable', async ({ page }) => {
  await page.goto('http://localhost:3003/');
  
  // Tab through elements
  await page.keyboard.press('Tab');
  
  // Check if an element is focused (either button or link)
  const focusedElement = await page.evaluate(() => {
    const el = document.activeElement;
    return el ? el.tagName.toLowerCase() : null;
  });
  
  expect(['button', 'a']).toContain(focusedElement);
});

test('Auth pages handle special characters in email', async ({ page }) => {
  await page.goto('http://localhost:3003/auth/login');
  
  const specialEmails = [
    'john.doe@buffalo.edu',
    'john+test@buffalo.edu',
    'john_doe@buffalo.edu',
    'john-doe@buffalo.edu'
  ];
  
  for (const email of specialEmails) {
    await page.fill('input[type="email"]', email);
    const value = await page.locator('input[type="email"]').inputValue();
    expect(value).toBe(email);
    await page.locator('input[type="email"]').clear();
  }
});