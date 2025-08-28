// This file is the client-safe entry point for the package.
// It should not export anything that uses server-side dependencies.
// Domain types - Safe to export
export * from "./domain/creation/element";
export * from "./domain/creation/tool";
export * from "./domain/firestore/handle";
export * from "./domain/firestore/member";
export * from "./domain/firestore/post";
export * from "./domain/firestore/user";
export * from "./domain/firestore/leader-claim";
export * from "./domain/auth/emailLink";
export * from "./domain/analytics/creation";
export * from "./domain/analytics/onboarding";
export * from "./domain/analytics/feed";
export * from "./domain/analytics/events";
// Constants - Safe to export
export * from "./constants/majors";
export * from "./constants/academic-years";
export * from "./constants/academics";
export * from "./constants/interests";
// Feed System Core - Assumed to be types and client-side logic
export * from "./domain/feed/top-strip";
export * from "./domain/feed/main-feed";
export * from "./domain/feed/composer";
export { CreatePostSchema } from "./domain/feed/posting";
// Space Discovery System - Types and client-side schemas
export { SpaceSection, SpaceOwnerType } from "./domain/space/discovery";
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
//# sourceMappingURL=client.js.map