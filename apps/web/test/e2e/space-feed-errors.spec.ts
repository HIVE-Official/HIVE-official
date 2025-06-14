import { test, expect } from '@playwright/test'
import { setupTestUser, cleanupTestData } from './helpers/test-setup'

test.describe('Space Feed Error Scenarios', () => {
  let testUser: any
  let testSpace: any
  
  test.beforeEach(async ({ page }) => {
    testUser = await setupTestUser()
    testSpace = {
      id: `test-space-${Date.now()}`,
      name: 'Test Space',
      description: 'A space for testing feed errors',
    }
    
    // Setup authenticated user
    await page.goto('/auth/login')
    await page.fill('[data-testid="email-input"]', testUser.email)
    await page.click('[data-testid="send-magic-link"]')
    await page.goto(`/auth/verify?token=test-token&email=${encodeURIComponent(testUser.email)}`)
    
    // Navigate to test space
    await page.goto(`/spaces/${testSpace.id}`)
  })
  
  test.afterEach(async () => {
    await cleanupTestData(testUser.id, testSpace.id)
  })
  
  test('should handle network failures gracefully', async ({ page }) => {
    // Test 1: Feed loading failure
    await page.route('/api/spaces/*/posts*', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Database connection failed' })
      })
    })
    
    await page.reload()
    
    // Verify error state
    await expect(page.locator('[data-testid="feed-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="feed-error-message"]')).toContainText('Failed to load posts')
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible()
    
    // Test retry functionality
    await page.unroute('/api/spaces/*/posts*')
    await page.click('[data-testid="retry-button"]')
    
    await expect(page.locator('[data-testid="feed-composer"]')).toBeVisible()
    await expect(page.locator('[data-testid="feed-error"]')).not.toBeVisible()
    
    // Test 2: Post creation failure
    await page.route('/api/spaces/*/posts', route => {
      if (route.request().method() === 'POST') {
        route.fulfill({
          status: 503,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Service temporarily unavailable' })
        })
      } else {
        route.continue()
      }
    })
    
    await page.fill('[data-testid="post-content-input"]', 'This post should fail')
    await page.click('[data-testid="post-submit"]')
    
    // Verify error message
    await expect(page.locator('[data-testid="post-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="post-error"]')).toContainText('Service temporarily unavailable')
    
    // Verify post content is preserved for retry
    await expect(page.locator('[data-testid="post-content-input"]')).toHaveValue('This post should fail')
    
    // Test 3: Reaction failure
    await page.unroute('/api/spaces/*/posts')
    
    // Create a post first
    await page.fill('[data-testid="post-content-input"]', 'Test post for reaction failure')
    await page.click('[data-testid="post-submit"]')
    await expect(page.locator('[data-testid="post-card"]').first()).toBeVisible()
    
    // Mock reaction endpoint failure
    await page.route('/api/spaces/*/posts/*/react', route => {
      route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Too many requests' })
      })
    })
    
    await page.click('[data-testid="heart-reaction"]')
    
    // Verify reaction error (should be subtle, not blocking)
    await expect(page.locator('[data-testid="reaction-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="reaction-error"]')).toContainText('Failed to react')
    
    // Error should auto-dismiss after a few seconds
    await expect(page.locator('[data-testid="reaction-error"]')).not.toBeVisible({ timeout: 5000 })
  })
  
  test('should handle slow network conditions', async ({ page }) => {
    // Simulate slow network
    await page.route('/api/spaces/*/posts*', async route => {
      await new Promise(resolve => setTimeout(resolve, 3000)) // 3 second delay
      route.continue()
    })
    
    await page.reload()
    
    // Verify loading state
    await expect(page.locator('[data-testid="feed-loading"]')).toBeVisible()
    await expect(page.locator('[data-testid="loading-spinner"]')).toBeVisible()
    
    // Wait for content to load
    await expect(page.locator('[data-testid="feed-composer"]')).toBeVisible({ timeout: 10000 })
    await expect(page.locator('[data-testid="feed-loading"]')).not.toBeVisible()
    
    // Test slow post creation
    await page.route('/api/spaces/*/posts', async route => {
      if (route.request().method() === 'POST') {
        await new Promise(resolve => setTimeout(resolve, 2000)) // 2 second delay
        route.continue()
      } else {
        route.continue()
      }
    })
    
    await page.fill('[data-testid="post-content-input"]', 'Slow post creation test')
    await page.click('[data-testid="post-submit"]')
    
    // Verify loading state during post creation
    await expect(page.locator('[data-testid="post-submit"]')).toContainText('Posting...')
    await expect(page.locator('[data-testid="post-submit"]')).toBeDisabled()
    
    // Wait for post to be created
    await expect(page.locator('[data-testid="post-submit"]')).toContainText('Post')
    await expect(page.locator('[data-testid="post-submit"]')).toBeEnabled()
    await expect(page.locator('[data-testid="post-card"]').first()).toBeVisible()
  })
  
  test('should validate post content', async ({ page }) => {
    // Test 1: Empty content
    await page.click('[data-testid="post-submit"]')
    
    // Submit button should be disabled for empty content
    await expect(page.locator('[data-testid="post-submit"]')).toBeDisabled()
    
    // Test 2: Content too long
    const longContent = 'a'.repeat(501) // Exceeds 500 char limit
    await page.fill('[data-testid="post-content-input"]', longContent)
    
    // Verify character count warning
    await expect(page.locator('[data-testid="char-count"]')).toHaveClass(/text-destructive/)
    await expect(page.locator('[data-testid="char-count"]')).toContainText('-1')
    
    // Submit should be disabled
    await expect(page.locator('[data-testid="post-submit"]')).toBeDisabled()
    
    // Test 3: Content at limit
    const limitContent = 'a'.repeat(500)
    await page.fill('[data-testid="post-content-input"]', limitContent)
    
    await expect(page.locator('[data-testid="char-count"]')).toContainText('0')
    await expect(page.locator('[data-testid="post-submit"]')).toBeEnabled()
    
    // Test 4: Profanity filter
    await page.fill('[data-testid="post-content-input"]', 'This is spam advertisement content')
    await page.click('[data-testid="post-submit"]')
    
    await expect(page.locator('[data-testid="profanity-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="profanity-error"]')).toContainText('inappropriate content')
    
    // Test 5: Special characters and emojis
    await page.fill('[data-testid="post-content-input"]', 'Test with emojis 🎉🚀 and special chars: @#$%^&*()')
    await page.click('[data-testid="post-submit"]')
    
    // Should work fine
    await expect(page.locator('[data-testid="post-card"]').first()).toBeVisible()
    await expect(page.locator('[data-testid="post-content"]').first()).toContainText('🎉🚀')
  })
  
  test('should handle authentication errors', async ({ page }) => {
    // Mock authentication failure
    await page.route('/api/spaces/*/posts', route => {
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Unauthorized' })
      })
    })
    
    await page.fill('[data-testid="post-content-input"]', 'This should fail due to auth')
    await page.click('[data-testid="post-submit"]')
    
    // Should redirect to login or show auth error
    await expect(page.locator('[data-testid="auth-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="auth-error"]')).toContainText('Please log in again')
  })
  
  test('should handle permission errors', async ({ page }) => {
    // Mock permission denied (user not member of space)
    await page.route('/api/spaces/*/posts', route => {
      route.fulfill({
        status: 403,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Not a member of this space' })
      })
    })
    
    await page.fill('[data-testid="post-content-input"]', 'This should fail due to permissions')
    await page.click('[data-testid="post-submit"]')
    
    await expect(page.locator('[data-testid="permission-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="permission-error"]')).toContainText('Not a member of this space')
  })
  
  test('should handle rate limiting', async ({ page }) => {
    // Mock rate limit response
    await page.route('/api/spaces/*/posts', route => {
      route.fulfill({
        status: 429,
        contentType: 'application/json',
        body: JSON.stringify({ 
          error: 'Rate limit exceeded. Please wait before posting again.',
          retryAfter: 300 // 5 minutes
        })
      })
    })
    
    await page.fill('[data-testid="post-content-input"]', 'Rate limited post')
    await page.click('[data-testid="post-submit"]')
    
    await expect(page.locator('[data-testid="rate-limit-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="rate-limit-error"]')).toContainText('Rate limit exceeded')
    
    // Submit button should be disabled temporarily
    await expect(page.locator('[data-testid="post-submit"]')).toBeDisabled()
    
    // Should show countdown or retry time
    await expect(page.locator('[data-testid="retry-countdown"]')).toBeVisible()
  })
  
  test('should handle edit window expiration', async ({ page }) => {
    // Create a post first
    await page.fill('[data-testid="post-content-input"]', 'Post to test edit expiration')
    await page.click('[data-testid="post-submit"]')
    await expect(page.locator('[data-testid="post-card"]').first()).toBeVisible()
    
    // Mock edit endpoint to return expired error
    await page.route('/api/spaces/*/posts/*', route => {
      if (route.request().method() === 'PATCH') {
        route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({ 
            error: 'Edit window has expired. Posts can only be edited within 15 minutes of creation.' 
          })
        })
      } else {
        route.continue()
      }
    })
    
    // Try to edit the post
    await page.click('[data-testid="post-menu"]')
    await page.click('[data-testid="edit-post"]')
    
    await page.fill('[data-testid="edit-content-input"]', 'Attempted edit after expiration')
    await page.click('[data-testid="save-edit"]')
    
    await expect(page.locator('[data-testid="edit-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="edit-error"]')).toContainText('Edit window has expired')
    
    // Edit dialog should close and original content should remain
    await expect(page.locator('[data-testid="edit-dialog"]')).not.toBeVisible()
    await expect(page.locator('[data-testid="post-content"]').first()).toContainText('Post to test edit expiration')
  })
  
  test('should handle infinite scroll errors', async ({ page }) => {
    // Create initial posts
    for (let i = 0; i < 5; i++) {
      await page.fill('[data-testid="post-content-input"]', `Initial post ${i}`)
      await page.click('[data-testid="post-submit"]')
    }
    
    // Mock pagination endpoint failure
    await page.route('/api/spaces/*/posts*', route => {
      const url = new URL(route.request().url())
      if (url.searchParams.has('lastPostId')) {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Failed to load more posts' })
        })
      } else {
        route.continue()
      }
    })
    
    // Scroll to trigger infinite scroll
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    
    // Should show error for loading more posts
    await expect(page.locator('[data-testid="load-more-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="load-more-error"]')).toContainText('Failed to load more posts')
    
    // Should have retry button
    await expect(page.locator('[data-testid="retry-load-more"]')).toBeVisible()
    
    // Test retry
    await page.unroute('/api/spaces/*/posts*')
    await page.click('[data-testid="retry-load-more"]')
    
    // Should attempt to load more posts again
    await expect(page.locator('[data-testid="loading-more"]')).toBeVisible()
  })
  
  test('should handle draft saving errors', async ({ page }) => {
    // Mock localStorage to throw errors
    await page.addInitScript(() => {
      const originalSetItem = localStorage.setItem
      localStorage.setItem = function(key, value) {
        if (key.includes('hive-draft')) {
          throw new Error('Storage quota exceeded')
        }
        return originalSetItem.call(this, key, value)
      }
    })
    
    await page.fill('[data-testid="post-content-input"]', 'Draft that should fail to save')
    
    // Should show draft save error
    await expect(page.locator('[data-testid="draft-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="draft-error"]')).toContainText('Failed to save draft')
    
    // Should not show "Draft saved" indicator
    await expect(page.locator('[data-testid="draft-saved"]')).not.toBeVisible()
  })
  
  test('should handle mention loading errors', async ({ page }) => {
    // Mock mention search endpoint failure
    await page.route('/api/spaces/*/members/search*', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Failed to search members' })
      })
    })
    
    await page.fill('[data-testid="post-content-input"]', 'Hey @')
    await page.type('[data-testid="post-content-input"]', 'alice')
    
    // Should show mention error or fallback gracefully
    await expect(page.locator('[data-testid="mention-error"]')).toBeVisible()
    await expect(page.locator('[data-testid="mention-error"]')).toContainText('Failed to load suggestions')
    
    // Should still allow typing without mentions
    await page.type('[data-testid="post-content-input"]', ' how are you?')
    await expect(page.locator('[data-testid="post-content-input"]')).toHaveValue('Hey @alice how are you?')
  })
}) 