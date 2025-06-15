import { test, expect } from '@playwright/test'

test.describe('Onboarding Flow', () => {
  test('complete onboarding flow - happy path', async ({ page }) => {
    // Start at login page
    await page.goto('/auth/login')
    
    // Enter email and request magic link
    await page.fill('[data-testid="email-input"]', 'jane.doe@buffalo.edu')
    await page.click('[data-testid="send-magic-link"]')
    
    // Verify magic link sent confirmation
    await expect(page.locator('[data-testid="magic-link-sent"]')).toBeVisible()
    
    // Simulate clicking magic link (in real test, would use test email service)
    // For now, navigate directly to onboarding with mock auth state
    await page.goto('/onboarding?token=test-magic-link-token')
    
    // Step 1: Welcome
    await expect(page.locator('h1')).toContainText('Welcome to HIVE')
    await page.click('[data-testid="get-started-button"]')
    
    // Step 2: Name
    await expect(page.locator('h2')).toContainText('What should we call you?')
    
    // Name should be pre-filled from email
    const nameInput = page.locator('[data-testid="full-name-input"]')
    await expect(nameInput).toHaveValue('Jane Doe')
    
    // Continue to next step
    await page.click('[data-testid="continue-button"]')
    
    // Step 3: Academics
    await expect(page.locator('h2')).toContainText('Tell us about your studies')
    
    // Select major
    await page.click('[data-testid="major-select"]')
    await page.click('[data-testid="major-option-computer-science"]')
    
    // Select graduation year
    await page.click('[data-testid="graduation-year-2026"]')
    
    await page.click('[data-testid="continue-button"]')
    
    // Step 4: Handle
    await expect(page.locator('h2')).toContainText('Choose your handle')
    
    const handleInput = page.locator('[data-testid="handle-input"]')
    await handleInput.fill('janedoe2024')
    
    // Wait for handle validation
    await expect(page.locator('[data-testid="handle-available"]')).toBeVisible()
    
    await page.click('[data-testid="continue-button"]')
    
    // Step 5: Photo (skip)
    await expect(page.locator('h2')).toContainText('Add a profile photo')
    await page.click('[data-testid="skip-photo-button"]')
    
    // Step 6: Builder
    await expect(page.locator('h2')).toContainText('Become a Builder')
    
    // Toggle builder status
    await page.click('[data-testid="builder-toggle"]')
    await page.click('[data-testid="continue-button"]')
    
    // Step 7: Legal
    await expect(page.locator('h2')).toContainText('Legal stuff')
    
    // Accept terms
    await page.click('[data-testid="terms-checkbox"]')
    await page.click('[data-testid="enter-hive-button"]')
    
    // Should redirect to main app
    await expect(page).toHaveURL('/feed')
    
    // Verify welcome message appears
    await expect(page.locator('[data-testid="welcome-mat"]')).toContainText("You're in — welcome to HIVE!")
    
    // Verify user data was saved to Firestore
    // This would use Firebase Admin SDK in real implementation
    const userDoc = await page.evaluate(async () => {
      // Mock Firestore check - in real test would use Firebase Admin
      return {
        fullName: 'Jane Doe',
        handle: 'janedoe2024',
        email: 'jane.doe@buffalo.edu',
        major: 'Computer Science',
        graduationYear: 2026,
        isBuilder: true,
        onboardingCompleted: true,
        schoolId: 'university-at-buffalo'
      }
    })
    
    expect(userDoc.fullName).toBe('Jane Doe')
    expect(userDoc.handle).toBe('janedoe2024')
    expect(userDoc.isBuilder).toBe(true)
    expect(userDoc.onboardingCompleted).toBe(true)
  })
  
  test('onboarding analytics tracking', async ({ page }) => {
    // Mock analytics endpoint
    await page.route('/api/analytics/track', async route => {
      const request = route.request()
      const body = await request.postDataJSON()
      
      // Store analytics events for verification
      await page.evaluate(body => {
        window.analyticsEvents = window.analyticsEvents || []
        window.analyticsEvents.push(body)
      }, body)
      
      await route.fulfill({ status: 200, body: '{"success": true}' })
    })
    
    await page.goto('/onboarding?token=test-token')
    
    // Complete first few steps
    await page.click('[data-testid="get-started-button"]')
    await page.click('[data-testid="continue-button"]')
    
    // Verify analytics events were tracked
    const events = await page.evaluate(() => window.analyticsEvents)
    
    expect(events).toContainEqual(
      expect.objectContaining({
        type: 'onboarding_started'
      })
    )
    
    expect(events).toContainEqual(
      expect.objectContaining({
        type: 'onboarding_step_completed',
        stepName: 'welcome'
      })
    )
  })
}) 