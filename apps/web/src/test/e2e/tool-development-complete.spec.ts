import { test, expect, Page } from '@playwright/test';

const mockToolCreator = {
  displayName: 'Alex Developer',
  handle: 'alexdev',
  email: 'alex@university.edu',
  school: 'University of Test',
  major: 'Computer Science'
};

const mockToolData = {
  name: 'Grade Calculator Pro',
  description: 'Advanced grade calculator with weighted categories and GPA tracking',
  category: 'academic',
  tags: ['calculator', 'grades', 'gpa', 'academic'],
  visibility: 'public',
  features: ['grade-tracking', 'gpa-calculation', 'weight-categories']
};

async function loginAsToolCreator(page: Page) {
  await page.goto('/auth/login');
  await page.fill('[data-testid="email-input"]', mockToolCreator.email);
  await page.click('[data-testid="send-magic-link-button"]');
  
  // Simulate magic link verification (existing user)
  await page.goto('/auth/verify?token=existing-user-token&email=' + encodeURIComponent(mockToolCreator.email));
  await expect(page).toHaveURL('/dashboard');
}

async function fillToolBasicInfo(page: Page) {
  await page.fill('[data-testid="tool-name-input"]', mockToolData.name);
  await page.fill('[data-testid="tool-description-textarea"]', mockToolData.description);
  await page.selectOption('[data-testid="tool-category-select"]', mockToolData.category);
  
  // Add tags
  for (const tag of mockToolData.tags) {
    await page.fill('[data-testid="tag-input"]', tag);
    await page.keyboard.press('Enter');
  }
  
  await page.selectOption('[data-testid="visibility-select"]', mockToolData.visibility);
}

