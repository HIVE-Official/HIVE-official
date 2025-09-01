// HIVE Surface Components - 7-Surface Architecture Implementation
// Individual surface components for the HIVE Space layout system

export { HivePinnedSurface, type PinnedContent } from './hive-pinned-surface';
export { HivePostsSurface, type Post, type Comment } from './hive-posts-surface';
export { HiveEventsSurface, type Event } from './hive-events-surface';
export { HiveToolsSurface, type Tool } from './hive-tools-surface';
export { HiveChatSurface, type ChatMessage } from './hive-chat-surface';
export { HiveMembersSurface, type Member } from './hive-members-surface';
export { HiveActivitySurface, type ActivityItem } from './hive-activity-surface';

// Export all surface-related types and configurations
export { pinnedContentTypes } from './hive-pinned-surface';
export { postTypes } from './hive-posts-surface';
export { eventTypes, rsvpStatuses } from './hive-events-surface';
export { toolCategories, toolStatuses } from './hive-tools-surface';
export { messageTypes, messageStatuses } from './hive-chat-surface';
export { memberRoles, memberStatuses } from './hive-members-surface';
export { activityTypes } from './hive-activity-surface';