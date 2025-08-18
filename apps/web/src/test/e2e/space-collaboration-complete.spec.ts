import { test, expect, Page } from '@playwright/test';

const mockSpaceCreator = {
  displayName: 'Dr. Jennifer Wilson',
  handle: 'drwilson',
  email: 'jennifer.wilson@university.edu',
  role: 'faculty',
  department: 'Computer Science'
};

const mockSpaceData = {
  name: 'CS 101 Study Group',
  description: 'Collaborative space for Computer Science 101 students to share resources, ask questions, and work on assignments together.',
  type: 'study_group',
  privacy: 'invite_only',
  category: 'academic',
  tags: ['computer-science', 'programming', 'study-group', 'cs101']
};

const mockMembers = [
  {
    displayName: 'Alex Student',
    handle: 'alexstudent',
    email: 'alex@university.edu',
    role: 'student'
  },
  {
    displayName: 'Maria Coder',
    handle: 'mariacoder',
    email: 'maria@university.edu',
    role: 'student'
  }
];

async function loginAsSpaceCreator(page: Page) {
  await page.goto('/auth/login');
  await page.fill('[data-testid="email-input"]', mockSpaceCreator.email);
  await page.click('[data-testid="send-magic-link-button"]');
  
  await page.goto('/auth/verify?token=faculty-user-token&email=' + encodeURIComponent(mockSpaceCreator.email));
  await expect(page).toHaveURL('/dashboard');
}

async function createSpace(page: Page, spaceData = mockSpaceData) {
  await page.click('[data-testid="create-button"]');
  await page.click('[data-testid="create-space-option"]');
  
  await expect(page).toHaveURL('/spaces/create');
  
  // Basic information
  await page.fill('[data-testid="space-name-input"]', spaceData.name);
  await page.fill('[data-testid="space-description-textarea"]', spaceData.description);
  await page.selectOption('[data-testid="space-type-select"]', spaceData.type);
  await page.selectOption('[data-testid="privacy-select"]', spaceData.privacy);
  await page.selectOption('[data-testid="category-select"]', spaceData.category);
  
  // Add tags
  for (const tag of spaceData.tags) {
    await page.fill('[data-testid="tag-input"]', tag);
    await page.keyboard.press('Enter');
  }
}

