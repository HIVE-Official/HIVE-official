import { test, expect, Page } from '@playwright/test';

const mockUser = {
  email: 'developer@university.edu',
  displayName: 'Tool Developer',
  handle: 'tooldeveloper'
};

const mockTool = {
  name: 'Grade Calculator Pro',
  description: 'Advanced GPA calculator with semester tracking and grade prediction',
  category: 'academic',
  tags: ['calculator', 'gpa', 'grades', 'academic'],
  isPublic: true
};

async function authenticateUser(page: Page) {
  await page.goto('/auth/login');
  await page.fill('[data-testid="email-input"]', mockUser.email);
  await page.click('[data-testid="send-magic-link-button"]');
  
  await page.goto('/auth/verify?token=developer-token&email=' + encodeURIComponent(mockUser.email));
  await expect(page).toHaveURL('/dashboard');
}

async function createTool(page: Page, toolData: typeof mockTool) {
  await page.click('[data-testid="create-tool-button"]');
  await expect(page.locator('[data-testid="create-tool-modal"]')).toBeVisible();
  
  await page.fill('[data-testid="tool-name-input"]', toolData.name);
  await page.fill('[data-testid="tool-description-textarea"]', toolData.description);
  await page.selectOption('[data-testid="tool-category-select"]', toolData.category);
  
  // Add tags
  for (const tag of toolData.tags) {
    await page.fill('[data-testid="tag-input"]', tag);
    await page.keyboard.press('Enter');
  }
  
  if (toolData.isPublic) {
    await page.check('[data-testid="public-tool-checkbox"]');
  }
  
  await page.click('[data-testid="create-tool-submit"]');
}

