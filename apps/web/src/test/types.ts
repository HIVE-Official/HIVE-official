import type { AuthUser } from "@hive/auth-logic";

// Test user interface extending AuthUser
export interface TestUser extends Omit<AuthUser, 'email' | 'fullName'> {
  id: string;
  handle: string;
  email: string;
  fullName: string;
  isAnonymous: boolean;
  metadata: {
    creationTime: string;
    lastSignInTime: string;
  };
}

// Test space interface
export interface TestSpace {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
  memberCount: number;
  isPrivate: boolean;
  schoolId: string;
}

// Analytics event interfaces
export interface BaseAnalyticsEvent {
  type: string;
  timestamp: number;
}

export interface SpaceAnalyticsEvent extends BaseAnalyticsEvent {
  type: "SPACE_VIEW" | "SPACE_JOIN" | "SPACE_LEAVE";
  spaceId: string;
  userId: string;
  metadata?: Record<string, unknown>;
}

// Helper functions for analytics and element selection
export function getAnalyticsEvents<T extends BaseAnalyticsEvent>(type: string): T[] {
  const events = (window as unknown as { analyticsEvents: BaseAnalyticsEvent[] }).analyticsEvents || [];
  return events.filter(
    (event): event is T => event.type === type
  );
}

export function getFirstElement<T extends Element>(
  selector: string,
  container: Element | Document = document
): T | null {
  return container.querySelector<T>(selector);
}

// Test cleanup helper
export function cleanupTest(): void {
  window.localStorage.clear();
  (window as unknown as { analyticsEvents: BaseAnalyticsEvent[] }).analyticsEvents = [];
} 