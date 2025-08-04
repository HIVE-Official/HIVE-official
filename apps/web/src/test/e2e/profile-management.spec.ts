import { test, expect, Page } from '@playwright/test';

const mockUser = {
  email: 'profileuser@university.edu',
  displayName: 'Profile Test User',
  handle: 'profileuser',
  bio: 'Computer Science student passionate about AI and web development',
  school: 'University of Test',
  major: 'Computer Science',
  graduationYear: '2025',
  interests: ['Artificial Intelligence', 'Web Development', 'Mobile Apps', 'Data Science']
};

async function authenticateUser(page: Page) {
  await page.goto('/auth/login');
  await page.fill('[data-testid="email-input"]', mockUser.email);
  await page.click('[data-testid="send-magic-link-button"]');
  
  await page.goto('/auth/verify?token=profile-user-token&email=' + encodeURIComponent(mockUser.email));
  await expect(page).toHaveURL('/dashboard');
}

async function updateProfileField(page: Page, field: string, value: string) {
  await page.click(`[data-testid="${field}-edit-button"]`);
  await page.fill(`[data-testid="${field}-input"]`, value);
  await page.click(`[data-testid="${field}-save-button"]`);
  await expect(page.locator('[data-testid="field-updated-toast"]')).toBeVisible();
}

