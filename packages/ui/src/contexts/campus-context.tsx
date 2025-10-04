"use client"

import * as React from "react"
import type { User, Space, Connection } from "@hive/core"

/**
 * Campus Context System
 * Provides unified campus state and context across all slices
 */

// Campus location and proximity data
export interface CampusLocation {
  id: string
  name: string
  type: 'building' | 'outdoor' | 'dorm' | 'academic' | 'recreational'
  coordinates?: {
    lat: number
    lng: number
  }
  address?: string
  campusZone: 'north' | 'south' | 'center' | 'off-campus'
}

export interface CampusProximityData {
  currentBuilding?: CampusLocation
  nearbyBuildings: CampusLocation[]
  walkingDistance: Record<string, number> // locationId -> minutes
  frequentLocations: CampusLocation[]
}

// Campus community and social data
export interface CampusActivityStream {
  recentPosts: number
  activeSpaces: number
  onlineUsers: number
  trending: {
    hashtags: string[]
    spaces: string[]
    events: string[]
  }
}

export interface UpcomingCampusEvent {
  id: string
  name: string
  startTime: string
  location: CampusLocation
  spaceId?: string
  attendeeCount: number
  type: 'academic' | 'social' | 'athletic' | 'cultural'
}

// Tool context and suggestions
export interface ToolSuggestion {
  toolId: string
  name: string
  description: string
  relevanceScore: number
  context: 'feed' | 'spaces' | 'profile' | 'general'
  usageHint: string
}

export interface Tool {
  id: string
  name: string
  description: string
  createdBy: string
  spaceId?: string
  usageCount: number
  category: 'productivity' | 'social' | 'academic' | 'creative'
}

// Main campus context interface
export interface CampusContextValue {
  // Campus identification
  campus: {
    id: 'ub-buffalo'
    name: 'University at Buffalo'
    timezone: 'America/New_York'
    academicYear: '2024-2025'
    currentSemester: 'fall'
  }

  // Location and proximity context
  location: {
    current: CampusLocation | null
    proximity: CampusProximityData
    buildings: CampusLocation[]
  }

  // Community and social context
  community: {
    userSpaces: Space[]
    suggestedSpaces: Space[]
    connections: Connection[]
    campusActivity: CampusActivityStream
  }

  // Temporal context
  temporal: {
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
    academicPeriod: 'regular' | 'finals' | 'break' | 'rush'
    events: UpcomingCampusEvent[]
  }

  // Tool context
  tools: {
    contextualSuggestions: ToolSuggestion[]
    recentlyUsed: Tool[]
    spaceTools: Record<string, Tool[]>
  }

  // Context actions
  actions: {
    updateLocation: (location: CampusLocation | null) => void
    refreshCommunityData: () => Promise<void>
    updateToolContext: (context: 'feed' | 'spaces' | 'profile' | 'hivelab') => void
    requestLocationPermission: () => Promise<boolean>
  }
}

// Campus context React context
const CampusContext = React.createContext<CampusContextValue | undefined>(undefined)

// Campus context provider props
export interface CampusProviderProps {
  children: React.ReactNode
  user?: User
  initialLocation?: CampusLocation
}

/**
 * Campus Context Provider
 * Root provider for campus-wide context
 */
