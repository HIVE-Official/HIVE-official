// Domain types - Creation
export * from "./domain/creation/element";
export * from "./domain/creation/tool";

// Domain types - Firestore
export * from "./domain/firestore/handle";
export * from "./domain/firestore/member";
export * from "./domain/firestore/post";
export * from "./domain/firestore/space";
export * from "./domain/firestore/user";

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

// Stores
export * from "./stores/useAppStore";

// Firebase client config
export * from "./firebase";

// Feature flags
export * from "./feature-flags";

// Privacy utilities
export * from "./utils/privacy-utils";
