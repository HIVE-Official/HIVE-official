import { test, expect, Page } from '@playwright/test';

test.describe('2️⃣ SPACES - Complete Functionality Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Mock authentication for all tests
    await mockLogin(page);
    await page.goto('/spaces');
  });

  test.describe('Space Discovery System', () => {
    test('should browse all available spaces', async ({ page }) => {
      // Verify spaces grid loads
      await expect(page.locator('[data-testid="spaces-grid"]')).toBeVisible();
      
      // Should show multiple space cards
      const spaceCards = page.locator('[data-testid="space-card"]');
      await expect(spaceCards).toHaveCount(await spaceCards.count());
      expect(await spaceCards.count()).toBeGreaterThan(0);
    });

    test('should search spaces by name', async ({ page }) => {
      // Use search bar
      await page.fill('input[placeholder*="Search spaces"]', 'Computer Science');
      await page.waitForTimeout(500); // Debounce
      
      // Should filter results
      const results = page.locator('[data-testid="space-card"]');
      const count = await results.count();
      
      for (let i = 0; i < count; i++) {
        const text = await results.nth(i).textContent();
        expect(text?.toLowerCase()).toContain('computer');
      }
    });

    test('should filter spaces by type', async ({ page }) => {
      // Filter by dorm spaces
      await page.click('button:has-text("Filter")');
      await page.click('label:has-text("Dorms")');
      await page.click('button:has-text("Apply")');
      
      // Verify filtered results
      const spaceCards = page.locator('[data-testid="space-card"]');
      const firstCard = await spaceCards.first().textContent();
      expect(firstCard).toMatch(/Ellicott|Governors|South Campus|Flint/);
    });

    test('should show space recommendations based on profile', async ({ page }) => {
      await page.click('button:has-text("Recommended")');
      
      // Should show personalized recommendations
      await expect(page.locator('text=Recommended for you')).toBeVisible();
      await expect(page.locator('[data-testid="recommendation-reason"]')).toBeVisible();
    });
  });

  test.describe('5-Surface Architecture', () => {
    test.beforeEach(async ({ page }) => {
      // Navigate to a specific space
      await page.goto('/spaces/cs-220-fall-2025');
    });

    test('Posts Surface - should create and display posts', async ({ page }) => {
      // Click Posts tab (default)
      await expect(page.locator('[data-surface="posts"]')).toBeVisible();
      
      // Create a new post
      await page.click('button:has-text("Create Post")');
      await page.fill('textarea[placeholder*="What\'s on your mind"]', 'Testing posts surface!');
      await page.click('button:has-text("Post")');
      
      // Verify post appears with real-time update
      await expect(page.locator('text=Testing posts surface!')).toBeVisible();
      
      // Verify post saves to Firebase
      await page.reload();
      await expect(page.locator('text=Testing posts surface!')).toBeVisible();
    });

    test('Events Surface - should create and RSVP to events', async ({ page }) => {
      // Switch to Events surface
      await page.click('button:has-text("Events")');
      await expect(page.locator('[data-surface="events"]')).toBeVisible();
      
      // Create an event (if leader)
      const createEventButton = page.locator('button:has-text("Create Event")');
      if (await createEventButton.isVisible()) {
        await createEventButton.click();
        await page.fill('input[name="title"]', 'Study Session');
        await page.fill('textarea[name="description"]', 'CS 220 Midterm Prep');
        await page.fill('input[name="date"]', '2025-02-15');
        await page.fill('input[name="time"]', '19:00');
        await page.fill('input[name="location"]', 'Capen 260');
        await page.click('button:has-text("Create")');
      }
      
      // RSVP to an event
      await page.click('button:has-text("Going")').first();
      await expect(page.locator('text=You\'re going')).toBeVisible();
      
      // Change RSVP
      await page.click('button:has-text("Maybe")').first();
      await expect(page.locator('text=You might go')).toBeVisible();
    });

    test('Members Surface - should show and manage members', async ({ page }) => {
      // Switch to Members surface
      await page.click('button:has-text("Members")');
      await expect(page.locator('[data-surface="members"]')).toBeVisible();
      
      // Should display member list
      await expect(page.locator('[data-testid="member-card"]').first()).toBeVisible();
      
      // Search for a member
      await page.fill('input[placeholder*="Search members"]', 'John');
      await page.waitForTimeout(300);
      
      // Click on member profile
      await page.click('[data-testid="member-card"]').first();
      await expect(page.locator('[data-testid="member-profile-modal"]')).toBeVisible();
    });

    test('Pinned Surface - should pin important content', async ({ page }) => {
      // Switch to Pinned surface
      await page.click('button:has-text("Pinned")');
      await expect(page.locator('[data-surface="pinned"]')).toBeVisible();
      
      // Should show pinned items
      const pinnedItems = page.locator('[data-testid="pinned-item"]');
      if (await pinnedItems.count() > 0) {
        await expect(pinnedItems.first()).toBeVisible();
      }
      
      // Pin a new item (if leader)
      const pinButton = page.locator('button:has-text("Pin Item")');
      if (await pinButton.isVisible()) {
        await pinButton.click();
        await page.fill('input[name="title"]', 'Important: Midterm Date Changed');
        await page.fill('textarea[name="content"]', 'New date: Feb 20th');
        await page.click('button:has-text("Pin")');
        await expect(page.locator('text=Important: Midterm Date Changed')).toBeVisible();
      }
    });

    test('Tools Surface - should install and use tools', async ({ page }) => {
      // Switch to Tools surface
      await page.click('button:has-text("Tools")');
      await expect(page.locator('[data-surface="tools"]')).toBeVisible();
      
      // Browse available tools
      await page.click('button:has-text("Browse Tools")');
      await expect(page.locator('[data-testid="tool-marketplace"]')).toBeVisible();
      
      // Install a tool
      const installButton = page.locator('button:has-text("Install")').first();
      if (await installButton.isVisible()) {
        await installButton.click();
        await expect(page.locator('text=Tool installed')).toBeVisible();
      }
      
      // Use an installed tool
      const toolCard = page.locator('[data-testid="installed-tool"]').first();
      if (await toolCard.isVisible()) {
        await toolCard.click();
        await expect(page.locator('[data-testid="tool-interface"]')).toBeVisible();
      }
    });
  });

  test.describe('Leader Tools & Management', () => {
    test('should enter configure mode', async ({ page }) => {
      await page.goto('/spaces/cs-220-fall-2025');
      
      // Enter leader mode
      await page.click('button:has-text("Manage")');
      await page.click('button:has-text("Configure")');
      
      // Should show configuration options
      await expect(page.locator('text=Space Configuration')).toBeVisible();
      await expect(page.locator('input[name="spaceName"]')).toBeVisible();
      await expect(page.locator('textarea[name="description"]')).toBeVisible();
    });

    test('should moderate content', async ({ page }) => {
      await page.goto('/spaces/cs-220-fall-2025');
      
      // Enter moderation mode
      await page.click('button:has-text("Manage")');
      await page.click('button:has-text("Moderate")');
      
      // Should show moderation tools
      await expect(page.locator('[data-testid="moderation-queue"]')).toBeVisible();
      
      // Moderate a post
      const flaggedPost = page.locator('[data-testid="flagged-post"]').first();
      if (await flaggedPost.isVisible()) {
        await flaggedPost.hover();
        await page.click('button:has-text("Remove")');
        await expect(page.locator('text=Post removed')).toBeVisible();
      }
    });

    test('should view space insights', async ({ page }) => {
      await page.goto('/spaces/cs-220-fall-2025');
      
      // Enter insights mode
      await page.click('button:has-text("Manage")');
      await page.click('button:has-text("Insights")');
      
      // Should show analytics
      await expect(page.locator('[data-testid="space-analytics"]')).toBeVisible();
      await expect(page.locator('text=Member Growth')).toBeVisible();
      await expect(page.locator('text=Engagement Rate')).toBeVisible();
      await expect(page.locator('text=Active Members')).toBeVisible();
    });

    test('should manage members and roles', async ({ page }) => {
      await page.goto('/spaces/cs-220-fall-2025');
      
      // Enter management mode
      await page.click('button:has-text("Manage")');
      await page.click('button:has-text("Members")');
      
      // Should show member management
      await expect(page.locator('[data-testid="member-management"]')).toBeVisible();
      
      // Change member role
      const memberRow = page.locator('[data-testid="member-row"]').first();
      if (await memberRow.isVisible()) {
        await memberRow.hover();
        await page.click('button:has-text("Change Role")');
        await page.click('option:has-text("Moderator")');
        await expect(page.locator('text=Role updated')).toBeVisible();
      }
    });
  });

  test.describe('Join/Leave Mechanics', () => {
    test('should join a public space', async ({ page }) => {
      // Find a space to join
      await page.goto('/spaces');
      const joinableSpace = page.locator('[data-testid="space-card"]').filter({
        has: page.locator('button:has-text("Join")')
      }).first();
      
      if (await joinableSpace.isVisible()) {
        await joinableSpace.click();
        await page.click('button:has-text("Join Space")');
        
        // Verify joined
        await expect(page.locator('button:has-text("Leave Space")')).toBeVisible();
        
        // Verify in my spaces
        await page.goto('/spaces');
        await page.click('tab:has-text("My Spaces")');
        await expect(joinableSpace).toBeVisible();
      }
    });

    test('should request to join private space', async ({ page }) => {
      await page.goto('/spaces/private-cs-research');
      
      // Request to join
      await page.click('button:has-text("Request to Join")');
      await page.fill('textarea[placeholder*="Why do you want to join"]', 'Interested in AI research');
      await page.click('button:has-text("Send Request")');
      
      // Should show pending status
      await expect(page.locator('text=Request Pending')).toBeVisible();
    });

    test('should leave a space', async ({ page }) => {
      await page.goto('/spaces/cs-220-fall-2025');
      
      // Leave space
      await page.click('button:has-text("Leave Space")');
      await page.click('button:has-text("Confirm")'); // Confirmation dialog
      
      // Should show join button again
      await expect(page.locator('button:has-text("Join Space")')).toBeVisible();
    });
  });

  test.describe('Space Permissions & Roles', () => {
    test('should enforce posting permissions', async ({ page }) => {
      await page.goto('/spaces/announcements-only');
      
      // Regular member shouldn't see create post button
      const createButton = page.locator('button:has-text("Create Post")');
      expect(await createButton.isVisible()).toBe(false);
      
      // Should show permission message
      await expect(page.locator('text=Only moderators can post')).toBeVisible();
    });

    test('should show role badges', async ({ page }) => {
      await page.goto('/spaces/cs-220-fall-2025');
      await page.click('button:has-text("Members")');
      
      // Should show role badges
      await expect(page.locator('[data-testid="role-badge"]:has-text("Leader")')).toBeVisible();
      await expect(page.locator('[data-testid="role-badge"]:has-text("Moderator")')).toBeVisible();
      await expect(page.locator('[data-testid="role-badge"]:has-text("Member")')).toBeVisible();
    });

    test('should enforce moderation permissions', async ({ page }) => {
      await page.goto('/spaces/cs-220-fall-2025');
      
      // Non-moderator shouldn't see manage button
      await page.evaluate(() => {
        // Mock as regular member
        (window as any).currentUserRole = 'member';
      });
      
      const manageButton = page.locator('button:has-text("Manage")');
      expect(await manageButton.isVisible()).toBe(false);
    });
  });

  test.describe('Real-time Updates', () => {
    test('should show real-time member count', async ({ page, context }) => {
      const page2 = await context.newPage();
      await mockLogin(page2);
      
      await page.goto('/spaces/cs-220-fall-2025');
      await page2.goto('/spaces/cs-220-fall-2025');
      
      // Get initial member count
      const initialCount = await page.locator('[data-testid="member-count"]').textContent();
      
      // Page 2 leaves the space
      await page2.click('button:has-text("Leave Space")');
      await page2.click('button:has-text("Confirm")');
      
      // Page 1 should see updated count
      await expect(page.locator('[data-testid="member-count"]')).not.toHaveText(initialCount!);
    });

    test('should show real-time posts', async ({ page, context }) => {
      const page2 = await context.newPage();
      await mockLogin(page2);
      
      await page.goto('/spaces/cs-220-fall-2025');
      await page2.goto('/spaces/cs-220-fall-2025');
      
      // Page 2 creates a post
      const uniqueContent = `Real-time test ${Date.now()}`;
      await page2.click('button:has-text("Create Post")');
      await page2.fill('textarea[placeholder*="What\'s on your mind"]', uniqueContent);
      await page2.click('button:has-text("Post")');
      
      // Page 1 should see it without refresh
      await expect(page.locator(`text=${uniqueContent}`)).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Enhanced Spaces System', () => {
    test('should show space recommendations engine', async ({ page }) => {
      await page.goto('/spaces');
      
      // Should show recommendation engine
      await expect(page.locator('[data-testid="recommendation-engine"]')).toBeVisible();
      
      // Should explain why spaces are recommended
      const recommendedSpace = page.locator('[data-testid="recommended-space"]').first();
      await recommendedSpace.hover();
      await expect(page.locator('[data-testid="recommendation-reason"]')).toBeVisible();
    });

    test('should track space engagement', async ({ page }) => {
      await page.goto('/spaces/cs-220-fall-2025');
      
      // Perform engagement actions
      await page.click('[data-testid="like-button"]').first();
      await page.click('button:has-text("Comment")').first();
      await page.fill('textarea[placeholder*="Write a comment"]', 'Great post!');
      await page.click('button:has-text("Reply")');
      
      // Check engagement score updated
      await page.click('button:has-text("Manage")');
      await page.click('button:has-text("Insights")');
      await expect(page.locator('[data-testid="engagement-score"]')).toBeVisible();
    });
  });
});

// Helper function to mock authentication
async function mockLogin(page: Page, email: string = 'test@buffalo.edu') {
  await page.evaluate((userEmail: any) => {
    localStorage.setItem('session', JSON.stringify({
      user: { 
        id: 'test-user-123',
        email: userEmail,
        name: 'Test User',
        major: 'Computer Science',
        year: 'Junior'
      },
      expiresAt: Date.now() + 3600000
    }));
  }, email);
}