export function CampusProvider({
  children,
  user,
  initialLocation
}: CampusProviderProps) {
  // Location state
  const [currentLocation, setCurrentLocation] = React.useState<CampusLocation | null>(initialLocation || null)
  const [proximityData, setProximityData] = React.useState<CampusProximityData>({
    nearbyBuildings: [],
    walkingDistance: {},
    frequentLocations: []
  })

  // Community state
  const [userSpaces, setUserSpaces] = React.useState<Space[]>([])
  const [suggestedSpaces, setSuggestedSpaces] = React.useState<Space[]>([])
  const [connections, setConnections] = React.useState<Connection[]>([])
  const [campusActivity, setCampusActivity] = React.useState<CampusActivityStream>({
    recentPosts: 0,
    activeSpaces: 0,
    onlineUsers: 0,
    trending: { hashtags: [], spaces: [], events: [] }
  })

  // Temporal state
  const [timeOfDay, setTimeOfDay] = React.useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning')
  const [academicPeriod, setAcademicPeriod] = React.useState<'regular' | 'finals' | 'break' | 'rush'>('regular')
  const [upcomingEvents, setUpcomingEvents] = React.useState<UpcomingCampusEvent[]>([])

  // Tool state
  const [contextualSuggestions, setContextualSuggestions] = React.useState<ToolSuggestion[]>([])
  const [recentlyUsedTools, setRecentlyUsedTools] = React.useState<Tool[]>([])
  const [spaceTools, setSpaceTools] = React.useState<Record<string, Tool[]>>({})

  // Campus buildings data (could be loaded from API)
  const campusBuildings: CampusLocation[] = React.useMemo(() => [
    {
      id: 'knox-hall',
      name: 'Knox Hall',
      type: 'dorm',
      campusZone: 'north',
      coordinates: { lat: 43.0015, lng: -78.7874 }
    },
    {
      id: 'student-union',
      name: 'Student Union',
      type: 'recreational',
      campusZone: 'center',
      coordinates: { lat: 43.0021, lng: -78.7890 }
    },
    {
      id: 'capen-hall',
      name: 'Capen Hall',
      type: 'academic',
      campusZone: 'center',
      coordinates: { lat: 43.0018, lng: -78.7881 }
    },
    {
      id: 'davis-hall',
      name: 'Davis Hall',
      type: 'academic',
      campusZone: 'north',
      coordinates: { lat: 43.0025, lng: -78.7885 }
    }
  ], [])

  // Time of day calculation
  React.useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours()
      if (hour >= 6 && hour < 12) setTimeOfDay('morning')
      else if (hour >= 12 && hour < 17) setTimeOfDay('afternoon')
      else if (hour >= 17 && hour < 22) setTimeOfDay('evening')
      else setTimeOfDay('night')
    }

    updateTimeOfDay()
    const interval = setInterval(updateTimeOfDay, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Academic period calculation (simplified)
  React.useEffect(() => {
    const today = new Date()
    const month = today.getMonth()

    // Simplified academic calendar
    if (month >= 8 && month <= 11) {
      setAcademicPeriod('regular') // Fall semester
    } else if (month >= 0 && month <= 4) {
      setAcademicPeriod('regular') // Spring semester
    } else {
      setAcademicPeriod('break') // Summer break
    }
  }, [])

  // Location actions
  const updateLocation = React.useCallback((location: CampusLocation | null) => {
    setCurrentLocation(location)

    if (location) {
      // Update proximity data based on new location
      const nearby = campusBuildings.filter(building =>
        building.id !== location.id &&
        building.campusZone === location.campusZone
      )

      setProximityData(prev => ({
        ...prev,
        currentBuilding: location,
        nearbyBuildings: nearby.slice(0, 5) // Limit to 5 nearby
      }))
    }
  }, [campusBuildings])

  // Refresh community data
  const refreshCommunityData = React.useCallback(async () => {
    if (!user) return

    try {
      // This would integrate with actual API calls
      // For now, using mock data structure

      // Simulate loading user spaces and community data
      setCampusActivity({
        recentPosts: Math.floor(Math.random() * 100) + 20,
        activeSpaces: Math.floor(Math.random() * 50) + 10,
        onlineUsers: Math.floor(Math.random() * 500) + 100,
        trending: {
          hashtags: ['#finals', '#ubpride', '#studygroup'],
          spaces: ['Engineering Study Hub', 'Dorm Life', 'Campus Events'],
          events: ['Fall Festival', 'Career Fair', 'Basketball Game']
        }
      })
    } catch (error) {
      console.error('Failed to refresh community data:', error)
    }
  }, [user])

  // Update tool context based on current slice
  const updateToolContext = React.useCallback((context: 'feed' | 'spaces' | 'profile' | 'hivelab') => {
    // Generate contextual tool suggestions based on current slice
    const suggestions: ToolSuggestion[] = []

    switch (context) {
      case 'feed':
        suggestions.push(
          {
            toolId: 'quick-poll',
            name: 'Quick Poll',
            description: 'Create instant polls for your feed',
            relevanceScore: 0.9,
            context: 'feed',
            usageHint: 'Get quick opinions from your campus community'
          },
          {
            toolId: 'event-creator',
            name: 'Event Creator',
            description: 'Announce campus events',
            relevanceScore: 0.8,
            context: 'feed',
            usageHint: 'Share events happening on campus'
          }
        )
        break

      case 'spaces':
        suggestions.push(
          {
            toolId: 'space-manager',
            name: 'Space Manager',
            description: 'Manage your space community',
            relevanceScore: 0.95,
            context: 'spaces',
            usageHint: 'Organize your space activities and members'
          },
          {
            toolId: 'resource-library',
            name: 'Resource Library',
            description: 'Share resources with space members',
            relevanceScore: 0.85,
            context: 'spaces',
            usageHint: 'Build a shared knowledge base'
          }
        )
        break

      case 'profile':
        suggestions.push(
          {
            toolId: 'connection-finder',
            name: 'Connection Finder',
            description: 'Find classmates and dormmates',
            relevanceScore: 0.9,
            context: 'profile',
            usageHint: 'Expand your campus network'
          },
          {
            toolId: 'schedule-sync',
            name: 'Schedule Sync',
            description: 'Coordinate with friends',
            relevanceScore: 0.8,
            context: 'profile',
            usageHint: 'Share availability with connections'
          }
        )
        break
    }

    setContextualSuggestions(suggestions)
  }, [])

  // Request location permission
  const requestLocationPermission = React.useCallback(async (): Promise<boolean> => {
    if (!navigator.geolocation) {
      return false
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' })

      if (permission.state === 'granted') {
        return true
      } else if (permission.state === 'prompt') {
        // Request permission
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            () => resolve(true),
            () => resolve(false)
          )
        })
      }

      return false
    } catch {
      return false
    }
  }, [])

  // Initialize context on mount
  React.useEffect(() => {
    if (user) {
      refreshCommunityData()
      updateToolContext('feed') // Default context
    }
  }, [user, refreshCommunityData, updateToolContext])

  const contextValue: CampusContextValue = React.useMemo(() => ({
    campus: {
      id: 'ub-buffalo',
      name: 'University at Buffalo',
      timezone: 'America/New_York',
      academicYear: '2024-2025',
      currentSemester: 'fall'
    },

    location: {
      current: currentLocation,
      proximity: proximityData,
      buildings: campusBuildings
    },

    community: {
      userSpaces,
      suggestedSpaces,
      connections,
      campusActivity
    },

    temporal: {
      timeOfDay,
      academicPeriod,
      events: upcomingEvents
    },

    tools: {
      contextualSuggestions,
      recentlyUsed: recentlyUsedTools,
      spaceTools
    },

    actions: {
      updateLocation,
      refreshCommunityData,
      updateToolContext,
      requestLocationPermission
    }
  }), [
    currentLocation,
    proximityData,
    campusBuildings,
    userSpaces,
    suggestedSpaces,
    connections,
    campusActivity,
    timeOfDay,
    academicPeriod,
    upcomingEvents,
    contextualSuggestions,
    recentlyUsedTools,
    spaceTools,
    updateLocation,
    refreshCommunityData,
    updateToolContext,
    requestLocationPermission
  ])

  return (
    <CampusContext.Provider value={contextValue}>
      {children}
    </CampusContext.Provider>
  )
}

