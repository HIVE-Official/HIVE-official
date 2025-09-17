import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
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
export const queryKeys = {
  all: ['hive'] as const,
  
  // Auth
  auth: () => [...queryKeys.all, 'auth'] as const,
  session: () => [...queryKeys.auth(), 'session'] as const,
  
  // Profile
  profiles: () => [...queryKeys.all, 'profiles'] as const,
  profile: (userId: string) => [...queryKeys.profiles(), userId] as const,
  
  // Spaces
  spaces: () => [...queryKeys.all, 'spaces'] as const,
  space: (spaceId: string) => [...queryKeys.spaces(), spaceId] as const,
  spaceMembers: (spaceId: string) => [...queryKeys.space(spaceId), 'members'] as const,
  spaceTools: (spaceId: string) => [...queryKeys.space(spaceId), 'tools'] as const,
  spaceEvents: (spaceId: string) => [...queryKeys.space(spaceId), 'events'] as const,
  
  // Tools
  tools: () => [...queryKeys.all, 'tools'] as const,
  tool: (toolId: string) => [...queryKeys.tools(), toolId] as const,
  toolDeployments: (toolId: string) => [...queryKeys.tool(toolId), 'deployments'] as const,
  
  // Feed
  feed: () => [...queryKeys.all, 'feed'] as const,
  feedFiltered: (filter: string) => [...queryKeys.feed(), filter] as const,
  post: (postId: string) => [...queryKeys.feed(), 'post', postId] as const,
  
  // Events
  events: () => [...queryKeys.all, 'events'] as const,
  event: (eventId: string) => [...queryKeys.events(), eventId] as const,
  eventAttendees: (eventId: string) => [...queryKeys.event(eventId), 'attendees'] as const,
  
  // Rituals
  rituals: () => [...queryKeys.all, 'rituals'] as const,
  ritual: (ritualId: string) => [...queryKeys.rituals(), ritualId] as const,
  
  // Search
  search: (query: string) => [...queryKeys.all, 'search', query] as const,
  
  // Analytics
  analytics: () => [...queryKeys.all, 'analytics'] as const,
  userAnalytics: (userId: string) => [...queryKeys.analytics(), 'user', userId] as const,
  spaceAnalytics: (spaceId: string) => [...queryKeys.analytics(), 'space', spaceId] as const,
  
  // Onboarding
  onboarding: () => [...queryKeys.all, 'onboarding'] as const,
  handleAvailability: (handle: string) => [...queryKeys.onboarding(), 'handle-availability', handle] as const,
};