// Domain types - Creation
export * from "./domain/creation/element";
export * from "./domain/creation/tool";

// Domain types - Firestore
export * from "./domain/firestore/handle";
export * from "./domain/firestore/member";
export * from "./domain/firestore/post";
export * from "./domain/firestore/space";
export * from "./domain/firestore/user";
export * from "./domain/firestore/leader-claim";

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

// Constants
export * from "./constants/majors";

// Stores
export * from "./stores";

// Firebase client config
export * from "./firebase";
// export * from "./firebase-admin"; // TEMP: Commented out to avoid duplicate auth/db exports

// Feed System Core
export * from "./domain/feed/top-strip";
export * from "./domain/feed/main-feed";
export * from "./domain/feed/composer";

// Feed Posting System - Selective exports to avoid conflicts with firestore/post
export type {
  PostType as FeedPostType,
  PostVisibility,
  PostStatus,
  PostContent,
  CreatePostRequest,
  PostAnalytics,
} from "./domain/feed/posting";

// Export the advanced Post type with a different name to avoid conflict
export type { Post as FeedPost } from "./domain/feed/posting";

export {
  CreatePostSchema,
  ContentProcessor,
  PostValidator,
  PostCreationEngine,
  DraftManager,
  PostAnalyticsTracker,
} from "./domain/feed/posting";

// Space Discovery System
// Note: Selective export to avoid conflicts with firestore/space
export {
  SpaceSection,
  SpaceStatus,
  SpaceOwnerType,
  SpaceDiscoveryEngine,
} from "./domain/space/discovery";

export type {
  SpaceDiscoveryData,
  UserDiscoveryContext,
  DiscoveryFilters,
  DiscoveryResult,
} from "./domain/space/discovery";

export { SpaceDiscoverySchema } from "./domain/space/discovery";

// Note: ContentProcessor and PostValidator are now exported from domain/feed/posting

// export * from "./domain/space/space.types"; // Obsolete – file removed
// export * from "./domain/space/space.guards"; // Obsolete – file removed

// export * from "./domain/feed/feed.types"; // Obsolete – file removed
// export * from "./domain/feed/feed.guards"; // Obsolete – file removed

// Types
// export * from "./types/auth-types"; // TEMP: Commented out missing file

export * from "./utils/logger";