/**
 * Hook to use campus context
 */
export function useCampusContext(): CampusContextValue {
  const context = React.useContext(CampusContext)

  if (context === undefined) {
    throw new Error('useCampusContext must be used within a CampusProvider')
  }

  return context
}

/**
 * Hook for location-specific context
 */
export function useCampusLocation() {
  const { location, actions } = useCampusContext()

  return {
    currentLocation: location.current,
    nearbyBuildings: location.proximity.nearbyBuildings,
    campusBuildings: location.buildings,
    updateLocation: actions.updateLocation,
    requestPermission: actions.requestLocationPermission
  }
}

/**
 * Hook for community-specific context
 */
export function useCampusCommunity() {
  const { community, actions } = useCampusContext()

  return {
    userSpaces: community.userSpaces,
    suggestedSpaces: community.suggestedSpaces,
    connections: community.connections,
    campusActivity: community.campusActivity,
    refreshData: actions.refreshCommunityData
  }
}

/**
 * Hook for temporal context
 */
export function useCampusTemporal() {
  const { temporal } = useCampusContext()

  return {
    timeOfDay: temporal.timeOfDay,
    academicPeriod: temporal.academicPeriod,
    upcomingEvents: temporal.events,
    isStudyTime: temporal.timeOfDay === 'evening' || temporal.timeOfDay === 'afternoon',
    isFinalsTime: temporal.academicPeriod === 'finals',
    isSocialTime: temporal.timeOfDay === 'evening' && temporal.academicPeriod !== 'finals'
  }
}

/**
 * Hook for tool context
 */
export function useCampusTools() {
  const { tools, actions } = useCampusContext()

  return {
    contextualSuggestions: tools.contextualSuggestions,
    recentlyUsed: tools.recentlyUsed,
    spaceTools: tools.spaceTools,
    updateContext: actions.updateToolContext
  }
}