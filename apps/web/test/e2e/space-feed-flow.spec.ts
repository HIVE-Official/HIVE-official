import { test, expect } from '@playwright/test'
import { setupTestUser, cleanupTestData } from './helpers/test-setup'

interface TestUser {
  id: string;
  email: string;
  fullName: string;
  handle: string;
}

interface TestSpace {
  id: string;
  name: string;
  description: string;
  school: string;
  category: string;
}

test.describe('Space Feed Flow', () => {
  let testUser: TestUser
  let testSpace: TestSpace
  
  test.beforeEach(async ({ page }) => {
    // Setup test user and space
    testUser = await setupTestUser()
    
    // Create a test space
    testSpace = {
      id: `test-space-${Date.now()}`,
      name: 'Test Space',
      description: 'A space for testing feed functionality',
      school: 'Test University',
      category: 'academic',
    }
    
    // Navigate to login and authenticate
    await page.goto('/auth/login')
    await page.fill('[data-testid="email-input"]', testUser.email)
    await page.click('[data-testid="send-magic-link"]')
    
    // Mock magic link verification
    await page.goto(`/auth/verify?token=test-token&email=${encodeURIComponent(testUser.email)}`)
    await expect(page).toHaveURL('/welcome')
    
    // Complete onboarding if needed
    if (await page.locator('[data-testid="onboarding-step"]').isVisible()) {
      await page.fill('[data-testid="full-name"]', testUser.fullName)
      await page.fill('[data-testid="handle"]', testUser.handle)
      await page.click('[data-testid="continue-button"]')
      await page.click('[data-testid="finish-onboarding"]')
    }
  })
  
  test.afterEach(async () => {
    await cleanupTestData(testUser.id, testSpace.id)
  })
  
  test('should complete full space feed flow', async ({ page }) => {
    // Step 1: Create a space
    await page.goto('/spaces/browse')
    await page.click('[data-testid="create-space-button"]')
    
    await page.fill('[data-testid="space-name"]', testSpace.name)
    await page.fill('[data-testid="space-description"]', testSpace.description)
    await page.selectOption('[data-testid="space-school"]', testSpace.school)
    await page.selectOption('[data-testid="space-category"]', testSpace.category)
    
    await page.click('[data-testid="create-space-submit"]')
    
    // Wait for space creation and redirect
    await expect(page).toHaveURL(new RegExp(`/spaces/[a-zA-Z0-9]+`))
    
    // Extract space ID from URL
    const url = page.url()
    const spaceId = url.split('/spaces/')[1]
    if (spaceId) {
      testSpace.id = spaceId
    }
    
    // Step 2: Verify feed composer is visible
    await expect(page.locator('[data-testid="feed-composer"]')).toBeVisible()
    await expect(page.locator('[data-testid="post-content-input"]')).toBeVisible()
    
    // Step 3: Create a text post
    const postContent = 'This is my first post in this space! 🎉'
    await page.fill('[data-testid="post-content-input"]', postContent)
    
    // Verify character count
    await expect(page.locator('[data-testid="char-count"]')).toContainText('456') // 500 - 44 chars
    
    // Submit post
    await page.click('[data-testid="post-submit"]')
    
    // Wait for post to appear in feed
    await expect(page.locator('[data-testid="post-card"]').first()).toBeVisible()
    await expect(page.locator('[data-testid="post-content"]').first()).toContainText(postContent)
    
    // Step 4: Verify post metadata
    const firstPost = page.locator('[data-testid="post-card"]').first()
    await expect(firstPost.locator('[data-testid="post-author"]')).toContainText(testUser.fullName)
    await expect(firstPost.locator('[data-testid="post-handle"]')).toContainText(`@${testUser.handle}`)
    await expect(firstPost.locator('[data-testid="post-timestamp"]')).toBeVisible()
    
    // Step 5: React to the post
    const heartButton = firstPost.locator('[data-testid="heart-reaction"]')
    await expect(heartButton).toBeVisible()
    
    // Click heart reaction
    await heartButton.click()
    
    // Verify reaction count updated
    await expect(heartButton).toContainText('1')
    await expect(heartButton).toHaveClass(/text-red-500/) // Should be colored when reacted
    
    // Click again to remove reaction
    await heartButton.click()
    await expect(heartButton).not.toContainText('1')
    await expect(heartButton).not.toHaveClass(/text-red-500/)
    
    // Step 6: Test post editing (within 15-minute window)
    const postMenu = firstPost.locator('[data-testid="post-menu"]')
    await postMenu.click()
    
    await expect(page.locator('[data-testid="edit-post"]')).toBeVisible()
    await page.click('[data-testid="edit-post"]')
    
    // Edit the post content
    const editedContent = 'This is my edited first post! ✨'
    await page.fill('[data-testid="edit-content-input"]', editedContent)
    await page.click('[data-testid="save-edit"]')
    
    // Verify post was updated
    await expect(firstPost.locator('[data-testid="post-content"]')).toContainText(editedContent)
    await expect(firstPost.locator('[data-testid="edited-badge"]')).toContainText('(edited)')
    
    // Step 7: Create different post types
    
    // Create a poll post
    await page.click('[data-testid="post-type-poll"]')
    await page.fill('[data-testid="post-content-input"]', 'What\'s your favorite study method?')
    await page.fill('[data-testid="poll-option-0"]', 'Flashcards')
    await page.fill('[data-testid="poll-option-1"]', 'Practice tests')
    await page.click('[data-testid="add-poll-option"]')
    await page.fill('[data-testid="poll-option-2"]', 'Group study')
    
    await page.click('[data-testid="post-submit"]')
    
    // Verify poll post appears
    const pollPost = page.locator('[data-testid="post-card"]').first()
    await expect(pollPost.locator('[data-testid="post-type-badge"]')).toContainText('poll')
    await expect(pollPost.locator('[data-testid="poll-question"]')).toContainText('What\'s your favorite study method?')
    await expect(pollPost.locator('[data-testid="poll-option"]')).toHaveCount(3)
    
    // Step 8: Test @mentions
    await page.click('[data-testid="post-type-text"]') // Switch back to text
    await page.fill('[data-testid="post-content-input"]', 'Hey @')
    
    // Type partial handle to trigger mention suggestions
    await page.type('[data-testid="post-content-input"]', 'alice')
    
    // Wait for mention suggestions
    await expect(page.locator('[data-testid="mention-suggestions"]')).toBeVisible()
    await expect(page.locator('[data-testid="mention-option"]').first()).toBeVisible()
    
    // Select first mention
    await page.click('[data-testid="mention-option"]').first()
    
    // Verify mention was inserted
    await expect(page.locator('[data-testid="post-content-input"]')).toHaveValue(/Hey @\w+ /)
    
    await page.click('[data-testid="post-submit"]')
    
    // Step 9: Test infinite scroll
    // Create multiple posts to test pagination
    for (let i = 0; i < 25; i++) {
      await page.fill('[data-testid="post-content-input"]', `Test post number ${i + 1}`)
      await page.click('[data-testid="post-submit"]')
      await page.waitForTimeout(100) // Small delay to avoid rate limiting
    }
    
    // Scroll to bottom to trigger infinite scroll
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    
    // Wait for more posts to load
    await expect(page.locator('[data-testid="post-card"]')).toHaveCount(20, { timeout: 10000 })
    
    // Continue scrolling
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(page.locator('[data-testid="loading-more"]')).toBeVisible()
    
    // Step 10: Test post deletion
    const lastPost = page.locator('[data-testid="post-card"]').first()
    await lastPost.locator('[data-testid="post-menu"]').click()
    await page.click('[data-testid="delete-post"]')
    
    // Confirm deletion
    await expect(page.locator('[data-testid="delete-confirmation"]')).toBeVisible()
    await page.click('[data-testid="confirm-delete"]')
    
    // Verify post shows deletion placeholder
    await expect(lastPost.locator('[data-testid="post-content"]')).toContainText(`Post removed by ${testUser.fullName}`)
    
    // Step 11: Test feed refresh
    await page.click('[data-testid="refresh-feed"]')
    await expect(page.locator('[data-testid="refreshing-indicator"]')).toBeVisible()
    await expect(page.locator('[data-testid="refreshing-indicator"]')).not.toBeVisible()
    
    // Step 12: Test draft saving
    const draftContent = 'This is a draft that should be saved'
    await page.fill('[data-testid="post-content-input"]', draftContent)
    
    // Wait for draft to be saved
    await expect(page.locator('[data-testid="draft-saved"]')).toBeVisible()
    
    // Refresh page and verify draft is restored
    await page.reload()
    await expect(page.locator('[data-testid="post-content-input"]')).toHaveValue(draftContent)
    
    // Clear draft
    await page.fill('[data-testid="post-content-input"]', '')
    await expect(page.locator('[data-testid="draft-saved"]')).not.toBeVisible()
  })
  
  test('should handle feed errors gracefully', async ({ page }) => {
    // Mock network failure
    await page.route('/api/spaces/*/posts', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' })
      })
    })
    
    await page.goto(`/spaces/${testSpace.id}`)
    
    // Verify error state is shown
    await expect(page.locator('[data-testid="feed-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="feed-error"]')).toContainText('Failed to load posts')
    
    // Test retry functionality
    await page.unroute('/api/spaces/*/posts')
    await page.click('[data-testid="retry-feed"]')
    
    // Verify feed loads after retry
    await expect(page.locator('[data-testid="feed-composer"]')).toBeVisible()
  })
  
  test('should enforce rate limiting', async ({ page }) => {
    await page.goto(`/spaces/${testSpace.id}`)
    
    // Try to create posts rapidly
    for (let i = 0; i < 12; i++) {
      await page.fill('[data-testid="post-content-input"]', `Rapid post ${i}`)
      await page.click('[data-testid="post-submit"]')
    }
    
    // Should show rate limit error
    await expect(page.locator('[data-testid="rate-limit-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="rate-limit-error"]')).toContainText('Rate limit exceeded')
  })
  
  test('should filter profanity', async ({ page }) => {
    await page.goto(`/spaces/${testSpace.id}`)
    
    // Try to post content with profanity
    await page.fill('[data-testid="post-content-input"]', 'This is spam content for advertisement')
    await page.click('[data-testid="post-submit"]')
    
    // Should show profanity error
    await expect(page.locator('[data-testid="profanity-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="profanity-error"]')).toContainText('inappropriate content')
  })
  
  test('should track analytics events', async ({ page }) => {
    // Mock analytics endpoint
    interface AnalyticsEvent {
      event: string;
      spaceId?: string;
      metadata?: {
        reaction?: string;
        [key: string]: unknown;
      };
      [key: string]: unknown;
    }
    
    const analyticsEvents: AnalyticsEvent[] = []
    await page.route('/api/analytics/track', route => {
      const request = route.request()
      analyticsEvents.push(request.postDataJSON())
      route.fulfill({ status: 200, body: '{}' })
    })
    
    await page.goto(`/spaces/${testSpace.id}`)
    
    // Create a post
    await page.fill('[data-testid="post-content-input"]', 'Analytics test post')
    await page.click('[data-testid="post-submit"]')
    
    // React to post
    await page.click('[data-testid="heart-reaction"]')
    
    // Wait for analytics to be sent
    await page.waitForTimeout(1000)
    
    // Verify analytics events were tracked
    expect(analyticsEvents.length).toBeGreaterThan(0)
    
    const postCreatedEvent = analyticsEvents.find(e => e.event === 'post_created')
    expect(postCreatedEvent).toBeDefined()
    expect(postCreatedEvent.spaceId).toBe(testSpace.id)
    
    const postReactedEvent = analyticsEvents.find(e => e.event === 'post_reacted')
    expect(postReactedEvent).toBeDefined()
    expect(postReactedEvent.metadata.reaction).toBe('heart')
  })
}) 