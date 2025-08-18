import { test, expect, Page } from '@playwright/test';

const mockUser = {
  email: 'testuser@university.edu',
  displayName: 'Test User',
  handle: 'testuser'
};

const mockSpace = {
  name: 'CS Study Group',
  description: 'A collaborative space for Computer Science students to study together and share resources',
  category: 'academic',
  privacy: 'public',
  tags: ['computer-science', 'study-group', 'collaboration']
};

async function authenticateUser(page: Page) {
  await page.goto('/auth/login');
  await page.fill('[data-testid="email-input"]', mockUser.email);
  await page.click('[data-testid="send-magic-link-button"]');
  
  // Simulate magic link verification for existing user
  await page.goto('/auth/verify?token=existing-user-token&email=' + encodeURIComponent(mockUser.email));
  await expect(page).toHaveURL('/dashboard');
}

async function createSpace(page: Page, spaceData: typeof mockSpace) {
  await page.click('[data-testid="create-space-button"]');
  await expect(page.locator('[data-testid="create-space-modal"]')).toBeVisible();
  
  await page.fill('[data-testid="space-name-input"]', spaceData.name);
  await page.fill('[data-testid="space-description-textarea"]', spaceData.description);
  await page.selectOption('[data-testid="space-category-select"]', spaceData.category);
  await page.click(`[data-testid="privacy-${spaceData.privacy}"]`);
  
  // Add tags
  for (const tag of spaceData.tags) {
    await page.fill('[data-testid="tag-input"]', tag);
    await page.keyboard.press('Enter');
  }
  
  await page.click('[data-testid="create-space-submit"]');
}

