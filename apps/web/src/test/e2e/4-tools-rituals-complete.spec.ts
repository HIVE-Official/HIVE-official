import { test, expect, Page } from '@playwright/test';

test.describe('3️⃣ TOOLS & HIVELAB + 6️⃣ RITUALS - Complete Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await mockLogin(page);
  });

  test.describe('HiveLab Visual Builder', () => {
    test('should open HiveLab builder interface', async ({ page }) => {
      await page.goto('/hivelab');
      
      // Should show builder interface
      await expect(page.locator('[data-testid="hivelab-builder"]')).toBeVisible();
      await expect(page.locator('[data-testid="element-palette"]')).toBeVisible();
      await expect(page.locator('[data-testid="canvas"]')).toBeVisible();
      await expect(page.locator('[data-testid="properties-panel"]')).toBeVisible();
    });

    test('should create a simple tool with drag-and-drop', async ({ page }) => {
      await page.goto('/hivelab/new');
      
      // Set tool name
      await page.fill('input[name="toolName"]', 'Study Buddy Finder');
      await page.fill('textarea[name="description"]', 'Find study partners for your classes');
      
      // Drag input element to canvas
      const inputElement = page.locator('[data-element="text-input"]');
      const canvas = page.locator('[data-testid="canvas"]');
      await inputElement.dragTo(canvas);
      
      // Configure input properties
      await page.click('[data-testid="element-text-input-1"]');
      await page.fill('input[name="label"]', 'Course Name');
      await page.fill('input[name="placeholder"]', 'e.g., CS 220');
      
      // Add button element
      const buttonElement = page.locator('[data-element="button"]');
      await buttonElement.dragTo(canvas);
      
      // Configure button
      await page.click('[data-testid="element-button-1"]');
      await page.fill('input[name="text"]', 'Find Partners');
      
      // Add display element
      const displayElement = page.locator('[data-element="list-display"]');
      await displayElement.dragTo(canvas);
      
      // Connect elements with logic
      await page.click('button:has-text("Logic")');
      await page.click('button:has-text("Add Connection")');
      await page.click('[data-testid="element-button-1"]');
      await page.click('[data-testid="element-list-display-1"]');
      
      // Save tool
      await page.click('button:has-text("Save Tool")');
      await expect(page.locator('text=Tool saved successfully')).toBeVisible();
    });

    test('should use Element System components', async ({ page }) => {
      await page.goto('/hivelab/new');
      
      // Test each element category
      const categories = ['Inputs', 'Displays', 'Actions', 'Logic'];
      
      for (const category of categories) {
        await page.click(`button:has-text("${category}")`);
        const elements = page.locator(`[data-category="${category.toLowerCase()}"] [data-element]`);
        await expect(elements.first()).toBeVisible();
        expect(await elements.count()).toBeGreaterThan(0);
      }
      
      // Test specific elements
      await page.click('button:has-text("Inputs")');
      await expect(page.locator('[data-element="text-input"]')).toBeVisible();
      await expect(page.locator('[data-element="dropdown"]')).toBeVisible();
      await expect(page.locator('[data-element="date-picker"]')).toBeVisible();
      await expect(page.locator('[data-element="file-upload"]')).toBeVisible();
    });

    test('should preview tool before publishing', async ({ page }) => {
      await page.goto('/hivelab/edit/test-tool-123');
      
      // Click preview
      await page.click('button:has-text("Preview")');
      
      // Should open preview modal
      await expect(page.locator('[data-testid="tool-preview"]')).toBeVisible();
      
      // Test tool functionality in preview
      await page.fill('[data-testid="preview-input"]', 'Test data');
      await page.click('[data-testid="preview-button"]');
      
      // Should show result
      await expect(page.locator('[data-testid="preview-output"]')).toBeVisible();
    });

    test('should publish tool to marketplace', async ({ page }) => {
      await page.goto('/hivelab/edit/test-tool-123');
      
      // Click publish
      await page.click('button:has-text("Publish")');
      
      // Fill marketplace details
      await page.selectOption('select[name="category"]', 'Academic');
      await page.fill('input[name="tags"]', 'study, collaboration, academic');
      await page.click('label:has-text("Free")');
      
      // Add screenshots
      const fileInput = page.locator('input[type="file"][name="screenshots"]');
      await fileInput.setInputFiles(['test-assets/tool-screenshot-1.png']);
      
      // Publish
      await page.click('button:has-text("Publish to Marketplace")');
      await expect(page.locator('text=Tool published successfully')).toBeVisible();
      
      // Should redirect to tool page
      await expect(page).toHaveURL(/\/tools\/.+/);
    });
  });

  test.describe('Tool Marketplace', () => {
    test('should browse available tools', async ({ page }) => {
      await page.goto('/tools/marketplace');
      
      // Should show tool grid
      await expect(page.locator('[data-testid="tools-grid"]')).toBeVisible();
      const toolCards = page.locator('[data-testid="tool-card"]');
      await expect(toolCards.first()).toBeVisible();
      expect(await toolCards.count()).toBeGreaterThan(0);
    });

    test('should search and filter tools', async ({ page }) => {
      await page.goto('/tools/marketplace');
      
      // Search tools
      await page.fill('input[placeholder*="Search tools"]', 'study');
      await page.waitForTimeout(500);
      
      // Should filter results
      const results = page.locator('[data-testid="tool-card"]');
      const firstResult = await results.first().textContent();
      expect(firstResult?.toLowerCase()).toContain('study');
      
      // Filter by category
      await page.click('button:has-text("Filter")');
      await page.click('label:has-text("Academic")');
      await page.click('button:has-text("Apply")');
      
      // Should show filtered tools
      await expect(page.locator('[data-category="academic"]').first()).toBeVisible();
    });

    test('should install tool from marketplace', async ({ page }) => {
      await page.goto('/tools/marketplace');
      
      // Click on a tool
      await page.click('[data-testid="tool-card"]').first();
      
      // Should show tool details
      await expect(page.locator('[data-testid="tool-details"]')).toBeVisible();
      await expect(page.locator('text=Created by')).toBeVisible();
      await expect(page.locator('[data-testid="tool-rating"]')).toBeVisible();
      
      // Install tool
      await page.click('button:has-text("Install Tool")');
      
      // Choose installation location
      await page.selectOption('select[name="installLocation"]', 'personal');
      await page.click('button:has-text("Confirm Installation")');
      
      // Should show success
      await expect(page.locator('text=Tool installed successfully')).toBeVisible();
    });

    test('should share tools across spaces', async ({ page }) => {
      await page.goto('/tools/my-tools');
      
      // Select a tool to share
      await page.click('[data-testid="tool-card"]').first();
      await page.click('button:has-text("Share")');
      
      // Select spaces to share with
      await page.click('label:has-text("CS 220 Fall 2025")');
      await page.click('label:has-text("Computer Science Department")');
      
      // Share
      await page.click('button:has-text("Share Tool")');
      await expect(page.locator('text=Tool shared with 2 spaces')).toBeVisible();
    });

    test('should track tool analytics', async ({ page }) => {
      await page.goto('/tools/my-tools/study-buddy-finder/analytics');
      
      // Should show analytics dashboard
      await expect(page.locator('text=Tool Analytics')).toBeVisible();
      await expect(page.locator('[data-testid="usage-chart"]')).toBeVisible();
      await expect(page.locator('[data-testid="user-count"]')).toBeVisible();
      await expect(page.locator('[data-testid="engagement-metrics"]')).toBeVisible();
      
      // Check usage by space
      await page.click('tab:has-text("By Space")');
      await expect(page.locator('[data-testid="space-usage-chart"]')).toBeVisible();
    });

    test('should handle tool versioning', async ({ page }) => {
      await page.goto('/hivelab/edit/study-buddy-finder');
      
      // Make changes
      await page.click('[data-testid="element-button-1"]');
      await page.fill('input[name="text"]', 'Find Study Groups');
      
      // Save as new version
      await page.click('button:has-text("Save as Version")');
      await page.fill('input[name="versionNotes"]', 'Updated button text');
      await page.click('button:has-text("Create Version")');
      
      // Should show version history
      await page.click('button:has-text("Version History")');
      await expect(page.locator('[data-testid="version-list"]')).toBeVisible();
      await expect(page.locator('text=v1.1.0')).toBeVisible();
    });

    test('should enable collaborative building', async ({ page, context }) => {
      const page2 = await context.newPage();
      await mockLogin(page2, 'collaborator@buffalo.edu');
      
      // Both open same tool
      await page.goto('/hivelab/edit/shared-tool-123?collab=true');
      await page2.goto('/hivelab/edit/shared-tool-123?collab=true');
      
      // Page 1 adds element
      const inputElement = page.locator('[data-element="text-input"]');
      const canvas = page.locator('[data-testid="canvas"]');
      await inputElement.dragTo(canvas);
      
      // Page 2 should see it appear
      await expect(page2.locator('[data-testid="element-text-input-1"]')).toBeVisible({ timeout: 5000 });
      
      // Show collaborator cursors
      await expect(page.locator('[data-testid="collaborator-cursor"]')).toBeVisible();
    });
  });

  test.describe('Tool Runtime & Execution', () => {
    test('should execute tool with user input', async ({ page }) => {
      await page.goto('/tools/use/grade-calculator');
      
      // Fill in tool inputs
      await page.fill('input[name="assignment1"]', '85');
      await page.fill('input[name="assignment2"]', '92');
      await page.fill('input[name="midterm"]', '88');
      await page.fill('input[name="final"]', '90');
      
      // Execute tool
      await page.click('button:has-text("Calculate Grade")');
      
      // Should show result
      await expect(page.locator('[data-testid="tool-result"]')).toBeVisible();
      await expect(page.locator('text=Your grade: B+')).toBeVisible();
    });

    test('should handle tool errors gracefully', async ({ page }) => {
      await page.goto('/tools/use/buggy-tool');
      
      // Try to execute with invalid input
      await page.fill('input[name="number"]', 'not-a-number');
      await page.click('button:has-text("Calculate")');
      
      // Should show error message
      await expect(page.locator('text=Please enter a valid number')).toBeVisible();
    });

    test('should save tool state', async ({ page }) => {
      await page.goto('/tools/use/planner-tool');
      
      // Add some data
      await page.fill('input[name="task1"]', 'Study for CS exam');
      await page.fill('input[name="task2"]', 'Complete homework');
      
      // Tool should auto-save
      await page.waitForTimeout(1000);
      
      // Refresh page
      await page.reload();
      
      // Data should persist
      await expect(page.locator('input[name="task1"]')).toHaveValue('Study for CS exam');
      await expect(page.locator('input[name="task2"]')).toHaveValue('Complete homework');
    });
  });

  test.describe('Rituals - Recurring Community Rhythms', () => {
    test('should create a new ritual', async ({ page }) => {
      await page.goto('/spaces/cs-220-fall-2025');
      await page.click('button:has-text("Rituals")');
      await page.click('button:has-text("Create Ritual")');
      
      // Fill ritual details
      await page.fill('input[name="ritualName"]', 'Weekly Study Session');
      await page.fill('textarea[name="description"]', 'Group study for upcoming quizzes and exams');
      
      // Set schedule
      await page.selectOption('select[name="frequency"]', 'weekly');
      await page.click('label:has-text("Monday")');
      await page.click('label:has-text("Wednesday")');
      await page.fill('input[name="time"]', '18:00');
      await page.fill('input[name="location"]', 'Capen Library 3rd Floor');
      
      // Set participation options
      await page.fill('input[name="maxParticipants"]', '20');
      await page.click('label:has-text("Send reminders")');
      
      // Create ritual
      await page.click('button:has-text("Create Ritual")');
      await expect(page.locator('text=Ritual created successfully')).toBeVisible();
    });

    test('should display ritual schedule', async ({ page }) => {
      await page.goto('/rituals');
      
      // Should show calendar view
      await expect(page.locator('[data-testid="rituals-calendar"]')).toBeVisible();
      
      // Switch to list view
      await page.click('button:has-text("List View")');
      await expect(page.locator('[data-testid="rituals-list"]')).toBeVisible();
      
      // Should show upcoming rituals
      const ritualCards = page.locator('[data-testid="ritual-card"]');
      await expect(ritualCards.first()).toBeVisible();
    });

    test('should send automated reminders', async ({ page }) => {
      // Mock time to be close to ritual
      await page.evaluate(() => {
        const date = new Date();
        date.setHours(17, 30); // 30 minutes before 6pm ritual
        Date.now = () => date.getTime();
      });
      
      await page.goto('/feed');
      
      // Should show ritual reminder in feed
      await expect(page.locator('[data-testid="ritual-reminder"]')).toBeVisible();
      await expect(page.locator('text=Starting in 30 minutes')).toBeVisible();
    });

    test('should track participation', async ({ page }) => {
      await page.goto('/rituals/weekly-study-session');
      
      // Join ritual
      await page.click('button:has-text("Join This Ritual")');
      await expect(page.locator('text=You\'re participating')).toBeVisible();
      
      // Mark attendance
      await page.click('button:has-text("Check In")');
      await expect(page.locator('text=Checked in')).toBeVisible();
      
      // View participation history
      await page.click('tab:has-text("My History")');
      await expect(page.locator('[data-testid="participation-streak"]')).toBeVisible();
      await expect(page.locator('text=3 week streak')).toBeVisible();
    });

    test('should evolve traditions over time', async ({ page }) => {
      await page.goto('/rituals/weekly-study-session/insights');
      
      // Should show ritual evolution
      await expect(page.locator('text=Ritual Evolution')).toBeVisible();
      await expect(page.locator('[data-testid="participation-trend"]')).toBeVisible();
      await expect(page.locator('[data-testid="engagement-metrics"]')).toBeVisible();
      
      // Suggest improvements
      await page.click('button:has-text("Suggest Change")');
      await page.fill('textarea[name="suggestion"]', 'Move to 7pm for better attendance');
      await page.click('button:has-text("Submit Suggestion")');
      
      // Should show in suggestions
      await expect(page.locator('text=Suggestion submitted')).toBeVisible();
    });

    test('should handle space-specific rituals', async ({ page }) => {
      await page.goto('/spaces/ellicott-complex');
      await page.click('button:has-text("Rituals")');
      
      // Should show dorm-specific rituals
      await expect(page.locator('text=Floor Meeting')).toBeVisible();
      await expect(page.locator('text=Sunday Brunch Club')).toBeVisible();
      await expect(page.locator('text=Game Night')).toBeVisible();
    });

    test('should support campus-wide rituals', async ({ page }) => {
      await page.goto('/rituals/campus');
      
      // Should show university-wide rituals
      await expect(page.locator('text=Bulls Football Tailgate')).toBeVisible();
      await expect(page.locator('text=Wellness Wednesday')).toBeVisible();
      await expect(page.locator('text=Career Fair Prep')).toBeVisible();
      
      // Filter by category
      await page.click('button:has-text("Filter")');
      await page.click('label:has-text("Academic")');
      await page.click('button:has-text("Apply")');
      
      // Should filter results
      const rituals = page.locator('[data-testid="ritual-card"]');
      const count = await rituals.count();
      for (let i = 0; i < count; i++) {
        const category = await rituals.nth(i).locator('[data-testid="category-badge"]').textContent();
        expect(category).toBe('Academic');
      }
    });

    test('should create ritual instances', async ({ page }) => {
      await page.goto('/rituals/weekly-study-session');
      
      // View upcoming instances
      await page.click('tab:has-text("Upcoming Sessions")');
      const instances = page.locator('[data-testid="ritual-instance"]');
      await expect(instances.first()).toBeVisible();
      
      // Each instance should have details
      const firstInstance = instances.first();
      await expect(firstInstance.locator('text=/Monday|Wednesday/')).toBeVisible();
      await expect(firstInstance.locator('text=6:00 PM')).toBeVisible();
      await expect(firstInstance.locator('[data-testid="participant-count"]')).toBeVisible();
    });

    test('should handle ritual milestones', async ({ page }) => {
      await page.goto('/rituals/weekly-study-session');
      
      // Should show milestones
      await page.click('tab:has-text("Milestones")');
      await expect(page.locator('text=10th Session')).toBeVisible();
      await expect(page.locator('text=50 Total Participants')).toBeVisible();
      await expect(page.locator('text=Founded 3 months ago')).toBeVisible();
      
      // Celebrate milestone
      await page.click('button:has-text("Celebrate 10th Session")');
      await expect(page.locator('[data-testid="celebration-modal"]')).toBeVisible();
    });

    test('should customize ritual settings', async ({ page }) => {
      await page.goto('/rituals/weekly-study-session/settings');
      
      // Update settings
      await page.fill('input[name="maxParticipants"]', '30');
      await page.click('label:has-text("Require RSVP")');
      await page.click('label:has-text("Allow guests")');
      
      // Set reminder timing
      await page.selectOption('select[name="reminderTime"]', '1hour');
      
      // Save changes
      await page.click('button:has-text("Save Settings")');
      await expect(page.locator('text=Settings updated')).toBeVisible();
    });
  });

  test.describe('Integration Between Tools and Rituals', () => {
    test('should use tools within rituals', async ({ page }) => {
      await page.goto('/rituals/weekly-study-session');
      
      // Access ritual tools
      await page.click('button:has-text("Ritual Tools")');
      await expect(page.locator('[data-testid="ritual-tools-panel"]')).toBeVisible();
      
      // Use attendance tool
      await page.click('[data-testid="tool-attendance-tracker"]');
      await expect(page.locator('text=Attendance Tracker')).toBeVisible();
      
      // Mark attendance
      await page.click('button:has-text("I\'m Here")');
      await expect(page.locator('text=Marked present')).toBeVisible();
    });

    test('should create ritual-specific tools', async ({ page }) => {
      await page.goto('/hivelab/new?context=ritual');
      
      // Should have ritual-specific templates
      await page.click('button:has-text("Ritual Templates")');
      await expect(page.locator('text=Attendance Tracker')).toBeVisible();
      await expect(page.locator('text=Feedback Collector')).toBeVisible();
      await expect(page.locator('text=Resource Sharer')).toBeVisible();
      
      // Use template
      await page.click('button:has-text("Use Attendance Template")');
      await expect(page.locator('[data-testid="canvas"]')).toContainText('Check In');
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
        role: 'student'
      },
      expiresAt: Date.now() + 3600000
    }));
  }, email);
}