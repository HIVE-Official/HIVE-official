import { useEffect, useRef, useCallback, useState } from 'react'
import { useAnalytics } from './use-analytics'
import type { 
  FeedAnalyticsEvent, 
  FeedAnalyticsConfig 
} from '@hive/core'
import {
  createFeedEvent, 
  hashUserIdForFeed
} from '@hive/core'

interface UseFeedAnalyticsOptions {
  spaceId: string
  userId: string
  config?: Partial<FeedAnalyticsConfig>
}

interface FeedAnalyticsHook {
  // Event Tracking
  trackPostCreated: (data: {
    postId: string
    postType: 'text' | 'image' | 'poll' | 'event' | 'toolshare'
    contentLength: number
    hasMentions: boolean
    hasRichFormatting: boolean
    draftTime?: number
  }) => void
  
  trackPostReacted: (data: {
    postId: string
    reaction: 'heart'
    action: 'add' | 'remove'
    postAge: number
    authorId: string
    isOwnPost: boolean
  }) => void
  
  trackPostViewed: (data: {
    postId: string
    viewDuration: number
    scrolledToEnd: boolean
    authorId: string
    postType: 'text' | 'image' | 'poll' | 'event' | 'toolshare'
    postAge: number
  }) => void
  
  trackPostEdited: (data: {
    postId: string
    editTime: number
    contentLengthBefore: number
    contentLengthAfter: number
    editReason?: 'typo' | 'clarification' | 'addition' | 'other'
  }) => void
  
  trackPostDeleted: (data: {
    postId: string
    deletedBy: 'author' | 'builder' | 'admin'
    postAge: number
    hadReactions: boolean
    reactionCount: number
    deleteReason?: 'inappropriate' | 'spam' | 'mistake' | 'other'
  }) => void
  
  trackSpaceJoined: (data: {
    joinMethod: 'invite' | 'browse' | 'search' | 'auto'
    referrerSpaceId?: string
    invitedBy?: string
  }) => void
  
  trackSpaceLeft: (data: {
    membershipDuration: number
    postsCreated: number
    reactionsGiven: number
    lastActiveAt: Date
    leaveReason?: 'inactive' | 'content' | 'privacy' | 'other'
  }) => void
  
  trackBuilderAction: (data: {
    action: 'pin_post' | 'unpin_post' | 'delete_post' | 'mute_user' | 'unmute_user'
    targetId: string
    targetType: 'post' | 'user'
    reason?: string
  }) => void
  
  // Feed Viewing
  trackFeedViewed: (data: {
    postsVisible: number
    scrollDepth: number
    timeSpent: number
    deviceType?: 'mobile' | 'tablet' | 'desktop'
  }) => void
  
  // Session Management
  startSession: () => void
  endSession: () => void
  isSessionActive: boolean
}

