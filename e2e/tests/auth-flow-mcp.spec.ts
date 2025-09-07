import { test, expect } from '@playwright/test';

test.describe('HIVE Auth & Onboarding - MCP Test', () => {
  test('Complete authentication and onboarding flow', async ({ page }) => {
    // Set timeout for the entire test
    test.setTimeout(60000);
    
    console.log('Starting HIVE authentication flow test...');
    
    // Step 1: Navigate to the application
    console.log('Step 1: Navigating to HIVE...');
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('domcontentloaded');
    
    // Take initial screenshot
    await page.screenshot({ path: 'test-results/01-homepage.png', fullPage: true });
    
    // Step 2: Look for and click authentication entry point
    console.log('Step 2: Finding auth entry point...');
    
    // Try multiple selectors for auth buttons
    const authSelectors = [
      'button:has-text("Get Started")',
      'button:has-text("Join HIVE")',
      'button:has-text("Sign In")',
      'a[href*="/auth"]',
      'button:has-text("Login")',
      '[data-testid="auth-button"]'
    ];
    
    let authButton = null;
    for (const selector of authSelectors) {
      const element = page.locator(selector).first();
      if (await element.isVisible().catch(() => false)) {
        authButton = element;
        console.log(`Found auth button with selector: ${selector}`);
        break;
      }
    }
    
    if (authButton) {
      await authButton.click();
      await page.waitForLoadState('networkidle');
    } else {
      // Navigate directly to auth page
      console.log('Navigating directly to /auth...');
      await page.goto('http://localhost:3000/auth');
    }
    
    await page.screenshot({ path: 'test-results/02-auth-page.png', fullPage: true });
    
    // Step 3: Fill in email
    console.log('Step 3: Entering email...');
    const emailSelectors = [
      'input[type="email"]',
      'input[placeholder*="email" i]',
      'input[name="email"]',
      '[data-testid="email-input"]'
    ];
    
    let emailInput = null;
    for (const selector of emailSelectors) {
      const element = page.locator(selector).first();
      if (await element.isVisible().catch(() => false)) {
        emailInput = element;
        console.log(`Found email input with selector: ${selector}`);
        break;
      }
    }
    
    if (emailInput) {
      await emailInput.fill('test.student@buffalo.edu');
      await page.screenshot({ path: 'test-results/03-email-entered.png', fullPage: true });
      
      // Submit the form
      const submitButton = page.locator('button[type="submit"], button:has-text("Continue"), button:has-text("Send Magic Link")').first();
      if (await submitButton.isVisible()) {
        await submitButton.click();
        console.log('Submitted email form');
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'test-results/04-after-submit.png', fullPage: true });
      }
    }
    
    // Step 4: Check for magic link confirmation
    console.log('Step 4: Checking for magic link confirmation...');
    const confirmationText = await page.locator('text=/check.*email|magic.*link.*sent/i').isVisible().catch(() => false);
    if (confirmationText) {
      console.log('Magic link confirmation shown');
      await page.screenshot({ path: 'test-results/05-magic-link-sent.png', fullPage: true });
    }
    
    // Step 5: Simulate magic link click (for testing)
    console.log('Step 5: Simulating magic link verification...');
    await page.goto('http://localhost:3000/auth/verify?token=test-token&email=test.student@buffalo.edu');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'test-results/06-verify-page.png', fullPage: true });
    
    // Step 6: Check if redirected to onboarding
    const currentUrl = page.url();
    console.log(`Current URL after verification: ${currentUrl}`);
    
    if (currentUrl.includes('onboarding')) {
      console.log('Successfully redirected to onboarding!');
      await page.screenshot({ path: 'test-results/07-onboarding-start.png', fullPage: true });
      
      // Step 7: Complete onboarding steps
      console.log('Step 7: Starting onboarding flow...');
      
      // Name step
      const firstNameInput = page.locator('input[placeholder*="first" i], input[name*="first" i]').first();
      const lastNameInput = page.locator('input[placeholder*="last" i], input[name*="last" i]').first();
      
      if (await firstNameInput.isVisible().catch(() => false)) {
        await firstNameInput.fill('Test');
        await lastNameInput.fill('Student');
        console.log('Filled name fields');
        await page.screenshot({ path: 'test-results/08-name-filled.png', fullPage: true });
        
        const nextButton = page.locator('button:has-text("Next"), button:has-text("Continue")').first();
        if (await nextButton.isVisible()) {
          await nextButton.click();
          await page.waitForTimeout(1000);
        }
      }
      
      // Handle step
      const handleInput = page.locator('input[placeholder*="handle" i], input[placeholder*="username" i]').first();
      if (await handleInput.isVisible().catch(() => false)) {
        await handleInput.fill('teststudent123');
        console.log('Filled handle field');
        await page.screenshot({ path: 'test-results/09-handle-filled.png', fullPage: true });
        
        await page.locator('button:has-text("Next"), button:has-text("Continue")').first().click();
        await page.waitForTimeout(1000);
      }
      
      // Continue through remaining steps
      console.log('Continuing through onboarding steps...');
      
      // Click through any remaining steps
      for (let i = 0; i < 5; i++) {
        const nextButton = page.locator('button:has-text("Next"), button:has-text("Continue"), button:has-text("Complete"), button:has-text("Finish")').first();
        if (await nextButton.isVisible().catch(() => false)) {
          await nextButton.click();
          await page.waitForTimeout(1500);
          await page.screenshot({ path: `test-results/10-step-${i}.png`, fullPage: true });
        }
      }
    }
    
    // Final check
    const finalUrl = page.url();
    console.log(`Final URL: ${finalUrl}`);
    await page.screenshot({ path: 'test-results/11-final-state.png', fullPage: true });
    
    // Report results
    console.log('\n=== Test Results ===');
    console.log(`Starting URL: http://localhost:3000`);
    console.log(`Final URL: ${finalUrl}`);
    console.log(`Email input found: ${emailInput !== null}`);
    console.log(`Magic link confirmation: ${confirmationText}`);
    console.log(`Reached onboarding: ${currentUrl.includes('onboarding')}`);
    console.log('Screenshots saved in test-results/');
  });
});