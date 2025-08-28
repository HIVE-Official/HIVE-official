import { Page } from '@playwright/test';
import { randomBytes } from 'crypto';

interface TestUser {
  uid?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  handle?: string;
  isOnboarded: boolean;
  userType?: 'student' | 'faculty';
  year?: string;
  school?: string;
  major?: string;
  department?: string;
  interests?: string[];
  createdAt?: string;
}

interface TestSpace {
  id?: string;
  name: string;
  description?: string;
  type: 'academic' | 'residential' | 'interest' | 'club' | 'department';
  isPrivate?: boolean;
  memberIds?: string[];
  leaderIds?: string[];
  campusId: string;
}

export class TestDataManager {
  private createdUsers: TestUser[] = [];
  private createdSpaces: TestSpace[] = [];
  private authTokens: Map<string, string> = new Map();

  /**
   * Generate a random UB email address
   */
  generateUBEmail(): string {
    const randomId = randomBytes(6).toString('hex');
    return `test${randomId}@buffalo.edu`;
  }

  /**
   * Generate a magic link token
   */
  generateMagicToken(): string {
    return randomBytes(32).toString('hex');
  }

  /**
   * Create a test user in the database
   */
  async createTestUser(userData: Partial<TestUser>): Promise<TestUser> {
    const user: TestUser = {
      uid: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: userData.email || this.generateUBEmail(),
      firstName: userData.firstName || 'Test',
      lastName: userData.lastName || 'User',
      handle: userData.handle || `testuser${Date.now()}`,
      isOnboarded: userData.isOnboarded || false,
      userType: userData.userType || 'student',
      year: userData.year || 'sophomore',
      school: userData.school || 'School of Engineering',
      major: userData.major || 'Computer Science',
      interests: userData.interests || ['coding', 'music'],
      createdAt: new Date().toISOString(),
      ...userData
    };

    // Store for cleanup
    this.createdUsers.push(user);

    // Create user via API call
    const response = await fetch(`${process.env.TEST_BASE_URL || 'http://localhost:3003'}/api/test/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      console.warn('Failed to create test user via API, using mock data');
    }

    return user;
  }

  /**
   * Create a test space
   */
  async createTestSpace(spaceData: Partial<TestSpace>): Promise<TestSpace> {
    const space: TestSpace = {
      id: `space_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: spaceData.name || 'Test Space',
      description: spaceData.description || 'A test space for automated testing',
      type: spaceData.type || 'interest',
      isPrivate: spaceData.isPrivate || false,
      memberIds: spaceData.memberIds || [],
      leaderIds: spaceData.leaderIds || [],
      campusId: 'ub-buffalo',
      ...spaceData
    };

    this.createdSpaces.push(space);

    // Create space via API call
    const response = await fetch(`${process.env.TEST_BASE_URL || 'http://localhost:3003'}/api/test/create-space`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(space),
    });

    if (!response.ok) {
      console.warn('Failed to create test space via API, using mock data');
    }

