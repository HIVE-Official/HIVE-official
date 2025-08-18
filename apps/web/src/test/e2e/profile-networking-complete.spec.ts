import { test, expect, Page } from '@playwright/test';

const mockUser = {
  displayName: 'Jordan Martinez',
  handle: 'jordanmartinez',
  email: 'jordan@university.edu',
  school: 'University of Test',
  major: 'Business Administration',
  graduationYear: '2025',
  bio: 'Passionate about entrepreneurship and technology. Looking to connect with like-minded students.',
  interests: ['entrepreneurship', 'technology', 'business-strategy', 'networking']
};

const mockConnections = [
  {
    displayName: 'Alex Chen',
    handle: 'alexchen',
    major: 'Computer Science',
    mutualConnections: 5
  },
  {
    displayName: 'Sarah Johnson',
    handle: 'sarahjohnson',
    major: 'Marketing',
    mutualConnections: 3
  },
  {
    displayName: 'Mike Rodriguez',
    handle: 'mikerodriguez',
    major: 'Finance',
    mutualConnections: 8
  }
];

async function loginAsUser(page: Page) {
  await page.goto('/auth/login');
  await page.fill('[data-testid="email-input"]', mockUser.email);
  await page.click('[data-testid="send-magic-link-button"]');
  
  await page.goto('/auth/verify?token=existing-user-token&email=' + encodeURIComponent(mockUser.email));
  await expect(page).toHaveURL('/dashboard');
}

async function completeProfileSetup(page: Page) {
  // Fill in profile information if not already complete
  const profileIncomplete = await page.locator('[data-testid="profile-incomplete"]').isVisible();
  
  if (profileIncomplete) {
    await page.click('[data-testid="complete-profile"]');
    
    await page.fill('[data-testid="bio-textarea"]', mockUser.bio);
    
    // Add interests
    for (const interest of mockUser.interests) {
      await page.fill('[data-testid="interest-input"]', interest);
      await page.keyboard.press('Enter');
    }
    
    // Add academic information
    await page.selectOption('[data-testid="graduation-year-select"]', mockUser.graduationYear);
    
    // Upload profile photo
    await page.setInputFiles('[data-testid="profile-photo-upload"]', {
      name: 'profile.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-profile-image')
    });
    
    await page.click('[data-testid="save-profile"]');
    await expect(page.locator('[data-testid="profile-saved"]')).toBeVisible();
  }
}

