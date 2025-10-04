"use client"

import * as React from "react"
import { useCampusContext } from "./campus-context"
import type { FeedPost, Space, Tool } from "@hive/core"

/**
 * Slice-specific context system
 * Provides context for each main slice while integrating with campus context
 */

// Slice identification
export type SliceType = 'feed' | 'spaces' | 'profile' | 'hivelab'

// Feed slice context
export interface FeedSliceContext {
  // Content organization
  content: {
    personalFeed: FeedPost[]
    campusActivity: FeedPost[]
    communityDiscovery: FeedPost[]
    locationActivity: FeedPost[]
  }

  // Feed filters and organization
  filters: {
    activeFilters: string[]
    locationFilter: string | null
    communityFilter: string | null
    timeFilter: 'today' | 'week' | 'all'
  }

  // Feed interactions
  interactions: {
    recentEngagements: string[] // Post IDs
    savedPosts: string[]
    hiddenPosts: string[]
  }

  // Campus integration
  campusIntegration: {
    localTrending: string[]
    nearbyActivity: FeedPost[]
    friendActivity: FeedPost[]
    spaceActivity: Record<string, FeedPost[]>
  }
}

// Spaces slice context
export interface SpacesSliceContext {
  // Space organization
  organization: {
    joinedSpaces: Space[]
    discoveredSpaces: Space[]
    recommendedSpaces: Space[]
    nearbySpaces: Space[]
  }

  // Discovery context
  discovery: {
    searchQuery: string
    categoryFilter: string | null
    locationFilter: string | null
    sortBy: 'activity' | 'members' | 'relevance' | 'distance'
  }

  // Participation context
  participation: {
    activeSpaces: Space[]
    leadershipRoles: Record<string, string> // spaceId -> role
    recentActivity: Record<string, number> // spaceId -> last activity timestamp
  }

  // Campus integration
  campusIntegration: {
    officialSpaces: Space[]
    buildingSpaces: Space[]
    majorRelatedSpaces: Space[]
    eventBasedSpaces: Space[]
  }
}

// Profile slice context
export interface ProfileSliceContext {
  // Identity context
  identity: {
    campusRole: 'student' | 'alumni' | 'staff'
    graduationYear: number | null
    major: string | null
    dorm: string | null
    interests: string[]
  }

  // Connection context
  connections: {
    campusConnections: any[] // Connection objects
    dormmates: any[]
    classmates: any[]
    spaceConnections: Record<string, any[]> // spaceId -> connections
  }

  // Activity context
  activity: {
    recentPosts: FeedPost[]
    spaceParticipation: Record<string, number> // spaceId -> participation score
    toolCreations: Tool[]
    eventsAttended: any[]
  }

  // Campus presence
  presence: {
    activeSpaces: string[] // Space IDs where user is active
    reputationScore: number
    campusInvolvement: string[] // Categories of involvement
    visibilitySettings: Record<string, boolean>
  }
}

// HiveLab slice context
export interface HiveLabSliceContext {
  // Tool creation context
  creation: {
    activeProject: Tool | null
    draftTools: Tool[]
    templates: any[]
    collaborations: any[]
  }

  // Tool management
  management: {
    ownedTools: Tool[]
    sharedTools: Tool[]
    usageAnalytics: Record<string, number> // toolId -> usage count
    feedback: Record<string, any[]> // toolId -> feedback array
  }

  // Context integration
  integration: {
    spaceToolRequests: any[] // Requests from spaces for tools
    feedToolSuggestions: any[] // Tools to suggest in feed
    profileToolShowcase: Tool[] // Tools to highlight in profile
  }

  // Campus tool ecosystem
  campusEcosystem: {
    popularTools: Tool[]
    campusTemplates: any[]
    communityTools: Tool[]
    officialTools: Tool[]
  }
}

// Combined slice context
export interface SliceContextValue {
  currentSlice: SliceType
  feedContext: FeedSliceContext
  spacesContext: SpacesSliceContext
  profileContext: ProfileSliceContext
  hiveLabContext: HiveLabSliceContext

  // Slice actions
  actions: {
    setCurrentSlice: (slice: SliceType) => void
    updateFeedContext: (updates: Partial<FeedSliceContext>) => void
    updateSpacesContext: (updates: Partial<SpacesSliceContext>) => void
    updateProfileContext: (updates: Partial<ProfileSliceContext>) => void
    updateHiveLabContext: (updates: Partial<HiveLabSliceContext>) => void
    preserveContextOnNavigation: (fromSlice: SliceType, toSlice: SliceType) => void
  }
}

// Slice context React context
const SliceContext = React.createContext<SliceContextValue | undefined>(undefined)

// Slice context provider props
export interface SliceContextProviderProps {
  children: React.ReactNode
  initialSlice?: SliceType
}

/**
 * Slice Context Provider
 * Manages context for each slice while integrating with campus context
 */
