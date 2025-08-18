import { test, expect, Page } from '@playwright/test';

const mockUser = {
  displayName: 'Sarah Student',
  handle: 'sarahstudent',
  email: 'sarah@university.edu',
  school: 'University of Test',
  major: 'Psychology'
};

const mockConnections = [
  {
    displayName: 'Mike Developer',
    handle: 'mikedev',
    school: 'University of Test',
    major: 'Computer Science'
  },
  {
    displayName: 'Emma Designer',
    handle: 'emmadesign',
    school: 'Art Institute',
    major: 'Graphic Design'
  }
];

async function loginAsUser(page: Page) {
  await page.goto('/auth/login');
  await page.fill('[data-testid="email-input"]', mockUser.email);
  await page.click('[data-testid="send-magic-link-button"]');
  
  await page.goto('/auth/verify?token=existing-user-token&email=' + encodeURIComponent(mockUser.email));
  await expect(page).toHaveURL('/dashboard');
}

async function createTestPost(page: Page, content: string, type: 'text' | 'tool' | 'image' = 'text') {
  await page.click('[data-testid="create-post-button"]');
  
  if (type === 'text') {
    await page.fill('[data-testid="post-content-textarea"]', content);
  } else if (type === 'tool') {
    await page.click('[data-testid="share-tool-tab"]');
    await page.selectOption('[data-testid="tool-select"]', 'grade-calculator');
    await page.fill('[data-testid="tool-caption"]', content);
  } else if (type === 'image') {
    await page.click('[data-testid="add-image-tab"]');
    await page.setInputFiles('[data-testid="image-upload"]', {
      name: 'test-image.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-image-data')
    });
    await page.fill('[data-testid="image-caption"]', content);
  }
  
  await page.click('[data-testid="publish-post-button"]');
  await expect(page.locator('[data-testid="post-published"]')).toBeVisible();
}