test.describe('Spaces Lifecycle E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await authenticateUser(page);
  });

  test('completes full space lifecycle: create → customize → invite → manage → archive', async ({ page }) => {
    // Step 1: Navigate to spaces and create new space
    await page.click('[data-testid="nav-spaces"]');
    await expect(page).toHaveURL('/spaces');
    await expect(page.locator('[data-testid="spaces-page"]')).toBeVisible();
    
    await createSpace(page, mockSpace);
    
    // Verify space creation success
    await expect(page.locator('[data-testid="space-created-toast"]')).toBeVisible();
    await expect(page.locator('text=Space created successfully')).toBeVisible();
    
    // Should redirect to new space
    await expect(page).toHaveURL(/\/spaces\/[a-zA-Z0-9-]+$/);
    await expect(page.locator(`text=${mockSpace.name}`)).toBeVisible();
    await expect(page.locator(`text=${mockSpace.description}`)).toBeVisible();
    
    // Step 2: Customize space settings
    await page.click('[data-testid="space-settings-button"]');
    await expect(page.locator('[data-testid="space-settings-modal"]')).toBeVisible();
    
    // Update space appearance
    await page.click('[data-testid="appearance-tab"]');
    await page.click('[data-testid="color-blue"]');
    await page.fill('[data-testid="custom-banner-input"]', 'https://example.com/banner.jpg');
    
    // Update space rules
    await page.click('[data-testid="rules-tab"]');
    await page.fill('[data-testid="space-rules-textarea"]', 'Be respectful and help each other learn');
    
    await page.click('[data-testid="save-settings-button"]');
    await expect(page.locator('[data-testid="settings-saved-toast"]')).toBeVisible();
    
    // Step 3: Invite members to space
    await page.click('[data-testid="invite-members-button"]');
    await expect(page.locator('[data-testid="invite-modal"]')).toBeVisible();
    
    // Invite by email
    await page.fill('[data-testid="invite-email-input"]', 'newmember@university.edu');
    await page.fill('[data-testid="invite-message-textarea"]', 'Join our CS study group!');
    await page.click('[data-testid="send-invite-button"]');
    
    await expect(page.locator('[data-testid="invite-sent-confirmation"]')).toBeVisible();
    
    // Invite by handle
    await page.fill('[data-testid="invite-handle-input"]', '@studybuddy');
    await page.click('[data-testid="search-user-button"]');
    await page.click('[data-testid="invite-user-button"]');
    
    await page.click('[data-testid="close-invite-modal"]');
    
    // Step 4: Create content within space
    await page.click('[data-testid="create-post-button"]');
    await page.fill('[data-testid="post-content-textarea"]', 'Welcome to our study group! Let\'s share resources and help each other succeed.');
    await page.click('[data-testid="publish-post-button"]');
    
    await expect(page.locator('[data-testid="post-published-toast"]')).toBeVisible();
    await expect(page.locator('text=Welcome to our study group!')).toBeVisible();
    
    // Step 5: Manage member permissions
    await page.click('[data-testid="members-tab"]');
    await expect(page.locator('[data-testid="members-list"]')).toBeVisible();
    
    // Promote a member to moderator
    const memberRow = page.locator('[data-testid="member-row"]').first();
    await memberRow.locator('[data-testid="member-actions-menu"]').click();
    await page.click('[data-testid="promote-to-moderator"]');
    
    await expect(page.locator('[data-testid="member-promoted-toast"]')).toBeVisible();
    await expect(memberRow.locator('[data-testid="moderator-badge"]')).toBeVisible();
    
    // Step 6: Monitor space analytics
    await page.click('[data-testid="analytics-tab"]');
    await expect(page.locator('[data-testid="space-analytics"]')).toBeVisible();
    
    await expect(page.locator('[data-testid="member-count"]')).toHaveText('3 members');
    await expect(page.locator('[data-testid="post-count"]')).toHaveText('1 post');
    await expect(page.locator('[data-testid="engagement-rate"]')).toBeVisible();
    
    // Step 7: Archive space
    await page.click('[data-testid="space-settings-button"]');
    await page.click('[data-testid="danger-zone-tab"]');
    await page.click('[data-testid="archive-space-button"]');
    
    await expect(page.locator('[data-testid="archive-confirmation-modal"]')).toBeVisible();
    await page.fill('[data-testid="confirmation-input"]', mockSpace.name);
    await page.click('[data-testid="confirm-archive-button"]');
    
    await expect(page.locator('[data-testid="space-archived-toast"]')).toBeVisible();
    await expect(page).toHaveURL('/spaces');
    
    // Verify space is archived
    await page.click('[data-testid="archived-spaces-filter"]');
    await expect(page.locator(`text=${mockSpace.name}`)).toBeVisible();
    await expect(page.locator('[data-testid="archived-badge"]')).toBeVisible();
  });

  test('handles space discovery and joining flow', async ({ page }) => {
    await page.goto('/spaces');
    
    // Test space discovery filters
    await page.click('[data-testid="discover-spaces-button"]');
    await expect(page.locator('[data-testid="discovery-filters"]')).toBeVisible();
    
    // Filter by category
    await page.selectOption('[data-testid="category-filter"]', 'academic');
    await page.click('[data-testid="apply-filters-button"]');
    
    await expect(page.locator('[data-testid="discovered-spaces"]')).toBeVisible();
    const spaceCard = page.locator('[data-testid="space-card"]').first();
    
    // Preview space before joining
    await spaceCard.click();
    await expect(page.locator('[data-testid="space-preview-modal"]')).toBeVisible();
    
    await expect(page.locator('[data-testid="space-preview-name"]')).toBeVisible();
    await expect(page.locator('[data-testid="space-preview-description"]')).toBeVisible();
    await expect(page.locator('[data-testid="space-preview-stats"]')).toBeVisible();
    
    // Join space
    await page.click('[data-testid="join-space-button"]');
    await expect(page.locator('[data-testid="join-space-toast"]')).toBeVisible();
    
    // Verify joined space appears in user's spaces
    await page.click('[data-testid="close-preview-modal"]');
    await page.click('[data-testid="my-spaces-filter"]');
    
    const joinedSpace = page.locator('[data-testid="joined-space"]').first();
    await expect(joinedSpace).toBeVisible();
    await expect(joinedSpace.locator('[data-testid="member-badge"]')).toBeVisible();
  });

  test('validates space creation form and handles errors', async ({ page }) => {
    await page.goto('/spaces');
    await page.click('[data-testid="create-space-button"]');
    
    // Test required field validation
    await page.click('[data-testid="create-space-submit"]');
    
    await expect(page.locator('[data-testid="name-error"]')).toBeVisible();
    await expect(page.locator('text=Space name is required')).toBeVisible();
    
    // Test name length validation
    await page.fill('[data-testid="space-name-input"]', 'a'.repeat(101));
    await page.click('[data-testid="create-space-submit"]');
    
    await expect(page.locator('[data-testid="name-error"]')).toBeVisible();
    await expect(page.locator('text=Space name must be under 100 characters')).toBeVisible();
    
    // Test description length validation
    await page.fill('[data-testid="space-name-input"]', 'Valid Name');
    await page.fill('[data-testid="space-description-textarea"]', 'a'.repeat(1001));
    await page.click('[data-testid="create-space-submit"]');
    
    await expect(page.locator('[data-testid="description-error"]')).toBeVisible();
    await expect(page.locator('text=Description must be under 1000 characters')).toBeVisible();
    
    // Test duplicate space name
    await page.fill('[data-testid="space-description-textarea"]', 'Valid description');
    await page.fill('[data-testid="space-name-input"]', 'Existing Space Name');
    await page.click('[data-testid="create-space-submit"]');
    
    await expect(page.locator('[data-testid="name-error"]')).toBeVisible();
    await expect(page.locator('text=A space with this name already exists')).toBeVisible();
  });

  test('handles space member management and permissions', async ({ page }) => {
    // Navigate to existing space (assume user is admin)
    await page.goto('/spaces/test-space-id');
    await page.click('[data-testid="members-tab"]');
    
    // Test member search and filtering
    await page.fill('[data-testid="member-search-input"]', 'john');
    await expect(page.locator('[data-testid="filtered-members"]')).toBeVisible();
    
    // Test member role changes
    const memberRow = page.locator('[data-testid="member-row"]').first();
    await memberRow.locator('[data-testid="member-actions-menu"]').click();
    
    await page.click('[data-testid="change-role-option"]');
    await expect(page.locator('[data-testid="role-change-modal"]')).toBeVisible();
    
    await page.selectOption('[data-testid="new-role-select"]', 'moderator');
    await page.fill('[data-testid="role-change-reason"]', 'Promoting active contributor');
    await page.click('[data-testid="confirm-role-change"]');
    
    await expect(page.locator('[data-testid="role-changed-toast"]')).toBeVisible();
    
    // Test member removal
    await memberRow.locator('[data-testid="member-actions-menu"]').click();
    await page.click('[data-testid="remove-member-option"]');
    
    await expect(page.locator('[data-testid="remove-member-modal"]')).toBeVisible();
    await page.fill('[data-testid="removal-reason"]', 'Violation of community guidelines');
    await page.click('[data-testid="confirm-removal"]');
    
    await expect(page.locator('[data-testid="member-removed-toast"]')).toBeVisible();
  });

  test('supports space content creation and moderation', async ({ page }) => {
    await page.goto('/spaces/test-space-id');
    
    // Create a text post
    await page.click('[data-testid="create-post-button"]');
    await page.fill('[data-testid="post-content-textarea"]', 'Check out this helpful study resource!');
    await page.click('[data-testid="publish-post-button"]');
    
    await expect(page.locator('[data-testid="post-published-toast"]')).toBeVisible();
    
    // Create a post with file attachment
    await page.click('[data-testid="create-post-button"]');
    await page.fill('[data-testid="post-content-textarea"]', 'Sharing my study notes for the midterm');
    
    const fileInput = page.locator('[data-testid="file-upload-input"]');
    await fileInput.setInputFiles({
      name: 'study-notes.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('PDF content')
    });
    
    await expect(page.locator('[data-testid="file-preview"]')).toBeVisible();
    await expect(page.locator('text=study-notes.pdf')).toBeVisible();
    
    await page.click('[data-testid="publish-post-button"]');
    await expect(page.locator('[data-testid="post-published-toast"]')).toBeVisible();
    
    // Test post interactions
    const post = page.locator('[data-testid="post"]').first();
    
    // Like post
    await post.locator('[data-testid="like-button"]').click();
    await expect(post.locator('[data-testid="like-count"]')).toHaveText('1');
    
    // Comment on post
    await post.locator('[data-testid="comment-button"]').click();
    await page.fill('[data-testid="comment-input"]', 'Thanks for sharing this!');
    await page.click('[data-testid="submit-comment-button"]');
    
    await expect(page.locator('[data-testid="comment"]')).toBeVisible();
    await expect(page.locator('text=Thanks for sharing this!')).toBeVisible();
    
    // Test content moderation (as moderator)
    await post.locator('[data-testid="post-actions-menu"]').click();
    await page.click('[data-testid="moderate-post-option"]');
    
    await expect(page.locator('[data-testid="moderation-modal"]')).toBeVisible();
    await page.click('[data-testid="flag-inappropriate"]');
    await page.fill('[data-testid="moderation-reason"]', 'Spam content');
    await page.click('[data-testid="submit-moderation"]');
    
    await expect(page.locator('[data-testid="post-flagged-toast"]')).toBeVisible();
  });

  test('handles space privacy settings and visibility', async ({ page }) => {
    await page.goto('/spaces');
    
    // Create private space
    await createSpace(page, { ...mockSpace, privacy: 'private', name: 'Private Study Group' });
    
    // Verify private space visibility
    await page.goto('/spaces');
    await page.click('[data-testid="my-spaces-filter"]');
    
    const privateSpace = page.locator('[data-testid="space-card"]', { hasText: 'Private Study Group' });
    await expect(privateSpace.locator('[data-testid="private-badge"]')).toBeVisible();
    
    // Test invite-only functionality
    await privateSpace.click();
    await page.click('[data-testid="invite-members-button"]');
    
    // Only admins should see invite button
    await expect(page.locator('[data-testid="invite-modal"]')).toBeVisible();
    
    // Test visibility to non-members
    await page.goto('/spaces');
    await page.click('[data-testid="discover-spaces-button"]');
    
    // Private space should not appear in public discovery
    await expect(page.locator('text=Private Study Group')).not.toBeVisible();
  });

  test('supports real-time space activity and notifications', async ({ page }) => {
    await page.goto('/spaces/active-space-id');
    
    // Enable notifications for space
    await page.click('[data-testid="notification-settings-button"]');
    await page.check('[data-testid="new-posts-notifications"]');
    await page.check('[data-testid="new-members-notifications"]');
    await page.click('[data-testid="save-notification-settings"]');
    
    // Simulate real-time activity (would require WebSocket in real implementation)
    await page.evaluate(() => {
      // Mock WebSocket message for new post
      window.dispatchEvent(new CustomEvent('websocket-message', {
        detail: {
          type: 'new_post',
          spaceId: 'active-space-id',
          post: {
            id: 'new-post-123',
            content: 'Just posted a new resource!',
            author: 'Another User'
          }
        }
      }));
    });
    
    // Verify real-time post appears
    await expect(page.locator('[data-testid="new-post-notification"]')).toBeVisible();
    await expect(page.locator('text=Just posted a new resource!')).toBeVisible();
    
    // Test live member count updates
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('websocket-message', {
        detail: {
          type: 'member_joined',
          spaceId: 'active-space-id',
          member: { name: 'New Member' }
        }
      }));
    });
    
    await expect(page.locator('[data-testid="member-joined-notification"]')).toBeVisible();
    
    // Verify member count updated
    const memberCount = page.locator('[data-testid="member-count"]');
    await expect(memberCount).toHaveText('5 members'); // Incremented
  });

  test('provides accessibility features throughout spaces', async ({ page }) => {
    await page.goto('/spaces');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="create-space-button"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="discover-spaces-button"]')).toBeFocused();
    
    // Test screen reader announcements
    await page.click('[data-testid="create-space-button"]');
    await expect(page.locator('[role="dialog"]')).toHaveAttribute('aria-labelledby', 'create-space-title');
    
    // Test ARIA labels in space cards
    const spaceCard = page.locator('[data-testid="space-card"]').first();
    await expect(spaceCard).toHaveAttribute('role', 'article');
    await expect(spaceCard).toHaveAttribute('aria-label');
    
    // Test form accessibility
    await expect(page.locator('[data-testid="space-name-input"]')).toHaveAttribute('aria-required', 'true');
    await expect(page.locator('[data-testid="space-description-textarea"]')).toHaveAttribute('aria-describedby');
  });
});