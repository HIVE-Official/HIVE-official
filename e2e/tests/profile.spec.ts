import { test, expect } from '../fixtures/auth.fixture';
import { ProfileHelper, NavigationHelper } from '../helpers/page-objects';
import { testUsers } from '../fixtures/test-data';

test.describe('HIVE Profile Management', () => {
  let profileHelper: ProfileHelper;
  let navHelper: NavigationHelper;

  test.beforeEach(async ({ studentPage }) => {
    profileHelper = new ProfileHelper(studentPage);
    navHelper = new NavigationHelper(studentPage);
    await navHelper.navigateToProfile();
  });

  test('should display profile dashboard', async ({ studentPage }) => {
    await expect(studentPage).toHaveURL(/\/profile/);
    
    // Check main profile sections
    await expect(studentPage.locator('[data-testid="profile-header"]')).toBeVisible();
    await expect(studentPage.locator('[data-testid="profile-stats"]')).toBeVisible();
    await expect(studentPage.locator('[data-testid="profile-activity"]')).toBeVisible();
    await expect(studentPage.locator('[data-testid="profile-spaces"]')).toBeVisible();
  });

  test('should edit profile information', async ({ studentPage }) => {
    await studentPage.click('[data-testid="edit-profile-button"]');
    
    // Update bio
    await studentPage.fill('[data-testid="profile-bio-input"]', 'CS student passionate about AI and web development');
    
    // Update year
    await studentPage.selectOption('[data-testid="profile-year-input"]', 'Senior');
    
    // Add interests
    await studentPage.click('[data-testid="add-interests-button"]');
    await studentPage.click('[data-testid="interest-Machine Learning"]');
    await studentPage.click('[data-testid="interest-Blockchain"]');
    
    // Save changes
    await studentPage.click('[data-testid="save-profile-button"]');
    await expect(studentPage.locator('[data-testid="profile-saved-toast"]')).toBeVisible();
    
    // Verify changes are reflected
    await expect(studentPage.locator('text=CS student passionate about AI')).toBeVisible();
    await expect(studentPage.locator('text=Senior')).toBeVisible();
    await expect(studentPage.locator('[data-testid="interest-tag-Machine Learning"]')).toBeVisible();
  });

  test('should upload and update profile avatar', async ({ studentPage }) => {
    await studentPage.click('[data-testid="avatar-edit-button"]');
    
    // Upload avatar
    const filePath = 'e2e/fixtures/test-avatar.jpg';
    await studentPage.setInputFiles('[data-testid="avatar-upload-input"]', filePath);
    
    // Wait for upload
    await expect(studentPage.locator('[data-testid="avatar-uploading"]')).toBeVisible();
    await expect(studentPage.locator('[data-testid="avatar-uploaded-toast"]')).toBeVisible();
    
    // Verify new avatar is displayed
    const avatarSrc = await studentPage.locator('[data-testid="profile-avatar"]').getAttribute('src');
    expect(avatarSrc).toContain('firebase');
  });

  test('should configure privacy settings', async ({ studentPage }) => {
    await studentPage.click('[data-testid="privacy-settings-button"]');
    
    // Toggle profile visibility
    await studentPage.click('[data-testid="privacy-profile-visibility-toggle"]');
    await expect(studentPage.locator('text=Profile is now private')).toBeVisible();
    
    // Configure what's visible
    await studentPage.uncheck('[data-testid="show-email-checkbox"]');
    await studentPage.uncheck('[data-testid="show-schedule-checkbox"]');
    await studentPage.check('[data-testid="show-spaces-checkbox"]');
    
    // Set activity visibility
    await studentPage.selectOption('[data-testid="activity-visibility-select"]', 'connections-only');
    
    // Save settings
    await studentPage.click('[data-testid="save-privacy-settings"]');
    await expect(studentPage.locator('[data-testid="privacy-saved-toast"]')).toBeVisible();
  });

  test('should enable and disable ghost mode', async ({ studentPage }) => {
    // Enable ghost mode
    await profileHelper.enableGhostMode();
    await expect(studentPage.locator('[data-testid="ghost-mode-active"]')).toBeVisible();
    await expect(studentPage.locator('text=You are browsing anonymously')).toBeVisible();
    
    // Navigate to spaces - should not track activity
    await navHelper.navigateToSpaces();
    await studentPage.click('[data-testid^="space-card-"]').first();
    
    // Return to profile and check activity
    await navHelper.navigateToProfile();
    await studentPage.click('[data-testid="activity-tab"]');
    
    // Recent space visit should not be shown
    const recentActivity = await studentPage.locator('[data-testid="recent-activity-list"]').textContent();
    expect(recentActivity).not.toContain('Visited space');
    
    // Disable ghost mode
    await studentPage.click('[data-testid="ghost-mode-toggle"]');
    await expect(studentPage.locator('[data-testid="ghost-mode-inactive"]')).toBeVisible();
  });

  test('should display profile analytics', async ({ studentPage }) => {
    await studentPage.click('[data-testid="profile-analytics-tab"]');
    
    // Check analytics sections
    await expect(studentPage.locator('[data-testid="profile-views-chart"]')).toBeVisible();
    await expect(studentPage.locator('[data-testid="engagement-metrics"]')).toBeVisible();
    await expect(studentPage.locator('[data-testid="connection-growth"]')).toBeVisible();
    
    // Check time period selector
    await studentPage.selectOption('[data-testid="analytics-period-select"]', '30days');
    await studentPage.waitForLoadState('networkidle');
    
    // Verify data updates
    const viewCount = await studentPage.locator('[data-testid="total-views-count"]').textContent();
    expect(viewCount).toBeTruthy();
  });

  test('should manage profile connections', async ({ studentPage }) => {
    await studentPage.click('[data-testid="connections-tab"]');
    
    // View connections list
    await expect(studentPage.locator('[data-testid="connections-list"]')).toBeVisible();
    
    // Search for a connection
    await studentPage.fill('[data-testid="search-connections-input"]', 'John');
    await studentPage.waitForLoadState('networkidle');
    
    // Filter connections
    await studentPage.click('[data-testid="filter-classmates"]');
    const connectionCards = studentPage.locator('[data-testid^="connection-card-"]');
    const count = await connectionCards.count();
    
    // Remove a connection
    if (count > 0) {
      await connectionCards.first().click();
      await studentPage.click('[data-testid="remove-connection-button"]');
      await studentPage.click('[data-testid="confirm-remove-button"]');
      await expect(studentPage.locator('[data-testid="connection-removed-toast"]')).toBeVisible();
    }
  });

  test('should customize profile dashboard widgets', async ({ studentPage }) => {
    await studentPage.click('[data-testid="customize-dashboard-button"]');
    
    // Should enter edit mode
    await expect(studentPage.locator('[data-testid="dashboard-edit-mode"]')).toBeVisible();
    
    // Drag and drop widgets (simulate)
    const calendarWidget = studentPage.locator('[data-testid="widget-calendar"]');
    const targetSlot = studentPage.locator('[data-testid="widget-slot-2"]');
    
    await calendarWidget.dragTo(targetSlot);
    
    // Hide a widget
    await studentPage.click('[data-testid="widget-activity-hide"]');
    await expect(studentPage.locator('[data-testid="widget-activity"]')).not.toBeVisible();
    
    // Add a new widget
    await studentPage.click('[data-testid="add-widget-button"]');
    await studentPage.click('[data-testid="widget-option-tools"]');
    await expect(studentPage.locator('[data-testid="widget-tools"]')).toBeVisible();
    
    // Save layout
    await studentPage.click('[data-testid="save-layout-button"]');
    await expect(studentPage.locator('[data-testid="layout-saved-toast"]')).toBeVisible();
  });

  test('should export profile data', async ({ studentPage }) => {
    await studentPage.click('[data-testid="settings-tab"]');
    await studentPage.click('[data-testid="export-data-button"]');
    
    // Select export options
    await studentPage.check('[data-testid="export-profile-checkbox"]');
    await studentPage.check('[data-testid="export-posts-checkbox"]');
    await studentPage.check('[data-testid="export-connections-checkbox"]');
    
    // Choose format
    await studentPage.selectOption('[data-testid="export-format-select"]', 'json');
    
    // Start export
    const downloadPromise = studentPage.waitForEvent('download');
    await studentPage.click('[data-testid="start-export-button"]');
    const download = await downloadPromise;
    
    // Verify download
    expect(download.suggestedFilename()).toContain('hive-profile-export');
    expect(download.suggestedFilename()).toEndWith('.json');
  });

  test('should view public profile as others see it', async ({ studentPage }) => {
    // Get current user handle
    const handle = await studentPage.locator('[data-testid="profile-handle"]').textContent();
    
    // Click view public profile
    await studentPage.click('[data-testid="view-public-profile-button"]');
    
    // Should open in new tab/window
    const newPage = await studentPage.context().waitForEvent('page');
    await newPage.waitForLoadState();
    
    // Verify public profile URL
    expect(newPage.url()).toContain(`/profile/${handle}`);
    
    // Should not show private information
    await expect(newPage.locator('[data-testid="edit-profile-button"]')).not.toBeVisible();
    await expect(newPage.locator('[data-testid="privacy-settings-button"]')).not.toBeVisible();
    
    // Should show public information
    await expect(newPage.locator('[data-testid="public-profile-name"]')).toBeVisible();
    await expect(newPage.locator('[data-testid="public-profile-bio"]')).toBeVisible();
    
    await newPage.close();
  });
});