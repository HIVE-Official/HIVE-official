"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryKeys = exports.queryClient = void 0;
const react_query_1 = require("@tanstack/react-query");
exports.queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            // Consider data fresh for 5 minutes
            staleTime: 5 * 60 * 1000,
            // Keep cache for 10 minutes
            gcTime: 10 * 60 * 1000,
            // Retry failed requests 3 times
            retry: 3,
            // Retry delay exponential backoff
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
            // Refetch on window focus (good for real-time feel)
            refetchOnWindowFocus: true,
            // Don't refetch on reconnect (we handle this separately)
            refetchOnReconnect: 'always',
        },
        mutations: {
            // Retry failed mutations once
            retry: 1,
            // Shorter retry delay for mutations
            retryDelay: 1000,
        },
    },
});
// Query key factory for consistent key generation
exports.queryKeys = {
    all: ['hive'],
    // Auth
    auth: () => [...exports.queryKeys.all, 'auth'],
    session: () => [...exports.queryKeys.auth(), 'session'],
    // Profile
    profiles: () => [...exports.queryKeys.all, 'profiles'],
    profile: (userId) => [...exports.queryKeys.profiles(), userId],
    // Spaces
    spaces: () => [...exports.queryKeys.all, 'spaces'],
    space: (spaceId) => [...exports.queryKeys.spaces(), spaceId],
    spaceMembers: (spaceId) => [...exports.queryKeys.space(spaceId), 'members'],
    spaceTools: (spaceId) => [...exports.queryKeys.space(spaceId), 'tools'],
    spaceEvents: (spaceId) => [...exports.queryKeys.space(spaceId), 'events'],
    // Tools
    tools: () => [...exports.queryKeys.all, 'tools'],
    tool: (toolId) => [...exports.queryKeys.tools(), toolId],
    toolDeployments: (toolId) => [...exports.queryKeys.tool(toolId), 'deployments'],
    // Feed
    feed: () => [...exports.queryKeys.all, 'feed'],
    feedFiltered: (filter) => [...exports.queryKeys.feed(), filter],
    post: (postId) => [...exports.queryKeys.feed(), 'post', postId],
    // Events
    events: () => [...exports.queryKeys.all, 'events'],
    event: (eventId) => [...exports.queryKeys.events(), eventId],
    eventAttendees: (eventId) => [...exports.queryKeys.event(eventId), 'attendees'],
    // Rituals
    rituals: () => [...exports.queryKeys.all, 'rituals'],
    ritual: (ritualId) => [...exports.queryKeys.rituals(), ritualId],
    // Search
    search: (query) => [...exports.queryKeys.all, 'search', query],
    // Analytics
    analytics: () => [...exports.queryKeys.all, 'analytics'],
    userAnalytics: (userId) => [...exports.queryKeys.analytics(), 'user', userId],
    spaceAnalytics: (spaceId) => [...exports.queryKeys.analytics(), 'space', spaceId],
    // Onboarding
    onboarding: () => [...exports.queryKeys.all, 'onboarding'],
    handleAvailability: (handle) => [...exports.queryKeys.onboarding(), 'handle-availability', handle],
};
//# sourceMappingURL=query-client.js.map