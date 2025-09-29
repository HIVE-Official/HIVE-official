/**
 * @hive/core - Main export file
 * Domain-Driven Design architecture with proper bounded contexts
 */
export { EnhancedProfile } from "./domain/profile/aggregates/enhanced-profile";
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
export * from "./application";
export * from "./infrastructure/repositories/interfaces";
export * from "./infrastructure/repositories/factory";
export * from "./application/identity/dtos/profile.dto";
export * from "./infrastructure/mappers/profile.firebase-mapper";
export { presenceService } from "./services/presence-service";
export type { PresenceData } from "./services/presence-service";
export * from "./constants/majors";
export * from "./stores/useAppStore";
export * from "./feature-flags";
export { db } from "./firebase";
export { auth } from "./firebase";
export * from "./server";
export type { ProfileSystem, HiveProfile, UnifiedHiveProfile } from "./types/profile-system";
export * from "./utils/activity-tracker";
export * from "./utils/privacy-utils";
export * from "./utils/profile-aggregator";
export * from "./analytics-temp-exports";
export * from "./application/shared/temporary-types";
//# sourceMappingURL=index.d.ts.map