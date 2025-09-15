import { Page } from '@playwright/test';
import '../types/test-types'; // Import global type extensions
import type { MockUser } from '../types/test-types';

export class TestHelpers {
  constructor(private page: Page) {}

  /**
   * Clear all authentication state
   */
  async clearAuthState(): Promise<void> {
    // Only clear storage if we're on a page with a valid origin
    const url = this.page.url();
    if (url && !url.startsWith('about:') && !url.startsWith('data:')) {
      try {
        await this.page.evaluate(() => {
          localStorage.clear();
          sessionStorage.clear();
        });
      } catch (error) {
        // Ignore errors when clearing storage on non-http pages
      }
    }
    
    await this.page.context().clearCookies();
  }

  /**
   * Mock an authenticated user state
   */
  async mockAuthenticatedUser(user: MockUser): Promise<void> {
    // Mock Firebase auth state
    await this.page.addInitScript((userData: any) => {
      // Mock Firebase user object
      window.__mockFirebaseUser = {
        uid: userData.id,
        email: userData.email,
        emailVerified: true,
        getIdToken: () => Promise.resolve('mock-firebase-token'),
        getIdTokenResult: () => Promise.resolve({
          token: 'mock-firebase-token',
          claims: {
            schoolId: userData.schoolId || 'ub-buffalo',
            onboardingCompleted: userData.onboardingCompleted
          }
        })
      };

      // Mock HIVE user data
      window.__mockHiveUser = userData;

      // Mock localStorage session data
      localStorage.setItem('hive_auth_state', JSON.stringify({
        user: userData,
        isAuthenticated: true,
        lastUpdated: Date.now()
      }));
    }, user);

    // Mock API responses
    await this.page.route('**/api/profile/me', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          user: user
        })
      });
    });
  }

  /**
   * Get a mock magic link token for testing
   */
  async getMockMagicLinkToken(_email: string): Promise<string> {
    const mockToken = `mock-token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Mock the token validation endpoint
    await this.page.route('**/api/auth/verify-magic-link', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          token: 'mock-firebase-custom-token',
          needsOnboarding: true,
          userId: 'mock-user-id'
        })
      });
    });

    return mockToken;
  }

  /**
   * Complete the full authentication flow
   */
  async completeAuthFlow(email: string): Promise<void> {
    // Mock successful magic link verification
    await this.page.route('**/api/auth/verify-magic-link', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          token: 'mock-firebase-custom-token',
          needsOnboarding: false,
          userId: 'authenticated-user-id'
        })
      });
    });

    // Mock authenticated user state
    await this.mockAuthenticatedUser({
      id: 'authenticated-user-id',
      email: email,
      fullName: 'Test User',
      handle: 'testuser',
      onboardingCompleted: true,
      schoolId: 'ub-buffalo'
    });

    await this.page.goto('/');
  }

  /**
   * Complete onboarding flow to a specific step
   */
  async completeOnboardingToStep(stepName: string): Promise<void> {
    await this.mockAuthenticatedUser({
      id: 'onboarding-user',
      email: 'onboarding@buffalo.edu',
      onboardingCompleted: false
    });

    await this.page.goto('/onboarding');

    // Step 1: Welcome
    if (stepName === 'welcome') return;
    
    await this.page.locator('button:has-text("Get Started")').click();
    if (stepName === 'userType') return;

    // Step 2: User type
    await this.page.locator('[data-testid="user-type-student"]').click();
    await this.page.locator('button[data-testid="continue-button"]').click();
    if (stepName === 'name') return;

    // Step 3: Name
    await this.page.fill('input[name="firstName"]', 'Test');
    await this.page.fill('input[name="lastName"]', 'User');
    await this.page.locator('button[data-testid="continue-button"]').click();
    if (stepName === 'academics') return;

    // Step 4: Academic info
    const majorSelect = this.page.locator('[data-testid="major-select"]');
    await majorSelect.click();
    await this.page.locator('text=Computer Science').click();
    await this.page.locator('[data-testid="graduation-year-select"]').fill('2026');
    await this.page.locator('button[data-testid="continue-button"]').click();
    if (stepName === 'handle') return;

    // Step 5: Handle
    await this.mockHandleAvailable();
    await this.page.fill('input[name="handle"]', 'testuser123');
    await this.page.waitForSelector('[data-testid="handle-availability"]:has-text("Available")');
    await this.page.locator('button[data-testid="continue-button"]').click();
    if (stepName === 'photo') return;

    // Step 6: Photo (skip)
    await this.page.locator('button[data-testid="continue-button"]').click();
    if (stepName === 'interests') return;

    // Step 7: Interests (skip)
    await this.page.locator('button[data-testid="continue-button"]').click();
    if (stepName === 'builder') return;

    // Step 8: Builder (skip)
    await this.page.locator('button[data-testid="continue-button"]').click();
    if (stepName === 'legal') return;
  }

  /**
   * Mock handle availability check
   */
  async mockHandleAvailable(available: boolean = true): Promise<void> {
    await this.page.route('**/api/profile/check-handle', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          available,
          message: available ? 'Handle is available' : 'Handle already taken'
        })
      });
    });
  }

  /**
   * Mock successful onboarding completion
   */
  async mockOnboardingCompletion(): Promise<void> {
    await this.page.route('**/api/auth/complete-onboarding', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          user: {
            id: 'completed-user-id',
            email: 'completed@buffalo.edu',
            fullName: 'Test User',
            handle: 'testuser123',
            onboardingCompleted: true
          },
          builderRequestsCreated: 0
        })
      });
    });
  }

  /**
   * Wait for navigation to complete
   */
  async waitForNavigation(expectedUrl?: string | RegExp): Promise<void> {
    if (expectedUrl) {
      await this.page.waitForURL(expectedUrl);
    } else {
      await this.page.waitForLoadState('networkidle');
    }
  }

  /**
   * Take screenshot for debugging
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true
    });
  }

  /**
   * Check for console errors
   */
  async checkForConsoleErrors(): Promise<void> {
    const errors: string[] = [];
    
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Allow some time for errors to appear
    await this.page.waitForTimeout(1000);

    if (errors.length > 0) {
      throw new Error(`Console errors detected: ${errors.join(', ')}`);
    }
  }

  /**
   * Mock Firebase authentication state
   */
  async mockFirebaseAuth(user?: MockUser): Promise<void> {
    await this.page.addInitScript((userData: any) => {
      // Mock Firebase Auth module
      window.__mockFirebaseAuth = {
        currentUser: userData ? {
          uid: userData.id,
          email: userData.email,
          emailVerified: true,
          getIdToken: () => Promise.resolve('mock-id-token'),
          getIdTokenResult: () => Promise.resolve({
            token: 'mock-id-token',
            claims: {
              schoolId: userData.schoolId || 'ub-buffalo'
            }
          })
        } : null,
        onAuthStateChanged: (callback: Function) => {
          setTimeout(() => callback(window.__mockFirebaseAuth.currentUser), 100);
          return () => {}; // Unsubscribe function
        },
        signInWithCustomToken: () => Promise.resolve({
          user: window.__mockFirebaseAuth.currentUser
        }),
        signOut: () => {
          window.__mockFirebaseAuth.currentUser = null;
          return Promise.resolve();
        }
      };

      // Replace Firebase auth in the global scope
      if (window.firebase) {
        window.firebase.auth = () => window.__mockFirebaseAuth;
      }
    }, user);
  }

  /**
   * Cleanup test state
   */
  async cleanup(): Promise<void> {
    await this.clearAuthState();
    
    // Remove any route mocks
    await this.page.unrouteAll();
    
    // Clear any injected scripts
    await this.page.evaluate(() => {
      delete window.__mockFirebaseUser;
      delete window.__mockHiveUser;
      delete window.__mockFirebaseAuth;
    });
  }

  /**
   * Fill form field with validation wait
   */
  async fillAndValidate(selector: string, value: string, validationSelector?: string): Promise<void> {
    await this.page.fill(selector, value);
    
    if (validationSelector) {
      await this.page.waitForSelector(validationSelector, { timeout: 5000 });
    }
    
    // Small delay to allow validation to complete
    await this.page.waitForTimeout(500);
  }

  /**
   * Check if element is visible with timeout
   */
  async isVisible(selector: string, timeout: number = 5000): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { timeout, state: 'visible' });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Mock API responses for testing error scenarios
   */
  async mockApiError(endpoint: string, error: { status: number; message: string }): Promise<void> {
    await this.page.route(`**${endpoint}`, route => {
      route.fulfill({
        status: error.status,
        contentType: 'application/json',
        body: JSON.stringify({ error: error.message })
      });
    });
  }

  /**
   * Simulate network conditions
   */
  async simulateSlowNetwork(): Promise<void> {
    await this.page.route('**/*', (route, _request) => {
      // Add delay to simulate slow network
      setTimeout(() => {
        route.continue();
      }, 1000 + Math.random() * 2000); // 1-3 second delay
    });
  }

  /**
   * Get current step from onboarding progress
   */
  async getCurrentOnboardingStep(): Promise<string> {
    const progressText = await this.page.locator('[data-testid="progress-indicator"]').textContent();
    const match = progressText?.match(/Step (\d+)/);
    return match ? match[1] : '1';
  }
}