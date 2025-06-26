import { Page, Locator } from '@playwright/test'
import type { TestUser, BaseAnalyticsEvent } from '../types'

export type { TestUser, BaseAnalyticsEvent }

// Mock user data
const mockUser: TestUser = {
  id: 'test-user-123',
  handle: 'testuser',
  email: 'testuser@buffalo.edu',
  fullName: 'Test User',
  uid: 'test-user-123',
  emailVerified: true,
  isAnonymous: false,
  metadata: {
    creationTime: new Date().toISOString(),
    lastSignInTime: new Date().toISOString()
  }
}

// Setup test user and authentication
export async function setupTestUser(page: Page): Promise<TestUser> {
  // Set up local storage with auth data
  await page.evaluate((user) => {
    localStorage.setItem('auth_user', JSON.stringify(user))
  }, mockUser)

  // Set up analytics tracking
  await page.addInitScript(() => {
    window.analyticsEvents = []
  })

  return mockUser
}

// Cleanup test data
export async function cleanupTestData(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.clear()
    window.analyticsEvents = []
  })
}

// Helper function to get analytics events
export async function getAnalyticsEvents<T extends BaseAnalyticsEvent>(page: Page): Promise<T[]> {
  return await page.evaluate(() => window.analyticsEvents || []) as T[]
}

// Helper function to get first element from locator
export async function getFirstElement(page: Page, selector: string): Promise<Locator | null> {
  const locator = page.locator(selector)
  const count = await locator.count()
  return count > 0 ? locator.first() : null
} 