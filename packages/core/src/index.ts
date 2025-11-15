/**
 * @hive/core - Main export file
 * Domain-Driven Design architecture with proper bounded contexts
 */

// Domain Models - Specific exports to avoid conflicts
export { EnhancedProfile } from "./domain/profile/aggregates/enhanced-profile";
export type { SpecCompliantProfile } from "./domain/profile/spec-compliant-profile";
export { isProfileComplete, getProfileCompletionPercentage, createDefaultProfile } from "./domain/profile/spec-compliant-profile";
export { Connection, ConnectionType, ConnectionSource } from "./domain/profile/aggregates/connection";
export { SpaceId } from "./domain/spaces/value-objects/space-id.value";
export { SpaceName } from "./domain/spaces/value-objects/space-name.value";
export { SpaceDescription } from "./domain/spaces/value-objects/space-description.value";
export { SpaceCategory } from "./domain/spaces/value-objects/space-category.value";
export { EnhancedSpace } from "./domain/spaces/aggregates/enhanced-space";
export { Tab } from "./domain/spaces/entities/tab";
export { Widget } from "./domain/spaces/entities/widget";
export { RitualId } from "./domain/rituals/value-objects/ritual-id.value";
export { EnhancedRitual } from "./domain/rituals/aggregates/enhanced-ritual";
export { FeedItem } from "./domain/feed/feed-item";
export { EnhancedFeed } from "./domain/feed/enhanced-feed";
export {
  RitualArchetype,
  type RitualPhase,
  type RitualPresentation,
  type RitualMetricsSnapshot,
  type BaseRitual,
  type FoundingClassRitual,
  type LaunchCountdownRitual,
  type BetaLotteryRitual,
  type UnlockChallengeRitual,
  type SurvivalRitual,
  type LeakRitual,
  type TournamentRitual,
  type FeatureDropRitual,
  type RuleInversionRitual,
  type RitualUnion,
  type FoundingClassConfig,
  type LaunchCountdownConfig,
  type BetaLotteryConfig,
  type UnlockChallengeConfig,
  type SurvivalConfig,
  type LeakConfig,
  type TournamentConfig,
  type TournamentMatchup,
  type FeatureDropConfig,
  type FeatureDropAnalyticsMetric,
  type FeatureDropSurveyQuestion,
  type RuleInversionConfig,
  type RuleInversionGuardrail,
  RitualSchema,
  RitualUnionSchema,
  parseRitualUnion,
} from "./domain/rituals/archetypes";

export * from "./domain/rituals/events";
export {
  RitualComposerSchema,
  createDefaultConfig,
  type RitualComposerInput,
} from "./domain/rituals/composer";

// Ritual Templates
export {
  RITUAL_TEMPLATES,
  getAvailableTemplates,
  getTemplate,
  getTemplatesByCategory,
  getTemplatesByArchetype,
  type RitualTemplate,
  type RitualTemplateMetadata,
  type RitualTemplateId,
} from "./domain/rituals/templates";

// Application Services - Use Case Orchestration
export * from "./application";

// Repository Pattern - Data Access Layer
export * from "./infrastructure/repositories/interfaces";
export * from "./infrastructure/repositories/factory";
export { FirebaseUnitOfWork } from "./infrastructure/repositories/firebase/unit-of-work";

// DTOs and Mappers
export * from "./application/identity/dtos/profile.dto";
export * from "./infrastructure/mappers/profile.firebase-mapper";

// Services
export { presenceService } from "./services/presence-service";
export type { PresenceData, PresenceStatus } from "./services/presence-service";

// Constants
export * from "./constants/majors";
export * from "./constants/onboarding-interests";

// Stores
export * from "./stores/useAppStore";

// Feature Flags
export * from "./feature-flags";

// Firebase Configuration (temporary until @hive/firebase is fixed)
export { app, db, auth, storage } from "./firebase";

// Server-side utilities
export * from "./server";

// Types and Interfaces - Specific exports to avoid conflicts
export * from "./types/profile-system";

// Utilities
export * from "./utils/activity-tracker";
export * from "./utils/privacy-utils";
export * from "./utils/profile-aggregator";

// Analytics convenience functions (for backwards compatibility)
export * from "./analytics-temp-exports";

// Realtime and Query exports
export { feedListener } from "./infrastructure/realtime/feed-listener";
export type { FeedUpdate, FeedListenerOptions } from "./infrastructure/realtime/feed-listener";
export { GetFeedQueryHandler } from "./application/feed/queries/get-feed.query";
export type { GetFeedQuery, GetFeedQueryResult } from "./application/feed/queries/get-feed.query";
export { SearchType, SearchQueryHandler } from "./application/search/queries/search.query";
export type { SearchResultItem, SearchQuery, SearchQueryResult } from "./application/search/queries/search.query";

// Temporary backward compatibility (will be removed)
export * from "./application/shared/temporary-types";

// Schemas
export * from "./schemas/admin/dashboard";
