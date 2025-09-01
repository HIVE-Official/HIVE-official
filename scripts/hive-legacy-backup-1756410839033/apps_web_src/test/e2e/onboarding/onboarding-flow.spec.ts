import { test, expect } from '@playwright/test';
import { TestDataManager } from '../../utils/test-data-manager';

test.describe('Onboarding Flow', () => {
  let testData: TestDataManager;
  let testUser: any;

  test.beforeEach(async ({ page }) => {
    testData = new TestDataManager();
    
    // Create a fresh user and authenticate them
    testUser = await testData.createTestUser({
      email: testData.generateUBEmail(),
      isOnboarded: false,
    });
    
    await testData.authenticateUser(page, testUser);
    await page.goto('/onboarding');
  });

  test.afterEach(async () => {
    await testData.cleanup();
  });

  test('should complete full onboarding flow successfully', async ({ page }) => {
    // Step 1: Welcome Step
    await expect(page.getByRole('heading', { name: /welcome to hive/i })).toBeVisible();
    await expect(page.getByText(/university at buffalo/i)).toBeVisible();
    await page.getByRole('button', { name: /let's begin/i }).click();

    // Step 2: Name Step
    await expect(page).toHaveURL(/\/onboarding\/name/);
    await expect(page.getByRole('heading', { name: /what should we call you/i })).toBeVisible();
    
    const firstNameInput = page.getByRole('textbox', { name: /first name/i });
    const lastNameInput = page.getByRole('textbox', { name: /last name/i });
    
    await firstNameInput.fill('Test');
    await lastNameInput.fill('Student');
    await page.getByRole('button', { name: /continue/i }).click();

    // Step 3: Handle Step
    await expect(page).toHaveURL(/\/onboarding\/handle/);
    await expect(page.getByRole('heading', { name: /choose your handle/i })).toBeVisible();
    
    const handleInput = page.getByRole('textbox', { name: /handle/i });
    const uniqueHandle = `teststudent${Date.now()}`;
    
    await handleInput.fill(uniqueHandle);
    // Should show availability check
    await expect(page.getByText(/available/i)).toBeVisible();
    await page.getByRole('button', { name: /continue/i }).click();

    // Step 4: Photo Step
    await expect(page).toHaveURL(/\/onboarding\/photo/);
    await expect(page.getByRole('heading', { name: /add your photo/i })).toBeVisible();
    
    // Skip photo for now (optional step)
    await page.getByRole('button', { name: /skip for now/i }).click();

    // Step 5: User Type Step
    await expect(page).toHaveURL(/\/onboarding\/user-type/);
    await expect(page.getByRole('heading', { name: /are you a student or faculty/i })).toBeVisible();
    
    await page.getByRole('button', { name: /student/i }).click();

    // Step 6: Academics Step (for students)
    await expect(page).toHaveURL(/\/onboarding\/academics/);
    await expect(page.getByRole('heading', { name: /academic info/i })).toBeVisible();
    
    // Select year
    await page.getByRole('button', { name: /sophomore/i }).click();
    
    // Select school
    const schoolSelect = page.getByRole('combobox', { name: /school/i });
    await schoolSelect.click();
    await page.getByRole('option', { name: /engineering/i }).click();
    
    // Select major
    const majorSelect = page.getByRole('combobox', { name: /major/i });
    await majorSelect.click();
    await page.getByRole('option', { name: /computer science/i }).click();
    
    await page.getByRole('button', { name: /continue/i }).click();

    // Step 7: Interests Step
    await expect(page).toHaveURL(/\/onboarding\/interests/);
    await expect(page.getByRole('heading', { name: /interests/i })).toBeVisible();
    
    // Select a few interests
    await page.getByRole('button', { name: /coding/i }).click();
    await page.getByRole('button', { name: /music/i }).click();
    await page.getByRole('button', { name: /sports/i }).click();
    
    await page.getByRole('button', { name: /continue/i }).click();

    // Step 8: Legal Step
    await expect(page).toHaveURL(/\/onboarding\/legal/);
    await expect(page.getByRole('heading', { name: /terms & privacy/i })).toBeVisible();
    
    // Accept terms and privacy
    await page.getByRole('checkbox', { name: /terms of service/i }).check();
    await page.getByRole('checkbox', { name: /privacy policy/i }).check();
    await page.getByRole('checkbox', { name: /community guidelines/i }).check();
    
    await page.getByRole('button', { name: /complete onboarding/i }).click();

    // Should redirect to dashboard after completion
    await expect(page).toHaveURL('/');
    await expect(page.getByText(/welcome to hive/i)).toBeVisible();
    await expect(page.getByText(uniqueHandle)).toBeVisible();
  });

  test('should handle navigation between onboarding steps', async ({ page }) => {
    // Complete first few steps
    await page.getByRole('button', { name: /let's begin/i }).click();
    
    await page.getByRole('textbox', { name: /first name/i }).fill('Test');
    await page.getByRole('textbox', { name: /last name/i }).fill('Student');
    await page.getByRole('button', { name: /continue/i }).click();

    // Should be on handle step
    await expect(page).toHaveURL(/\/onboarding\/handle/);
    
    // Test back navigation
    await page.getByRole('button', { name: /back/i }).click();
    await expect(page).toHaveURL(/\/onboarding\/name/);
    
    // Form should retain values
    await expect(page.getByRole('textbox', { name: /first name/i })).toHaveValue('Test');
    await expect(page.getByRole('textbox', { name: /last name/i })).toHaveValue('Student');
  });

  test('should validate required fields', async ({ page }) => {
    // Skip to name step
    await page.getByRole('button', { name: /let's begin/i }).click();
    
    // Try to continue without filling fields
    await page.getByRole('button', { name: /continue/i }).click();
    
    // Should show validation errors
    await expect(page.getByText(/first name is required/i)).toBeVisible();
    await expect(page.getByText(/last name is required/i)).toBeVisible();
    
    // Should stay on same page
    await expect(page).toHaveURL(/\/onboarding\/name/);
  });

  test('should handle handle availability checking', async ({ page }) => {
    // Navigate to handle step
    await page.getByRole('button', { name: /let's begin/i }).click();
    await page.getByRole('textbox', { name: /first name/i }).fill('Test');
    await page.getByRole('textbox', { name: /last name/i }).fill('Student');
    await page.getByRole('button', { name: /continue/i }).click();

    const handleInput = page.getByRole('textbox', { name: /handle/i });
    
    // Test taken handle
    const takenHandle = 'takenuserhandle';
    await testData.createTestUser({
      handle: takenHandle,
      email: 'taken@buffalo.edu'
    });
    
    await handleInput.fill(takenHandle);
    await expect(page.getByText(/already taken/i)).toBeVisible();
    
    // Continue button should be disabled
    await expect(page.getByRole('button', { name: /continue/i })).toBeDisabled();
    
    // Test available handle
    const availableHandle = `available${Date.now()}`;
    await handleInput.clear();
    await handleInput.fill(availableHandle);
    await expect(page.getByText(/available/i)).toBeVisible();
    
    // Continue button should be enabled
    await expect(page.getByRole('button', { name: /continue/i })).toBeEnabled();
  });

  test('should handle photo upload functionality', async ({ page }) => {
    // Navigate to photo step
    await page.getByRole('button', { name: /let's begin/i }).click();
    await page.getByRole('textbox', { name: /first name/i }).fill('Test');
    await page.getByRole('textbox', { name: /last name/i }).fill('Student');
    await page.getByRole('button', { name: /continue/i }).click();
    
    const handleInput = page.getByRole('textbox', { name: /handle/i });
    await handleInput.fill(`phototest${Date.now()}`);
    await page.getByRole('button', { name: /continue/i }).click();

    // Should be on photo step
    await expect(page).toHaveURL(/\/onboarding\/photo/);
    
    // Test photo upload area
    const fileInput = page.locator('input[type="file"]');
    await expect(fileInput).toBeHidden(); // Hidden but present
    
    // Test drag and drop area
    const dropZone = page.getByText(/drag.*drop.*photo/i);
    await expect(dropZone).toBeVisible();
    
    // Test avatar generator option
    const generateButton = page.getByRole('button', { name: /generate avatar/i });
    await expect(generateButton).toBeVisible();
    await generateButton.click();
    
    // Should generate and show avatar preview
    await expect(page.getByRole('img', { name: /avatar preview/i })).toBeVisible();
  });

  test('should handle different user types correctly', async ({ page }) => {
    // Navigate to user type step
    await page.getByRole('button', { name: /let's begin/i }).click();
    await page.getByRole('textbox', { name: /first name/i }).fill('Professor');
    await page.getByRole('textbox', { name: /last name/i }).fill('Test');
    await page.getByRole('button', { name: /continue/i }).click();
    
    await page.getByRole('textbox', { name: /handle/i }).fill(`prof${Date.now()}`);
    await page.getByRole('button', { name: /continue/i }).click();
    await page.getByRole('button', { name: /skip for now/i }).click();

    // Select faculty
    await page.getByRole('button', { name: /faculty/i }).click();

    // Should skip to faculty-specific step
    await expect(page).toHaveURL(/\/onboarding\/faculty-info/);
    await expect(page.getByRole('heading', { name: /faculty information/i })).toBeVisible();
    
    // Faculty-specific fields
    const departmentSelect = page.getByRole('combobox', { name: /department/i });
    await expect(departmentSelect).toBeVisible();
    
    await departmentSelect.click();
    await page.getByRole('option', { name: /computer science/i }).click();
    
    const titleInput = page.getByRole('textbox', { name: /title/i });
    await titleInput.fill('Assistant Professor');
    
    await page.getByRole('button', { name: /continue/i }).click();
  });

  test('should save progress and resume onboarding', async ({ page }) => {
    // Start onboarding
    await page.getByRole('button', { name: /let's begin/i }).click();
    await page.getByRole('textbox', { name: /first name/i }).fill('Resume');
    await page.getByRole('textbox', { name: /last name/i }).fill('Test');
    await page.getByRole('button', { name: /continue/i }).click();

    // Close browser/navigate away
    await page.goto('/');
    
    // Should redirect back to onboarding
    await expect(page).toHaveURL(/\/onboarding/);
    
    // Should preserve progress
    await expect(page.getByRole('textbox', { name: /first name/i })).toHaveValue('Resume');
    await expect(page.getByRole('textbox', { name: /last name/i })).toHaveValue('Test');
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile layout
    await expect(page.getByRole('heading', { name: /welcome to hive/i })).toBeVisible();
    
    const continueButton = page.getByRole('button', { name: /let's begin/i });
    const buttonBox = await continueButton.boundingBox();
    
    // Touch targets should be large enough
    expect(buttonBox?.height).toBeGreaterThanOrEqual(44);
    
    await continueButton.click();
    
    // Form fields should be accessible on mobile
    const firstNameInput = page.getByRole('textbox', { name: /first name/i });
    await firstNameInput.focus();
    
    // Virtual keyboard should not obscure input
    await expect(firstNameInput).toBeVisible();
  });

  test('should handle network errors during onboarding', async ({ page }) => {
    // Simulate network failure for handle check
    await page.route('**/api/auth/check-handle', route => {
      route.abort('failed');
    });

    // Navigate to handle step
    await page.getByRole('button', { name: /let's begin/i }).click();
    await page.getByRole('textbox', { name: /first name/i }).fill('Network');
    await page.getByRole('textbox', { name: /last name/i }).fill('Test');
    await page.getByRole('button', { name: /continue/i }).click();

    const handleInput = page.getByRole('textbox', { name: /handle/i });
    await handleInput.fill('networktest');
    
    // Should show error for handle check
    await expect(page.getByText(/unable to check availability/i)).toBeVisible();
    
    // Should provide retry option
    await expect(page.getByRole('button', { name: /try again/i })).toBeVisible();
  });

  test('should handle onboarding completion edge cases', async ({ page }) => {
    // Complete most of onboarding but simulate error on final step
    await page.route('**/api/auth/complete-onboarding', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Server error' })
      });
    });

    // Speed through onboarding to final step
    await page.getByRole('button', { name: /let's begin/i }).click();
    await page.getByRole('textbox', { name: /first name/i }).fill('Error');
    await page.getByRole('textbox', { name: /last name/i }).fill('Test');
    await page.getByRole('button', { name: /continue/i }).click();
    
    await page.getByRole('textbox', { name: /handle/i }).fill(`errortest${Date.now()}`);
    await page.getByRole('button', { name: /continue/i }).click();
    await page.getByRole('button', { name: /skip for now/i }).click();
    await page.getByRole('button', { name: /student/i }).click();
    await page.getByRole('button', { name: /sophomore/i }).click();
    
    const schoolSelect = page.getByRole('combobox', { name: /school/i });
    await schoolSelect.click();
    await page.getByRole('option', { name: /engineering/i }).click();
    
    const majorSelect = page.getByRole('combobox', { name: /major/i });
    await majorSelect.click();
    await page.getByRole('option', { name: /computer science/i }).click();
    await page.getByRole('button', { name: /continue/i }).click();
    
    await page.getByRole('button', { name: /coding/i }).click();
    await page.getByRole('button', { name: /continue/i }).click();
    
    await page.getByRole('checkbox', { name: /terms of service/i }).check();
    await page.getByRole('checkbox', { name: /privacy policy/i }).check();
    await page.getByRole('checkbox', { name: /community guidelines/i }).check();
    
    // This should fail
    await page.getByRole('button', { name: /complete onboarding/i }).click();
    
    // Should show error message
    await expect(page.getByText(/something went wrong/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /try again/i })).toBeVisible();
  });
});