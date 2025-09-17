import { test, expect, Page } from '@playwright/test';

test.describe('5️⃣ FEED & 4️⃣ PROFILE - Complete Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await mockLogin(page);
  });

  test.describe('Feed - Smart Aggregation', () => {
    test('should display aggregated content from all spaces', async ({ page }) => {
      await page.goto('/feed');
      
      // Should show feed items
      await expect(page.locator('[data-testid="feed-container"]')).toBeVisible();
      const feedItems = page.locator('[data-testid="feed-item"]');
      await expect(feedItems.first()).toBeVisible();
      expect(await feedItems.count()).toBeGreaterThan(0);
    });

    test('should prioritize coordination activities', async ({ page }) => {
      await page.goto('/feed');
      
      // Coordination items should appear at top
      const firstItems = page.locator('[data-testid="feed-item"]').locator('..').slice(0, 5);
      
      // Check for coordination keywords
      const coordinationKeywords = ['study session', 'ride share', 'food run', 'group project', 'meetup'];
      let hasCoordination = false;
      
      for (let i = 0; i < 5; i++) {
        const text = await firstItems.nth(i).textContent();
        if (coordinationKeywords.some(keyword => text?.toLowerCase().includes(keyword))) {
          hasCoordination = true;
          break;
        }
      }
      
      expect(hasCoordination).toBe(true);
    });

    test('should show real-time updates', async ({ page, context }) => {
      const page2 = await context.newPage();
      await mockLogin(page2);
      
      await page.goto('/feed');
      await page2.goto('/spaces/cs-220-fall-2025');
      
      // Create a coordination post
      const uniqueContent = `Study session tonight ${Date.now()}`;
      await page2.click('button:has-text("Create Post")');
      await page2.fill('textarea[placeholder*="What\'s on your mind"]', uniqueContent);
      await page2.click('label:has-text("Coordination")'); // Mark as coordination
      await page2.click('button:has-text("Post")');
      
      // Should appear in feed without refresh
      await expect(page.locator(`text=${uniqueContent}`)).toBeVisible({ timeout: 5000 });
    });

    test('should filter feed by type', async ({ page }) => {
      await page.goto('/feed');
      
      // Filter by coordination posts
      await page.click('button:has-text("Filter")');
      await page.click('label:has-text("Coordination Only")');
      await page.click('button:has-text("Apply")');
      
      // All items should be coordination type
      const feedItems = page.locator('[data-testid="feed-item"]');
      const count = await feedItems.count();
      
      for (let i = 0; i < Math.min(count, 5); i++) {
        const item = feedItems.nth(i);
        await expect(item.locator('[data-testid="coordination-badge"]')).toBeVisible();
      }
    });

    test('should show ritual reminders strip', async ({ page }) => {
      await page.goto('/feed');
      
      // Rituals strip should be visible
      await expect(page.locator('[data-testid="rituals-strip"]')).toBeVisible();
      
      // Should show upcoming rituals
      const ritualCards = page.locator('[data-testid="ritual-reminder"]');
      if (await ritualCards.count() > 0) {
        await expect(ritualCards.first()).toBeVisible();
        
        // Click to participate
        await ritualCards.first().click();
        await expect(page.locator('[data-testid="ritual-participation-modal"]')).toBeVisible();
      }
    });

    test('should handle infinite scroll', async ({ page }) => {
      await page.goto('/feed');
      
      // Get initial count
      const initialCount = await page.locator('[data-testid="feed-item"]').count();
      
      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(1000); // Wait for lazy load
      
      // Should load more items
      const newCount = await page.locator('[data-testid="feed-item"]').count();
      expect(newCount).toBeGreaterThan(initialCount);
    });

    test('should show trending activities', async ({ page }) => {
      await page.goto('/feed');
      
      // Click trending tab
      await page.click('button:has-text("Trending")');
      
      // Should show trending items
      await expect(page.locator('text=Trending Now')).toBeVisible();
      const trendingItems = page.locator('[data-testid="trending-item"]');
      await expect(trendingItems.first()).toBeVisible();
    });

    test('should enable cross-space discovery', async ({ page }) => {
      await page.goto('/feed');
      
      // Feed items should show space origin
      const feedItem = page.locator('[data-testid="feed-item"]').first();
      await expect(feedItem.locator('[data-testid="space-badge"]')).toBeVisible();
      
      // Click space badge to discover new space
      await feedItem.locator('[data-testid="space-badge"]').click();
      await expect(page).toHaveURL(/\/spaces\/.+/);
    });
  });

  test.describe('Profile - Personal Command Center', () => {
    test('should display customizable dashboard', async ({ page }) => {
      await page.goto('/profile');
      
      // Should show bento grid
      await expect(page.locator('[data-testid="profile-bento-grid"]')).toBeVisible();
      
      // Should have multiple cards
      const bentoCards = page.locator('[data-testid="bento-card"]');
      expect(await bentoCards.count()).toBeGreaterThan(0);
    });

    test('should allow drag-and-drop card customization', async ({ page }) => {
      await page.goto('/profile');
      
      // Enter edit mode
      await page.click('button:has-text("Customize")');
      
      // Drag a card
      const sourceCard = page.locator('[data-testid="bento-card"]').first();
      const targetCard = page.locator('[data-testid="bento-card"]').last();
      
      await sourceCard.dragTo(targetCard);
      
      // Save layout
      await page.click('button:has-text("Save Layout")');
      await expect(page.locator('text=Layout saved')).toBeVisible();
      
      // Refresh and verify persistence
      await page.reload();
      // Layout should be preserved (would need to verify specific positions)
    });

    test('should manage identity settings', async ({ page }) => {
      await page.goto('/profile/edit');
      
      // Update identity
      await page.fill('input[name="displayName"]', 'CoolStudent123');
      await page.fill('textarea[name="bio"]', 'CS Major | Gaming | Music');
      await page.selectOption('select[name="pronouns"]', 'they/them');
      
      // Upload avatar (mock)
      const fileInput = page.locator('input[type="file"][name="avatar"]');
      if (await fileInput.isVisible()) {
        await fileInput.setInputFiles('test-assets/avatar.jpg');
      }
      
      // Save changes
      await page.click('button:has-text("Save Profile")');
      await expect(page.locator('text=Profile updated')).toBeVisible();
    });

    test('should control privacy settings', async ({ page }) => {
      await page.goto('/profile/settings');
      
      // Toggle Ghost Mode
      await page.click('label:has-text("Ghost Mode")');
      
      // Configure visibility
      await page.click('label:has-text("Hide activity from non-friends")');
      await page.click('label:has-text("Show online status to friends only")');
      
      // Save settings
      await page.click('button:has-text("Save Privacy Settings")');
      await expect(page.locator('text=Settings saved')).toBeVisible();
      
      // Verify Ghost Mode active
      await page.goto('/spaces/cs-220-fall-2025');
      await expect(page.locator('[data-testid="ghost-mode-indicator"]')).toBeVisible();
    });

    test('should display personal analytics', async ({ page }) => {
      await page.goto('/profile/analytics');
      
      // Should show analytics dashboard
      await expect(page.locator('text=Your Analytics')).toBeVisible();
      await expect(page.locator('[data-testid="engagement-chart"]')).toBeVisible();
      await expect(page.locator('[data-testid="activity-heatmap"]')).toBeVisible();
      await expect(page.locator('[data-testid="space-participation"]')).toBeVisible();
    });

    test('should manage integration connections', async ({ page }) => {
      await page.goto('/profile/integrations');
      
      // Calendar integration
      await page.click('button:has-text("Connect Google Calendar")');
      // Would open OAuth flow
      await expect(page.locator('text=Connecting to Google')).toBeVisible();
      
      // Other integrations
      await expect(page.locator('text=Discord')).toBeVisible();
      await expect(page.locator('text=Spotify')).toBeVisible();
    });

    test('should track activity history', async ({ page }) => {
      await page.goto('/profile/activity');
      
      // Should show activity timeline
      await expect(page.locator('[data-testid="activity-timeline"]')).toBeVisible();
      
      // Should have filter options
      await page.click('button:has-text("Filter")');
      await page.click('label:has-text("Posts")');
      await page.click('label:has-text("Comments")');
      await page.click('button:has-text("Apply")');
      
      // Should update timeline
      const activityItems = page.locator('[data-testid="activity-item"]');
      await expect(activityItems.first()).toBeVisible();
    });

    test('should display achievements and milestones', async ({ page }) => {
      await page.goto('/profile/achievements');
      
      // Should show achievements
      await expect(page.locator('text=Your Achievements')).toBeVisible();
      const achievementCards = page.locator('[data-testid="achievement-card"]');
      await expect(achievementCards.first()).toBeVisible();
      
      // Click for details
      await achievementCards.first().click();
      await expect(page.locator('[data-testid="achievement-modal"]')).toBeVisible();
      await expect(page.locator('text=Earned on')).toBeVisible();
    });
  });

  test.describe('Profile Bento Cards', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/profile');
    });

    test('should interact with Right Now card', async ({ page }) => {
      const rightNowCard = page.locator('[data-testid="right-now-card"]');
      await expect(rightNowCard).toBeVisible();
      
      // Update status
      await rightNowCard.click();
      await page.fill('input[placeholder*="What are you up to"]', '📚 Studying for finals');
      await page.click('button:has-text("Update")');
      
      // Status should be visible
      await expect(page.locator('text=📚 Studying for finals')).toBeVisible();
    });

    test('should show spaces in Spaces card', async ({ page }) => {
      const spacesCard = page.locator('[data-testid="spaces-card"]');
      await expect(spacesCard).toBeVisible();
      
      // Should list user's spaces
      await spacesCard.click();
      await expect(page.locator('[data-testid="space-list-modal"]')).toBeVisible();
      await expect(page.locator('[data-testid="space-list-item"]').first()).toBeVisible();
    });

    test('should display calendar in Events card', async ({ page }) => {
      const eventsCard = page.locator('[data-testid="events-card"]');
      await expect(eventsCard).toBeVisible();
      
      // Should show upcoming events
      await eventsCard.click();
      await expect(page.locator('[data-testid="events-calendar"]')).toBeVisible();
    });

    test('should show connections in Network card', async ({ page }) => {
      const networkCard = page.locator('[data-testid="network-card"]');
      await expect(networkCard).toBeVisible();
      
      // Should display connection count
      await expect(networkCard.locator('text=/\\d+ connections/i')).toBeVisible();
      
      // Click to see all
      await networkCard.click();
      await expect(page.locator('[data-testid="connections-modal"]')).toBeVisible();
    });
  });

  test.describe('Feed Algorithm & Personalization', () => {
    test('should personalize feed based on interests', async ({ page }) => {
      // Set interests
      await page.goto('/profile/interests');
      await page.click('label:has-text("Tech & Programming")');
      await page.click('label:has-text("Gaming")');
      await page.click('button:has-text("Save Interests")');
      
      // Go to feed
      await page.goto('/feed');
      
      // Feed should prioritize matching content
      const feedItems = page.locator('[data-testid="feed-item"]');
      let techRelatedCount = 0;
      
      for (let i = 0; i < 5; i++) {
        const text = await feedItems.nth(i).textContent();
        if (text?.toLowerCase().match(/tech|programming|code|gaming|game/)) {
          techRelatedCount++;
        }
      }
      
      expect(techRelatedCount).toBeGreaterThan(2); // At least 3 of 5 should match
    });

    test('should adapt to user behavior', async ({ page }) => {
      await page.goto('/feed');
      
      // Interact with specific content types
      for (let i = 0; i < 3; i++) {
        const studyPost = page.locator('[data-testid="feed-item"]').filter({
          hasText: /study|homework|exam/i
        }).first();
        
        if (await studyPost.isVisible()) {
          await studyPost.locator('button[aria-label="Like"]').click();
        }
      }
      
      // Refresh feed
      await page.reload();
      
      // Should see more study-related content
      const feedItems = page.locator('[data-testid="feed-item"]').locator('..').slice(0, 5);
      let studyCount = 0;
      
      for (let i = 0; i < 5; i++) {
        const text = await feedItems.nth(i).textContent();
        if (text?.toLowerCase().match(/study|homework|exam|quiz/)) {
          studyCount++;
        }
      }
      
      expect(studyCount).toBeGreaterThan(0);
    });
  });

  test.describe('Profile Export & Data Portability', () => {
    test('should export profile data', async ({ page }) => {
      await page.goto('/profile/settings');
      
      // Request data export
      await page.click('button:has-text("Export My Data")');
      await expect(page.locator('[data-testid="export-modal"]')).toBeVisible();
      
      // Select export format
      await page.click('label:has-text("JSON")');
      await page.click('button:has-text("Generate Export")');
      
      // Should start download
      const download = await page.waitForEvent('download');
      expect(download.suggestedFilename()).toContain('hive-profile-export');
    });

    test('should delete account with confirmation', async ({ page }) => {
      await page.goto('/profile/settings');
      
      // Click delete account
      await page.click('button:has-text("Delete Account")');
      
      // Should show warning modal
      await expect(page.locator('text=This action cannot be undone')).toBeVisible();
      
      // Type confirmation
      await page.fill('input[placeholder*="DELETE"]', 'DELETE');
      
      // Would actually delete (don't click in test)
      await expect(page.locator('button:has-text("Permanently Delete")')).toBeEnabled();
    });
  });
});

// Helper function
async function mockLogin(page: Page, email: string = 'test@buffalo.edu') {
  await page.evaluate((userEmail) => {
    localStorage.setItem('session', JSON.stringify({
      user: { 
        id: 'test-user-123',
        email: userEmail,
        name: 'Test User',
        major: 'Computer Science',
        year: 'Junior',
        interests: ['tech', 'gaming', 'music']
      },
      expiresAt: Date.now() + 3600000
    }));
  }, email);
}