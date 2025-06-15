import { z } from 'zod'

// Feed Analytics Events Schema
export const FeedAnalyticsEventSchema = z.discriminatedUnion('event', [
  // Space Feed Events
  z.object({
    event: z.literal('space_feed_viewed'),
    spaceId: z.string(),
    userId: z.string(),
    timestamp: z.date(),
    metadata: z.object({
      postsVisible: z.number(),
      scrollDepth: z.number().min(0).max(1), // 0-1 representing scroll percentage
      timeSpent: z.number(), // milliseconds
      deviceType: z.enum(['mobile', 'tablet', 'desktop']).optional(),
    }),
  }),
  
  // Post Creation Events
  z.object({
    event: z.literal('post_created'),
    spaceId: z.string(),
    postId: z.string(),
    userId: z.string(),
    timestamp: z.date(),
    metadata: z.object({
      postType: z.enum(['text', 'image', 'poll', 'event', 'toolshare']),
      contentLength: z.number(),
      hasMentions: z.boolean(),
      hasRichFormatting: z.boolean(),
      draftTime: z.number().optional(), // Time spent drafting in milliseconds
      composerSource: z.enum(['inline', 'modal']).default('inline'),
    }),
  }),
  
  // Post Engagement Events
  z.object({
    event: z.literal('post_reacted'),
    spaceId: z.string(),
    postId: z.string(),
    userId: z.string(),
    timestamp: z.date(),
    metadata: z.object({
      reaction: z.enum(['heart']),
      action: z.enum(['add', 'remove']),
      postAge: z.number(), // Age of post in milliseconds when reacted
      authorId: z.string(),
      isOwnPost: z.boolean(),
    }),
  }),
  
  z.object({
    event: z.literal('post_viewed'),
    spaceId: z.string(),
    postId: z.string(),
    userId: z.string(),
    timestamp: z.date(),
    metadata: z.object({
      viewDuration: z.number(), // Time spent viewing in milliseconds
      scrolledToEnd: z.boolean(),
      authorId: z.string(),
      postType: z.enum(['text', 'image', 'poll', 'event', 'toolshare']),
      postAge: z.number(), // Age of post when viewed
    }),
  }),
  
  // Post Management Events
  z.object({
    event: z.literal('post_edited'),
    spaceId: z.string(),
    postId: z.string(),
    userId: z.string(),
    timestamp: z.date(),
    metadata: z.object({
      editTime: z.number(), // Time after creation when edited
      contentLengthBefore: z.number(),
      contentLengthAfter: z.number(),
      editReason: z.enum(['typo', 'clarification', 'addition', 'other']).optional(),
    }),
  }),
  
  z.object({
    event: z.literal('post_deleted'),
    spaceId: z.string(),
    postId: z.string(),
    userId: z.string(),
    timestamp: z.date(),
    metadata: z.object({
      deletedBy: z.enum(['author', 'builder', 'admin']),
      postAge: z.number(), // Age when deleted
      hadReactions: z.boolean(),
      reactionCount: z.number(),
      deleteReason: z.enum(['inappropriate', 'spam', 'mistake', 'other']).optional(),
    }),
  }),
  
  // Space Engagement Events
  z.object({
    event: z.literal('space_joined'),
    spaceId: z.string(),
    userId: z.string(),
    timestamp: z.date(),
    metadata: z.object({
      joinMethod: z.enum(['invite', 'browse', 'search', 'auto']),
      referrerSpaceId: z.string().optional(),
      invitedBy: z.string().optional(),
    }),
  }),
  
  z.object({
    event: z.literal('space_left'),
    spaceId: z.string(),
    userId: z.string(),
    timestamp: z.date(),
    metadata: z.object({
      membershipDuration: z.number(), // Time as member in milliseconds
      postsCreated: z.number(),
      reactionsGiven: z.number(),
      lastActiveAt: z.date(),
      leaveReason: z.enum(['inactive', 'content', 'privacy', 'other']).optional(),
    }),
  }),
  
  // Builder Actions
  z.object({
    event: z.literal('builder_action'),
    spaceId: z.string(),
    userId: z.string(),
    timestamp: z.date(),
    metadata: z.object({
      action: z.enum(['pin_post', 'unpin_post', 'delete_post', 'mute_user', 'unmute_user']),
      targetId: z.string(), // postId or userId
      targetType: z.enum(['post', 'user']),
      reason: z.string().optional(),
    }),
  }),
  
  // Time Tracking (Heartbeat)
  z.object({
    event: z.literal('space_heartbeat'),
    spaceId: z.string(),
    userId: z.string(),
    timestamp: z.date(),
    metadata: z.object({
      sessionId: z.string(),
      activeTime: z.number(), // Active time in last 30 seconds
      tabVisible: z.boolean(),
      scrollPosition: z.number(),
      lastInteraction: z.date(),
    }),
  }),
])

