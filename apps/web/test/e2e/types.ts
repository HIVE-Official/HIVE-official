import type { AuthUser } from '@hive/auth-logic'

// Test user interface extending AuthUser
export interface TestUser extends AuthUser {
  id: string
  handle: string
  email: string
  fullName: string
  uid: string
  emailVerified: boolean
  isAnonymous: boolean
  metadata: {
    creationTime: string
    lastSignInTime: string
  }
}

// Test space interface
export interface TestSpace {
  id: string
  name: string
  description: string
  school: string
  category: string
}

// Base analytics event interface
export interface BaseAnalyticsEvent {
  type: string
  timestamp?: number // Optional since it's added by the analytics service
  userId?: string
  metadata?: Record<string, unknown>
}

// Space-related analytics events
export interface SpaceAnalyticsEvent extends BaseAnalyticsEvent {
  type: 'space_view' | 'space_join' | 'space_leave' | 'post_created' | 'post_edited' | 'post_deleted' | 'post_reaction'
  spaceId: string
  metadata?: {
    reaction?: string
    postId?: string
    [key: string]: unknown
  }
}

// Onboarding-related analytics events
export interface OnboardingEvent extends BaseAnalyticsEvent {
  type: 'onboarding_started' | 'onboarding_completed' | 'onboarding_step'
  stepName?: string
  metadata?: {
    step?: string
    completed?: boolean
    [key: string]: unknown
  }
}

// Augment the window interface
declare global {
  interface Window {
    analyticsEvents: BaseAnalyticsEvent[]
  }
}

export type AnalyticsEvent = SpaceAnalyticsEvent 