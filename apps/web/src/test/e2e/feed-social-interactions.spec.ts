import { test, expect, Page } from '@playwright/test';

const mockUser = {
  email: 'socialuser@university.edu',
  displayName: 'Social User',
  handle: 'socialuser'
};

async function authenticateUser(page: Page) {
  await page.goto('/auth/login');
  await page.fill('[data-testid="email-input"]', mockUser.email);
  await page.click('[data-testid="send-magic-link-button"]');
  
  await page.goto('/auth/verify?token=social-user-token&email=' + encodeURIComponent(mockUser.email));
  await expect(page).toHaveURL('/dashboard');
}

async function createPost(page: Page, content: string, options: { hasImage?: boolean, hasLink?: boolean } = {}) {
  await page.click('[data-testid="create-post-button"]');
  await expect(page.locator('[data-testid="post-composer"]')).toBeVisible();
  
  await page.fill('[data-testid="post-content-textarea"]', content);
  
  if (options.hasImage) {
    const fileInput = page.locator('[data-testid="image-upload-input"]');
    await fileInput.setInputFiles({
      name: 'test-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake image content')
    });
    await expect(page.locator('[data-testid="image-preview"]')).toBeVisible();
  }
  
  if (options.hasLink) {
    await page.fill('[data-testid="link-input"]', 'https://example.com/resource');
    await expect(page.locator('[data-testid="link-preview"]')).toBeVisible();
  }
  
  await page.click('[data-testid="publish-post-button"]');
  await expect(page.locator('[data-testid="post-published-toast"]')).toBeVisible();
}