export function SliceContextProvider({
  children,
  initialSlice = 'feed'
}: SliceContextProviderProps) {
  const campusContext = useCampusContext()

  // Current slice state
  const [currentSlice, setCurrentSlice] = React.useState<SliceType>(initialSlice)

  // Feed context state
  const [feedContext, setFeedContext] = React.useState<FeedSliceContext>({
    content: {
      personalFeed: [],
      campusActivity: [],
      communityDiscovery: [],
      locationActivity: []
    },
    filters: {
      activeFilters: [],
      locationFilter: null,
      communityFilter: null,
      timeFilter: 'today'
    },
    interactions: {
      recentEngagements: [],
      savedPosts: [],
      hiddenPosts: []
    },
    campusIntegration: {
      localTrending: [],
      nearbyActivity: [],
      friendActivity: [],
      spaceActivity: {}
    }
  })

  // Spaces context state
  const [spacesContext, setSpacesContext] = React.useState<SpacesSliceContext>({
    organization: {
      joinedSpaces: [],
      discoveredSpaces: [],
      recommendedSpaces: [],
      nearbySpaces: []
    },
    discovery: {
      searchQuery: '',
      categoryFilter: null,
      locationFilter: null,
      sortBy: 'activity'
    },
    participation: {
      activeSpaces: [],
      leadershipRoles: {},
      recentActivity: {}
    },
    campusIntegration: {
      officialSpaces: [],
      buildingSpaces: [],
      majorRelatedSpaces: [],
      eventBasedSpaces: []
    }
  })

  // Profile context state
  const [profileContext, setProfileContext] = React.useState<ProfileSliceContext>({
    identity: {
      campusRole: 'student',
      graduationYear: null,
      major: null,
      dorm: null,
      interests: []
    },
    connections: {
      campusConnections: [],
      dormmates: [],
      classmates: [],
      spaceConnections: {}
    },
    activity: {
      recentPosts: [],
      spaceParticipation: {},
      toolCreations: [],
      eventsAttended: []
    },
    presence: {
      activeSpaces: [],
      reputationScore: 0,
      campusInvolvement: [],
      visibilitySettings: {}
    }
  })

  // HiveLab context state
  const [hiveLabContext, setHiveLabContext] = React.useState<HiveLabSliceContext>({
    creation: {
      activeProject: null,
      draftTools: [],
      templates: [],
      collaborations: []
    },
    management: {
      ownedTools: [],
      sharedTools: [],
      usageAnalytics: {},
      feedback: {}
    },
    integration: {
      spaceToolRequests: [],
      feedToolSuggestions: [],
      profileToolShowcase: []
    },
    campusEcosystem: {
      popularTools: [],
      campusTemplates: [],
      communityTools: [],
      officialTools: []
    }
  })

  // Update campus tool context when slice changes
  React.useEffect(() => {
    campusContext.actions.updateToolContext(currentSlice)
  }, [currentSlice, campusContext.actions])

  // Sync spaces context with campus community data
  React.useEffect(() => {
    setSpacesContext(prev => ({
      ...prev,
      organization: {
        ...prev.organization,
        joinedSpaces: campusContext.community.userSpaces,
        recommendedSpaces: campusContext.community.suggestedSpaces
      }
    }))
  }, [campusContext.community.userSpaces, campusContext.community.suggestedSpaces])

  // Sync location context with spaces discovery
  React.useEffect(() => {
    if (campusContext.location.current) {
      setSpacesContext(prev => ({
        ...prev,
        discovery: {
          ...prev.discovery,
          locationFilter: campusContext.location.current?.name || null
        }
      }))
    }
  }, [campusContext.location.current])

  // Context preservation logic
  const preserveContextOnNavigation = React.useCallback((fromSlice: SliceType, toSlice: SliceType) => {
    switch (fromSlice) {
      case 'feed':
        if (toSlice === 'spaces') {
          // Preserve feed discovery context in spaces
          const feedInterests = feedContext.interactions.recentEngagements
          setSpacesContext(prev => ({
            ...prev,
            discovery: {
              ...prev.discovery,
              sortBy: 'relevance' // Switch to relevance based on feed engagement
            }
          }))
        }
        break

      case 'spaces':
        if (toSlice === 'profile') {
          // Preserve space context in profile
          setProfileContext(prev => ({
            ...prev,
            presence: {
              ...prev.presence,
              activeSpaces: spacesContext.participation.activeSpaces.map(space => space.id)
            }
          }))
        } else if (toSlice === 'hivelab') {
          // Preserve space tool requests in HiveLab
          setHiveLabContext(prev => ({
            ...prev,
            integration: {
              ...prev.integration,
              spaceToolRequests: Object.keys(spacesContext.participation.leadershipRoles).map(spaceId => ({
                spaceId,
                requestType: 'leadership-tool',
                priority: 'high'
              }))
            }
          }))
        }
        break

      case 'profile':
        if (toSlice === 'hivelab') {
          // Preserve profile tools in HiveLab
          setHiveLabContext(prev => ({
            ...prev,
            creation: {
              ...prev.creation,
              // Suggest tools based on profile interests
            }
          }))
        }
        break

      case 'hivelab':
        if (toSlice === 'feed') {
          // Suggest sharing tools in feed
          setFeedContext(prev => ({
            ...prev,
            campusIntegration: {
              ...prev.campusIntegration,
              // Add tool sharing suggestions
            }
          }))
        }
        break
    }
  }, [feedContext, spacesContext, profileContext, hiveLabContext])

  // Handle slice changes with context preservation
  const handleSetCurrentSlice = React.useCallback((newSlice: SliceType) => {
    const oldSlice = currentSlice
    preserveContextOnNavigation(oldSlice, newSlice)
    setCurrentSlice(newSlice)
  }, [currentSlice, preserveContextOnNavigation])

  // Context update functions
  const updateFeedContext = React.useCallback((updates: Partial<FeedSliceContext>) => {
    setFeedContext(prev => ({ ...prev, ...updates }))
  }, [])

  const updateSpacesContext = React.useCallback((updates: Partial<SpacesSliceContext>) => {
    setSpacesContext(prev => ({ ...prev, ...updates }))
  }, [])

  const updateProfileContext = React.useCallback((updates: Partial<ProfileSliceContext>) => {
    setProfileContext(prev => ({ ...prev, ...updates }))
  }, [])

  const updateHiveLabContext = React.useCallback((updates: Partial<HiveLabSliceContext>) => {
    setHiveLabContext(prev => ({ ...prev, ...updates }))
  }, [])

  const contextValue: SliceContextValue = React.useMemo(() => ({
    currentSlice,
    feedContext,
    spacesContext,
    profileContext,
    hiveLabContext,

    actions: {
      setCurrentSlice: handleSetCurrentSlice,
      updateFeedContext,
      updateSpacesContext,
      updateProfileContext,
      updateHiveLabContext,
      preserveContextOnNavigation
    }
  }), [
    currentSlice,
    feedContext,
    spacesContext,
    profileContext,
    hiveLabContext,
    handleSetCurrentSlice,
    updateFeedContext,
    updateSpacesContext,
    updateProfileContext,
    updateHiveLabContext,
    preserveContextOnNavigation
  ])

  return (
    <SliceContext.Provider value={contextValue}>
      {children}
    </SliceContext.Provider>
  )
}

