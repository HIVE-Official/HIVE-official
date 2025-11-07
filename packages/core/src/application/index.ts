/**
 * Application Services Layer
 * Orchestrates domain models and provides use cases for the UI
 */

// Base service infrastructure
export {
  BaseApplicationService
} from './base.service';

export type {
  ApplicationServiceContext,
  ServiceResult,
  ServiceError
} from './base.service';

// CQRS Infrastructure - Temporarily removed during DDD refactor
// Will be rebuilt with proper CQRS implementation

// Commands & Queries - Temporarily removed during DDD refactor
// Will be rebuilt with proper domain model structure

// Cross-Domain Sagas removed in favor of simpler command handlers

// Legacy Profile domain services (existing)
export {
  ProfileOnboardingService
} from './profile-onboarding.service';

export type {
  OnboardingData,
  OnboardingResult
} from './profile-onboarding.service';

// Space domain services
export {
  SpaceDiscoveryService
} from './space-discovery.service';

export type {
  SpaceCreationData,
  SpaceDiscoveryFilters,
  SpaceJoinResult,
  SpaceActivityData
} from './space-discovery.service';

// Feed domain services
export {
  FeedGenerationService
} from './feed-generation.service';

export type {
  FeedGenerationOptions,
  FeedInsights,
  FeedContent
} from './feed-generation.service';

// Ritual domain services
export {
  EnhancedRitualParticipationService
} from './ritual-participation.service';

export type {
  EnhancedRitualCreationData,
  EnhancedRitualProgress,
  LeaderboardEntry
} from './ritual-participation.service';

export {
  RitualEngineService
} from './rituals/ritual-engine.service';

export type {
  UpsertRitualInput,
  TransitionOptions
} from './rituals/ritual-engine.service';

export {
  toFeedBanner,
  toDetailView,
} from './rituals/ritual-presenter';

export type {
  RitualFeedBanner,
  RitualDetailView,
  RitualDetailStatus,
} from './rituals/ritual-presenter';

// Service Factory temporarily removed - will be rebuilt with proper DDD structure