test.describe('Feed and Social Interactions E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await authenticateUser(page);
  });

  test('completes full social interaction flow: post → like → comment → share → follow', async ({ page }) => {
    // Step 1: Navigate to feed
    await page.click('[data-testid="nav-feed"]');
    await expect(page).toHaveURL('/feed');
    await expect(page.locator('[data-testid="feed-page"]')).toBeVisible();
    
    // Step 2: Create a post with rich content
    await createPost(page, 'Just discovered an amazing study technique! Check out this resource that helped me improve my grades significantly. #StudyTips #AcademicSuccess', {
      hasImage: true,
      hasLink: true
    });
    
    // Verify post appears in feed
    const createdPost = page.locator('[data-testid="post"]').first();
    await expect(createdPost).toBeVisible();
    await expect(createdPost).toContainText('Just discovered an amazing study technique!');
    await expect(createdPost.locator('[data-testid="post-image"]')).toBeVisible();
    await expect(createdPost.locator('[data-testid="post-link-preview"]')).toBeVisible();
    
    // Step 3: Like the post
    await createdPost.locator('[data-testid="like-button"]').click();
    await expect(createdPost.locator('[data-testid="like-button"]')).toHaveClass(/liked/);
    await expect(createdPost.locator('[data-testid="like-count"]')).toHaveText('1');
    
    // Verify like animation
    await expect(createdPost.locator('[data-testid="like-animation"]')).toBeVisible();
    
    // Step 4: Comment on the post
    await createdPost.locator('[data-testid="comment-button"]').click();
    await expect(page.locator('[data-testid="comment-section"]')).toBeVisible();
    
    await page.fill('[data-testid="comment-input"]', 'This is so helpful! Could you share more details about the technique?');
    await page.click('[data-testid="submit-comment-button"]');
    
    await expect(page.locator('[data-testid="comment-submitted-toast"]')).toBeVisible();
    await expect(page.locator('[data-testid="comment"]')).toContainText('This is so helpful!');
    
    // Reply to comment
    await page.locator('[data-testid="reply-button"]').first().click();
    await page.fill('[data-testid="reply-input"]', 'Sure! I\'ll create a detailed post about it soon.');
    await page.click('[data-testid="submit-reply-button"]');
    
    await expect(page.locator('[data-testid="reply"]')).toContainText('Sure! I\'ll create a detailed post');
    
    // Step 5: Share the post
    await createdPost.locator('[data-testid="share-button"]').click();
    await expect(page.locator('[data-testid="share-modal"]')).toBeVisible();
    
    // Share to spaces
    await page.check('[data-testid="share-to-space-cs-study"]');
    await page.check('[data-testid="share-to-space-academic-tips"]');
    
    // Add share message
    await page.fill('[data-testid="share-message"]', 'Thought this might be useful for our study group!');
    await page.click('[data-testid="confirm-share-button"]');
    
    await expect(page.locator('[data-testid="post-shared-toast"]')).toBeVisible();
    
    // Step 6: Follow user interaction
    const userProfile = page.locator('[data-testid="post-author"]').first();
    await userProfile.click();
    
    await expect(page.locator('[data-testid="user-profile-modal"]')).toBeVisible();
    await page.click('[data-testid="follow-user-button"]');
    
    await expect(page.locator('[data-testid="user-followed-toast"]')).toBeVisible();
    await expect(page.locator('[data-testid="follow-user-button"]')).toHaveText('Following');
    
    // Step 7: Bookmark post for later
    await page.click('[data-testid="close-profile-modal"]');
    await createdPost.locator('[data-testid="bookmark-button"]').click();
    
    await expect(page.locator('[data-testid="post-bookmarked-toast"]')).toBeVisible();
    await expect(createdPost.locator('[data-testid="bookmark-button"]')).toHaveClass(/bookmarked/);
    
    // Step 8: View bookmarked posts
    await page.click('[data-testid="profile-menu"]');
    await page.click('[data-testid="bookmarks-link"]');
    
    await expect(page).toHaveURL('/profile/bookmarks');
    await expect(page.locator('[data-testid="bookmarked-post"]')).toContainText('Just discovered an amazing study technique!');
  });

  test('handles feed personalization and algorithm preferences', async ({ page }) => {
    await page.goto('/feed');
    
    // Access feed settings
    await page.click('[data-testid="feed-settings-button"]');
    await expect(page.locator('[data-testid="feed-settings-modal"]')).toBeVisible();
    
    // Customize algorithm preferences
    await page.click('[data-testid="algorithm-tab"]');
    
    // Set content preferences
    await page.check('[data-testid="prioritize-following"]');
    await page.check('[data-testid="show-trending-content"]');
    await page.uncheck('[data-testid="show-promoted-content"]');
    
    // Set topic interests
    await page.check('[data-testid="topic-computer-science"]');
    await page.check('[data-testid="topic-study-tips"]');
    await page.check('[data-testid="topic-career-advice"]');
    
    // Adjust content types
    await page.selectOption('[data-testid="post-type-priority"]', 'tools_and_resources');
    await page.selectOption('[data-testid="media-preference"]', 'mixed');
    
    await page.click('[data-testid="save-feed-settings"]');
    await expect(page.locator('[data-testid="settings-saved-toast"]')).toBeVisible();
    
    // Verify feed updates with new preferences
    await page.reload();
    await expect(page.locator('[data-testid="personalized-feed-indicator"]')).toBeVisible();
    
    // Check that relevant content appears
    await expect(page.locator('[data-testid="post"][data-category="tools"]')).toBeVisible();
    await expect(page.locator('[data-testid="post"][data-topic="computer-science"]')).toBeVisible();
  });

  test('manages social connections and network building', async ({ page }) => {
    await page.goto('/feed');
    
    // Discover suggested connections
    await page.click('[data-testid="discover-people-button"]');
    await expect(page.locator('[data-testid="people-discovery-modal"]')).toBeVisible();
    
    // Filter suggestions
    await page.selectOption('[data-testid="major-filter"]', 'Computer Science');
    await page.selectOption('[data-testid="year-filter"]', '2025');
    await page.click('[data-testid="apply-filters"]');
    
    const suggestionCard = page.locator('[data-testid="user-suggestion"]').first();
    await expect(suggestionCard).toBeVisible();
    
    // View mutual connections
    await suggestionCard.locator('[data-testid="mutual-connections"]').click();
    await expect(page.locator('[data-testid="mutual-connections-modal"]')).toBeVisible();
    
    await expect(page.locator('[data-testid="mutual-connection"]')).toHaveCount(3);
    await page.click('[data-testid="close-mutual-connections"]');
    
    // Send connection request
    await suggestionCard.locator('[data-testid="connect-button"]').click();
    await page.fill('[data-testid="connection-message"]', 'Hi! I noticed we\'re in the same CS program. Would love to connect!');
    await page.click('[data-testid="send-request"]');
    
    await expect(page.locator('[data-testid="connection-request-sent-toast"]')).toBeVisible();
    
    // Manage connection requests
    await page.click('[data-testid="close-discovery-modal"]');
    await page.click('[data-testid="notifications-button"]');
    
    await expect(page.locator('[data-testid="connection-request-notification"]')).toBeVisible();
    await page.click('[data-testid="accept-connection"]');
    
    await expect(page.locator('[data-testid="connection-accepted-toast"]')).toBeVisible();
  });

  test('handles content creation with rich media and formatting', async ({ page }) => {
    await page.goto('/feed');
    
    // Create post with rich formatting
    await page.click('[data-testid="create-post-button"]');
    
    // Use rich text editor
    const editor = page.locator('[data-testid="rich-text-editor"]');
    await editor.click();
    
    // Add formatted text
    await page.keyboard.type('Check out this amazing ');
    await page.keyboard.press('Control+b'); // Bold
    await page.keyboard.type('study resource');
    await page.keyboard.press('Control+b'); // End bold
    await page.keyboard.type(' I found!');
    
    // Add bullet points
    await page.keyboard.press('Enter');
    await page.click('[data-testid="bullet-list-button"]');
    await page.keyboard.type('Interactive tutorials');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Practice problems');
    await page.keyboard.press('Enter');
    await page.keyboard.type('Video explanations');
    
    // Add code block
    await page.keyboard.press('Enter');
    await page.click('[data-testid="code-block-button"]');
    await page.keyboard.type('function calculateGPA(grades) {\n  return grades.reduce((a, b) => a + b) / grades.length;\n}');
    
    // Upload multiple images
    const imageInput = page.locator('[data-testid="multi-image-upload"]');
    await imageInput.setInputFiles([
      {
        name: 'screenshot1.png',
        mimeType: 'image/png',
        buffer: Buffer.from('screenshot 1 content')
      },
      {
        name: 'screenshot2.png',
        mimeType: 'image/png',
        buffer: Buffer.from('screenshot 2 content')
      }
    ]);
    
    await expect(page.locator('[data-testid="image-gallery"]')).toBeVisible();
    await expect(page.locator('[data-testid="image-preview"]')).toHaveCount(2);
    
    // Add tags
    await page.fill('[data-testid="tag-input"]', 'programming');
    await page.keyboard.press('Enter');
    await page.fill('[data-testid="tag-input"]', 'tutorial');
    await page.keyboard.press('Enter');
    
    // Set audience
    await page.selectOption('[data-testid="audience-select"]', 'connections');
    
    // Schedule post
    await page.check('[data-testid="schedule-post"]');
    await page.fill('[data-testid="schedule-datetime"]', '2024-08-15T10:00');
    
    await page.click('[data-testid="schedule-post-button"]');
    await expect(page.locator('[data-testid="post-scheduled-toast"]')).toBeVisible();
    
    // View scheduled posts
    await page.click('[data-testid="profile-menu"]');
    await page.click('[data-testid="scheduled-posts-link"]');
    
    await expect(page.locator('[data-testid="scheduled-post"]')).toBeVisible();
    await expect(page.locator('[data-testid="scheduled-time"]')).toContainText('Aug 15, 2024 at 10:00 AM');
  });

  test('handles content moderation and reporting', async ({ page }) => {
    await page.goto('/feed');
    
    // Report inappropriate content
    const post = page.locator('[data-testid="post"]').first();
    await post.locator('[data-testid="post-menu"]').click();
    await page.click('[data-testid="report-post-option"]');
    
    await expect(page.locator('[data-testid="report-modal"]')).toBeVisible();
    
    // Select report reason
    await page.check('[data-testid="report-spam"]');
    await page.fill('[data-testid="report-details"]', 'This post contains spam links and promotional content');
    await page.click('[data-testid="submit-report"]');
    
    await expect(page.locator('[data-testid="report-submitted-toast"]')).toBeVisible();
    
    // Block user
    await post.locator('[data-testid="post-author"]').click();
    await page.click('[data-testid="block-user-button"]');
    
    await expect(page.locator('[data-testid="block-confirmation-modal"]')).toBeVisible();
    await page.fill('[data-testid="block-reason"]', 'Repeated spam posting');
    await page.click('[data-testid="confirm-block"]');
    
    await expect(page.locator('[data-testid="user-blocked-toast"]')).toBeVisible();
    
    // Hide sensitive content
    const sensitivePost = page.locator('[data-testid="post"][data-content-warning="true"]');
    await expect(sensitivePost.locator('[data-testid="content-warning"]')).toBeVisible();
    
    await sensitivePost.locator('[data-testid="show-content-button"]').click();
    await expect(sensitivePost.locator('[data-testid="post-content"]')).toBeVisible();
  });

  test('supports real-time notifications and activity updates', async ({ page }) => {
    await page.goto('/feed');
    
    // Enable real-time notifications
    await page.click('[data-testid="notification-settings"]');
    await page.check('[data-testid="real-time-notifications"]');
    await page.check('[data-testid="browser-notifications"]');
    await page.click('[data-testid="save-notification-settings"]');
    
    // Simulate real-time activities
    await page.evaluate(() => {
      // Mock WebSocket notifications
      window.dispatchEvent(new CustomEvent('websocket-notification', {
        detail: {
          type: 'post_liked',
          postId: 'post-123',
          user: { name: 'Study Buddy', avatar: 'avatar.jpg' },
          timestamp: Date.now()
        }
      }));
    });
    
    // Verify real-time notification appears
    await expect(page.locator('[data-testid="notification-toast"]')).toBeVisible();
    await expect(page.locator('[data-testid="notification-toast"]')).toContainText('Study Buddy liked your post');
    
    // Check notification center
    await page.click('[data-testid="notifications-button"]');
    await expect(page.locator('[data-testid="notifications-panel"]')).toBeVisible();
    
    await expect(page.locator('[data-testid="notification-item"]').first()).toContainText('Study Buddy liked your post');
    
    // Mark notifications as read
    await page.click('[data-testid="mark-all-read"]');
    await expect(page.locator('[data-testid="unread-count"]')).toHaveText('0');
    
    // Test activity indicator on posts
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('websocket-notification', {
        detail: {
          type: 'new_comment',
          postId: 'post-123',
          comment: { text: 'Great insight!', author: 'Classmate' }
        }
      }));
    });
    
    const post = page.locator('[data-testid="post"][data-id="post-123"]');
    await expect(post.locator('[data-testid="activity-indicator"]')).toBeVisible();
    await expect(post.locator('[data-testid="comment-count"]')).toHaveText('1');
  });

  test('handles feed filtering and content discovery', async ({ page }) => {
    await page.goto('/feed');
    
    // Use feed filters
    await page.click('[data-testid="feed-filters-button"]');
    await expect(page.locator('[data-testid="filters-panel"]')).toBeVisible();
    
    // Filter by content type
    await page.check('[data-testid="filter-tools"]');
    await page.check('[data-testid="filter-resources"]');
    await page.uncheck('[data-testid="filter-social"]');
    
    // Filter by time period
    await page.selectOption('[data-testid="time-filter"]', 'week');
    
    // Filter by connections
    await page.check('[data-testid="filter-following-only"]');
    
    await page.click('[data-testid="apply-filters"]');
    
    // Verify filtered content
    await expect(page.locator('[data-testid="filtered-posts"]')).toBeVisible();
    await expect(page.locator('[data-testid="post"][data-type="tool"]')).toBeVisible();
    await expect(page.locator('[data-testid="post"][data-type="social"]')).not.toBeVisible();
    
    // Search within feed
    await page.fill('[data-testid="feed-search"]', 'study techniques');
    await page.keyboard.press('Enter');
    
    await expect(page.locator('[data-testid="search-results"]')).toBeVisible();
    await expect(page.locator('[data-testid="search-highlight"]')).toContainText('study techniques');
    
    // Trending topics
    await page.click('[data-testid="trending-topics"]');
    await expect(page.locator('[data-testid="trending-list"]')).toBeVisible();
    
    const trendingTopic = page.locator('[data-testid="trending-topic"]').first();
    await trendingTopic.click();
    
    await expect(page.locator('[data-testid="topic-feed"]')).toBeVisible();
    await expect(page.locator('[data-testid="topic-posts"]')).toBeVisible();
  });

  test('provides accessibility features for social interactions', async ({ page }) => {
    await page.goto('/feed');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="create-post-button"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="feed-filters-button"]')).toBeFocused();
    
    // Test screen reader support for posts
    const post = page.locator('[data-testid="post"]').first();
    await expect(post).toHaveAttribute('role', 'article');
    await expect(post).toHaveAttribute('aria-label');
    
    // Test accessible interaction buttons
    await expect(post.locator('[data-testid="like-button"]')).toHaveAttribute('aria-label', 'Like this post');
    await expect(post.locator('[data-testid="comment-button"]')).toHaveAttribute('aria-label', 'Comment on this post');
    
    // Test image alt text
    await expect(post.locator('[data-testid="post-image"]')).toHaveAttribute('alt');
    
    // Test high contrast mode
    await page.click('[data-testid="accessibility-menu"]');
    await page.check('[data-testid="high-contrast-mode"]');
    
    await expect(page.locator('[data-testid="feed-container"]')).toHaveClass(/high-contrast/);
    
    // Test text scaling
    await page.selectOption('[data-testid="text-size"]', 'large');
    await expect(page.locator('[data-testid="post-content"]').first()).toHaveClass(/text-large/);
    
    // Test screen reader announcements
    await post.locator('[data-testid="like-button"]').click();
    await expect(page.locator('[role="status"]')).toHaveText('Post liked');
  });
});