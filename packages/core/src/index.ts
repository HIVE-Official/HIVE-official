// Domain types - Creation
export * from "./domain/creation/element";
export * from "./domain/creation/tool";

// Domain types - Firestore
export * from "./domain/firestore/handle";
export * from "./domain/firestore/member";
export * from "./domain/firestore/post";
export * from "./domain/firestore/space";
export * from "./domain/firestore/user";

// Export Space type explicitly for api-client
export type { Space } from "./domain/firestore/space";

// Domain types - Profile
export type {
  HiveProfile,
  HiveProfileIdentity,
  HiveAcademicInfo,
  HivePersonalInfo,
  HivePrivacySettings,
  HiveBuilderInfo,
  HiveActivityStats,
  HiveTimestamps,
  HiveVerificationStatus,
  HiveProfileUpdateData,
  HiveProfileDashboard,
  HiveProfileCreateData,
  HiveProfileResponse,
  HiveProfileAnalytics,
  HiveProfileVisibility,
  HiveOnlineStatus,
  HiveActivityType
} from "./domain/profile/profile";

export {
  getProfileCompleteness,
  DEFAULT_PRIVACY_SETTINGS,
  DEFAULT_BUILDER_INFO,
  isValidHandle as isValidProfileHandle,
  isValidEmail,
  getDisplayName,
  getProfileUrl,
  isProfilePublic,
  canViewProfile
} from "./domain/profile/profile";

// Domain types - Auth
export * from "./domain/auth/emailLink";

// Domain types - Analytics
// Note: Both creation and feed modules export hashUserId - use specific imports if needed
export * from "./domain/analytics/creation";
export * from "./domain/analytics/onboarding";
export * from "./domain/analytics/feed";
export * from "./domain/analytics/events";

// Domain types - Other
export type { SpaceMember } from "./domain/member";
export type { WaitlistEntry } from "./domain/waitlistEntry";
export type { School } from "./domain/school";

// Cohort utilities
export * from "./domain/cohort/cohort-spaces";

// Constants
export * from "./constants/majors";
export * from "./constants/interests";

// Handle generation utilities
export { generateHandleVariants, generateBaseHandle } from "./utils/handle-generator";

// Space discovery
export { SpaceDiscoveryEngine } from "./domain/space/discovery";

// Environment utilities
export * from "./env";

// Stores
export * from "./stores/useAppStore";

// Firebase client config
export * from "./firebase";

// Feature flags
export * from "./feature-flags";

// Privacy utilities
export * from "./utils/privacy-utils";

// Logger utilities
export * from "./utils/logger";

// Feed-related exports for API clients
export type { Post as FeedPost, CreatePostRequest, PostType, PostContent } from "./domain/feed/posting";
export { CreatePostSchema } from "./domain/feed/posting";
