/**
 * @hive/core - Main export file
 * Domain-Driven Design architecture with proper bounded contexts
 */
export { Profile } from "./domain/profile/aggregates/profile.aggregate";
export type { ProfileProps, PersonalInfo, AcademicInfo, SocialInfo } from "./domain/profile/aggregates/profile.aggregate";
export type { SpecCompliantProfile } from "./domain/profile/spec-compliant-profile";
export { isProfileComplete, getProfileCompletionPercentage, createDefaultProfile } from "./domain/profile/spec-compliant-profile";
export { Connection, ConnectionType, ConnectionSource } from "./domain/profile/aggregates/connection";
export { Space } from "./domain/spaces/aggregates/space.aggregate";
export type { SpaceProps, SpaceMember, SpaceSettings, RushMode } from "./domain/spaces/aggregates/space.aggregate";
export { SpaceId } from "./domain/spaces/value-objects/space-id.value";
export { SpaceName } from "./domain/spaces/value-objects/space-name.value";
export { SpaceDescription } from "./domain/spaces/value-objects/space-description.value";
export { SpaceCategory, SpaceCategoryEnum } from "./domain/spaces/value-objects/space-category.value";
export { Tab } from "./domain/spaces/entities/tab";
export { Widget } from "./domain/spaces/entities/widget";
export { Ritual } from "./domain/rituals/aggregates/ritual.aggregate";
export type { RitualProps, RitualType, RitualCategory, RitualStatus, GoalType, RitualGoal, RitualRequirement, RitualReward, ParticipationStats } from "./domain/rituals/aggregates/ritual.aggregate";
export { RitualId } from "./domain/rituals/value-objects/ritual-id.value";
export { Tool } from "./domain/tools/aggregates/tool.aggregate";
export type { ToolProps, ToolStatus, ToolVisibility, ElementInstance, ToolPermissions, ToolAnalytics } from "./domain/tools/aggregates/tool.aggregate";
export { ToolId } from "./domain/tools/value-objects/tool-id.value";
export { FeedItem } from "./domain/feed/feed-item";
export { EnhancedFeed } from "./domain/feed/enhanced-feed";
export type { FeedPost, ScoredPost } from "./domain/feed/services/feed-algorithm.service";
export * from "./application";
export * from "./infrastructure/repositories/interfaces";
export * from "./infrastructure/repositories/factory";
export { FirebaseUnitOfWork } from "./infrastructure/repositories/firebase/unit-of-work";
export * from "./application/identity/dtos/profile.dto";
export * from "./infrastructure/mappers/profile.firebase-mapper";
export { presenceService } from "./services/presence-service";
export type { PresenceData } from "./services/presence-service";
export * from "./constants/majors";
export * from "./stores/useAppStore";
export * from "./feature-flags";
export { app, db, auth, storage } from "./firebase";
export * from "./server";
export type { ProfileSystem, HiveProfile, UnifiedHiveProfile } from "./types/profile-system";
export * from "./utils/activity-tracker";
export * from "./utils/privacy-utils";
export * from "./utils/profile-aggregator";
export * from "./analytics-temp-exports";
export { feedListener } from "./infrastructure/realtime/feed-listener";
export type { FeedUpdate, FeedListenerOptions } from "./infrastructure/realtime/feed-listener";
export { GetFeedQueryHandler } from "./application/feed/queries/get-feed.query";
export type { GetFeedQuery, GetFeedQueryResult } from "./application/feed/queries/get-feed.query";
export { SearchType, SearchQueryHandler } from "./application/search/queries/search.query";
export type { SearchResultItem, SearchQuery, SearchQueryResult } from "./application/search/queries/search.query";
export * from "./application/shared/temporary-types";
//# sourceMappingURL=index.d.ts.map