test.describe('Tool Development Complete E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await loginAsToolCreator(page);
  });

  test('completes full tool creation and development workflow', async ({ page }) => {
    // Step 1: Navigate to tool creation
    await page.click('[data-testid="create-button"]');
    await page.click('[data-testid="create-tool-option"]');
    
    await expect(page).toHaveURL('/tools/create');
    await expect(page.locator('[data-testid="tool-creation-wizard"]')).toBeVisible();
    
    // Step 2: Basic Information
    await expect(page.locator('[data-testid="step-indicator"]')).toHaveText('Step 1 of 6');
    await expect(page.locator('[data-testid="basic-info-step"]')).toBeVisible();
    
    await fillToolBasicInfo(page);
    
    // Verify real-time validation
    await expect(page.locator('[data-testid="name-available"]')).toBeVisible();
    await expect(page.locator('[data-testid="tag-count"]')).toHaveText('4/10 tags');
    
    await page.click('[data-testid="next-button"]');
    
    // Step 3: Tool Template Selection
    await expect(page.locator('[data-testid="template-selection-step"]')).toBeVisible();
    await expect(page.locator('[data-testid="step-indicator"]')).toHaveText('Step 2 of 6');
    
    // Browse available templates
    await expect(page.locator('[data-testid="template-grid"]')).toBeVisible();
    
    const calculatorTemplate = page.locator('[data-testid="template-calculator"]');
    await expect(calculatorTemplate).toBeVisible();
    await calculatorTemplate.click();
    
    // Preview template
    await page.click('[data-testid="preview-template-button"]');
    await expect(page.locator('[data-testid="template-preview-modal"]')).toBeVisible();
    await expect(page.locator('[data-testid="template-features"]')).toContainText('Input validation');
    await expect(page.locator('[data-testid="template-features"]')).toContainText('Result display');
    
    await page.click('[data-testid="close-preview-modal"]');
    await page.click('[data-testid="select-template-button"]');
    await page.click('[data-testid="next-button"]');
    
    // Step 4: Tool Configuration
    await expect(page.locator('[data-testid="configuration-step"]')).toBeVisible();
    await expect(page.locator('[data-testid="step-indicator"]')).toHaveText('Step 3 of 6');
    
    // Configure tool settings
    await page.check('[data-testid="enable-data-persistence"]');
    await page.check('[data-testid="enable-sharing"]');
    await page.check('[data-testid="enable-comments"]');
    
    // Set calculation precision
    await page.fill('[data-testid="decimal-precision"]', '2');
    
    // Configure grade categories
    await page.click('[data-testid="add-category-button"]');
    await page.fill('[data-testid="category-name-0"]', 'Assignments');
    await page.fill('[data-testid="category-weight-0"]', '40');
    
    await page.click('[data-testid="add-category-button"]');
    await page.fill('[data-testid="category-name-1"]', 'Exams');
    await page.fill('[data-testid="category-weight-1"]', '60');
    
    // Verify weight calculation
    await expect(page.locator('[data-testid="total-weight"]')).toHaveText('100%');
    await expect(page.locator('[data-testid="weight-valid"]')).toBeVisible();
    
    await page.click('[data-testid="next-button"]');
    
    // Step 5: Design and Layout
    await expect(page.locator('[data-testid="design-step"]')).toBeVisible();
    await expect(page.locator('[data-testid="step-indicator"]')).toHaveText('Step 4 of 6');
    
    // Choose theme
    await page.click('[data-testid="theme-academic"]');
    await expect(page.locator('[data-testid="preview-container"]')).toHaveClass(/theme-academic/);
    
    // Customize colors
    await page.click('[data-testid="primary-color-picker"]');
    await page.fill('[data-testid="color-input"]', '#2563eb');
    await page.click('[data-testid="apply-color"]');
    
    // Layout configuration
    await page.selectOption('[data-testid="layout-select"]', 'two-column');
    await page.check('[data-testid="show-header"]');
    await page.check('[data-testid="show-footer"]');
    
    await page.click('[data-testid="next-button"]');
    
    // Step 6: Code Editor and Logic
    await expect(page.locator('[data-testid="code-editor-step"]')).toBeVisible();
    await expect(page.locator('[data-testid="step-indicator"]')).toHaveText('Step 5 of 6');
    
    // Code editor should be loaded with template
    await expect(page.locator('[data-testid="code-editor"]')).toBeVisible();
    await expect(page.locator('[data-testid="editor-tabs"]')).toBeVisible();
    
    // Check default files are created
    await expect(page.locator('[data-testid="file-tab-html"]')).toBeVisible();
    await expect(page.locator('[data-testid="file-tab-css"]')).toBeVisible();
    await expect(page.locator('[data-testid="file-tab-js"]')).toBeVisible();
    
    // Add custom calculation logic
    await page.click('[data-testid="file-tab-js"]');
    const jsEditor = page.locator('[data-testid="js-editor"]');
    
    const customCode = `
function calculateWeightedGrade(assignments, exams) {
  const assignmentAvg = assignments.reduce((sum, grade) => sum + grade, 0) / assignments.length;
  const examAvg = exams.reduce((sum, grade) => sum + grade, 0) / exams.length;
  
  return (assignmentAvg * 0.4) + (examAvg * 0.6);
}

function updateGradeDisplay() {
  const assignments = getGradesByCategory('assignments');
  const exams = getGradesByCategory('exams');
  const finalGrade = calculateWeightedGrade(assignments, exams);
  
  document.getElementById('final-grade').textContent = finalGrade.toFixed(2);
}
    `;
    
    await jsEditor.fill(customCode);
    
    // Test code functionality
    await page.click('[data-testid="test-code-button"]');
    await expect(page.locator('[data-testid="test-results"]')).toBeVisible();
    await expect(page.locator('[data-testid="test-status"]')).toHaveText('All tests passed');
    
    // Validate code quality
    await page.click('[data-testid="validate-code-button"]');
    await expect(page.locator('[data-testid="validation-results"]')).toBeVisible();
    await expect(page.locator('[data-testid="code-quality-score"]')).toContainText('95/100');
    
    await page.click('[data-testid="next-button"]');
    
    // Step 7: Preview and Testing
    await expect(page.locator('[data-testid="preview-step"]')).toBeVisible();
    await expect(page.locator('[data-testid="step-indicator"]')).toHaveText('Step 6 of 6');
    
    // Interactive preview
    await expect(page.locator('[data-testid="tool-preview"]')).toBeVisible();
    await expect(page.locator('[data-testid="preview-title"]')).toHaveText(mockToolData.name);
    
    // Test tool functionality in preview
    await page.fill('[data-testid="preview-assignment-1"]', '85');
    await page.fill('[data-testid="preview-assignment-2"]', '92');
    await page.fill('[data-testid="preview-exam-1"]', '78');
    await page.fill('[data-testid="preview-exam-2"]', '88');
    
    await page.click('[data-testid="calculate-grade-button"]');
    await expect(page.locator('[data-testid="calculated-result"]')).toHaveText('85.60');
    
    // Accessibility check
    await page.click('[data-testid="accessibility-check"]');
    await expect(page.locator('[data-testid="accessibility-score"]')).toContainText('98/100');
    await expect(page.locator('[data-testid="accessibility-issues"]')).toHaveText('0 issues found');
    
    // Performance check
    await page.click('[data-testid="performance-check"]');
    await expect(page.locator('[data-testid="performance-score"]')).toContainText('A+');
    
    // Step 8: Publication
    await page.click('[data-testid="publish-tool-button"]');
    
    // Publication options
    await expect(page.locator('[data-testid="publication-modal"]')).toBeVisible();
    
    await page.check('[data-testid="publish-to-marketplace"]');
    await page.check('[data-testid="enable-analytics"]');
    await page.check('[data-testid="allow-reviews"]');
    
    // Version information
    await page.fill('[data-testid="version-number"]', '1.0.0');
    await page.fill('[data-testid="changelog"]', 'Initial release with weighted grade calculation');
    
    await page.click('[data-testid="confirm-publish-button"]');
    
    // Step 9: Publication Success
    await expect(page.locator('[data-testid="publication-success"]')).toBeVisible();
    await expect(page.locator('[data-testid="tool-url"]')).toBeVisible();
    
    const toolUrl = await page.locator('[data-testid="tool-url"]').textContent();
    expect(toolUrl).toContain('/tools/grade-calculator-pro');
    
    // Verify tool analytics setup
    await expect(page.locator('[data-testid="analytics-enabled"]')).toBeVisible();
    await expect(page.locator('[data-testid="sharing-options"]')).toBeVisible();
    
    // Step 10: Navigate to published tool
    await page.click('[data-testid="view-published-tool"]');
    
    await expect(page).toHaveURL(/\/tools\/grade-calculator-pro/);
    await expect(page.locator('[data-testid="tool-header"]')).toBeVisible();
    await expect(page.locator('[data-testid="tool-title"]')).toHaveText(mockToolData.name);
    await expect(page.locator('[data-testid="tool-description"]')).toHaveText(mockToolData.description);
    await expect(page.locator('[data-testid="tool-creator"]')).toHaveText(`by ${mockToolCreator.displayName}`);
    
    // Verify tool features
    await expect(page.locator('[data-testid="grade-calculator"]')).toBeVisible();
    await expect(page.locator('[data-testid="assignment-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="exam-section"]')).toBeVisible();
    
    // Test published tool functionality
    await page.fill('[data-testid="assignment-grade-1"]', '90');
    await page.fill('[data-testid="assignment-grade-2"]', '85');
    await page.fill('[data-testid="exam-grade-1"]', '92');
    await page.fill('[data-testid="exam-grade-2"]', '88');
    
    await page.click('[data-testid="calculate-final-grade"]');
    
    await waitFor(async () => {
      await expect(page.locator('[data-testid="final-grade-result"]')).toHaveText('87.50');
    });
    
    // Step 11: Tool Management Dashboard
    await page.click('[data-testid="manage-tool-button"]');
    
    await expect(page).toHaveURL(/\/tools\/grade-calculator-pro\/settings/);
    await expect(page.locator('[data-testid="tool-management-dashboard"]')).toBeVisible();
    
    // Check analytics tab
    await page.click('[data-testid="analytics-tab"]');
    await expect(page.locator('[data-testid="usage-stats"]')).toBeVisible();
    await expect(page.locator('[data-testid="usage-count"]')).toHaveText('1 use');
    
    // Check reviews tab
    await page.click('[data-testid="reviews-tab"]');
    await expect(page.locator('[data-testid="reviews-section"]')).toBeVisible();
    await expect(page.locator('[data-testid="average-rating"]')).toHaveText('No ratings yet');
    
    // Check settings tab
    await page.click('[data-testid="settings-tab"]');
    await expect(page.locator('[data-testid="tool-settings"]')).toBeVisible();
    
    // Update tool settings
    await page.check('[data-testid="enable-notifications"]');
    await page.selectOption('[data-testid="privacy-level"]', 'public');
    
    await page.click('[data-testid="save-settings"]');
    await expect(page.locator('[data-testid="settings-saved"]')).toBeVisible();
  });

  test('handles tool development with collaboration features', async ({ page }) => {
    // Create tool with collaboration enabled
    await page.click('[data-testid="create-button"]');
    await page.click('[data-testid="create-tool-option"]');
    
    await fillToolBasicInfo(page);
    await page.check('[data-testid="enable-collaboration"]');
    await page.click('[data-testid="next-button"]');
    
    // Skip template selection for collaborative development
    await page.click('[data-testid="skip-template"]');
    await page.click('[data-testid="start-from-scratch"]');
    await page.click('[data-testid="next-button"]');
    
    // Set up collaboration
    await expect(page.locator('[data-testid="collaboration-step"]')).toBeVisible();
    
    // Invite collaborators
    await page.fill('[data-testid="collaborator-email"]', 'jane@university.edu');
    await page.selectOption('[data-testid="collaborator-role"]', 'editor');
    await page.click('[data-testid="invite-collaborator"]');
    
    await expect(page.locator('[data-testid="pending-invitation"]')).toContainText('jane@university.edu');
    
    // Set collaboration permissions
    await page.check('[data-testid="allow-code-editing"]');
    await page.check('[data-testid="allow-design-changes"]');
    await page.uncheck('[data-testid="allow-publishing"]');
    
    await page.click('[data-testid="next-button"]');
    
    // Collaborative code editor
    await expect(page.locator('[data-testid="collaborative-editor"]')).toBeVisible();
    await expect(page.locator('[data-testid="active-collaborators"]')).toBeVisible();
    
    // Test real-time collaboration indicator
    await expect(page.locator('[data-testid="collaboration-status"]')).toHaveText('1 active collaborator');
    
    // Version control features
    await page.click('[data-testid="version-history"]');
    await expect(page.locator('[data-testid="version-list"]')).toBeVisible();
    
    // Save as draft for collaboration
    await page.click('[data-testid="save-draft"]');
    await expect(page.locator('[data-testid="draft-saved"]')).toBeVisible();
    
    // Verify draft appears in tool management
    await page.goto('/tools');
    await page.click('[data-testid="my-tools-tab"]');
    await page.click('[data-testid="drafts-filter"]');
    
    await expect(page.locator(`[data-testid="tool-draft-${mockToolData.name}"]`)).toBeVisible();
    await expect(page.locator('[data-testid="collaboration-indicator"]')).toBeVisible();
  });

  test('handles tool development error recovery and validation', async ({ page }) => {
    await page.click('[data-testid="create-button"]');
    await page.click('[data-testid="create-tool-option"]');
    
    // Test form validation
    await page.click('[data-testid="next-button"]');
    
    await expect(page.locator('[data-testid="name-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="description-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="category-error"]')).toBeVisible();
    
    // Test duplicate name validation
    await page.fill('[data-testid="tool-name-input"]', 'Existing Tool Name');
    await page.blur('[data-testid="tool-name-input"]');
    
    await expect(page.locator('[data-testid="name-taken"]')).toBeVisible();
    await expect(page.locator('[data-testid="name-suggestions"]')).toBeVisible();
    
    // Use suggested name
    await page.click('[data-testid="suggested-name-1"]');
    await expect(page.locator('[data-testid="name-available"]')).toBeVisible();
    
    // Complete basic info
    await page.fill('[data-testid="tool-description-textarea"]', mockToolData.description);
    await page.selectOption('[data-testid="tool-category-select"]', mockToolData.category);
    
    await page.click('[data-testid="next-button"]');
    
    // Simulate network error during template loading
    await page.route('**/api/tools/templates', route => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server error' })
      });
    });
    
    // Should show error state
    await expect(page.locator('[data-testid="template-load-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="retry-templates"]')).toBeVisible();
    
    // Remove error route and retry
    await page.unroute('**/api/tools/templates');
    await page.click('[data-testid="retry-templates"]');
    
    await expect(page.locator('[data-testid="template-grid"]')).toBeVisible();
    
    // Test code validation errors
    await page.click('[data-testid="template-blank"]');
    await page.click('[data-testid="select-template-button"]');
    await page.click('[data-testid="next-button"]');
    await page.click('[data-testid="next-button"]'); // Skip configuration
    await page.click('[data-testid="next-button"]'); // Skip design
    
    // Add invalid code
    const editor = page.locator('[data-testid="js-editor"]');
    await editor.fill('invalid javascript code {{{');
    
    await page.click('[data-testid="validate-code-button"]');
    
    await expect(page.locator('[data-testid="syntax-errors"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-count"]')).toHaveText('3 errors');
    
    // Fix code
    await editor.fill('console.log("Hello, HIVE!");');
    await page.click('[data-testid="validate-code-button"]');
    
    await expect(page.locator('[data-testid="validation-success"]')).toBeVisible();
  });

  test('handles tool deployment and marketplace submission', async ({ page }) => {
    // Start with existing draft
    await page.goto('/tools');
    await page.click('[data-testid="my-tools-tab"]');
    await page.click('[data-testid="continue-draft"]'); // Continue existing draft
    
    // Complete remaining steps quickly
    await page.click('[data-testid="next-button"]'); // Skip current step
    await page.click('[data-testid="next-button"]'); // Skip to preview
    
    // Deploy to staging first
    await page.click('[data-testid="deploy-staging"]');
    
    await expect(page.locator('[data-testid="staging-deployment"]')).toBeVisible();
    await expect(page.locator('[data-testid="staging-url"]')).toBeVisible();
    
    // Test in staging environment
    const stagingUrl = await page.locator('[data-testid="staging-url"]').getAttribute('href');
    await page.goto(stagingUrl);
    
    await expect(page.locator('[data-testid="staging-banner"]')).toBeVisible();
    await expect(page.locator('[data-testid="tool-preview"]')).toBeVisible();
    
    // Go back to deployment
    await page.goBack();
    
    // Submit to marketplace
    await page.click('[data-testid="submit-marketplace"]');
    
    await expect(page.locator('[data-testid="marketplace-submission"]')).toBeVisible();
    
    // Fill marketplace details
    await page.fill('[data-testid="marketplace-title"]', mockToolData.name);
    await page.fill('[data-testid="marketplace-description"]', 'Professional grade calculator for students');
    await page.selectOption('[data-testid="target-audience"]', 'students');
    await page.selectOption('[data-testid="difficulty-level"]', 'beginner');
    
    // Add screenshots
    await page.setInputFiles('[data-testid="screenshot-upload"]', {
      name: 'screenshot.png',
      mimeType: 'image/png',
      buffer: Buffer.from('fake-screenshot-data')
    });
    
    await expect(page.locator('[data-testid="screenshot-preview"]')).toBeVisible();
    
    // Set pricing (free tool)
    await page.check('[data-testid="free-tool"]');
    
    // Submit for review
    await page.click('[data-testid="submit-for-review"]');
    
    await expect(page.locator('[data-testid="submission-success"]')).toBeVisible();
    await expect(page.locator('[data-testid="review-timeline"]')).toHaveText('Review typically takes 1-3 business days');
    
    // Check submission status
    await page.goto('/tools/submissions');
    await expect(page.locator('[data-testid="submission-status"]')).toHaveText('Under Review');
    await expect(page.locator('[data-testid="submitted-date"]')).toBeDefined();
  });
});

async function waitFor(condition: () => Promise<void>, timeout = 5000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      await condition();
      return;
    } catch {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  throw new Error('Condition not met within timeout');
}