test.describe('Profile and Networking Complete E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsUser(page);
  });

  test('completes comprehensive profile management workflow', async ({ page }) => {
    // Step 1: Navigate to profile
    await page.click('[data-testid="profile-menu-button"]');
    await page.click('[data-testid="view-profile"]');
    
    await expect(page).toHaveURL('/profile');
    await expect(page.locator('[data-testid="profile-header"]')).toBeVisible();
    
    // Step 2: Complete profile setup
    await completeProfileSetup(page);
    
    // Step 3: Profile customization
    await page.click('[data-testid="edit-profile-button"]');
    await expect(page.locator('[data-testid="profile-editor"]')).toBeVisible();
    
    // Personal information section
    await page.click('[data-testid="personal-info-section"]');
    await page.fill('[data-testid="display-name-input"]', mockUser.displayName);
    await page.fill('[data-testid="bio-textarea"]', mockUser.bio);
    
    // Academic information
    await page.click('[data-testid="academic-info-section"]');
    await page.selectOption('[data-testid="school-select"]', mockUser.school);
    await page.selectOption('[data-testid="major-select"]', mockUser.major);
    await page.selectOption('[data-testid="graduation-year-select"]', mockUser.graduationYear);
    
    // Skills and interests
    await page.click('[data-testid="skills-section"]');
    
    // Add professional skills
    const skills = ['Project Management', 'Data Analysis', 'Public Speaking', 'Strategic Planning'];
    for (const skill of skills) {
      await page.fill('[data-testid="skill-input"]', skill);
      await page.keyboard.press('Enter');
    }
    
    // Set skill levels
    await page.selectOption('[data-testid="skill-level-project-management"]', 'intermediate');
    await page.selectOption('[data-testid="skill-level-data-analysis"]', 'beginner');
    await page.selectOption('[data-testid="skill-level-public-speaking"]', 'advanced');
    
    // Contact preferences
    await page.click('[data-testid="contact-section"]');
    await page.check('[data-testid="allow-connection-requests"]');
    await page.check('[data-testid="show-email-to-connections"]');
    await page.uncheck('[data-testid="show-phone-to-connections"]');
    
    // Social links
    await page.click('[data-testid="social-links-section"]');
    await page.fill('[data-testid="linkedin-input"]', 'https://linkedin.com/in/jordanmartinez');
    await page.fill('[data-testid="github-input"]', 'https://github.com/jordanmartinez');
    await page.fill('[data-testid="personal-website-input"]', 'https://jordanmartinez.dev');
    
    await page.click('[data-testid="save-profile-changes"]');
    await expect(page.locator('[data-testid="profile-updated"]')).toBeVisible();
    
    // Step 4: Privacy settings configuration
    await page.click('[data-testid="privacy-settings-button"]');
    await expect(page.locator('[data-testid="privacy-settings-modal"]')).toBeVisible();
    
    // Profile visibility
    await page.selectOption('[data-testid="profile-visibility"]', 'school');
    await page.check('[data-testid="show-in-directory"]');
    await page.check('[data-testid="allow-search-engines"]');
    
    // Activity visibility
    await page.check('[data-testid="show-recent-activity"]');
    await page.uncheck('[data-testid="show-connection-count"]');
    await page.check('[data-testid="show-tools-created"]');
    
    // Contact permissions
    await page.selectOption('[data-testid="who-can-message"]', 'connections');
    await page.selectOption('[data-testid="who-can-see-connections"]', 'connections');
    
    await page.click('[data-testid="save-privacy-settings"]');
    await expect(page.locator('[data-testid="privacy-saved"]')).toBeVisible();
    
    // Step 5: Professional portfolio setup
    await page.click('[data-testid="portfolio-tab"]');
    await expect(page.locator('[data-testid="portfolio-section"]')).toBeVisible();
    
    // Add project
    await page.click('[data-testid="add-project-button"]');
    await page.fill('[data-testid="project-title"]', 'Campus Food Delivery App');
    await page.fill('[data-testid="project-description"]', 'Developed a mobile app to streamline food delivery on campus, connecting students with local restaurants.');
    await page.selectOption('[data-testid="project-status"]', 'completed');
    
    // Add project images
    await page.setInputFiles('[data-testid="project-images"]', {
      name: 'app-screenshot.png',
      mimeType: 'image/png',
      buffer: Buffer.from('fake-app-screenshot')
    });
    
    // Add project links
    await page.fill('[data-testid="project-demo-link"]', 'https://campusfood.app');
    await page.fill('[data-testid="project-code-link"]', 'https://github.com/jordanmartinez/campus-food-app');
    
    // Add technologies used
    const technologies = ['React Native', 'Node.js', 'MongoDB', 'Stripe API'];
    for (const tech of technologies) {
      await page.fill('[data-testid="technology-input"]', tech);
      await page.keyboard.press('Enter');
    }
    
    await page.click('[data-testid="save-project"]');
    await expect(page.locator('[data-testid="project-saved"]')).toBeVisible();
    
    // Add work experience
    await page.click('[data-testid="add-experience-button"]');
    await page.fill('[data-testid="experience-title"]', 'Marketing Intern');
    await page.fill('[data-testid="experience-company"]', 'TechStart Inc.');
    await page.fill('[data-testid="experience-description"]', 'Assisted with social media campaigns and market research for B2B software products.');
    
    await page.fill('[data-testid="experience-start-date"]', '2024-06-01');
    await page.fill('[data-testid="experience-end-date"]', '2024-08-30');
    
    await page.click('[data-testid="save-experience"]');
    await expect(page.locator('[data-testid="experience-saved"]')).toBeVisible();
    
    // Step 6: Achievement and recognition system
    await page.click('[data-testid="achievements-tab"]');
    
    // Check earned achievements
    await expect(page.locator('[data-testid="achievement-badge"]')).toHaveCount(3);
    await expect(page.locator('[data-testid="achievement-profile-complete"]')).toBeVisible();
    await expect(page.locator('[data-testid="achievement-first-connection"]')).toBeVisible();
    await expect(page.locator('[data-testid="achievement-first-tool"]')).toBeVisible();
    
    // View achievement details
    await page.click('[data-testid="achievement-profile-complete"]');
    await expect(page.locator('[data-testid="achievement-modal"]')).toBeVisible();
    await expect(page.locator('[data-testid="achievement-title"]')).toHaveText('Profile Complete');
    await expect(page.locator('[data-testid="achievement-description"]')).toContainText('Completed your profile with all required information');
    
    await page.click('[data-testid="close-achievement-modal"]');
    
    // Step 7: Connection discovery and networking
    await page.click('[data-testid="networking-tab"]');
    await expect(page.locator('[data-testid="networking-dashboard"]')).toBeVisible();
    
    // Discover people
    await page.click('[data-testid="discover-people-button"]');
    await expect(page.locator('[data-testid="people-discovery"]')).toBeVisible();
    
    // Filter suggestions
    await page.selectOption('[data-testid="filter-by-major"]', 'Business Administration');
    await page.selectOption('[data-testid="filter-by-graduation-year"]', '2025');
    await page.check('[data-testid="filter-same-school"]');
    
    await expect(page.locator('[data-testid="suggested-connections"]')).toBeVisible();
    
    // Send connection request with personalized message
    const firstSuggestion = page.locator('[data-testid="connection-suggestion"]').first();
    await firstSuggestion.locator('[data-testid="connect-button"]').click();
    
    await expect(page.locator('[data-testid="connection-request-modal"]')).toBeVisible();
    await page.fill('[data-testid="connection-message"]', 'Hi Alex! I noticed we\'re both interested in entrepreneurship and technology. Would love to connect and potentially collaborate on projects.');
    await page.click('[data-testid="send-connection-request"]');
    
    await expect(page.locator('[data-testid="request-sent"]')).toBeVisible();
    await expect(firstSuggestion.locator('[data-testid="connection-status"]')).toHaveText('Request Sent');
    
    // Use mutual connections for networking
    const mutualConnectionSuggestion = page.locator('[data-testid="connection-suggestion"][data-mutual-connections="5"]');
    await mutualConnectionSuggestion.locator('[data-testid="view-mutual-connections"]').click();
    
    await expect(page.locator('[data-testid="mutual-connections-modal"]')).toBeVisible();
    await expect(page.locator('[data-testid="mutual-connection"]')).toHaveCount(5);
    
    // Request introduction through mutual connection
    const mutualConnection = page.locator('[data-testid="mutual-connection"]').first();
    await mutualConnection.locator('[data-testid="request-introduction"]').click();
    
    await page.fill('[data-testid="introduction-message"]', 'Hi! Could you introduce me to Alex? We have similar interests in tech entrepreneurship.');
    await page.click('[data-testid="send-introduction-request"]');
    
    await expect(page.locator('[data-testid="introduction-requested"]')).toBeVisible();
    await page.click('[data-testid="close-mutual-connections"]');
    
    // Step 8: Connection management
    await page.click('[data-testid="my-connections-tab"]');
    await expect(page.locator('[data-testid="connections-list"]')).toBeVisible();
    
    // Organize connections with tags
    const firstConnection = page.locator('[data-testid="connection-item"]').first();
    await firstConnection.locator('[data-testid="manage-connection"]').click();
    
    await page.click('[data-testid="add-tags"]');
    await page.fill('[data-testid="connection-tag-input"]', 'classmate');
    await page.keyboard.press('Enter');
    await page.fill('[data-testid="connection-tag-input"]', 'study-partner');
    await page.keyboard.press('Enter');
    
    await page.click('[data-testid="save-connection-tags"]');
    await expect(page.locator('[data-testid="tags-saved"]')).toBeVisible();
    
    // Add personal notes about connection
    await page.fill('[data-testid="connection-notes"]', 'Met in Business Strategy class. Interested in sustainable business practices. Good potential for group projects.');
    await page.click('[data-testid="save-notes"]');
    
    // Set connection preferences
    await page.selectOption('[data-testid="connection-priority"]', 'high');
    await page.check('[data-testid="notify-activity"]');
    
    await page.click('[data-testid="close-connection-management"]');
    
    // Step 9: Professional networking events and activities
    await page.click('[data-testid="networking-events-tab"]');
    await expect(page.locator('[data-testid="events-calendar"]')).toBeVisible();
    
    // RSVP to networking event
    const networkingEvent = page.locator('[data-testid="networking-event"]').first();
    await networkingEvent.locator('[data-testid="event-details"]').click();
    
    await expect(page.locator('[data-testid="event-modal"]')).toBeVisible();
    await expect(page.locator('[data-testid="event-title"]')).toHaveText('Business Students Networking Mixer');
    
    await page.click('[data-testid="rsvp-button"]');
    await page.selectOption('[data-testid="attendance-status"]', 'attending');
    await page.check('[data-testid="open-to-connections"]');
    
    await page.fill('[data-testid="networking-goals"]', 'Looking to meet fellow entrepreneurs and potential co-founders for startup ideas.');
    await page.click('[data-testid="confirm-rsvp"]');
    
    await expect(page.locator('[data-testid="rsvp-confirmed"]')).toBeVisible();
    
    // Create networking reminder
    await page.click('[data-testid="set-reminder"]');
    await page.selectOption('[data-testid="reminder-time"]', '1day');
    await page.fill('[data-testid="reminder-note"]', 'Prepare elevator pitch and bring business cards');
    await page.click('[data-testid="save-reminder"]');
    
    await page.click('[data-testid="close-event-modal"]');
    
    // Step 10: Mentorship and guidance system
    await page.click('[data-testid="mentorship-tab"]');
    await expect(page.locator('[data-testid="mentorship-dashboard"]')).toBeVisible();
    
    // Find mentors
    await page.click('[data-testid="find-mentors"]');
    await page.selectOption('[data-testid="mentor-expertise"]', 'entrepreneurship');
    await page.selectOption('[data-testid="mentor-industry"]', 'technology');
    await page.check('[data-testid="alumni-mentors"]');
    
    await expect(page.locator('[data-testid="mentor-suggestions"]')).toBeVisible();
    
    // Request mentorship
    const mentor = page.locator('[data-testid="mentor-profile"]').first();
    await mentor.locator('[data-testid="request-mentorship"]').click();
    
    await page.fill('[data-testid="mentorship-request-message"]', 'Hello! I\'m a business student passionate about tech entrepreneurship. Your experience in building successful startups really inspires me. Would you be willing to mentor me?');
    
    await page.fill('[data-testid="specific-goals"]', 'I\'d like guidance on validating business ideas, building MVP, and fundraising strategies.');
    await page.selectOption('[data-testid="commitment-level"]', 'monthly');
    
    await page.click('[data-testid="send-mentorship-request"]');
    await expect(page.locator('[data-testid="mentorship-request-sent"]')).toBeVisible();
    
    // Offer to mentor others
    await page.click('[data-testid="become-mentor-tab"]');
    await page.check('[data-testid="available-for-mentoring"]');
    
    await page.fill('[data-testid="mentor-bio"]', 'I have experience in campus entrepreneurship and can help with business plan development and marketing strategies.');
    
    // Set mentoring preferences
    await page.check('[data-testid="mentor-topic-business-planning"]');
    await page.check('[data-testid="mentor-topic-marketing"]');
    await page.selectOption('[data-testid="max-mentees"]', '3');
    await page.selectOption('[data-testid="meeting-frequency"]', 'biweekly');
    
    await page.click('[data-testid="save-mentor-profile"]');
    await expect(page.locator('[data-testid="mentor-profile-saved"]')).toBeVisible();
    
    // Step 11: Professional brand building
    await page.click('[data-testid="brand-building-tab"]');
    
    // Content creation for professional visibility
    await page.click('[data-testid="create-professional-content"]');
    await page.selectOption('[data-testid="content-type"]', 'article');
    
    await page.fill('[data-testid="article-title"]', '5 Lessons Learned from My First Startup Attempt');
    await page.fill('[data-testid="article-content"]', 'As a business student who recently launched and pivoted my first startup idea, I wanted to share some key insights that might help fellow student entrepreneurs...');
    
    await page.check('[data-testid="include-in-portfolio"]');
    await page.check('[data-testid="share-to-feed"]');
    
    // Add relevant tags
    const articleTags = ['entrepreneurship', 'startup-lessons', 'student-business'];
    for (const tag of articleTags) {
      await page.fill('[data-testid="article-tag-input"]', tag);
      await page.keyboard.press('Enter');
    }
    
    await page.click('[data-testid="publish-article"]');
    await expect(page.locator('[data-testid="article-published"]')).toBeVisible();
    
    // Track professional metrics
    await page.click('[data-testid="professional-analytics"]');
    await expect(page.locator('[data-testid="profile-views"]')).toBeVisible();
    await expect(page.locator('[data-testid="connection-growth"]')).toBeVisible();
    await expect(page.locator('[data-testid="content-engagement"]')).toBeVisible();
    
    // Set professional goals
    await page.click('[data-testid="set-professional-goals"]');
    await page.fill('[data-testid="goal-connections"]', '50');
    await page.fill('[data-testid="goal-timeline"]', '6 months');
    await page.check('[data-testid="goal-mentor-found"]');
    await page.check('[data-testid="goal-internship-secured"]');
    
    await page.click('[data-testid="save-goals"]');
    await expect(page.locator('[data-testid="goals-saved"]')).toBeVisible();
    
    // Step 12: Alumni network engagement
    await page.click('[data-testid="alumni-network-tab"]');
    await expect(page.locator('[data-testid="alumni-directory"]')).toBeVisible();
    
    // Search alumni by industry
    await page.selectOption('[data-testid="alumni-industry-filter"]', 'technology');
    await page.fill('[data-testid="alumni-company-search"]', 'Google');
    
    await expect(page.locator('[data-testid="alumni-results"]')).toBeVisible();
    
    // Connect with alumnus
    const alumnus = page.locator('[data-testid="alumni-profile"]').first();
    await alumnus.locator('[data-testid="connect-alumni"]').click();
    
    await page.fill('[data-testid="alumni-message"]', 'Hello! I\'m a current business student at University of Test, interested in tech product management. Would love to learn about your career journey at Google.');
    await page.click('[data-testid="send-alumni-request"]');
    
    await expect(page.locator('[data-testid="alumni-request-sent"]')).toBeVisible();
    
    // Attend alumni events
    await page.click('[data-testid="alumni-events"]');
    const alumniEvent = page.locator('[data-testid="alumni-event"]').first();
    await alumniEvent.locator('[data-testid="register-event"]').click();
    
    await page.fill('[data-testid="registration-motivation"]', 'Looking to learn about career paths in product management and build connections in the tech industry.');
    await page.click('[data-testid="complete-registration"]');
    
    await expect(page.locator('[data-testid="event-registered"]')).toBeVisible();
  });

  test('handles advanced networking features and relationship management', async ({ page }) => {
    await completeProfileSetup(page);
    await page.goto('/profile/networking');
    
    // Test networking analytics and insights
    await page.click('[data-testid="networking-analytics"]');
    await expect(page.locator('[data-testid="network-growth-chart"]')).toBeVisible();
    await expect(page.locator('[data-testid="connection-quality-score"]')).toBeVisible();
    await expect(page.locator('[data-testid="industry-distribution"]')).toBeVisible();
    
    // Smart connection recommendations
    await page.click('[data-testid="smart-recommendations"]');
    await expect(page.locator('[data-testid="ai-powered-suggestions"]')).toBeVisible();
    
    const smartSuggestion = page.locator('[data-testid="smart-suggestion"]').first();
    await expect(smartSuggestion.locator('[data-testid="recommendation-reason"]')).toContainText('Similar career interests');
    
    // Connection strength indicator
    await expect(smartSuggestion.locator('[data-testid="potential-connection-strength"]')).toHaveText('High');
    
    // Network visualization
    await page.click('[data-testid="network-visualization"]');
    await expect(page.locator('[data-testid="network-graph"]')).toBeVisible();
    
    // Interactive network exploration
    await page.click('[data-testid="network-node"]');
    await expect(page.locator('[data-testid="connection-details-popup"]')).toBeVisible();
    
    // Find connection paths
    await page.click('[data-testid="find-connection-path"]');
    await page.fill('[data-testid="target-person-search"]', 'Sarah Johnson');
    await page.click('[data-testid="find-path"]');
    
    await expect(page.locator('[data-testid="connection-path"]')).toBeVisible();
    await expect(page.locator('[data-testid="path-length"]')).toHaveText('2 degrees of separation');
  });

  test('handles profile accessibility and inclusive networking', async ({ page }) => {
    await page.goto('/profile');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="profile-navigation"]')).toBeFocused();
    
    // Test screen reader support
    await expect(page.locator('[data-testid="profile-header"]')).toHaveAttribute('role', 'banner');
    await expect(page.locator('[data-testid="profile-main"]')).toHaveAttribute('role', 'main');
    
    // Test inclusive language and diversity features
    await page.click('[data-testid="diversity-settings"]');
    await page.check('[data-testid="show-pronouns"]');
    await page.fill('[data-testid="pronouns-input"]', 'they/them');
    
    await page.check('[data-testid="diversity-seeking-mentor"]');
    await page.selectOption('[data-testid="diversity-background"]', 'first-generation-college');
    
    await page.click('[data-testid="save-diversity-settings"]');
    await expect(page.locator('[data-testid="diversity-saved"]')).toBeVisible();
    
    // Accessibility features for networking
    await page.click('[data-testid="accessibility-preferences"]');
    await page.check('[data-testid="prefer-text-communication"]');
    await page.check('[data-testid="virtual-meeting-preference"]');
    await page.selectOption('[data-testid="communication-style"]', 'detailed-written');
    
    await page.click('[data-testid="save-accessibility-preferences"]');
    
    // Test high contrast mode
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page.locator('[data-testid="profile-container"]')).toHaveClass(/high-contrast/);
  });
});