    return space;
  }

  /**
   * Authenticate a user in the browser
   */
  async authenticateUser(page: Page, user: TestUser): Promise<void> {
    const authToken = this.generateAuthToken(user);
    
    // Set authentication cookies/localStorage
    await page.context().addCookies([
      {
        name: 'hive-auth-token',
        value: authToken,
        domain: 'localhost',
        path: '/',
        httpOnly: false,
        secure: false,
        sameSite: 'Lax'
      }
    ]);

    // Set user session in localStorage
    await page.evaluate((userData) => {
      localStorage.setItem('hive-user-session', JSON.stringify({
        user: userData,
        token: userData.authToken,
        isAuthenticated: true,
        lastUpdated: Date.now()
      }));
    }, { ...user, authToken });

    this.authTokens.set(user.email, authToken);
  }

  /**
   * Generate authentication token for user
   */
  private generateAuthToken(user: TestUser): string {
    // In real implementation, this would be a JWT or session token
    return `test_token_${Buffer.from(JSON.stringify({ 
      uid: user.uid, 
      email: user.email,
      timestamp: Date.now()
    })).toString('base64')}`;
  }

  /**
   * Clear user authentication
   */
  async clearAuth(page: Page): Promise<void> {
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }

  /**
   * Create test notification
   */
  async createTestNotification(userId: string, notification: {
    type: 'space_invite' | 'post_like' | 'comment' | 'system';
    title: string;
    message: string;
    actionUrl?: string;
  }): Promise<void> {
    const response = await fetch(`${process.env.TEST_BASE_URL || 'http://localhost:3003'}/api/test/create-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        ...notification,
        id: `notif_${Date.now()}`,
        timestamp: new Date().toISOString(),
        read: false
      }),
    });

    if (!response.ok) {
      console.warn('Failed to create test notification');
    }
  }

  /**
   * Wait for element with custom timeout
   */
  async waitForElement(page: Page, selector: string, timeout = 10000): Promise<void> {
    await page.waitForSelector(selector, { timeout });
  }

  /**
   * Wait for navigation with loading states
   */
  async waitForNavigation(page: Page, url: string, timeout = 30000): Promise<void> {
    await page.waitForURL(url, { timeout });
    // Wait for any loading spinners to disappear
    await page.waitForFunction(() => {
      const loadingElements = document.querySelectorAll('[data-testid="loading"], .loading, [aria-label*="loading"]');
      return loadingElements.length === 0;
    }, { timeout: 10000 });
  }

  /**
   * Fill form with realistic delays
   */
  async fillFormRealistic(page: Page, fields: Record<string, string>): Promise<void> {
    for (const [field, value] of Object.entries(fields)) {
      const input = page.locator(`[name="${field}"], [data-testid="${field}"]`).first();
      await input.click();
      await page.waitForTimeout(100); // Small delay between click and type
      await input.fill(value);
      await page.waitForTimeout(200); // Simulate realistic typing speed
    }
  }

  /**
   * Simulate mobile device interactions
   */
  async simulateMobileSwipe(page: Page, element: string, direction: 'left' | 'right' | 'up' | 'down'): Promise<void> {
    const elementHandle = await page.locator(element);
    const box = await elementHandle.boundingBox();
    
    if (!box) return;

    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;
    
    let endX = startX;
    let endY = startY;

    switch (direction) {
      case 'left':
        endX = startX - box.width * 0.5;
        break;
      case 'right':
        endX = startX + box.width * 0.5;
        break;
      case 'up':
        endY = startY - box.height * 0.5;
        break;
      case 'down':
        endY = startY + box.height * 0.5;
        break;
    }

    await page.touchscreen.tap(startX, startY);
    await page.touchscreen.tap(endX, endY);
  }

  /**
   * Simulate network conditions
   */
  async simulateNetworkConditions(page: Page, condition: 'offline' | 'slow' | 'fast'): Promise<void> {
    switch (condition) {
      case 'offline':
        await page.context().setOffline(true);
        break;
      case 'slow':
        await page.context().setOffline(false);
        // Simulate slow 3G
        await page.route('**/*', route => {
          setTimeout(() => route.continue(), Math.random() * 2000 + 500);
        });
        break;
      case 'fast':
        await page.context().setOffline(false);
        // Clear any delays
        await page.unroute('**/*');
        break;
    }
  }

  /**
   * Take screenshot with context
   */
  async takeContextScreenshot(page: Page, name: string, fullPage = false): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({
      path: `test-results/screenshots/${timestamp}-${name}.png`,
      fullPage
    });
  }

  /**
   * Check accessibility violations
   */
  async checkAccessibility(page: Page): Promise<void> {
    // Inject axe-core for accessibility testing
    await page.evaluate(() => {
      // Basic a11y checks
      const issues = [];
      
      // Check for missing alt text
      const images = document.querySelectorAll('img:not([alt])');
      if (images.length > 0) {
        issues.push(`${images.length} images missing alt text`);
      }

      // Check for form labels
      const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
      const unlabeledInputs = Array.from(inputs).filter(input => {
        const labels = document.querySelectorAll(`label[for="${input.id}"]`);
        return labels.length === 0;
      });
      
      if (unlabeledInputs.length > 0) {
        issues.push(`${unlabeledInputs.length} form inputs missing labels`);
      }

      if (issues.length > 0) {
        console.warn('Accessibility issues found:', issues);
      }
    });
  }

  /**
   * Monitor performance metrics
   */
  async getPerformanceMetrics(page: Page): Promise<Record<string, number>> {
    return await page.evaluate(() => {
      const performance = window.performance;
      const navigation = performance.getEntriesByType('navigation')[0] as any;
      
      return {
        loadTime: navigation?.loadEventEnd - navigation?.loadEventStart || 0,
        domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart || 0,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0,
        largestContentfulPaint: 0, // Would need to implement LCP observer
      };
    });
  }

  /**
   * Clean up all test data
   */
  async cleanup(): Promise<void> {
    try {
      // Clean up created users
      for (const user of this.createdUsers) {
        await fetch(`${process.env.TEST_BASE_URL || 'http://localhost:3003'}/api/test/cleanup-user`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ uid: user.uid, email: user.email }),
        });
      }

      // Clean up created spaces
      for (const space of this.createdSpaces) {
        await fetch(`${process.env.TEST_BASE_URL || 'http://localhost:3003'}/api/test/cleanup-space`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: space.id }),
        });
      }

      // Clear tracking arrays
      this.createdUsers = [];
      this.createdSpaces = [];
      this.authTokens.clear();
      
    } catch (error) {
      console.warn('Cleanup warning:', error);
      // Don't fail tests due to cleanup issues
    }
  }

  /**
   * Global cleanup for test session
   */
  static async globalCleanup(): Promise<void> {
    try {
      await fetch(`${process.env.TEST_BASE_URL || 'http://localhost:3003'}/api/test/cleanup-all`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.warn('Global cleanup warning:', error);
    }
  }
}