export const useFeedAnalytics = ({
  spaceId,
  userId,
  config = {},
}: UseFeedAnalyticsOptions): FeedAnalyticsHook => {
  const { track } = useAnalytics()
  const [isSessionActive, setIsSessionActive] = useState(false)
  
  // Session and heartbeat management
  const sessionIdRef = useRef<string>()
  const heartbeatIntervalRef = useRef<NodeJS.Timeout>()
  const lastInteractionRef = useRef<Date>(new Date())
  const activeTimeRef = useRef<number>(0)
  const lastHeartbeatRef = useRef<Date>(new Date())
  
  // Event batching
  const eventBatchRef = useRef<FeedAnalyticsEvent[]>([])
  const batchTimeoutRef = useRef<NodeJS.Timeout>()
  
  // Configuration with defaults
  const analyticsConfig: FeedAnalyticsConfig = {
    batchSize: 100,
    flushInterval: 30000, // 30 seconds
    hashUserIds: true,
    retentionDays: 90,
    sampleRate: 1,
    dataset: 'hive_analytics',
    feedEventsTable: 'feed_events',
    spaceMetricsTable: 'space_metrics',
    userBehaviorTable: 'user_behavior',
    ...config,
  }
  
  // Generate session ID
  const generateSessionId = useCallback(() => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }, [])
  
  // Flush event batch
  const flushEvents = useCallback(() => {
    if (eventBatchRef.current.length === 0) return
    
    const events = [...eventBatchRef.current]
    eventBatchRef.current = []
    
    try {
      // Send to analytics pipeline (same as Team 1)
      track({
        name: 'feed_analytics_batch',
        properties: {
          events,
          spaceId,
          userId: analyticsConfig.hashUserIds ? hashUserIdForFeed(userId) : userId,
          batchSize: events.length,
          timestamp: new Date(),
        }
      })
    } catch (error) {
      console.error('Failed to flush analytics events:', error)
      // Re-add events to batch for retry
      eventBatchRef.current.unshift(...events)
    }
  }, [track, spaceId, userId, analyticsConfig.hashUserIds])
  
  // Add event to batch
  const addEventToBatch = useCallback((event: FeedAnalyticsEvent) => {
    // Apply sampling
    if (Math.random() > analyticsConfig.sampleRate) return
    
    eventBatchRef.current.push(event)
    
    // Flush if batch is full
    if (eventBatchRef.current.length >= analyticsConfig.batchSize) {
      flushEvents()
    }
    
    // Set flush timeout if not already set
    if (!batchTimeoutRef.current) {
      batchTimeoutRef.current = setTimeout(() => {
        flushEvents()
        batchTimeoutRef.current = undefined
      }, analyticsConfig.flushInterval)
    }
  }, [analyticsConfig.batchSize, analyticsConfig.sampleRate, analyticsConfig.flushInterval, flushEvents])
  
  // Track user interaction
  const trackInteraction = useCallback(() => {
    lastInteractionRef.current = new Date()
  }, [])
  
  // Heartbeat function
  const sendHeartbeat = useCallback(() => {
    if (!isSessionActive || !sessionIdRef.current) return
    
    const now = new Date()
    const timeSinceLastHeartbeat = now.getTime() - lastHeartbeatRef.current.getTime()
    const timeSinceLastInteraction = now.getTime() - lastInteractionRef.current.getTime()
    
    // Only count as active time if user interacted recently (within 30 seconds)
    const isActive = timeSinceLastInteraction < 30000
    if (isActive) {
      activeTimeRef.current += Math.min(timeSinceLastHeartbeat, 30000)
    }
    
    lastHeartbeatRef.current = now
    
    // Send heartbeat event
    const heartbeatEvent = createFeedEvent('space_heartbeat', {
      spaceId,
      userId: analyticsConfig.hashUserIds ? hashUserIdForFeed(userId) : userId,
      metadata: {
        sessionId: sessionIdRef.current,
        activeTime: activeTimeRef.current,
        tabVisible: isActive,
        scrollPosition: window.scrollY,
        lastInteraction: lastInteractionRef.current,
      },
    })
    
    addEventToBatch(heartbeatEvent)
  }, [isSessionActive, analyticsConfig.hashUserIds, userId, spaceId, addEventToBatch])

  // Start session
  const startSession = useCallback(() => {
    if (isSessionActive) return
    
    sessionIdRef.current = generateSessionId()
    setIsSessionActive(true)
    lastInteractionRef.current = new Date()
    lastHeartbeatRef.current = new Date()
    activeTimeRef.current = 0
    
    // Start heartbeat
    heartbeatIntervalRef.current = setInterval(sendHeartbeat, 30000) // Every 30 seconds
    
    // Track session start with space heartbeat
    const sessionStartEvent = createFeedEvent('space_heartbeat', {
      spaceId,
      userId: analyticsConfig.hashUserIds ? hashUserIdForFeed(userId) : userId,
      metadata: {
        sessionId: sessionIdRef.current,
        activeTime: 0,
        tabVisible: true,
        scrollPosition: 0,
        lastInteraction: lastInteractionRef.current,
      },
    })
    
    addEventToBatch(sessionStartEvent)
  }, [isSessionActive, generateSessionId, sendHeartbeat, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch])

  // End session
  const endSession = useCallback(() => {
    if (!isSessionActive || !sessionIdRef.current) return
    
    // Clear heartbeat
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current)
      heartbeatIntervalRef.current = undefined
    }
    
    // Track session end with final heartbeat
    const sessionEndEvent = createFeedEvent('space_heartbeat', {
      spaceId,
      userId: analyticsConfig.hashUserIds ? hashUserIdForFeed(userId) : userId,
      metadata: {
        sessionId: sessionIdRef.current,
        activeTime: activeTimeRef.current,
        tabVisible: false,
        scrollPosition: window.scrollY,
        lastInteraction: lastInteractionRef.current,
      },
    })
    
    addEventToBatch(sessionEndEvent)
    
    // Flush remaining events
    flushEvents()
    
    setIsSessionActive(false)
    sessionIdRef.current = undefined
  }, [isSessionActive, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch, flushEvents])

  // Event tracking functions
  const trackPostCreated = useCallback((data: {
    postId: string
    postType: 'text' | 'image' | 'poll' | 'event' | 'toolshare'
    contentLength: number
    hasMentions: boolean
    hasRichFormatting: boolean
    draftTime?: number
  }) => {
    trackInteraction()
    const event = createFeedEvent('post_created', {
      postId: data.postId,
      spaceId,
      userId: analyticsConfig.hashUserIds ? hashUserIdForFeed(userId) : userId,
      metadata: {
        postType: data.postType,
        contentLength: data.contentLength,
        hasMentions: data.hasMentions,
        hasRichFormatting: data.hasRichFormatting,
        draftTime: data.draftTime,
        composerSource: 'inline' as const,
      },
    })
    addEventToBatch(event)
  }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch])

  const trackPostReacted = useCallback((data: {
    postId: string
    reaction: 'heart'
    action: 'add' | 'remove'
    postAge: number
    authorId: string
    isOwnPost: boolean
  }) => {
    trackInteraction()
    const event = createFeedEvent('post_reacted', {
      postId: data.postId,
      spaceId,
      userId: analyticsConfig.hashUserIds ? hashUserIdForFeed(userId) : userId,
      metadata: {
        reaction: data.reaction,
        action: data.action,
        postAge: data.postAge,
        authorId: data.authorId,
        isOwnPost: data.isOwnPost,
      },
    })
    addEventToBatch(event)
  }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch])

  const trackPostViewed = useCallback((data: {
    postId: string
    viewDuration: number
    scrolledToEnd: boolean
    authorId: string
    postType: 'text' | 'image' | 'poll' | 'event' | 'toolshare'
    postAge: number
  }) => {
    trackInteraction()
    const event = createFeedEvent('post_viewed', {
      postId: data.postId,
      spaceId,
      userId: analyticsConfig.hashUserIds ? hashUserIdForFeed(userId) : userId,
      metadata: {
        viewDuration: data.viewDuration,
        scrolledToEnd: data.scrolledToEnd,
        authorId: data.authorId,
        postType: data.postType,
        postAge: data.postAge,
      },
    })
    addEventToBatch(event)
  }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch])

  const trackPostEdited = useCallback((data: {
    postId: string
    editTime: number
    contentLengthBefore: number
    contentLengthAfter: number
    editReason?: 'typo' | 'clarification' | 'addition' | 'other'
  }) => {
    trackInteraction()
    const event = createFeedEvent('post_edited', {
      postId: data.postId,
      spaceId,
      userId: analyticsConfig.hashUserIds ? hashUserIdForFeed(userId) : userId,
      metadata: {
        editTime: data.editTime,
        contentLengthBefore: data.contentLengthBefore,
        contentLengthAfter: data.contentLengthAfter,
        editReason: data.editReason,
      },
    })
    addEventToBatch(event)
  }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch])

  const trackPostDeleted = useCallback((data: {
    postId: string
    deletedBy: 'author' | 'builder' | 'admin'
    postAge: number
    hadReactions: boolean
    reactionCount: number
    deleteReason?: 'inappropriate' | 'spam' | 'mistake' | 'other'
  }) => {
    trackInteraction()
    const event = createFeedEvent('post_deleted', {
      postId: data.postId,
      spaceId,
      userId: analyticsConfig.hashUserIds ? hashUserIdForFeed(userId) : userId,
      metadata: {
        deletedBy: data.deletedBy,
        postAge: data.postAge,
        hadReactions: data.hadReactions,
        reactionCount: data.reactionCount,
        deleteReason: data.deleteReason,
      },
    })
    addEventToBatch(event)
  }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch])

  const trackSpaceJoined = useCallback((data: {
    joinMethod: 'invite' | 'browse' | 'search' | 'auto'
    referrerSpaceId?: string
    invitedBy?: string
  }) => {
    trackInteraction()
    const event = createFeedEvent('space_joined', {
      spaceId,
      userId: analyticsConfig.hashUserIds ? hashUserIdForFeed(userId) : userId,
      metadata: {
        joinMethod: data.joinMethod,
        referrerSpaceId: data.referrerSpaceId,
        invitedBy: data.invitedBy,
      },
    })
    addEventToBatch(event)
  }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch])

  const trackSpaceLeft = useCallback((data: {
    membershipDuration: number
    postsCreated: number
    reactionsGiven: number
    lastActiveAt: Date
    leaveReason?: 'inactive' | 'content' | 'privacy' | 'other'
  }) => {
    trackInteraction()
    const event = createFeedEvent('space_left', {
      spaceId,
      userId: analyticsConfig.hashUserIds ? hashUserIdForFeed(userId) : userId,
      metadata: {
        membershipDuration: data.membershipDuration,
        postsCreated: data.postsCreated,
        reactionsGiven: data.reactionsGiven,
        lastActiveAt: data.lastActiveAt,
        leaveReason: data.leaveReason,
      },
    })
    addEventToBatch(event)
  }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch])

  const trackBuilderAction = useCallback((data: {
    action: 'pin_post' | 'unpin_post' | 'delete_post' | 'mute_user' | 'unmute_user'
    targetId: string
    targetType: 'post' | 'user'
    reason?: string
  }) => {
    trackInteraction()
    const event = createFeedEvent('builder_action', {
      spaceId,
      userId: analyticsConfig.hashUserIds ? hashUserIdForFeed(userId) : userId,
      metadata: {
        action: data.action,
        targetId: data.targetId,
        targetType: data.targetType,
        reason: data.reason,
      },
    })
    addEventToBatch(event)
  }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch])

  const trackFeedViewed = useCallback((data: {
    postsVisible: number
    scrollDepth: number
    timeSpent: number
    deviceType?: 'mobile' | 'tablet' | 'desktop'
  }) => {
    trackInteraction()
    const event = createFeedEvent('space_feed_viewed', {
      spaceId,
      userId: analyticsConfig.hashUserIds ? hashUserIdForFeed(userId) : userId,
      metadata: {
        postsVisible: data.postsVisible,
        scrollDepth: data.scrollDepth,
        timeSpent: data.timeSpent,
        deviceType: data.deviceType,
      },
    })
    addEventToBatch(event)
  }, [trackInteraction, spaceId, userId, analyticsConfig.hashUserIds, addEventToBatch])

  // Auto-start session on mount
  useEffect(() => {
    startSession()
    
    // Handle visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        endSession()
      } else {
        startSession()
      }
    }
    
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Cleanup on unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      endSession()
    }
  }, [startSession, endSession])

  return {
    // Event tracking
    trackPostCreated,
    trackPostReacted,
    trackPostViewed,
    trackPostEdited,
    trackPostDeleted,
    trackSpaceJoined,
    trackSpaceLeft,
    trackBuilderAction,
    trackFeedViewed,
    
    // Session management
    startSession,
    endSession,
    isSessionActive,
  }
} 