test.describe('Social Feed Engagement E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsUser(page);
  });

  test('completes comprehensive social feed interaction workflow', async ({ page }) => {
    // Step 1: Navigate to main feed
    await page.click('[data-testid="feed-nav-button"]');
    await expect(page).toHaveURL('/feed');
    
    await expect(page.locator('[data-testid="main-feed"]')).toBeVisible();
    await expect(page.locator('[data-testid="feed-header"]')).toHaveText('Your Feed');
    
    // Step 2: Check feed filters and personalization
    await expect(page.locator('[data-testid="feed-filters"]')).toBeVisible();
    
    // Test different feed views
    await page.click('[data-testid="filter-all"]');
    await expect(page.locator('[data-testid="active-filter"]')).toHaveText('All');
    
    await page.click('[data-testid="filter-connections"]');
    await expect(page.locator('[data-testid="active-filter"]')).toHaveText('Connections');
    
    await page.click('[data-testid="filter-tools"]');
    await expect(page.locator('[data-testid="active-filter"]')).toHaveText('Tools');
    
    await page.click('[data-testid="filter-spaces"]');
    await expect(page.locator('[data-testid="active-filter"]')).toHaveText('Spaces');
    
    // Reset to all
    await page.click('[data-testid="filter-all"]');
    
    // Step 3: Create various types of content
    // Create text post
    await createTestPost(page, 'Just finished my psychology midterm! The cognitive load theory section was challenging but interesting. Anyone else taking PSYC 301?');
    
    // Verify post appears in feed
    await expect(page.locator('[data-testid="post-content"]').first()).toContainText('Just finished my psychology midterm');
    await expect(page.locator('[data-testid="post-author"]').first()).toHaveText(mockUser.displayName);
    await expect(page.locator('[data-testid="post-timestamp"]').first()).toBeVisible();
    
    // Create tool sharing post
    await createTestPost(page, 'Check out this awesome grade calculator I found! Really helpful for tracking weighted grades.', 'tool');
    
    // Verify tool post
    await expect(page.locator('[data-testid="shared-tool-card"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="tool-title"]').first()).toHaveText('Grade Calculator');
    
    // Create image post
    await createTestPost(page, 'Study session setup for finals week! ☕📚', 'image');
    
    // Verify image post
    await expect(page.locator('[data-testid="post-image"]').first()).toBeVisible();
    await expect(page.locator('[data-testid="image-caption"]').first()).toContainText('Study session setup');
    
    // Step 4: Engagement interactions - likes, comments, shares
    const firstPost = page.locator('[data-testid="feed-post"]').first();
    
    // Like post
    await firstPost.locator('[data-testid="like-button"]').click();
    await expect(firstPost.locator('[data-testid="like-count"]')).toHaveText('1');
    await expect(firstPost.locator('[data-testid="like-button"]')).toHaveClass(/liked/);
    
    // Unlike post
    await firstPost.locator('[data-testid="like-button"]').click();
    await expect(firstPost.locator('[data-testid="like-count"]')).toHaveText('0');
    await expect(firstPost.locator('[data-testid="like-button"]')).not.toHaveClass(/liked/);
    
    // Like again
    await firstPost.locator('[data-testid="like-button"]').click();
    
    // Comment on post
    await firstPost.locator('[data-testid="comment-button"]').click();
    await expect(firstPost.locator('[data-testid="comment-section"]')).toBeVisible();
    
    await firstPost.locator('[data-testid="comment-input"]').fill('Great point about cognitive load theory! I struggled with that too.');
    await firstPost.locator('[data-testid="post-comment-button"]').click();
    
    await expect(firstPost.locator('[data-testid="comment-item"]')).toBeVisible();
    await expect(firstPost.locator('[data-testid="comment-text"]')).toContainText('Great point about cognitive load theory');
    await expect(firstPost.locator('[data-testid="comment-count"]')).toHaveText('1');
    
    // Reply to comment
    await firstPost.locator('[data-testid="reply-button"]').click();
    await firstPost.locator('[data-testid="reply-input"]').fill('Thanks! Feel free to reach out if you want to study together.');
    await firstPost.locator('[data-testid="post-reply-button"]').click();
    
    await expect(firstPost.locator('[data-testid="comment-replies"]')).toBeVisible();
    await expect(firstPost.locator('[data-testid="reply-text"]')).toContainText('Thanks! Feel free to reach out');
    
    // Share post
    await firstPost.locator('[data-testid="share-button"]').click();
    await expect(page.locator('[data-testid="share-modal"]')).toBeVisible();
    
    // Share to personal feed
    await page.click('[data-testid="share-to-feed"]');
    await page.fill('[data-testid="share-caption"]', 'Interesting discussion about cognitive psychology!');
    await page.click('[data-testid="confirm-share"]');
    
    await expect(page.locator('[data-testid="share-success"]')).toBeVisible();
    await expect(firstPost.locator('[data-testid="share-count"]')).toHaveText('1');
    
    // Step 5: Connection building and networking
    // Discover new connections
    await page.click('[data-testid="discover-people-button"]');
    await expect(page.locator('[data-testid="people-discovery"]')).toBeVisible();
    
    // Filter by school
    await page.selectOption('[data-testid="school-filter"]', 'University of Test');
    await expect(page.locator('[data-testid="suggested-connections"]')).toBeVisible();
    
    // Send connection request
    const suggestionCard = page.locator('[data-testid="suggestion-card"]').first();
    await suggestionCard.locator('[data-testid="connect-button"]').click();
    
    await expect(page.locator('[data-testid="connection-request-modal"]')).toBeVisible();
    await page.fill('[data-testid="connection-message"]', 'Hi! I saw we\'re both taking psychology courses. Would love to connect!');
    await page.click('[data-testid="send-request"]');
    
    await expect(page.locator('[data-testid="request-sent"]')).toBeVisible();
    await expect(suggestionCard.locator('[data-testid="connect-button"]')).toHaveText('Request Sent');
    
    // Step 6: Respond to connection requests
    await page.click('[data-testid="notifications-button"]');
    await expect(page.locator('[data-testid="notifications-dropdown"]')).toBeVisible();
    
    // Accept connection request
    const connectionRequest = page.locator('[data-testid="connection-request-notification"]').first();
    await connectionRequest.locator('[data-testid="accept-connection"]').click();
    
    await expect(page.locator('[data-testid="connection-accepted"]')).toBeVisible();
    
    // View new connection's profile
    await connectionRequest.locator('[data-testid="view-profile"]').click();
    
    await expect(page).toHaveURL(/\/profile\/.+/);
    await expect(page.locator('[data-testid="profile-header"]')).toBeVisible();
    await expect(page.locator('[data-testid="connection-status"]')).toHaveText('Connected');
    
    // Step 7: Engage with connection's content
    await page.click('[data-testid="feed-nav-button"]');
    
    // Filter to connections' posts
    await page.click('[data-testid="filter-connections"]');
    
    const connectionPost = page.locator('[data-testid="feed-post"]').first();
    await expect(connectionPost.locator('[data-testid="post-author"]')).toContainText('Mike Developer');
    
    // Engage with connection's tool post
    await connectionPost.locator('[data-testid="shared-tool-card"]').click();
    
    // Should navigate to tool page
    await expect(page).toHaveURL(/\/tools\/.+/);
    await expect(page.locator('[data-testid="tool-header"]')).toBeVisible();
    
    // Use the tool
    await page.fill('[data-testid="tool-input-1"]', '85');
    await page.fill('[data-testid="tool-input-2"]', '92');
    await page.click('[data-testid="calculate-button"]');
    
    await expect(page.locator('[data-testid="tool-result"]')).toBeVisible();
    
    // Rate and review the tool
    await page.click('[data-testid="rate-tool-button"]');
    await page.click('[data-testid="star-4"]'); // 4-star rating
    await page.fill('[data-testid="review-text"]', 'Really useful tool! The interface is clean and calculations are accurate.');
    await page.click('[data-testid="submit-review"]');
    
    await expect(page.locator('[data-testid="review-submitted"]')).toBeVisible();
    
    // Step 8: Explore spaces and communities
    await page.click('[data-testid="spaces-nav-button"]');
    await expect(page).toHaveURL('/spaces');
    
    // Join a relevant space
    const psychologySpace = page.locator('[data-testid="space-card"][data-space="psychology-students"]');
    await psychologySpace.locator('[data-testid="join-space-button"]').click();
    
    await expect(page.locator('[data-testid="join-success"]')).toBeVisible();
    await expect(psychologySpace.locator('[data-testid="member-count"]')).toContainText('124 members');
    
    // Enter space
    await psychologySpace.locator('[data-testid="enter-space-button"]').click();
    
    await expect(page).toHaveURL(/\/spaces\/psychology-students/);
    await expect(page.locator('[data-testid="space-header"]')).toBeVisible();
    await expect(page.locator('[data-testid="space-title"]')).toHaveText('Psychology Students');
    
    // Post in space
    await page.click('[data-testid="create-space-post"]');
    await page.fill('[data-testid="space-post-content"]', 'Looking for study partners for PSYC 301 final exam. Anyone interested in forming a study group?');
    await page.click('[data-testid="post-to-space"]');
    
    await expect(page.locator('[data-testid="space-post"]').first()).toContainText('Looking for study partners');
    
    // Step 9: Personalized feed algorithm testing
    await page.click('[data-testid="feed-nav-button"]');
    
    // Check algorithm suggestions
    await expect(page.locator('[data-testid="suggested-content"]')).toBeVisible();
    await expect(page.locator('[data-testid="suggestion-reason"]').first()).toContainText('Based on your major: Psychology');
    
    // Interact with suggested content
    const suggestedPost = page.locator('[data-testid="suggested-post"]').first();
    await suggestedPost.locator('[data-testid="like-button"]').click();
    
    // Hide suggestion
    const secondSuggestion = page.locator('[data-testid="suggested-post"]').nth(1);
    await secondSuggestion.locator('[data-testid="more-options"]').click();
    await page.click('[data-testid="hide-post"]');
    
    await expect(page.locator('[data-testid="post-hidden"]')).toBeVisible();
    
    // Provide feedback on recommendation
    await page.click('[data-testid="feedback-button"]');
    await page.click('[data-testid="not-interested"]');
    await page.selectOption('[data-testid="feedback-reason"]', 'not-relevant');
    await page.click('[data-testid="submit-feedback"]');
    
    await expect(page.locator('[data-testid="feedback-submitted"]')).toBeVisible();
    
    // Step 10: Real-time feed updates
    // Test live updates (simulated)
    await page.evaluate(() => {
      // Simulate incoming real-time update
      window.dispatchEvent(new CustomEvent('new-feed-item', {
        detail: {
          type: 'connection_post',
          author: 'Emma Designer',
          content: 'Just launched my portfolio website! Check it out and let me know what you think.'
        }
      }));
    });
    
    // Should see real-time notification
    await expect(page.locator('[data-testid="new-post-notification"]')).toBeVisible();
    await page.click('[data-testid="view-new-posts"]');
    
    // New post should appear at top
    const newestPost = page.locator('[data-testid="feed-post"]').first();
    await expect(newestPost.locator('[data-testid="post-author"]')).toHaveText('Emma Designer');
    await expect(newestPost.locator('[data-testid="real-time-indicator"]')).toBeVisible();
    
    // Step 11: Feed customization and preferences
    await page.click('[data-testid="feed-settings-button"]');
    await expect(page.locator('[data-testid="feed-preferences-modal"]')).toBeVisible();
    
    // Customize content types
    await page.uncheck('[data-testid="show-shared-tools"]');
    await page.check('[data-testid="show-space-posts"]');
    await page.selectOption('[data-testid="algorithm-preference"]', 'chronological');
    
    await page.click('[data-testid="save-preferences"]');
    await expect(page.locator('[data-testid="preferences-saved"]')).toBeVisible();
    
    // Verify feed updates with new preferences
    await page.reload();
    await expect(page.locator('[data-testid="shared-tool-card"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="space-post-indicator"]')).toBeVisible();
    
    // Step 12: Advanced engagement features
    // Create poll post
    await page.click('[data-testid="create-post-button"]');
    await page.click('[data-testid="poll-tab"]');
    
    await page.fill('[data-testid="poll-question"]', 'What\'s your preferred study method for finals?');
    await page.fill('[data-testid="poll-option-1"]', 'Solo study sessions');
    await page.fill('[data-testid="poll-option-2"]', 'Group study');
    await page.fill('[data-testid="poll-option-3"]', 'Flashcards and spaced repetition');
    await page.fill('[data-testid="poll-option-4"]', 'Practice tests');
    
    await page.selectOption('[data-testid="poll-duration"]', '24hours');
    await page.click('[data-testid="publish-poll"]');
    
    // Verify poll appears in feed
    const pollPost = page.locator('[data-testid="poll-post"]').first();
    await expect(pollPost.locator('[data-testid="poll-question"]')).toContainText('preferred study method');
    
    // Vote in own poll (should be prevented)
    await pollPost.locator('[data-testid="poll-option-1"]').click();
    await expect(page.locator('[data-testid="cannot-vote-own-poll"]')).toBeVisible();
    
    // Vote in another user's poll
    const otherPoll = page.locator('[data-testid="poll-post"]').nth(1);
    await otherPoll.locator('[data-testid="poll-option-2"]').click();
    
    await expect(otherPoll.locator('[data-testid="vote-submitted"]')).toBeVisible();
    await expect(otherPoll.locator('[data-testid="poll-results"]')).toBeVisible();
  });

  test('handles feed performance with infinite scroll and content loading', async ({ page }) => {
    await page.click('[data-testid="feed-nav-button"]');
    
    // Test initial load
    await expect(page.locator('[data-testid="feed-post"]')).toHaveCount(10);
    await expect(page.locator('[data-testid="loading-indicator"]')).not.toBeVisible();
    
    // Scroll to trigger infinite loading
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    // Should show loading indicator
    await expect(page.locator('[data-testid="loading-more-posts"]')).toBeVisible();
    
    // Wait for new content to load
    await expect(page.locator('[data-testid="feed-post"]')).toHaveCount(20);
    
    // Test error handling during infinite scroll
    await page.route('**/api/feed*', route => {
      if (route.request().url().includes('page=3')) {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Server error' })
        });
      } else {
        route.continue();
      }
    });
    
    // Scroll again
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    // Should show error and retry option
    await expect(page.locator('[data-testid="load-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="retry-loading"]')).toBeVisible();
    
    // Remove error route and retry
    await page.unroute('**/api/feed*');
    await page.click('[data-testid="retry-loading"]');
    
    await expect(page.locator('[data-testid="feed-post"]')).toHaveCount(30);
    
    // Test content virtualization (for performance)
    await page.evaluate(() => {
      // Scroll back to top
      window.scrollTo(0, 0);
    });
    
    // Early posts should be virtualized/unmounted for performance
    await expect(page.locator('[data-testid="virtualized-placeholder"]')).toBeVisible();
  });

  test('handles social feed accessibility and screen reader support', async ({ page }) => {
    await page.click('[data-testid="feed-nav-button"]');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="create-post-button"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="feed-filters"]')).toBeFocused();
    
    // Navigate to first post
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="feed-post"]').first()).toBeFocused();
    
    // Test post interaction via keyboard
    await page.keyboard.press('Enter'); // Should expand/focus post
    await page.keyboard.press('l'); // Keyboard shortcut for like
    
    await expect(page.locator('[data-testid="like-button"]').first()).toHaveClass(/liked/);
    
    // Test screen reader announcements
    await expect(page.locator('[role="status"]')).toHaveText('Post liked');
    
    // Test ARIA labels and descriptions
    const firstPost = page.locator('[data-testid="feed-post"]').first();
    await expect(firstPost).toHaveAttribute('role', 'article');
    await expect(firstPost.locator('[data-testid="like-button"]')).toHaveAttribute('aria-label', 'Like this post');
    await expect(firstPost.locator('[data-testid="comment-button"]')).toHaveAttribute('aria-label', 'Comment on this post');
    
    // Test high contrast mode
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page.locator('[data-testid="main-feed"]')).toHaveClass(/high-contrast/);
  });
});