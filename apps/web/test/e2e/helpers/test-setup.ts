/**
 * E2E Test Setup Helpers
 */

export interface TestUser {
  id: string;
  email: string;
  name: string;
  handle: string;
}

export interface TestSpace {
  id: string;
  name: string;
  description: string;
}

export const TEST_USERS: Record<string, TestUser> = {
  student: {
    id: 'test-student-id',
    email: 'student@test.edu',
    name: 'Test Student',
    handle: 'teststudent'
  },
  admin: {
    id: 'test-admin-id',
    email: 'admin@test.edu',
    name: 'Test Admin',
    handle: 'testadmin'
  }
};

export const TEST_SPACES: Record<string, TestSpace> = {
  cs101: {
    id: 'cs101-space',
    name: 'CS 101',
    description: 'Introduction to Computer Science'
  },
  dorm: {
    id: 'dorm-space',
    name: 'Dorm Floor 3',
    description: 'Third floor residents'
  }
};

export async function setupMockAuth(page: any, user: TestUser = TEST_USERS.student) {
  await page.route('/api/auth/session', async (route: any) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user,
        isAuthenticated: true
      })
    });
  });
}

export async function setupMockSpaces(page: any, spaces: TestSpace[] = Object.values(TEST_SPACES)) {
  await page.route('/api/spaces', async (route: any) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        spaces,
        total: spaces.length
      })
    });
  });
}

export async function waitForNavigation(page: any, expectedUrl: string) {
  await page.waitForURL(expectedUrl);
}

export async function setupTestUser(page: any, user: TestUser = TEST_USERS.student) {
  // Set up auth mock and localStorage for test user
  await setupMockAuth(page, user);
  
  await page.addInitScript((testUser: TestUser) => {
    localStorage.setItem('hive_session', JSON.stringify({
      userId: testUser.id,
      email: testUser.email,
      onboardingCompleted: true,
      verifiedAt: new Date().toISOString(),
      profileData: {
        fullName: testUser.name,
        handle: testUser.handle
      },
      token: 'test-token'
    }));
    localStorage.setItem('dev_auth_mode', 'true');
  }, user);
}

export async function cleanupTestData(page: any) {
  // Clean up test localStorage and any test data
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}