/**
 * Hook to use slice context
 */
export function useSliceContext(): SliceContextValue {
  const context = React.useContext(SliceContext)

  if (context === undefined) {
    throw new Error('useSliceContext must be used within a SliceContextProvider')
  }

  return context
}

/**
 * Hook for feed-specific context
 */
export function useFeedContext() {
  const { feedContext, actions, currentSlice } = useSliceContext()

  // Auto-update current slice when this hook is used
  React.useEffect(() => {
    if (currentSlice !== 'feed') {
      actions.setCurrentSlice('feed')
    }
  }, [currentSlice, actions])

  return {
    content: feedContext.content,
    filters: feedContext.filters,
    interactions: feedContext.interactions,
    campusIntegration: feedContext.campusIntegration,
    updateContext: actions.updateFeedContext
  }
}

/**
 * Hook for spaces-specific context
 */
export function useSpacesContext() {
  const { spacesContext, actions, currentSlice } = useSliceContext()

  // Auto-update current slice when this hook is used
  React.useEffect(() => {
    if (currentSlice !== 'spaces') {
      actions.setCurrentSlice('spaces')
    }
  }, [currentSlice, actions])

  return {
    organization: spacesContext.organization,
    discovery: spacesContext.discovery,
    participation: spacesContext.participation,
    campusIntegration: spacesContext.campusIntegration,
    updateContext: actions.updateSpacesContext
  }
}

/**
 * Hook for profile-specific context
 */
export function useProfileContext() {
  const { profileContext, actions, currentSlice } = useSliceContext()

  // Auto-update current slice when this hook is used
  React.useEffect(() => {
    if (currentSlice !== 'profile') {
      actions.setCurrentSlice('profile')
    }
  }, [currentSlice, actions])

  return {
    identity: profileContext.identity,
    connections: profileContext.connections,
    activity: profileContext.activity,
    presence: profileContext.presence,
    updateContext: actions.updateProfileContext
  }
}

/**
 * Hook for HiveLab-specific context
 */
export function useHiveLabContext() {
  const { hiveLabContext, actions, currentSlice } = useSliceContext()

  // Auto-update current slice when this hook is used
  React.useEffect(() => {
    if (currentSlice !== 'hivelab') {
      actions.setCurrentSlice('hivelab')
    }
  }, [currentSlice, actions])

  return {
    creation: hiveLabContext.creation,
    management: hiveLabContext.management,
    integration: hiveLabContext.integration,
    campusEcosystem: hiveLabContext.campusEcosystem,
    updateContext: actions.updateHiveLabContext
  }
}