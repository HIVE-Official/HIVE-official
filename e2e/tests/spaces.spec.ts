import { test, expect } from '../fixtures/auth.fixture';
import { SpaceHelper, NavigationHelper } from '../helpers/page-objects';
import { testSpaces } from '../fixtures/test-data';

test.describe('HIVE Spaces Discovery & Interaction', () => {
  let spaceHelper: SpaceHelper;
  let navHelper: NavigationHelper;

  test.beforeEach(async ({ studentPage }) => {
    spaceHelper = new SpaceHelper(studentPage);
    navHelper = new NavigationHelper(studentPage);
    await navHelper.navigateToSpaces();
  });

  test('should display spaces discovery page', async ({ studentPage }) => {
    await expect(studentPage).toHaveURL(/\/spaces/);
    await expect(studentPage.locator('text=Discover Spaces')).toBeVisible();
    await expect(studentPage.locator('[data-testid="space-categories"]')).toBeVisible();
    await expect(studentPage.locator('[data-testid="recommended-spaces"]')).toBeVisible();
  });

  test('should show space categories', async ({ studentPage }) => {
    const categories = ['Academic', 'Social', 'Professional', 'Residential', 'Interest-Based'];
    for (const category of categories) {
      await expect(studentPage.locator(`[data-testid="category-${category}"]`)).toBeVisible();
    }
  });

  test('should filter spaces by category', async ({ studentPage }) => {
    await spaceHelper.filterByCategory('Academic');
    
    // Check that only academic spaces are shown
    const spaceCards = studentPage.locator('[data-testid^="space-card-"]');
    const count = await spaceCards.count();
    
    for (let i = 0; i < count; i++) {
      const card = spaceCards.nth(i);
      await expect(card.locator('[data-testid="space-category-badge"]')).toHaveText('Academic');
    }
  });

  test('should search for spaces', async ({ studentPage }) => {
    await spaceHelper.searchSpaces('Computer Science');
    
    // Wait for search results
    await studentPage.waitForLoadState('networkidle');
    
    // Verify search results contain the query
    const results = studentPage.locator('[data-testid^="space-card-"]');
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
    
    // Each result should be relevant to search
    for (let i = 0; i < count; i++) {
      const text = await results.nth(i).textContent();
      expect(text?.toLowerCase()).toContain('computer');
    }
  });

  test('should join a public space', async ({ studentPage }) => {
    // Find a public space
    const publicSpace = studentPage.locator('[data-testid="space-card-CS Study Group"]').first();
    await publicSpace.click();
    
    // View space details
    await expect(studentPage.locator('text=CS Study Group')).toBeVisible();
    await expect(studentPage.locator('[data-testid="space-description"]')).toBeVisible();
    await expect(studentPage.locator('[data-testid="member-count"]')).toBeVisible();
    
    // Join the space
    await studentPage.click('[data-testid="join-space-button"]');
    await expect(studentPage.locator('[data-testid="joined-badge"]')).toBeVisible();
    await expect(studentPage.locator('[data-testid="leave-space-button"]')).toBeVisible();
  });

  test('should request to join a private space', async ({ studentPage }) => {
    // Navigate to a private space
    const privateSpace = studentPage.locator('[data-testid="space-card-Ellicott Complex"]').first();
    await privateSpace.click();
    
    // Should see request access instead of join
    await expect(studentPage.locator('[data-testid="request-access-button"]')).toBeVisible();
    
    // Request access
    await studentPage.click('[data-testid="request-access-button"]');
    await studentPage.fill('[data-testid="request-reason"]', 'I live in Ellicott Complex, room 304B');
    await studentPage.click('[data-testid="submit-request"]');
    
    // Should show pending status
    await expect(studentPage.locator('[data-testid="request-pending-badge"]')).toBeVisible();
  });

  test('should create a new space', async ({ studentPage }) => {
    await studentPage.click('[data-testid="create-space-button"]');
    
    // Fill space creation form
    await studentPage.fill('[data-testid="space-name-input"]', testSpaces.academic.name);
    await studentPage.fill('[data-testid="space-description-input"]', testSpaces.academic.description);
    await studentPage.selectOption('[data-testid="space-category-select"]', testSpaces.academic.category);
    
    // Add tags
    for (const tag of testSpaces.academic.tags) {
      await studentPage.fill('[data-testid="tag-input"]', tag);
      await studentPage.keyboard.press('Enter');
    }
    
    // Set visibility
    if (testSpaces.academic.isPublic) {
      await studentPage.check('[data-testid="public-space-checkbox"]');
    }
    
    // Submit
    await studentPage.click('[data-testid="create-space-submit"]');
    
    // Should redirect to new space
    await expect(studentPage).toHaveURL(/\/spaces\/[^\/]+$/);
    await expect(studentPage.locator(`text=${testSpaces.academic.name}`)).toBeVisible();
    await expect(studentPage.locator('[data-testid="space-owner-badge"]')).toBeVisible();
  });

  test('should show space recommendations based on interests', async ({ studentPage }) => {
    const recommendations = studentPage.locator('[data-testid="recommended-spaces"]');
    await expect(recommendations).toBeVisible();
    
    // Should have at least 3 recommendations
    const recommendedCards = recommendations.locator('[data-testid^="recommended-space-"]');
    const count = await recommendedCards.count();
    expect(count).toBeGreaterThanOrEqual(3);
    
    // Each recommendation should have a reason
    for (let i = 0; i < Math.min(count, 3); i++) {
      const card = recommendedCards.nth(i);
      await expect(card.locator('[data-testid="recommendation-reason"]')).toBeVisible();
    }
  });

  test('should interact within a joined space', async ({ studentPage }) => {
    // Navigate to a joined space
    await studentPage.click('[data-testid="my-spaces-tab"]');
    const mySpace = studentPage.locator('[data-testid^="my-space-"]').first();
    await mySpace.click();
    
    // Create a post
    await studentPage.click('[data-testid="create-post-button"]');
    await studentPage.fill('[data-testid="post-title-input"]', 'Test Post');
    await studentPage.fill('[data-testid="post-content-input"]', 'This is a test post in the space');
    await studentPage.click('[data-testid="publish-post-button"]');
    
    // Verify post appears
    await expect(studentPage.locator('text=Test Post')).toBeVisible();
    
    // View members
    await studentPage.click('[data-testid="space-members-tab"]');
    await expect(studentPage.locator('[data-testid="member-list"]')).toBeVisible();
    
    // View events
    await studentPage.click('[data-testid="space-events-tab"]');
    await expect(studentPage.locator('[data-testid="events-calendar"]')).toBeVisible();
  });

  test('should leave a space', async ({ studentPage }) => {
    // Navigate to a joined space
    await studentPage.click('[data-testid="my-spaces-tab"]');
    const mySpace = studentPage.locator('[data-testid^="my-space-"]').first();
    const spaceName = await mySpace.locator('[data-testid="space-name"]').textContent();
    await mySpace.click();
    
    // Leave the space
    await studentPage.click('[data-testid="space-settings-button"]');
    await studentPage.click('[data-testid="leave-space-button"]');
    
    // Confirm
    await studentPage.click('[data-testid="confirm-leave-button"]');
    
    // Should redirect to spaces page
    await expect(studentPage).toHaveURL('/spaces');
    
    // Space should not appear in my spaces
    await studentPage.click('[data-testid="my-spaces-tab"]');
    await expect(studentPage.locator(`text=${spaceName}`)).not.toBeVisible();
  });

  test('should show space analytics for space owner', async ({ studentPage }) => {
    // Create a space first
    await spaceHelper.createSpace('Test Analytics Space', 'Space for testing analytics');
    
    // Navigate to analytics
    await studentPage.click('[data-testid="space-analytics-button"]');
    
    // Should show analytics dashboard
    await expect(studentPage.locator('[data-testid="member-growth-chart"]')).toBeVisible();
    await expect(studentPage.locator('[data-testid="engagement-metrics"]')).toBeVisible();
    await expect(studentPage.locator('[data-testid="popular-posts"]')).toBeVisible();
  });
});