test.describe('Tools Development E2E Flow', () => {
  test.beforeEach(async ({ page }) => {
    await authenticateUser(page);
  });

  test('completes full tool development lifecycle: create → develop → test → deploy → share', async ({ page }) => {
    // Step 1: Navigate to tools and create new tool
    await page.click('[data-testid="nav-tools"]');
    await expect(page).toHaveURL('/tools');
    await expect(page.locator('[data-testid="tools-page"]')).toBeVisible();
    
    await createTool(page, mockTool);
    
    // Verify tool creation success
    await expect(page.locator('[data-testid="tool-created-toast"]')).toBeVisible();
    await expect(page.locator('text=Tool created successfully')).toBeVisible();
    
    // Should redirect to tool editor
    await expect(page).toHaveURL(/\/tools\/[a-zA-Z0-9-]+\/edit$/);
    await expect(page.locator(`text=${mockTool.name}`)).toBeVisible();
    
    // Step 2: Develop tool using code editor
    await expect(page.locator('[data-testid="code-editor"]')).toBeVisible();
    
    // Write HTML structure
    await page.click('[data-testid="html-tab"]');
    const htmlCode = `
      <div class="grade-calculator">
        <h2>Grade Calculator Pro</h2>
        <div class="input-section">
          <label for="course-name">Course Name:</label>
          <input type="text" id="course-name" placeholder="Enter course name">
          
          <label for="current-grade">Current Grade (%):</label>
          <input type="number" id="current-grade" min="0" max="100">
          
          <label for="target-grade">Target Grade (%):</label>
          <input type="number" id="target-grade" min="0" max="100">
          
          <button id="calculate-btn">Calculate Required Final</button>
        </div>
        
        <div id="results" class="results-section">
          <!-- Results will appear here -->
        </div>
      </div>
    `;
    await page.fill('[data-testid="html-editor"]', htmlCode);
    
    // Write CSS styling
    await page.click('[data-testid="css-tab"]');
    const cssCode = `
      .grade-calculator {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        font-family: 'Inter', sans-serif;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      .input-section {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-bottom: 24px;
      }
      
      label {
        font-weight: 600;
        color: #374151;
        margin-bottom: 4px;
      }
      
      input {
        padding: 12px;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.2s;
      }
      
      input:focus {
        outline: none;
        border-color: #3b82f6;
      }
      
      button {
        background: #3b82f6;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
      }
      
      button:hover {
        background: #2563eb;
      }
      
      .results-section {
        padding: 20px;
        background: #f9fafb;
        border-radius: 8px;
        border-left: 4px solid #10b981;
      }
    `;
    await page.fill('[data-testid="css-editor"]', cssCode);
    
    // Write JavaScript functionality
    await page.click('[data-testid="js-tab"]');
    const jsCode = `
      document.addEventListener('DOMContentLoaded', function() {
        const calculateBtn = document.getElementById('calculate-btn');
        const resultsDiv = document.getElementById('results');
        
        calculateBtn.addEventListener('click', function() {
          const courseName = document.getElementById('course-name').value;
          const currentGrade = parseFloat(document.getElementById('current-grade').value);
          const targetGrade = parseFloat(document.getElementById('target-grade').value);
          
          if (!courseName || isNaN(currentGrade) || isNaN(targetGrade)) {
            resultsDiv.innerHTML = '<p style="color: red;">Please fill in all fields with valid values.</p>';
            return;
          }
          
          // Assuming final exam is worth 30% and current grade represents 70%
          const finalExamWeight = 0.3;
          const currentWeight = 0.7;
          
          const requiredFinal = (targetGrade - (currentGrade * currentWeight)) / finalExamWeight;
          
          let resultHTML = '<h3>Calculation Results</h3>';
          resultHTML += '<p><strong>Course:</strong> ' + courseName + '</p>';
          resultHTML += '<p><strong>Current Grade:</strong> ' + currentGrade + '%</p>';
          resultHTML += '<p><strong>Target Grade:</strong> ' + targetGrade + '%</p>';
          
          if (requiredFinal <= 100) {
            resultHTML += '<p><strong>Required Final Exam Score:</strong> ' + Math.ceil(requiredFinal) + '%</p>';
            
            if (requiredFinal < 0) {
              resultHTML += '<p style="color: green;">Great news! You already meet your target grade!</p>';
            } else if (requiredFinal <= 60) {
              resultHTML += '<p style="color: green;">Very achievable! Keep up the good work!</p>';
            } else if (requiredFinal <= 80) {
              resultHTML += '<p style="color: orange;">Challenging but doable. Focus on your studies!</p>';
            } else {
              resultHTML += '<p style="color: red;">Very challenging. Consider extra credit opportunities.</p>';
            }
          } else {
            resultHTML += '<p style="color: red;">Unfortunately, your target grade may not be achievable with the current grade.</p>';
          }
          
          resultsDiv.innerHTML = resultHTML;
        });
      });
    `;
    await page.fill('[data-testid="js-editor"]', jsCode);
    
    // Step 3: Preview tool functionality
    await page.click('[data-testid="preview-button"]');
    await expect(page.locator('[data-testid="tool-preview"]')).toBeVisible();
    
    // Test the tool in preview mode
    await page.fill('#course-name', 'CS 101');
    await page.fill('#current-grade', '85');
    await page.fill('#target-grade', '90');
    await page.click('#calculate-btn');
    
    await expect(page.locator('#results')).toContainText('Required Final Exam Score');
    await expect(page.locator('#results')).toContainText('CS 101');
    
    // Step 4: Save and test tool
    await page.click('[data-testid="save-tool-button"]');
    await expect(page.locator('[data-testid="tool-saved-toast"]')).toBeVisible();
    
    // Run automated tests
    await page.click('[data-testid="run-tests-button"]');
    await expect(page.locator('[data-testid="test-runner"]')).toBeVisible();
    
    await expect(page.locator('[data-testid="html-validation-test"]')).toHaveText('✓ HTML validation passed');
    await expect(page.locator('[data-testid="css-validation-test"]')).toHaveText('✓ CSS validation passed');
    await expect(page.locator('[data-testid="js-syntax-test"]')).toHaveText('✓ JavaScript syntax check passed');
    await expect(page.locator('[data-testid="accessibility-test"]')).toHaveText('✓ Basic accessibility check passed');
    
    // Step 5: Deploy tool
    await page.click('[data-testid="deploy-button"]');
    await expect(page.locator('[data-testid="deploy-modal"]')).toBeVisible();
    
    await page.selectOption('[data-testid="deployment-environment"]', 'production');
    await page.fill('[data-testid="version-notes"]', 'Initial release of Grade Calculator Pro with final exam calculation');
    await page.click('[data-testid="confirm-deploy-button"]');
    
    await expect(page.locator('[data-testid="deployment-progress"]')).toBeVisible();
    await expect(page.locator('[data-testid="deploying-status"]')).toBeVisible();
    
    // Wait for deployment to complete
    await expect(page.locator('[data-testid="deployment-success"]')).toBeVisible({ timeout: 30000 });
    await expect(page.locator('[data-testid="tool-url"]')).toBeVisible();
    
    // Step 6: Share tool with community
    await page.click('[data-testid="share-tool-button"]');
    await expect(page.locator('[data-testid="share-modal"]')).toBeVisible();
    
    // Share to HIVE community
    await page.check('[data-testid="share-to-hive"]');
    await page.fill('[data-testid="share-message"]', 'Just created a comprehensive grade calculator! Perfect for tracking your academic progress.');
    
    // Share to specific spaces
    await page.check('[data-testid="share-to-spaces"]');
    await page.click('[data-testid="select-spaces-button"]');
    await page.check('[data-testid="space-cs-study-group"]');
    await page.check('[data-testid="space-academic-tools"]');
    
    await page.click('[data-testid="publish-share-button"]');
    await expect(page.locator('[data-testid="tool-shared-toast"]')).toBeVisible();
    
    // Step 7: Monitor tool analytics
    await page.click('[data-testid="analytics-tab"]');
    await expect(page.locator('[data-testid="tool-analytics"]')).toBeVisible();
    
    await expect(page.locator('[data-testid="deployment-status"]')).toHaveText('Live');
    await expect(page.locator('[data-testid="tool-views"]')).toBeVisible();
    await expect(page.locator('[data-testid="unique-users"]')).toBeVisible();
    await expect(page.locator('[data-testid="usage-trend"]')).toBeVisible();
  });

  test('handles collaborative tool development', async ({ page }) => {
    // Create tool and enable collaboration
    await page.goto('/tools');
    await createTool(page, { ...mockTool, name: 'Collaborative Study Planner' });
    
    await page.click('[data-testid="collaboration-settings"]');
    await expect(page.locator('[data-testid="collaboration-modal"]')).toBeVisible();
    
    // Add collaborators
    await page.fill('[data-testid="collaborator-email"]', 'collaborator1@university.edu');
    await page.selectOption('[data-testid="collaborator-role"]', 'editor');
    await page.click('[data-testid="add-collaborator-button"]');
    
    await expect(page.locator('[data-testid="collaborator-added-toast"]')).toBeVisible();
    
    // Verify collaborator permissions
    await expect(page.locator('[data-testid="collaborators-list"]')).toContainText('collaborator1@university.edu');
    await expect(page.locator('[data-testid="collaborator-role-badge"]')).toHaveText('Editor');
    
    // Test version control features
    await page.click('[data-testid="version-history-tab"]');
    await expect(page.locator('[data-testid="version-history"]')).toBeVisible();
    
    // Create a new version
    await page.click('[data-testid="html-tab"]');
    await page.fill('[data-testid="html-editor"]', '<div>Updated HTML content</div>');
    await page.click('[data-testid="commit-changes-button"]');
    
    await page.fill('[data-testid="commit-message"]', 'Updated HTML structure for better accessibility');
    await page.click('[data-testid="confirm-commit-button"]');
    
    await expect(page.locator('[data-testid="version-committed-toast"]')).toBeVisible();
    
    // Verify version appears in history
    await expect(page.locator('[data-testid="latest-commit"]')).toContainText('Updated HTML structure');
    
    // Test branch management
    await page.click('[data-testid="create-branch-button"]');
    await page.fill('[data-testid="branch-name"]', 'feature/enhanced-ui');
    await page.click('[data-testid="create-branch-submit"]');
    
    await expect(page.locator('[data-testid="branch-created-toast"]')).toBeVisible();
    await expect(page.locator('[data-testid="current-branch"]')).toHaveText('feature/enhanced-ui');
  });

  test('validates tool code and provides development assistance', async ({ page }) => {
    await page.goto('/tools');
    await createTool(page, mockTool);
    
    // Test syntax error detection
    await page.click('[data-testid="js-tab"]');
    await page.fill('[data-testid="js-editor"]', 'const invalid = function( {'); // Invalid syntax
    
    await expect(page.locator('[data-testid="syntax-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-message"]')).toContainText('Unexpected token');
    
    // Test code suggestions
    await page.fill('[data-testid="js-editor"]', 'document.getElementBy');
    await page.keyboard.press('Control+Space'); // Trigger autocomplete
    
    await expect(page.locator('[data-testid="autocomplete-suggestions"]')).toBeVisible();
    await expect(page.locator('[data-testid="suggestion-getElementById"]')).toBeVisible();
    
    // Test security scanning
    await page.fill('[data-testid="js-editor"]', 'eval(userInput); // Dangerous code');
    await page.click('[data-testid="security-scan-button"]');
    
    await expect(page.locator('[data-testid="security-warning"]')).toBeVisible();
    await expect(page.locator('[data-testid="security-issue"]')).toContainText('Use of eval() detected');
    
    // Test performance analysis
    await page.fill('[data-testid="js-editor"]', `
      for (let i = 0; i < 1000000; i++) {
        document.getElementById('test');
      }
    `);
    await page.click('[data-testid="performance-check-button"]');
    
    await expect(page.locator('[data-testid="performance-warning"]')).toBeVisible();
    await expect(page.locator('[data-testid="performance-suggestion"]')).toContainText('Cache DOM queries');
  });

  test('handles tool marketplace and discovery', async ({ page }) => {
    await page.goto('/tools');
    
    // Browse marketplace
    await page.click('[data-testid="browse-marketplace"]');
    await expect(page.locator('[data-testid="marketplace"]')).toBeVisible();
    
    // Filter tools by category
    await page.selectOption('[data-testid="category-filter"]', 'academic');
    await page.click('[data-testid="apply-filters"]');
    
    await expect(page.locator('[data-testid="filtered-tools"]')).toBeVisible();
    
    // Search for specific tools
    await page.fill('[data-testid="tool-search"]', 'calculator');
    await page.keyboard.press('Enter');
    
    await expect(page.locator('[data-testid="search-results"]')).toBeVisible();
    
    // View tool details
    const toolCard = page.locator('[data-testid="tool-card"]').first();
    await toolCard.click();
    
    await expect(page.locator('[data-testid="tool-details-modal"]')).toBeVisible();
    await expect(page.locator('[data-testid="tool-preview-iframe"]')).toBeVisible();
    await expect(page.locator('[data-testid="tool-rating"]')).toBeVisible();
    await expect(page.locator('[data-testid="tool-reviews"]')).toBeVisible();
    
    // Install/use tool
    await page.click('[data-testid="use-tool-button"]');
    await expect(page.locator('[data-testid="tool-usage-toast"]')).toBeVisible();
    
    // Rate and review tool
    await page.click('[data-testid="rate-tool-button"]');
    await page.click('[data-testid="5-star-rating"]');
    await page.fill('[data-testid="review-text"]', 'Excellent tool! Very helpful for grade calculations.');
    await page.click('[data-testid="submit-review"]');
    
    await expect(page.locator('[data-testid="review-submitted-toast"]')).toBeVisible();
  });

  test('supports tool analytics and performance monitoring', async ({ page }) => {
    // Navigate to existing tool analytics
    await page.goto('/tools/my-tool-id/analytics');
    
    // Verify analytics dashboard
    await expect(page.locator('[data-testid="analytics-dashboard"]')).toBeVisible();
    
    // Check usage metrics
    await expect(page.locator('[data-testid="total-views"]')).toBeVisible();
    await expect(page.locator('[data-testid="unique-users"]')).toBeVisible();
    await expect(page.locator('[data-testid="avg-session-duration"]')).toBeVisible();
    
    // View detailed usage charts
    await page.click('[data-testid="usage-chart-tab"]');
    await expect(page.locator('[data-testid="usage-over-time-chart"]')).toBeVisible();
    
    // Check performance metrics
    await page.click('[data-testid="performance-tab"]');
    await expect(page.locator('[data-testid="load-time-metric"]')).toBeVisible();
    await expect(page.locator('[data-testid="error-rate-metric"]')).toBeVisible();
    
    // View user feedback
    await page.click('[data-testid="feedback-tab"]');
    await expect(page.locator('[data-testid="user-reviews"]')).toBeVisible();
    await expect(page.locator('[data-testid="rating-breakdown"]')).toBeVisible();
    
    // Export analytics data
    await page.click('[data-testid="export-data-button"]');
    await page.selectOption('[data-testid="export-format"]', 'csv');
    await page.selectOption('[data-testid="date-range"]', '30days');
    await page.click('[data-testid="download-export"]');
    
    await expect(page.locator('[data-testid="export-started-toast"]')).toBeVisible();
  });

  test('handles tool versioning and deployment management', async ({ page }) => {
    await page.goto('/tools/my-tool-id/settings');
    
    // Create new version
    await page.click('[data-testid="versions-tab"]');
    await page.click('[data-testid="create-version-button"]');
    
    await page.selectOption('[data-testid="version-type"]', 'minor');
    await page.fill('[data-testid="version-notes"]', 'Added new calculation features and improved UI');
    await page.click('[data-testid="create-version-submit"]');
    
    await expect(page.locator('[data-testid="version-created-toast"]')).toBeVisible();
    
    // Deploy specific version
    await page.click('[data-testid="deploy-version-button"]');
    await expect(page.locator('[data-testid="deployment-modal"]')).toBeVisible();
    
    await page.check('[data-testid="run-tests-before-deploy"]');
    await page.check('[data-testid="gradual-rollout"]');
    await page.fill('[data-testid="rollout-percentage"]', '25');
    
    await page.click('[data-testid="start-deployment"]');
    await expect(page.locator('[data-testid="deployment-started-toast"]')).toBeVisible();
    
    // Monitor deployment progress
    await expect(page.locator('[data-testid="deployment-progress-bar"]')).toBeVisible();
    await expect(page.locator('[data-testid="deployment-logs"]')).toBeVisible();
    
    // Rollback if needed
    await page.click('[data-testid="rollback-button"]');
    await expect(page.locator('[data-testid="rollback-confirmation"]')).toBeVisible();
    
    await page.fill('[data-testid="rollback-reason"]', 'Performance issues detected');
    await page.click('[data-testid="confirm-rollback"]');
    
    await expect(page.locator('[data-testid="rollback-completed-toast"]')).toBeVisible();
  });

  test('provides accessibility features for tool development', async ({ page }) => {
    await page.goto('/tools');
    await createTool(page, mockTool);
    
    // Test keyboard navigation in editor
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="html-tab"]')).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="css-tab"]')).toBeFocused();
    
    // Test screen reader support
    await expect(page.locator('[data-testid="html-editor"]')).toHaveAttribute('aria-label', 'HTML code editor');
    await expect(page.locator('[data-testid="preview-button"]')).toHaveAttribute('aria-describedby');
    
    // Test high contrast mode
    await page.click('[data-testid="accessibility-settings"]');
    await page.check('[data-testid="high-contrast-mode"]');
    
    await expect(page.locator('[data-testid="code-editor"]')).toHaveClass(/high-contrast/);
    
    // Test accessibility checker for tool content
    await page.click('[data-testid="accessibility-check-button"]');
    await expect(page.locator('[data-testid="accessibility-report"]')).toBeVisible();
    
    await expect(page.locator('[data-testid="alt-text-check"]')).toBeVisible();
    await expect(page.locator('[data-testid="color-contrast-check"]')).toBeVisible();
    await expect(page.locator('[data-testid="keyboard-navigation-check"]')).toBeVisible();
  });
});