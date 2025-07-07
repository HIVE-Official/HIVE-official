// This file is the client-safe entry point for the package.
// It should not export anything that uses server-side dependencies.

// Domain types - Safe to export
export * from "./domain/creation/element";
export * from "./domain/creation/tool";
export * from "./domain/firestore/handle";
export * from "./domain/firestore/member";
export * from "./domain/firestore/post";
export type { Space, SpaceTag } from "./domain/firestore/space";
export * from "./domain/firestore/user";
export * from "./domain/firestore/leader-claim";
export * from "./domain/auth/emailLink";
export * from "./domain/analytics/creation";
export * from "./domain/analytics/onboarding";
export * from "./domain/analytics/feed";
export * from "./domain/analytics/events";
export type { SpaceMember } from "./domain/member";
export type { WaitlistEntry } from "./domain/waitlistEntry";
export type { School } from "./domain/school";

// New comprehensive domain models
export * from "./domain/firestore/ritual";
export * from "./domain/firestore/notification";

// Analytics with prefixed exports to avoid conflicts
export { 
  UserAnalyticsSchema as FirestoreUserAnalyticsSchema,
  SpaceAnalyticsSchema as FirestoreSpaceAnalyticsSchema,
  PlatformAnalyticsSchema as FirestorePlatformAnalyticsSchema,
  AnalyticsEventSchema as FirestoreAnalyticsEventSchema,
  UserAnalyticsConverter,
  AnalyticsEventConverter,
  ANALYTICS_COLLECTIONS,
  AnalyticsUtils,
  type UserAnalytics as FirestoreUserAnalytics,
  type SpaceAnalytics as FirestoreSpaceAnalytics,
  type PlatformAnalytics as FirestorePlatformAnalytics,
  type AnalyticsEvent as FirestoreAnalyticsEvent
} from "./domain/firestore/analytics";

// Tool models with prefixed exports to avoid conflicts
export {
  ToolSchema as FirestoreToolSchema,
  ToolUsageSchema as FirestoreToolUsageSchema,
  ToolFeedbackSchema as FirestoreToolFeedbackSchema,
  ToolTemplateSchema as FirestoreToolTemplateSchema,
  ToolConfigSchema as FirestoreToolConfigSchema,
  ToolMetadataSchema as FirestoreToolMetadataSchema,
  ToolPermissionSchema as FirestoreToolPermissionSchema,
  ToolConverter,
  ToolUsageConverter,
  TOOL_COLLECTIONS,
  ToolUtils,
  ToolPermissionUtils,
  type Tool as FirestoreTool,
  type ToolUsage as FirestoreToolUsage,
  type ToolUsage,
  type ToolFeedback as FirestoreToolFeedback,
  type ToolTemplate as FirestoreToolTemplate,
  type ToolConfig as FirestoreToolConfig,
  type ToolMetadata as FirestoreToolMetadata,
  type ToolPermission as FirestoreToolPermission,
  type ToolCategory as FirestoreToolCategory,
  type ToolType as FirestoreToolType,
  type ToolStatus as FirestoreToolStatus,
  type ToolVisibility as FirestoreToolVisibility
} from "./domain/firestore/tool";

// Moderation models
export * from "./domain/firestore/moderation";

// Constants - Safe to export
export * from "./constants/majors";
export * from "./constants/academic-years";
export * from "./constants/academics";
export * from "./constants/interests";
export * from "./constants/school-domains";

// Feed System Core - Assumed to be types and client-side logic
export * from "./domain/feed/top-strip";
export * from "./domain/feed/main-feed";
export * from "./domain/feed/composer";

// Feed Posting System - Types and client-side schemas
export type {
  PostType as FeedPostType,
  PostVisibility,
  PostStatus,
  PostContent,
  CreatePostRequest,
  PostAnalytics,
} from "./domain/feed/posting";
export type { Post as FeedPost } from "./domain/feed/posting";
export { CreatePostSchema, PostCreationEngine, PostAnalyticsTracker } from "./domain/feed/posting";

// Space Discovery System - Types and client-side schemas
export { SpaceSection, SpaceStatus, SpaceOwnerType, SpaceDiscoveryEngine } from "./domain/space/discovery";
export type {
  SpaceDiscoveryData,
  UserDiscoveryContext,
  DiscoveryFilters,
  DiscoveryResult,
} from "./domain/space/discovery";
export { SpaceDiscoverySchema } from "./domain/space/discovery";

// Type exports - Safe
export * from "./types/major";
export * from "./types/onboarding";

// Client-side Firebase utilities - Safe
export { app, auth, db } from "./firebase";

// Client-side stores - Safe
export * from "./stores/useAppStore";
export * from "./stores/useUnseenCountStore";

// Environment variables (client-safe parts) - Safe
export { env, isDevelopment, isProduction, getFirebaseConfig, isDebugMode } from "./env";

// Logger (client-side) - Safe
export { logger } from './utils/logger';

// Client-side utilities - Handle generation is safe for client-side use
export {
  generateBaseHandle,
  generateHandleVariants,
  findAvailableHandle,
  validateHandle,
  generateHandleSuggestions,
  generateNameBasedHandles,
  containsBadWords,
} from "./utils/handle-generator";

// Photo moderation utilities - temporarily commented out
// export { PhotoModerationUtils } from "./utils/photo-moderation";

// Re-export server-side utilities
export * from './server-index';

// Re-export other modules
export * from './env';
export * from './domain/auth/user-context';
export * from './domain/landing/hero-content';
export * from './domain/creation/element';
export * from './utils/logger';