test.describe('Profile Management E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await authenticateUser(page);
  });

  test('completes comprehensive profile setup and customization', async ({ page }) => {
    // Step 1: Navigate to profile
    await page.click('[data-testid="profile-menu"]');
    await page.click('[data-testid="view-profile-link"]');
    
    await expect(page).toHaveURL('/profile');
    await expect(page.locator('[data-testid="profile-page"]')).toBeVisible();
    
    // Step 2: Update basic information
    await page.click('[data-testid="edit-profile-button"]');
    await expect(page.locator('[data-testid="profile-edit-modal"]')).toBeVisible();
    
    // Update display name
    await page.fill('[data-testid="display-name-input"]', 'Updated Profile User');
    
    // Update bio with rich formatting
    await page.fill('[data-testid="bio-textarea"]', mockUser.bio);
    
    // Update academic information
    await page.selectOption('[data-testid="school-select"]', mockUser.school);
    await page.selectOption('[data-testid="major-select"]', mockUser.major);
    await page.selectOption('[data-testid="graduation-year-select"]', mockUser.graduationYear);
    
    // Add interests with autocomplete
    for (const interest of mockUser.interests) {
      await page.fill('[data-testid="interests-input"]', interest);
      await page.keyboard.press('Enter');
    }
    
    await expect(page.locator('[data-testid="interest-tag"]')).toHaveCount(4);
    
    await page.click('[data-testid="save-profile-button"]');
    await expect(page.locator('[data-testid="profile-updated-toast"]')).toBeVisible();
    
    // Step 3: Upload and customize profile photo
    await page.click('[data-testid="avatar-edit-button"]');
    await expect(page.locator('[data-testid="avatar-upload-modal"]')).toBeVisible();
    
    const fileInput = page.locator('[data-testid="avatar-file-input"]');
    await fileInput.setInputFiles({
      name: 'profile-photo.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('profile photo content')
    });
    
    // Crop and adjust photo
    await expect(page.locator('[data-testid="image-cropper"]')).toBeVisible();
    await page.click('[data-testid="crop-preset-square"]');
    
    // Apply filters
    await page.click('[data-testid="filter-tab"]');
    await page.click('[data-testid="filter-vibrant"]');
    
    await page.click('[data-testid="save-avatar-button"]');
    await expect(page.locator('[data-testid="avatar-updated-toast"]')).toBeVisible();
    
    // Verify new avatar appears
    await expect(page.locator('[data-testid="profile-avatar"]')).toHaveAttribute('src', /.*profile-photo.*\.jpg/);
    
    // Step 4: Customize profile banner
    await page.click('[data-testid="banner-edit-button"]');
    await expect(page.locator('[data-testid="banner-customization"]')).toBeVisible();
    
    // Choose from preset banners
    await page.click('[data-testid="preset-banners-tab"]');
    await page.click('[data-testid="banner-tech-gradient"]');
    
    // Customize banner text
    await page.fill('[data-testid="banner-title-input"]', 'Building the Future with Code');
    await page.fill('[data-testid="banner-subtitle-input"]', 'CS Student | AI Enthusiast | Problem Solver');
    
    await page.click('[data-testid="save-banner-button"]');
    await expect(page.locator('[data-testid="banner-updated-toast"]')).toBeVisible();
    
    // Step 5: Configure privacy settings
    await page.click('[data-testid="privacy-settings-button"]');
    await expect(page.locator('[data-testid="privacy-modal"]')).toBeVisible();
    
    // Profile visibility settings
    await page.selectOption('[data-testid="profile-visibility"]', 'public');
    await page.selectOption('[data-testid="contact-visibility"]', 'connections');
    await page.selectOption('[data-testid="activity-visibility"]', 'connections');
    
    // Content sharing preferences
    await page.check('[data-testid="allow-tool-sharing"]');
    await page.check('[data-testid="allow-space-invites"]');
    await page.uncheck('[data-testid="allow-direct-messages"]');
    
    await page.click('[data-testid="save-privacy-settings"]');
    await expect(page.locator('[data-testid="privacy-updated-toast"]')).toBeVisible();
    
    // Step 6: Add social links and portfolios
    await page.click('[data-testid="social-links-section"]');
    await page.click('[data-testid="add-social-link"]');
    
    await page.selectOption('[data-testid="social-platform-select"]', 'github');
    await page.fill('[data-testid="social-url-input"]', 'https://github.com/profileuser');
    await page.click('[data-testid="add-link-button"]');
    
    await page.click('[data-testid="add-social-link"]');
    await page.selectOption('[data-testid="social-platform-select"]', 'linkedin');
    await page.fill('[data-testid="social-url-input"]', 'https://linkedin.com/in/profileuser');
    await page.click('[data-testid="add-link-button"]');
    
    // Add portfolio projects
    await page.click('[data-testid="portfolio-section"]');
    await page.click('[data-testid="add-portfolio-item"]');
    
    await page.fill('[data-testid="project-title-input"]', 'AI Study Assistant');
    await page.fill('[data-testid="project-description-textarea"]', 'Machine learning tool that helps students optimize their study schedules');
    await page.fill('[data-testid="project-url-input"]', 'https://github.com/profileuser/ai-study-assistant');
    await page.selectOption('[data-testid="project-status-select"]', 'completed');
    
    // Upload project screenshots
    const screenshotInput = page.locator('[data-testid="project-screenshots-input"]');
    await screenshotInput.setInputFiles([
      {
        name: 'screenshot1.png',
        mimeType: 'image/png',
        buffer: Buffer.from('screenshot 1')
      },
      {
        name: 'screenshot2.png',
        mimeType: 'image/png',
        buffer: Buffer.from('screenshot 2')
      }
    ]);
    
    await page.click('[data-testid="save-portfolio-item"]');
    await expect(page.locator('[data-testid="portfolio-added-toast"]')).toBeVisible();
    
    // Step 7: Verify complete profile
    await page.reload();
    
    await expect(page.locator('[data-testid="profile-display-name"]')).toHaveText('Updated Profile User');
    await expect(page.locator('[data-testid="profile-bio"]')).toHaveText(mockUser.bio);
    await expect(page.locator('[data-testid="profile-school"]')).toHaveText(mockUser.school);
    await expect(page.locator('[data-testid="interest-tag"]')).toHaveCount(4);
    await expect(page.locator('[data-testid="social-link"]')).toHaveCount(2);
    await expect(page.locator('[data-testid="portfolio-item"]')).toHaveCount(1);
  });

  test('manages profile connections and networking', async ({ page }) => {
    await page.goto('/profile');
    
    // View connections
    await page.click('[data-testid="connections-tab"]');
    await expect(page.locator('[data-testid="connections-list"]')).toBeVisible();
    
    // Search through connections
    await page.fill('[data-testid="connections-search"]', 'computer science');
    await expect(page.locator('[data-testid="filtered-connections"]')).toBeVisible();
    
    // Organize connections into groups
    await page.click('[data-testid="organize-connections-button"]');
    await page.click('[data-testid="create-group-button"]');
    
    await page.fill('[data-testid="group-name-input"]', 'Study Partners');
    await page.fill('[data-testid="group-description-textarea"]', 'Classmates I regularly study with');
    await page.click('[data-testid="create-group-submit"]');
    
    // Add connections to group
    const connection = page.locator('[data-testid="connection-card"]').first();
    await connection.locator('[data-testid="connection-menu"]').click();
    await page.click('[data-testid="add-to-group-option"]');
    await page.selectOption('[data-testid="group-select"]', 'Study Partners');
    await page.click('[data-testid="add-to-group-confirm"]');
    
    await expect(page.locator('[data-testid="connection-grouped-toast"]')).toBeVisible();
    
    // View connection requests
    await page.click('[data-testid="pending-requests-tab"]');
    await expect(page.locator('[data-testid="pending-requests-list"]')).toBeVisible();
    
    // Accept connection request
    const request = page.locator('[data-testid="connection-request"]').first();
    await request.locator('[data-testid="accept-request-button"]').click();
    
    await expect(page.locator('[data-testid="connection-accepted-toast"]')).toBeVisible();
    
    // Send new connection requests
    await page.click('[data-testid="find-connections-button"]');
    await expect(page.locator('[data-testid="connection-suggestions"]')).toBeVisible();
    
    const suggestion = page.locator('[data-testid="suggestion-card"]').first();
    await suggestion.locator('[data-testid="connect-button"]').click();
    
    await page.fill('[data-testid="connection-message"]', 'Hi! I see we\'re both CS students. Would love to connect and share study resources!');
    await page.click('[data-testid="send-request-button"]');
    
    await expect(page.locator('[data-testid="request-sent-toast"]')).toBeVisible();
  });

  test('handles profile analytics and insights', async ({ page }) => {
    await page.goto('/profile');
    
    // Access profile analytics
    await page.click('[data-testid="analytics-tab"]');
    await expect(page.locator('[data-testid="profile-analytics"]')).toBeVisible();
    
    // View profile statistics
    await expect(page.locator('[data-testid="profile-views-metric"]')).toBeVisible();
    await expect(page.locator('[data-testid="connection-growth-metric"]')).toBeVisible();
    await expect(page.locator('[data-testid="content-engagement-metric"]')).toBeVisible();
    
    // Analyze profile visitors
    await page.click('[data-testid="profile-visitors-section"]');
    await expect(page.locator('[data-testid="recent-visitors"]')).toBeVisible();
    
    const visitor = page.locator('[data-testid="visitor-card"]').first();
    await expect(visitor.locator('[data-testid="visitor-name"]')).toBeVisible();
    await expect(visitor.locator('[data-testid="visit-timestamp"]')).toBeVisible();
    
    // View content performance
    await page.click('[data-testid="content-performance-tab"]');
    await expect(page.locator('[data-testid="top-performing-posts"]')).toBeVisible();
    await expect(page.locator('[data-testid="tool-usage-stats"]')).toBeVisible();
    
    // Export analytics data
    await page.click('[data-testid="export-analytics-button"]');
    await page.selectOption('[data-testid="export-format"]', 'pdf');
    await page.selectOption('[data-testid="date-range"]', '3months');
    await page.click('[data-testid="download-report"]');
    
    await expect(page.locator('[data-testid="export-started-toast"]')).toBeVisible();
    
    // Set up analytics alerts
    await page.click('[data-testid="analytics-alerts-tab"]');
    await page.click('[data-testid="create-alert-button"]');
    
    await page.selectOption('[data-testid="alert-type"]', 'profile_views');
    await page.selectOption('[data-testid="alert-threshold"]', 'weekly_increase_50_percent');
    await page.check('[data-testid="email-notifications"]');
    
    await page.click('[data-testid="save-alert-button"]');
    await expect(page.locator('[data-testid="alert-created-toast"]')).toBeVisible();
  });

  test('manages profile content and digital presence', async ({ page }) => {
    await page.goto('/profile');
    
    // Manage posts and content
    await page.click('[data-testid="my-content-tab"]');
    await expect(page.locator('[data-testid="user-posts"]')).toBeVisible();
    
    // Filter content by type
    await page.selectOption('[data-testid="content-filter"]', 'tools');
    await expect(page.locator('[data-testid="user-tools"]')).toBeVisible();
    
    // Edit post
    const post = page.locator('[data-testid="user-post"]').first();
    await post.locator('[data-testid="edit-post-button"]').click();
    
    await page.fill('[data-testid="edit-post-content"]', 'Updated post content with better information');
    await page.click('[data-testid="save-post-edit"]');
    
    await expect(page.locator('[data-testid="post-updated-toast"]')).toBeVisible();
    
    // Archive old content
    await post.locator('[data-testid="post-menu"]').click();
    await page.click('[data-testid="archive-post-option"]');
    
    await expect(page.locator('[data-testid="post-archived-toast"]')).toBeVisible();
    
    // Manage achievements and badges
    await page.click('[data-testid="achievements-tab"]');
    await expect(page.locator('[data-testid="user-achievements"]')).toBeVisible();
    
    // View earned badges
    await expect(page.locator('[data-testid="badge-early-adopter"]')).toBeVisible();
    await expect(page.locator('[data-testid="badge-tool-creator"]')).toBeVisible();
    
    // Track progress toward new achievements
    await page.click('[data-testid="achievement-progress-button"]');
    await expect(page.locator('[data-testid="progress-modal"]')).toBeVisible();
    
    await expect(page.locator('[data-testid="progress-connector"]')).toHaveText('7/10 connections');
    await expect(page.locator('[data-testid="progress-contributor"]')).toHaveText('15/25 helpful posts');
    
    // Showcase achievements on profile
    await page.click('[data-testid="showcase-achievements"]');
    await page.check('[data-testid="show-badge-tool-creator"]');
    await page.check('[data-testid="show-badge-helpful-contributor"]');
    
    await page.click('[data-testid="update-showcase"]');
    await expect(page.locator('[data-testid="showcase-updated-toast"]')).toBeVisible();
  });

  test('handles profile customization and themes', async ({ page }) => {
    await page.goto('/profile/settings');
    
    // Customize profile theme
    await page.click('[data-testid="appearance-tab"]');
    await expect(page.locator('[data-testid="theme-customization"]')).toBeVisible();
    
    // Select color scheme
    await page.click('[data-testid="theme-blue"]');
    await expect(page.locator('[data-testid="profile-preview"]')).toHaveClass(/theme-blue/);
    
    // Customize accent colors
    await page.click('[data-testid="custom-colors-tab"]');
    await page.fill('[data-testid="primary-color-input"]', '#3B82F6');
    await page.fill('[data-testid="secondary-color-input"]', '#10B981');
    
    // Configure layout preferences
    await page.selectOption('[data-testid="layout-style"]', 'card-based');
    await page.check('[data-testid="show-activity-timeline"]');
    await page.check('[data-testid="show-skill-progress"]');
    
    await page.click('[data-testid="save-appearance"]');
    await expect(page.locator('[data-testid="appearance-saved-toast"]')).toBeVisible();
    
    // Customize profile sections
    await page.click('[data-testid="sections-tab"]');
    await expect(page.locator('[data-testid="section-manager"]')).toBeVisible();
    
    // Reorder sections with drag and drop
    const aboutSection = page.locator('[data-testid="section-about"]');
    const projectsSection = page.locator('[data-testid="section-projects"]');
    
    await aboutSection.dragTo(projectsSection);
    await expect(page.locator('[data-testid="sections-reordered-toast"]')).toBeVisible();
    
    // Add custom section
    await page.click('[data-testid="add-custom-section"]');
    await page.fill('[data-testid="section-title"]', 'Certifications');
    await page.selectOption('[data-testid="section-type"]', 'achievements');
    
    await page.click('[data-testid="add-section-button"]');
    await expect(page.locator('[data-testid="section-added-toast"]')).toBeVisible();
    
    // Configure section visibility
    await page.uncheck('[data-testid="show-section-activity"]');
    await page.check('[data-testid="show-section-certifications"]');
    
    await page.click('[data-testid="save-sections"]');
    await expect(page.locator('[data-testid="sections-saved-toast"]')).toBeVisible();
  });

  test('handles profile verification and credibility', async ({ page }) => {
    await page.goto('/profile/settings');
    
    // Start verification process
    await page.click('[data-testid="verification-tab"]');
    await expect(page.locator('[data-testid="verification-panel"]')).toBeVisible();
    
    // Verify student status
    await page.click('[data-testid="verify-student-status"]');
    await expect(page.locator('[data-testid="student-verification-modal"]')).toBeVisible();
    
    // Upload student ID
    const idInput = page.locator('[data-testid="student-id-upload"]');
    await idInput.setInputFiles({
      name: 'student-id.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('student id content')
    });
    
    // Upload transcript
    const transcriptInput = page.locator('[data-testid="transcript-upload"]');
    await transcriptInput.setInputFiles({
      name: 'transcript.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('transcript content')
    });
    
    await page.click('[data-testid="submit-verification"]');
    await expect(page.locator('[data-testid="verification-submitted-toast"]')).toBeVisible();
    
    // Verify skills and expertise
    await page.click('[data-testid="verify-skills-tab"]');
    await page.click('[data-testid="add-skill-verification"]');
    
    await page.fill('[data-testid="skill-name"]', 'React Development');
    await page.selectOption('[data-testid="proficiency-level"]', 'intermediate');
    
    // Add project evidence
    await page.fill('[data-testid="evidence-url"]', 'https://github.com/profileuser/react-project');
    await page.fill('[data-testid="evidence-description"]', 'Full-stack React application with authentication and real-time features');
    
    await page.click('[data-testid="submit-skill-verification"]');
    await expect(page.locator('[data-testid="skill-verification-toast"]')).toBeVisible();
    
    // Request endorsements
    await page.click('[data-testid="endorsements-tab"]');
    await page.click('[data-testid="request-endorsement"]');
    
    await page.selectOption('[data-testid="endorser-select"]', 'Professor Johnson');
    await page.selectOption('[data-testid="endorsement-type"]', 'academic_performance');
    await page.fill('[data-testid="endorsement-message"]', 'Could you please endorse my performance in your CS 301 class?');
    
    await page.click('[data-testid="send-endorsement-request"]');
    await expect(page.locator('[data-testid="endorsement-requested-toast"]')).toBeVisible();
  });

  test('provides accessibility features for profile management', async ({ page }) => {
    await page.goto('/profile');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="edit-profile-button"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="connections-tab"]')).toBeFocused();
    
    // Test screen reader support
    await expect(page.locator('[data-testid="profile-main"]')).toHaveAttribute('role', 'main');
    await expect(page.locator('[data-testid="profile-avatar"]')).toHaveAttribute('alt');
    
    // Test form accessibility
    await page.click('[data-testid="edit-profile-button"]');
    
    await expect(page.locator('[data-testid="display-name-input"]')).toHaveAttribute('aria-label');
    await expect(page.locator('[data-testid="bio-textarea"]')).toHaveAttribute('aria-describedby');
    
    // Test high contrast mode
    await page.click('[data-testid="accessibility-settings"]');
    await page.check('[data-testid="high-contrast-profile"]');
    
    await expect(page.locator('[data-testid="profile-container"]')).toHaveClass(/high-contrast/);
    
    // Test reduced motion preferences
    await page.check('[data-testid="reduce-motion"]');
    await expect(page.locator('[data-testid="profile-animations"]')).toHaveClass(/reduced-motion/);
    
    // Test text-to-speech for bio
    await page.click('[data-testid="read-bio-button"]');
    await expect(page.locator('[data-testid="speech-indicator"]')).toBeVisible();
  });
});