test.describe('Space Collaboration Complete E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsSpaceCreator(page);
  });

  test('completes comprehensive space creation and management workflow', async ({ page }) => {
    // Step 1: Create new space
    await createSpace(page);
    
    // Step 2: Configure space settings
    await page.click('[data-testid="next-step-button"]');
    await expect(page.locator('[data-testid="space-settings-step"]')).toBeVisible();
    
    // Enable features
    await page.check('[data-testid="enable-discussions"]');
    await page.check('[data-testid="enable-file-sharing"]');
    await page.check('[data-testid="enable-calendar"]');
    await page.check('[data-testid="enable-tool-sharing"]');
    await page.check('[data-testid="enable-real-time-chat"]');
    
    // Configure permissions
    await page.selectOption('[data-testid="posting-permission"]', 'members');
    await page.selectOption('[data-testid="invitation-permission"]', 'moderators');
    await page.check('[data-testid="require-approval"]');
    
    // Set moderation rules
    await page.check('[data-testid="auto-moderate"]');
    await page.selectOption('[data-testid="moderation-level"]', 'medium');
    
    await page.click('[data-testid="next-step-button"]');
    
    // Step 3: Space appearance and branding
    await expect(page.locator('[data-testid="appearance-step"]')).toBeVisible();
    
    // Upload space banner
    await page.setInputFiles('[data-testid="banner-upload"]', {
      name: 'space-banner.jpg',
      mimeType: 'image/jpeg',
      buffer: Buffer.from('fake-banner-data')
    });
    
    await expect(page.locator('[data-testid="banner-preview"]')).toBeVisible();
    
    // Choose color scheme
    await page.click('[data-testid="color-scheme-academic"]');
    await expect(page.locator('[data-testid="preview-container"]')).toHaveClass(/academic-theme/);
    
    // Custom color accent
    await page.click('[data-testid="custom-accent-color"]');
    await page.fill('[data-testid="accent-color-input"]', '#1e40af');
    
    await page.click('[data-testid="next-step-button"]');
    
    // Step 4: Initial member invitations
    await expect(page.locator('[data-testid="invitations-step"]')).toBeVisible();
    
    // Invite individual members
    await page.fill('[data-testid="invite-email-input"]', mockMembers[0].email);
    await page.selectOption('[data-testid="member-role-select"]', 'member');
    await page.fill('[data-testid="invitation-message"]', 'Welcome to our CS 101 study group! Looking forward to collaborating.');
    await page.click('[data-testid="send-invitation"]');
    
    await expect(page.locator('[data-testid="invitation-sent"]')).toContainText(mockMembers[0].email);
    
    // Bulk invite via CSV
    await page.click('[data-testid="bulk-invite-tab"]');
    await page.setInputFiles('[data-testid="csv-upload"]', {
      name: 'members.csv',
      mimeType: 'text/csv',
      buffer: Buffer.from('email,role\nmaria@university.edu,member\njohn@university.edu,member')
    });
    
    await expect(page.locator('[data-testid="csv-preview"]')).toBeVisible();
    await expect(page.locator('[data-testid="invite-count"]')).toHaveText('2 invitations ready');
    
    await page.click('[data-testid="send-bulk-invitations"]');
    await expect(page.locator('[data-testid="bulk-invitations-sent"]')).toBeVisible();
    
    await page.click('[data-testid="create-space-button"]');
    
    // Step 5: Space creation success
    await expect(page.locator('[data-testid="space-created"]')).toBeVisible();
    await expect(page.locator('[data-testid="space-url"]')).toBeVisible();
    
    const spaceUrl = await page.locator('[data-testid="space-url"]').textContent();
    expect(spaceUrl).toContain('/spaces/cs-101-study-group');
    
    await page.click('[data-testid="enter-space"]');
    
    // Step 6: Initial space setup
    await expect(page).toHaveURL(/\/spaces\/cs-101-study-group/);
    await expect(page.locator('[data-testid="space-header"]')).toBeVisible();
    await expect(page.locator('[data-testid="space-title"]')).toHaveText(mockSpaceData.name);
    await expect(page.locator('[data-testid="space-description"]')).toHaveText(mockSpaceData.description);
    
    // Create welcome post
    await page.click('[data-testid="create-welcome-post"]');
    await page.fill('[data-testid="welcome-post-content"]', 'Welcome everyone to our CS 101 study group! Please introduce yourselves and share what topics you\'d like to focus on.');
    await page.check('[data-testid="pin-post"]');
    await page.click('[data-testid="publish-welcome-post"]');
    
    await expect(page.locator('[data-testid="pinned-post"]')).toBeVisible();
    await expect(page.locator('[data-testid="pinned-post"]')).toContainText('Welcome everyone to our CS 101 study group');
    
    // Step 7: Set up space sections and organization
    await page.click('[data-testid="organize-space-button"]');
    await expect(page.locator('[data-testid="space-organization-modal"]')).toBeVisible();
    
    // Create sections
    await page.click('[data-testid="add-section"]');
    await page.fill('[data-testid="section-name"]', 'General Discussion');
    await page.fill('[data-testid="section-description"]', 'General questions and discussions about the course');
    await page.click('[data-testid="create-section"]');
    
    await page.click('[data-testid="add-section"]');
    await page.fill('[data-testid="section-name"]', 'Assignment Help');
    await page.fill('[data-testid="section-description"]', 'Get help with assignments and projects');
    await page.click('[data-testid="create-section"]');
    
    await page.click('[data-testid="add-section"]');
    await page.fill('[data-testid="section-name"]', 'Resources');
    await page.fill('[data-testid="section-description"]', 'Shared study materials and useful links');
    await page.click('[data-testid="create-section"]');
    
    await page.click('[data-testid="save-organization"]');
    
    // Verify sections appear
    await expect(page.locator('[data-testid="space-section"][data-section="general-discussion"]')).toBeVisible();
    await expect(page.locator('[data-testid="space-section"][data-section="assignment-help"]')).toBeVisible();
    await expect(page.locator('[data-testid="space-section"][data-section="resources"]')).toBeVisible();
    
    // Step 8: Member management and role assignment
    await page.click('[data-testid="manage-members-button"]');
    await expect(page.locator('[data-testid="member-management-modal"]')).toBeVisible();
    
    // Check pending invitations
    await page.click('[data-testid="pending-invitations-tab"]');
    await expect(page.locator('[data-testid="pending-invitation"]')).toHaveCount(3);
    
    // Simulate member joining (accept invitation)
    const firstInvitation = page.locator('[data-testid="pending-invitation"]').first();
    await firstInvitation.locator('[data-testid="simulate-accept"]').click(); // Test simulation
    
    await expect(page.locator('[data-testid="member-joined"]')).toBeVisible();
    
    // Assign member roles
    await page.click('[data-testid="active-members-tab"]');
    const newMember = page.locator('[data-testid="member-row"]').first();
    await newMember.locator('[data-testid="change-role-button"]').click();
    await page.selectOption('[data-testid="role-select"]', 'moderator');
    await page.click('[data-testid="update-role"]');
    
    await expect(newMember.locator('[data-testid="member-role"]')).toHaveText('Moderator');
    
    await page.click('[data-testid="close-member-management"]');
    
    // Step 9: Content creation and collaboration
    // Create discussion post in specific section
    await page.click('[data-testid="space-section"][data-section="general-discussion"]');
    await page.click('[data-testid="create-post-in-section"]');
    
    await page.fill('[data-testid="post-title"]', 'Introduction to Variables and Data Types');
    await page.fill('[data-testid="post-content"]', 'Let\'s discuss the fundamental concepts of variables and data types in programming. What are some common mistakes beginners make?');
    await page.selectOption('[data-testid="post-type"]', 'discussion');
    await page.click('[data-testid="publish-post"]');
    
    await expect(page.locator('[data-testid="discussion-post"]')).toBeVisible();
    await expect(page.locator('[data-testid="post-title"]')).toHaveText('Introduction to Variables and Data Types');
    
    // Share a resource
    await page.click('[data-testid="space-section"][data-section="resources"]');
    await page.click('[data-testid="share-resource-button"]');
    
    await page.selectOption('[data-testid="resource-type"]', 'link');
    await page.fill('[data-testid="resource-url"]', 'https://docs.python.org/3/tutorial/');
    await page.fill('[data-testid="resource-title"]', 'Python Official Tutorial');
    await page.fill('[data-testid="resource-description"]', 'Comprehensive Python tutorial covering all basics');
    await page.click('[data-testid="share-resource"]');
    
    await expect(page.locator('[data-testid="shared-resource"]')).toBeVisible();
    await expect(page.locator('[data-testid="resource-title"]')).toHaveText('Python Official Tutorial');
    
    // Upload file resource
    await page.click('[data-testid="share-resource-button"]');
    await page.selectOption('[data-testid="resource-type"]', 'file');
    await page.setInputFiles('[data-testid="file-upload"]', {
      name: 'study-guide.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('fake-pdf-data')
    });
    await page.fill('[data-testid="file-description"]', 'Study guide for midterm exam');
    await page.click('[data-testid="upload-file"]');
    
    await expect(page.locator('[data-testid="file-resource"]')).toBeVisible();
    
    // Step 10: Real-time collaboration features
    // Test real-time chat
    await page.click('[data-testid="open-chat-button"]');
    await expect(page.locator('[data-testid="chat-panel"]')).toBeVisible();
    
    await page.fill('[data-testid="chat-input"]', 'Hello everyone! Ready for today\'s study session?');
    await page.keyboard.press('Enter');
    
    await expect(page.locator('[data-testid="chat-message"]')).toContainText('Hello everyone!');
    await expect(page.locator('[data-testid="message-author"]')).toHaveText(mockSpaceCreator.displayName);
    
    // Test online presence
    await expect(page.locator('[data-testid="online-members"]')).toBeVisible();
    await expect(page.locator('[data-testid="online-count"]')).toHaveText('2 online');
    
    // Step 11: Calendar and event management
    await page.click('[data-testid="space-calendar-tab"]');
    await expect(page.locator('[data-testid="space-calendar"]')).toBeVisible();
    
    // Create study session event
    await page.click('[data-testid="create-event-button"]');
    await page.fill('[data-testid="event-title"]', 'Study Session: Functions and Loops');
    await page.fill('[data-testid="event-description"]', 'Group study session focusing on functions and loop structures');
    
    // Set date and time
    await page.fill('[data-testid="event-date"]', '2024-08-15');
    await page.fill('[data-testid="event-start-time"]', '14:00');
    await page.fill('[data-testid="event-end-time"]', '16:00');
    
    // Set location
    await page.selectOption('[data-testid="event-location-type"]', 'virtual');
    await page.fill('[data-testid="event-link"]', 'https://zoom.us/j/123456789');
    
    // Set RSVP options
    await page.check('[data-testid="require-rsvp"]');
    await page.fill('[data-testid="max-attendees"]', '15');
    
    await page.click('[data-testid="create-event"]');
    
    await expect(page.locator('[data-testid="calendar-event"]')).toBeVisible();
    await expect(page.locator('[data-testid="event-title"]')).toHaveText('Study Session: Functions and Loops');
    
    // Step 12: Space analytics and insights
    await page.click('[data-testid="space-analytics-button"]');
    await expect(page.locator('[data-testid="analytics-dashboard"]')).toBeVisible();
    
    // Check engagement metrics
    await expect(page.locator('[data-testid="member-count"]')).toContainText('4 members');
    await expect(page.locator('[data-testid="post-count"]')).toContainText('2 posts');
    await expect(page.locator('[data-testid="activity-score"]')).toBeVisible();
    
    // Check activity timeline
    await expect(page.locator('[data-testid="activity-timeline"]')).toBeVisible();
    await expect(page.locator('[data-testid="activity-item"]')).toHaveCount(5); // Space created, posts, resources, etc.
    
    // Export analytics
    await page.click('[data-testid="export-analytics"]');
    await page.selectOption('[data-testid="export-format"]', 'pdf');
    await page.selectOption('[data-testid="export-timeframe"]', '30days');
    await page.click('[data-testid="generate-report"]');
    
    await expect(page.locator('[data-testid="report-generating"]')).toBeVisible();
    
    // Step 13: Advanced space features
    // Set up automated welcome message
    await page.click('[data-testid="space-settings-button"]');
    await page.click('[data-testid="automation-tab"]');
    
    await page.check('[data-testid="enable-welcome-automation"]');
    await page.fill('[data-testid="welcome-message"]', 'Welcome to CS 101 Study Group! Please read our guidelines and introduce yourself in the General Discussion section.');
    
    // Set up content moderation rules  
    await page.check('[data-testid="enable-auto-moderation"]');
    await page.check('[data-testid="filter-spam"]');
    await page.check('[data-testid="require-approval-new-members"]');
    
    await page.click('[data-testid="save-automation-settings"]');
    
    // Create space templates for recurring content
    await page.click('[data-testid="templates-tab"]');
    await page.click('[data-testid="create-template"]');
    
    await page.fill('[data-testid="template-name"]', 'Weekly Assignment Discussion');
    await page.fill('[data-testid="template-content"]', 'This week\'s assignment: [ASSIGNMENT_NAME]\n\nQuestions to discuss:\n1. [QUESTION_1]\n2. [QUESTION_2]\n\nShare your progress and ask for help!');
    await page.click('[data-testid="save-template"]');
    
    await expect(page.locator('[data-testid="template-saved"]')).toBeVisible();
    
    // Step 14: Space collaboration with external tools
    await page.click('[data-testid="integrations-tab"]');
    
    // Connect external calendar
    await page.click('[data-testid="connect-google-calendar"]');
    // Note: In real app, this would trigger OAuth flow
    await expect(page.locator('[data-testid="calendar-integration-success"]')).toBeVisible();
    
    // Connect GitHub for code sharing
    await page.click('[data-testid="connect-github"]');
    await page.fill('[data-testid="github-repo-url"]', 'https://github.com/cs101-class/assignments');
    await page.click('[data-testid="connect-repo"]');
    
    await expect(page.locator('[data-testid="github-connected"]')).toBeVisible();
    
    // Step 15: Space visibility and discovery
    await page.click('[data-testid="visibility-tab"]');
    
    // Update space to be discoverable within school
    await page.selectOption('[data-testid="discovery-level"]', 'school');
    await page.check('[data-testid="appear-in-search"]');
    await page.check('[data-testid="suggest-to-similar-courses"]');
    
    // Set joining requirements
    await page.check('[data-testid="require-course-enrollment"]');
    await page.fill('[data-testid="course-code"]', 'CS101');
    
    await page.click('[data-testid="save-visibility-settings"]');
    
    await expect(page.locator('[data-testid="settings-saved"]')).toBeVisible();
  });

  test('handles space member interactions and collaborative workflows', async ({ page }) => {
    // Create space first
    await createSpace(page);
    await page.click('[data-testid="skip-to-creation"]'); // Skip detailed setup
    await page.click('[data-testid="create-space-button"]');
    await page.click('[data-testid="enter-space"]');
    
    // Simulate multiple members joining and interacting
    // Member 1 joins and posts
    await page.evaluate(() => {
      window.simulateMemberJoin({
        name: 'Alex Student',
        handle: 'alexstudent',
        role: 'member'
      });
    });
    
    await expect(page.locator('[data-testid="member-joined-notification"]')).toContainText('Alex Student joined');
    
    // Member posts question
    await page.evaluate(() => {
      window.simulatePostCreation({
        author: 'Alex Student',
        content: 'I\'m struggling with understanding recursion. Can someone explain it with a simple example?',
        type: 'question'
      });
    });
    
    // Check that post appears
    await expect(page.locator('[data-testid="space-post"]').first()).toContainText('struggling with understanding recursion');
    await expect(page.locator('[data-testid="question-indicator"]')).toBeVisible();
    
    // Space creator responds
    const questionPost = page.locator('[data-testid="space-post"]').first();
    await questionPost.locator('[data-testid="reply-button"]').click();
    await page.fill('[data-testid="reply-input"]', 'Great question! Recursion is when a function calls itself. Here\'s a simple factorial example: factorial(n) = n * factorial(n-1)');
    await page.click('[data-testid="post-reply"]');
    
    await expect(questionPost.locator('[data-testid="reply"]')).toContainText('Great question! Recursion is when a function');
    
    // Mark as helpful answer
    await questionPost.locator('[data-testid="mark-helpful"]').click();
    await expect(questionPost.locator('[data-testid="helpful-answer"]')).toBeVisible();
    
    // Test collaborative editing on shared document
    await page.click('[data-testid="create-collaborative-doc"]');
    await page.fill('[data-testid="doc-title"]', 'CS 101 Study Notes');
    await page.fill('[data-testid="doc-content"]', '# CS 101 Study Notes\n\n## Chapter 1: Introduction to Programming\n\n');
    await page.check('[data-testid="enable-collaborative-editing"]');
    await page.click('[data-testid="create-doc"]');
    
    await expect(page.locator('[data-testid="collaborative-doc"]')).toBeVisible();
    
    // Simulate real-time collaborative editing
    await page.evaluate(() => {
      window.simulateCollaborativeEdit({
        user: 'Alex Student',
        position: 50,
        content: 'Variables are containers for storing data values.\n\n'
      });
    });
    
    // Should see real-time update
    await expect(page.locator('[data-testid="doc-content"]')).toContainText('Variables are containers for storing data values');
    await expect(page.locator('[data-testid="edit-indicator"]')).toContainText('Alex Student is editing');
    
    // Add comment to document
    await page.locator('[data-testid="doc-content"]').click({ position: { x: 100, y: 100 } });
    await page.click('[data-testid="add-comment"]');
    await page.fill('[data-testid="comment-text"]', 'Should we add more examples here?');
    await page.click('[data-testid="post-comment"]');
    
    await expect(page.locator('[data-testid="doc-comment"]')).toContainText('Should we add more examples here?');
  });

  test('handles space moderation and community management', async ({ page }) => {
    await createSpace(page);
    await page.click('[data-testid="skip-to-creation"]');
    await page.click('[data-testid="create-space-button"]');
    await page.click('[data-testid="enter-space"]');
    
    // Create content that needs moderation
    await page.evaluate(() => {
      window.simulatePostCreation({
        author: 'Suspicious User',
        content: 'Check out this amazing deal! Buy now at suspicious-link.com',
        type: 'spam'
      });
    });
    
    // Should trigger moderation
    await expect(page.locator('[data-testid="moderation-alert"]')).toBeVisible();
    await expect(page.locator('[data-testid="flagged-post"]')).toBeVisible();
    
    // Review flagged content
    await page.click('[data-testid="review-flagged-content"]');
    await expect(page.locator('[data-testid="moderation-panel"]')).toBeVisible();
    
    const flaggedPost = page.locator('[data-testid="flagged-post-item"]').first();
    await expect(flaggedPost).toContainText('suspicious-link.com');
    
    // Take moderation action
    await flaggedPost.locator('[data-testid="moderation-actions"]').click();
    await page.click('[data-testid="remove-post"]');
    await page.fill('[data-testid="removal-reason"]', 'Spam content with suspicious external links');
    await page.click('[data-testid="confirm-removal"]');
    
    await expect(page.locator('[data-testid="post-removed"]')).toBeVisible();
    
    // Warn the user
    await page.click('[data-testid="warn-user"]');
    await page.fill('[data-testid="warning-message"]', 'Please avoid posting promotional content or suspicious links. Review our community guidelines.');
    await page.click('[data-testid="send-warning"]');
    
    await expect(page.locator('[data-testid="warning-sent"]')).toBeVisible();
    
    // Set up automated moderation rules
    await page.click('[data-testid="moderation-settings"]');
    await page.click('[data-testid="auto-rules-tab"]');
    
    await page.click('[data-testid="add-rule"]');
    await page.fill('[data-testid="rule-name"]', 'Block External Links');
    await page.selectOption('[data-testid="rule-trigger"]', 'contains_external_links');
    await page.selectOption('[data-testid="rule-action"]', 'flag_for_review');
    await page.check('[data-testid="rule-enabled"]');
    
    await page.click('[data-testid="save-rule"]');
    await expect(page.locator('[data-testid="rule-saved"]')).toBeVisible();
  });

  test('handles space accessibility and inclusive design', async ({ page }) => {
    await createSpace(page);
    await page.click('[data-testid="skip-to-creation"]');
    await page.click('[data-testid="create-space-button"]');
    await page.click('[data-testid="enter-space"]');
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="space-navigation"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="create-post-button"]')).toBeFocused();
    
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-testid="post-creation-modal"]')).toBeVisible();
    
    // Test screen reader support
    await expect(page.locator('[data-testid="space-header"]')).toHaveAttribute('role', 'banner');
    await expect(page.locator('[data-testid="space-content"]')).toHaveAttribute('role', 'main');
    await expect(page.locator('[data-testid="member-list"]')).toHaveAttribute('role', 'complementary');
    
    // Test high contrast mode
    await page.emulateMedia({ colorScheme: 'dark' });
    await expect(page.locator('[data-testid="space-container"]')).toHaveClass(/high-contrast/);
    
    // Test text scaling
    await page.addStyleTag({
      content: 'html { font-size: 150%; }'
    });
    
    // Layout should adapt to larger text
    await expect(page.locator('[data-testid="space-layout"]')).toBeVisible();
    await expect(page.locator('[data-testid="responsive-layout"]')).toHaveClass(/large-text/);
    
    // Test reduced motion preferences
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page.locator('[data-testid="animations-disabled"]')).toHaveClass(/no-animation/);
  });
});