export type FeedAnalyticsEvent = z.infer<typeof FeedAnalyticsEventSchema>

// Aggregated Analytics Schemas
export const SpaceEngagementMetricsSchema = z.object({
  spaceId: z.string(),
  date: z.string(), // YYYY-MM-DD format
  metrics: z.object({
    // Member Activity
    activeMembers: z.number(),
    newMembers: z.number(),
    leftMembers: z.number(),
    
    // Content Creation
    postsCreated: z.number(),
    postsByType: z.record(z.number()),
    avgPostLength: z.number(),
    
    // Engagement
    totalReactions: z.number(),
    avgReactionsPerPost: z.number(),
    totalViewTime: z.number(), // Total time spent viewing feed
    avgSessionDuration: z.number(),
    
    // Builder Activity
    builderActions: z.number(),
    postsModerated: z.number(),
    
    // Top Content
    topPosts: z.array(z.object({
      postId: z.string(),
      reactions: z.number(),
      views: z.number(),
      engagementScore: z.number(),
    })).max(10),
  }),
})

export type SpaceEngagementMetrics = z.infer<typeof SpaceEngagementMetricsSchema>

// User Feed Behavior Schema
export const UserFeedBehaviorSchema = z.object({
  userId: z.string(),
  date: z.string(), // YYYY-MM-DD format
  metrics: z.object({
    // Activity
    spacesVisited: z.number(),
    postsCreated: z.number(),
    reactionsGiven: z.number(),
    
    // Engagement Patterns
    avgSessionDuration: z.number(),
    peakActivityHour: z.number(), // 0-23
    mostActiveSpaceId: z.string().optional(),
    
    // Content Preferences
    preferredPostTypes: z.array(z.string()),
    avgPostLength: z.number(),
    mentionsUsed: z.number(),
    
    // Social Behavior
    reactionsReceived: z.number(),
    postsViewed: z.number(),
    scrollDepthAvg: z.number(),
  }),
})

export type UserFeedBehavior = z.infer<typeof UserFeedBehaviorSchema>

// Analytics Pipeline Configuration
export const FeedAnalyticsConfigSchema = z.object({
  // Event Collection
  batchSize: z.number().default(100),
  flushInterval: z.number().default(30000), // 30 seconds
  
  // Privacy Settings
  hashUserIds: z.boolean().default(true),
  retentionDays: z.number().default(90),
  
  // Sampling
  sampleRate: z.number().min(0).max(1).default(1), // 1 = 100% sampling
  
  // BigQuery Integration
  dataset: z.string().default('hive_analytics'),
  feedEventsTable: z.string().default('feed_events'),
  spaceMetricsTable: z.string().default('space_metrics'),
  userBehaviorTable: z.string().default('user_behavior'),
})

export type FeedAnalyticsConfig = z.infer<typeof FeedAnalyticsConfigSchema>

// Utility functions for analytics
export const createFeedEvent = <T extends FeedAnalyticsEvent['event']>(
  event: T,
  data: Omit<Extract<FeedAnalyticsEvent, { event: T }>, 'event' | 'timestamp'> & {
    timestamp?: Date
  }
): Extract<FeedAnalyticsEvent, { event: T }> => {
  return {
    event,
    timestamp: data.timestamp || new Date(),
    ...data,
  } as Extract<FeedAnalyticsEvent, { event: T }>
}

// Privacy-safe user ID hashing
export const hashUserIdForFeed = (userId: string, salt: string = 'hive-analytics'): string => {
  // In production, use proper crypto hashing
  return btoa(`${salt}:${userId}`).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16)
}

// Calculate engagement score for posts
export const calculateEngagementScore = (
  reactions: number,
  views: number,
  postAge: number, // in hours
  spaceSize: number
): number => {
  // Weighted engagement score considering recency and space size
  const reactionWeight = 3
  const viewWeight = 1
  const ageDecay = Math.exp(-postAge / 24) // Decay over 24 hours
  const sizeNormalization = Math.log(spaceSize + 1) / Math.log(100) // Normalize for space size
  
  return ((reactions * reactionWeight + views * viewWeight) * ageDecay) / sizeNormalization
} 