import { test, expect } from '@playwright/test';

test.describe('Critical User Flows', () => {
  
  test.beforeEach(async ({ page }) => {
    // Start at the home page
    await page.goto('http://localhost:3000');
  });

  test('User can join and post in a space', async ({ page }) => {
    // Navigate to spaces
    await page.click('text=Spaces');
    
    // Find and click on a space (e.g., CS department)
    await page.click('text=Computer Science');
    
    // Join the space
    await page.click('button:has-text("Join Space")');
    
    // Wait for join to complete
    await expect(page.locator('button:has-text("Leave Space")')).toBeVisible();
    
    // Create a post
    await page.click('button:has-text("Create Post")');
    
    // Fill in post content
    await page.fill('textarea[placeholder*="What\'s on your mind"]', 'Testing the new HIVE platform!');
    
    // Submit post
    await page.click('button:has-text("Post")');
    
    // Verify post appears
    await expect(page.locator('text=Testing the new HIVE platform!')).toBeVisible();
  });

  test('User can upload images with post', async ({ page }) => {
    // Navigate to a space user is already in
    await page.goto('http://localhost:3000/spaces/cs-220-fall-2025');
    
    // Create a post with image
    await page.click('button:has-text("Create Post")');
    
    // Upload an image
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('test-assets/test-image.jpg');
    
    // Add content
    await page.fill('textarea[placeholder*="What\'s on your mind"]', 'Check out this meme!');
    
    // Submit
    await page.click('button:has-text("Post")');
    
    // Verify image uploaded
    await expect(page.locator('img[alt*="Post image"]')).toBeVisible();
  });

  test('User can comment on posts', async ({ page }) => {
    // Navigate to a space with posts
    await page.goto('http://localhost:3000/spaces/cs-220-fall-2025');
    
    // Find a post and click comment
    await page.locator('button:has-text("Comment")').first().click();
    
    // Type comment
    await page.fill('textarea[placeholder*="Write a comment"]', 'Great post!');
    
    // Submit comment
    await page.click('button:has-text("Reply")');
    
    // Verify comment appears
    await expect(page.locator('text=Great post!')).toBeVisible();
  });

  test('User can RSVP to events', async ({ page }) => {
    // Navigate to a space
    await page.goto('http://localhost:3000/spaces/cs-220-fall-2025');
    
    // Click on events tab
    await page.click('text=Events');
    
    // Find an event and RSVP
    await page.locator('button:has-text("Going")').first().click();
    
    // Verify RSVP registered
    await expect(page.locator('text=You\'re going')).toBeVisible();
  });

  test('Leader can manage space in manage mode', async ({ page }) => {
    // Login as space leader
    await page.goto('http://localhost:3000/spaces/cs-220-fall-2025');
    
    // Enter manage mode
    await page.click('button:has-text("Manage")');
    
    // Verify management panel appears
    await expect(page.locator('text=Space Management')).toBeVisible();
    
    // Check member management is available
    await expect(page.locator('text=Members')).toBeVisible();
    await expect(page.locator('text=Join Requests')).toBeVisible();
  });

  test('Search returns real results from Firebase', async ({ page }) => {
    // Click search
    await page.click('button[aria-label="Search"]');
    
    // Type search query
    await page.fill('input[placeholder*="Search"]', 'computer science');
    
    // Wait for results
    await page.waitForTimeout(1000);
    
    // Verify results appear
    await expect(page.locator('text=Search Results')).toBeVisible();
    
    // Verify at least one result
    expect(await page.locator('[data-testid="search-result"]').count()).toBeGreaterThan(0);
  });

  test('Profile dashboard shows real user data', async ({ page }) => {
    // Navigate to profile
    await page.click('text=Profile');
    
    // Verify profile loads with user data
    await expect(page.locator('text=Your Profile')).toBeVisible();
    
    // Check that cards are interactive
    await page.click('[data-testid="profile-card-spaces"]');
    await expect(page.locator('text=Your Spaces')).toBeVisible();
  });

  test('Real-time updates work for posts', async ({ page, context }) => {
    // Open two pages
    const page2 = await context.newPage();
    
    // Both navigate to same space
    await page.goto('http://localhost:3000/spaces/cs-220-fall-2025');
    await page2.goto('http://localhost:3000/spaces/cs-220-fall-2025');
    
    // Page 1 creates a post
    await page.click('button:has-text("Create Post")');
    await page.fill('textarea[placeholder*="What\'s on your mind"]', 'Real-time test post');
    await page.click('button:has-text("Post")');
    
    // Page 2 should see the post without refresh
    await expect(page2.locator('text=Real-time test post')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Data Persistence', () => {
  
  test('Posts persist after page refresh', async ({ page }) => {
    // Create a post with unique content
    const uniqueContent = `Test post ${Date.now()}`;
    
    await page.goto('http://localhost:3000/spaces/cs-220-fall-2025');
    await page.click('button:has-text("Create Post")');
    await page.fill('textarea[placeholder*="What\'s on your mind"]', uniqueContent);
    await page.click('button:has-text("Post")');
    
    // Verify post appears
    await expect(page.locator(`text=${uniqueContent}`)).toBeVisible();
    
    // Refresh page
    await page.reload();
    
    // Post should still be there
    await expect(page.locator(`text=${uniqueContent}`)).toBeVisible();
  });

  test('User preferences persist', async ({ page }) => {
    // Go to profile settings
    await page.goto('http://localhost:3000/profile/edit');
    
    // Toggle a preference
    await page.click('text=Ghost Mode');
    
    // Navigate away and back
    await page.goto('http://localhost:3000');
    await page.goto('http://localhost:3000/profile/edit');
    
    // Preference should still be toggled
    await expect(page.locator('[aria-checked="true"]')).toBeVisible();
  });
});

test.describe('Error Handling', () => {
  
  test('Shows error when trying to post without content', async ({ page }) => {
    await page.goto('http://localhost:3000/spaces/cs-220-fall-2025');
    await page.click('button:has-text("Create Post")');
    
    // Try to submit empty post
    await page.click('button:has-text("Post")');
    
    // Should show error
    await expect(page.locator('text=Content is required')).toBeVisible();
  });

  test('Handles network errors gracefully', async ({ page }) => {
    // Go offline
    await page.context().setOffline(true);
    
    await page.goto('http://localhost:3000/spaces/cs-220-fall-2025');
    
    // Try to create a post
    await page.click('button:has-text("Create Post")');
    await page.fill('textarea[placeholder*="What\'s on your mind"]', 'Offline test');
    await page.click('button:has-text("Post")');
    
    // Should show network error
    await expect(page.locator('text=Network error')).toBeVisible();
    
    // Go back online
    await page.context().setOffline(false);
  });
});