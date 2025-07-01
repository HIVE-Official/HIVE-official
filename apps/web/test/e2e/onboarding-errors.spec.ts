import { test, expect, type Page } from '@playwright/test'
import { setupTestUser, cleanupTestData } from './helpers/test-setup'

// Define analytics event types for testing
interface OnboardingAnalyticsEvent {
  type: 'onboarding_started' | 'onboarding_abandoned' | 'onboarding_completed';
  stepName?: string;
  timestamp: string;
  userId: string;
}

interface TestError {
  message: string;
  field?: string;
}

test.describe('Onboarding Error Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    await setupTestUser(page)
    
    // Initialize analytics tracking
    await page.addInitScript(() => {
      (window as unknown as { analyticsEvents: OnboardingAnalyticsEvent[] }).analyticsEvents = [];
    })
  })

  test.afterEach(async ({ page }) => {
    await cleanupTestData(page)
  })

  test('abandonment tracking', async ({ page }) => {
    await page.goto('/onboarding?token=test-token')
    
    // Navigate to academics step
    await page.click('[data-testid="get-started-button"]')
    await page.click('[data-testid="continue-button"]')
    
    // Leave the page
    await page.goto('/home')
    
    // Check abandonment event
    const events = await page.evaluate(() => (window as unknown as { analyticsEvents?: OnboardingAnalyticsEvent[] }).analyticsEvents || []) as OnboardingAnalyticsEvent[]
    const abandonmentEvent = events.find((e) => e.type === 'onboarding_abandoned')

    // Verify event was tracked
    expect(abandonmentEvent).toBeTruthy()
    expect(abandonmentEvent).toMatchObject({
      type: 'onboarding_abandoned',
      stepName: 'academics'
    })
  })

  test('handle validation errors', async ({ page }) => {
    await page.goto('/onboarding?token=test-token')
    
    // Navigate to handle step
    await page.click('[data-testid="get-started-button"]')
    await page.click('[data-testid="continue-button"]')
    await page.click('[data-testid="continue-button"]')
    
    // Test too short handle
    const handleInput = page.locator('[data-testid="handle-input"]')
    await handleInput.fill('ab')
    await handleInput.blur()
    
    await expect(page.locator('[data-testid="handle-error"]')).toContainText('Handle must be at least 3 characters')
    
    // Test invalid characters
    await handleInput.fill('user@name')
    await handleInput.blur()
    
    await expect(page.locator('[data-testid="handle-error"]')).toContainText('Handle can only contain letters, numbers')
    
    // Test taken handle
    await page.route('/api/auth/check-handle', async route => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ available: false, suggestions: ['janedoe2025', 'jane_doe24'] })
      })
    })
    
    await handleInput.fill('janedoe')
    await handleInput.blur()
    
    await expect(page.locator('[data-testid="handle-error"]')).toContainText('Handle is already taken')
    await expect(page.locator('[data-testid="handle-suggestions"]')).toBeVisible()
  })
  
  test('network error during onboarding submission', async ({ page }) => {
    // Mock network failure
    await page.route('/api/auth/complete-onboarding', async route => {
      await route.abort('failed')
    })
    
    await page.goto('/onboarding?token=test-token')
    
    // Complete all steps quickly
    await page.click('[data-testid="get-started-button"]')
    await page.click('[data-testid="continue-button"]')
    await page.click('[data-testid="continue-button"]')
    
    // Fill handle
    await page.fill('[data-testid="handle-input"]', 'testuser123')
    await page.click('[data-testid="continue-button"]')
    
    // Skip photo
    await page.click('[data-testid="skip-photo-button"]')
    
    // Skip builder
    await page.click('[data-testid="continue-button"]')
    
    // Accept terms and submit
    await page.click('[data-testid="terms-checkbox"]')
    await page.click('[data-testid="enter-hive-button"]')
    
    // Should show error message
    await expect(page.locator('[data-testid="submission-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="submission-error"]')).toContainText('Something went wrong')
    
    // Should show retry button
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible()
  })
  
  test('email validation errors', async ({ page }) => {
    await page.goto('/auth/login')
    
    // Test invalid email format
    await page.fill('[data-testid="email-input"]', 'invalid-email')
    await page.click('[data-testid="send-magic-link"]')
    
    await expect(page.locator('[data-testid="email-error"]')).toContainText('Please enter a valid email address')
    
    // Test non-university email
    await page.fill('[data-testid="email-input"]', 'user@gmail.com')
    await page.click('[data-testid="send-magic-link"]')
    
    await expect(page.locator('[data-testid="email-error"]')).toContainText('Please use your university email address')
    
    // Test unsupported university
    await page.route('/api/schools', async route => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ schools: [] }) // Empty schools list
      })
    })
    
    await page.fill('[data-testid="email-input"]', 'user@unsupported.edu')
    await page.click('[data-testid="send-magic-link"]')
    
    await expect(page.locator('[data-testid="email-error"]')).toContainText('Your university is not yet supported')
  })
  
  test('magic link expiration', async ({ page }) => {
    await page.goto('/auth/verify?token=expired-token')
    
    await expect(page.locator('[data-testid="expired-link"]')).toBeVisible()
    await expect(page.locator('[data-testid="expired-link"]')).toContainText('This magic link has expired')
    
    // Should show option to request new link
    await expect(page.locator('[data-testid="request-new-link"]')).toBeVisible()
  })
  
  test('form validation edge cases', async ({ page }) => {
    await page.goto('/onboarding?token=test-token')
    
    // Navigate to name step
    await page.click('[data-testid="get-started-button"]')
    
    // Test empty name
    await page.fill('[data-testid="full-name-input"]', '')
    await page.click('[data-testid="continue-button"]')
    
    await expect(page.locator('[data-testid="name-error"]')).toContainText('Name is required')
    
    // Test very long name
    const longName = 'A'.repeat(101)
    await page.fill('[data-testid="full-name-input"]', longName)
    await page.click('[data-testid="continue-button"]')
    
    await expect(page.locator('[data-testid="name-error"]')).toContainText('Name must be less than 100 characters')
    
    // Test name with special characters
    await page.fill('[data-testid="full-name-input"]', 'John <script>alert("xss")</script> Doe')
    await page.click('[data-testid="continue-button"]')
    
    // Should sanitize and continue (no error)
    await expect(page.locator('h2')).toContainText('Tell us about your studies')
  })
  
  test('slow network conditions', async ({ page }) => {
    // Simulate slow handle validation
    await page.route('/api/auth/check-handle', async route => {
      await new Promise(resolve => setTimeout(resolve, 3000)) // 3 second delay
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ available: true })
      })
    })
    
    await page.goto('/onboarding?token=test-token')
    
    // Navigate to handle step
    await page.click('[data-testid="get-started-button"]')
    await page.click('[data-testid="continue-button"]')
    await page.click('[data-testid="continue-button"]')
    
    // Fill handle
    await page.fill('[data-testid="handle-input"]', 'slowtest')
    
    // Should show loading state
    await expect(page.locator('[data-testid="handle-checking"]')).toBeVisible()
    await expect(page.locator('[data-testid="handle-checking"]')).toContainText('Checking availability')
    
    // Continue button should be disabled during validation
    await expect(page.locator('[data-testid="continue-button"]')).toBeDisabled()
    
    // Wait for validation to complete
    await expect(page.locator('[data-testid="handle-available"]')).toBeVisible({ timeout: 5000 })
    await expect(page.locator('[data-testid="continue-button"]')).toBeEnabled()
  })
})

async function _expectError(_page: Page, _error: TestError): Promise<void> {
  // ... existing code ...
} 