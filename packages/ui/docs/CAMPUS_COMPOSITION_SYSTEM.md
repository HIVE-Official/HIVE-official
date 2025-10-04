# HIVE Campus Composition System Specification

**Version**: 1.0
**Date**: 2025-10-03
**Scope**: Composition system and IA improvements within existing Feed/Spaces/Profile/HiveLab slices

---

## Overview

This specification defines how HIVE's composition system creates seamless campus-aware experiences within the existing navigation structure. The system enhances each slice with campus context while maintaining the current Feed → Spaces → Profile → HiveLab navigation.

## Core Principles

### 1. Slice Preservation
- **Feed** remains the discovery and activity stream
- **Spaces** remains community organization and participation
- **Profile** remains identity management and connections
- **HiveLab** remains tool creation and management
- Navigation structure unchanged

### 2. Campus Context Composition
- All components become campus-aware through context providers
- Cross-slice data sharing through unified campus state
- Location and community context preserved across navigation
- Behavioral psychology patterns enhanced with campus signals

### 3. Information Architecture Enhancement
- Better organization within each slice
- Contextual relationships between slice content
- Campus-centric content prioritization
- Reduced cognitive load through spatial design

---

## Campus Context Architecture

### Campus Context Providers

```typescript
/**
 * Campus Context System
 * Provides unified campus state across all slices
 */

// Root campus context - wraps entire authenticated app
interface CampusContextValue {
  campus: {
    id: 'ub-buffalo'
    name: 'University at Buffalo'
    timezone: 'America/New_York'
    academicYear: '2024-2025'
    currentSemester: 'fall'
  }

  location: {
    current: CampusLocation | null
    proximity: CampusProximityData
    buildings: CampusBuildingData[]
  }

  community: {
    userSpaces: Space[]
    suggestedSpaces: Space[]
    connections: Connection[]
    campusActivity: CampusActivityStream
  }

  temporal: {
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
    academicPeriod: 'regular' | 'finals' | 'break' | 'rush'
    events: UpcomingCampusEvent[]
  }

  tools: {
    contextualSuggestions: ToolSuggestion[]
    recentlyUsed: Tool[]
    spaceTools: Record<string, Tool[]>
  }
}

// Usage in app shell
<CampusProvider>
  <LocationProvider>
    <CommunityProvider>
      <ToolsProvider>
        <NavigationShell>
          {/* Existing Feed/Spaces/Profile/HiveLab routes */}
        </NavigationShell>
      </ToolsProvider>
    </CommunityProvider>
  </LocationProvider>
</CampusProvider>
```

### Cross-Slice State Management

```typescript
/**
 * Unified campus state that enhances all slices
 */

interface CampusCompositionState {
  // Feed enhancements
  feed: {
    campusActivity: FeedPost[]
    locationFilters: LocationFilter[]
    communityFilters: CommunityFilter[]
    temporalBoosts: TemporalBoost[]
  }

  // Spaces enhancements
  spaces: {
    discoveryContext: SpaceDiscoveryContext
    locationProximity: SpaceProximityData
    communityRecommendations: SpaceRecommendation[]
    joinedSpacesContext: JoinedSpaceContext[]
  }

  // Profile enhancements
  profile: {
    campusIdentity: CampusIdentityData
    locationConnections: LocationConnection[]
    communityInvolvement: CommunityInvolvement[]
    campusTimeline: CampusActivityTimeline
  }

  // HiveLab enhancements
  hivelab: {
    contextualTools: ContextualTool[]
    spaceToolIntegration: SpaceToolData[]
    communityTemplates: CommunityTemplate[]
    campusToolUsage: ToolUsageAnalytics
  }
}
```

---

## Slice-Specific IA Improvements

### Feed Slice Enhancement

**Current State**: Generic activity stream
**Enhanced State**: Campus-aware activity discovery

```typescript
/**
 * Feed Composition Patterns
 */

// Campus-aware content organization
interface CampusFeedComposition {
  // Primary content streams
  personalActivity: {
    friendConnections: CampusConnection[]
    spaceUpdates: SpaceActivity[]
    toolCreations: ToolActivity[]
  }

  // Campus context layers
  locationActivity: {
    proximityPosts: LocationPost[]
    buildingEvents: BuildingEvent[]
    campusAnnouncements: CampusAnnouncement[]
  }

  // Community discovery
  communityActivity: {
    suggestedSpaces: SpaceActivity[]
    similarInterests: InterestActivity[]
    campusConnections: ConnectionActivity[]
  }

  // Temporal relevance
  timeRelevant: {
    mealTimeContent: MealContent[]
    studyPeriodContent: StudyContent[]
    eventCountdowns: EventCountdown[]
  }
}

// Enhanced feed algorithms with campus context
class CampusFeedAlgorithm extends FeedAlgorithmService {
  scoreWithCampusContext(
    post: FeedPost,
    campusContext: CampusContextValue
  ): ScoredPost {
    const baseScore = super.scorePost(post, user, space, connections)

    // Campus-specific scoring enhancements
    const locationBoost = this.calculateLocationRelevance(post, campusContext.location)
    const temporalBoost = this.calculateTemporalRelevance(post, campusContext.temporal)
    const communityBoost = this.calculateCommunityRelevance(post, campusContext.community)

    return {
      ...baseScore,
      campusScore: baseScore.algorithmScore + locationBoost + temporalBoost + communityBoost,
      campusFactors: {
        locationRelevance: locationBoost,
        temporalRelevance: temporalBoost,
        communityRelevance: communityBoost
      }
    }
  }
}
```

### Spaces Slice Enhancement

**Current State**: Category-based space browsing
**Enhanced State**: Campus-integrated community discovery

```typescript
/**
 * Spaces Composition Patterns
 */

interface CampusSpacesComposition {
  // Discovery organization
  discovery: {
    byLocation: {
      dormSpaces: DormSpace[]
      academicSpaces: AcademicSpace[]
      campusWideSpaces: CampusSpace[]
    }

    byProximity: {
      nearbySpaces: ProximitySpace[]
      buildingSpaces: BuildingSpace[]
      frequentLocations: FrequentLocationSpace[]
    }

    byCommunity: {
      friendSpaces: FriendSpace[]
      similarInterests: InterestSpace[]
      recommendedSpaces: RecommendedSpace[]
    }
  }

  // Participation context
  participation: {
    activeSpaces: ActiveSpace[]
    leadershipRoles: LeadershipSpace[]
    recentActivity: RecentSpaceActivity[]
  }

  // Campus integration
  campusIntegration: {
    officialSpaces: OfficialSpace[]
    verifiedOrgs: VerifiedOrgSpace[]
    campusEvents: CampusEventSpace[]
  }
}

// Enhanced space discovery with campus awareness
interface CampusSpaceDiscovery {
  organizeByContext(spaces: Space[], context: CampusContextValue): OrganizedSpaces {
    return {
      // Physical campus organization
      byLocation: this.groupByLocation(spaces, context.location),

      // Community organization
      byCommunity: this.groupByCommunity(spaces, context.community),

      // Temporal organization
      byRelevance: this.groupByTemporalRelevance(spaces, context.temporal),

      // Tool integration
      byToolUsage: this.groupByToolUsage(spaces, context.tools)
    }
  }
}
```

### Profile Slice Enhancement

**Current State**: Individual identity management
**Enhanced State**: Campus identity with community integration

```typescript
/**
 * Profile Composition Patterns
 */

interface CampusProfileComposition {
  // Campus identity
  identity: {
    campusRole: CampusRole // student, alumni, staff
    graduationYear: number
    major: string
    dorm: DormInfo | null
    campusInvolvement: Involvement[]
  }

  // Connection context
  connections: {
    campusConnections: CampusConnection[]
    dormmates: DormConnection[]
    classmateConnections: ClassmateConnection[]
    spaceConnections: SpaceConnection[]
  }

  // Activity integration
  activity: {
    campusTimeline: CampusActivity[]
    spaceParticipation: SpaceParticipation[]
    toolCreations: ToolCreation[]
    eventAttendance: EventAttendance[]
  }

  // Community presence
  presence: {
    activeSpaces: ActiveSpacePresence[]
    campusReputationScore: number
    communityContributions: CommunityContribution[]
    leadershipRoles: LeadershipRole[]
  }
}

// Campus-aware profile presentation
class CampusProfileComposer {
  composeProfile(
    user: User,
    campusContext: CampusContextValue
  ): ComposedProfile {
    return {
      // Core identity with campus context
      identity: this.composeCampusIdentity(user, campusContext.campus),

      // Connections with proximity and community context
      connections: this.composeConnectionsWithContext(
        user.connections,
        campusContext.location,
        campusContext.community
      ),

      // Activity timeline with campus relevance
      timeline: this.composeActivityTimeline(
        user.activity,
        campusContext.temporal
      ),

      // Community presence and reputation
      presence: this.composeCommunityPresence(
        user,
        campusContext.community
      )
    }
  }
}
```

### HiveLab Slice Enhancement

**Current State**: Standalone tool creation and management
**Enhanced State**: Contextual tool integration across campus experience

```typescript
/**
 * HiveLab Composition Patterns
 */

interface CampusHiveLabComposition {
  // Contextual tool discovery
  discovery: {
    contextualSuggestions: ContextualToolSuggestion[]
    spaceTools: SpaceToolIntegration[]
    communityTemplates: CommunityTemplate[]
    campusWideTools: CampusWideTools[]
  }

  // Creation context
  creation: {
    spaceIntegratedBuilder: SpaceIntegratedBuilder
    communityTemplates: CommunityTemplate[]
    campusResources: CampusResourceIntegration[]
    collaborativeTools: CollaborativeToolBuilder[]
  }

  // Usage integration
  usage: {
    embedInSpaces: EmbeddedToolUsage[]
    feedIntegration: FeedToolIntegration[]
    profileTools: ProfileToolIntegration[]
    crossSpaceTools: CrossSpaceToolUsage[]
  }

  // Campus analytics
  analytics: {
    campusToolUsage: CampusToolAnalytics
    communityImpact: CommunityImpactMetrics
    toolAdoption: ToolAdoptionMetrics
    spaceToolEffectiveness: SpaceToolMetrics
  }
}

// Contextual tool integration
class CampusToolComposer {
  suggestContextualTools(
    context: CampusContextValue,
    currentSlice: 'feed' | 'spaces' | 'profile'
  ): ContextualToolSuggestion[] {
    switch (currentSlice) {
      case 'feed':
        return this.suggestFeedTools(context)
      case 'spaces':
        return this.suggestSpaceTools(context)
      case 'profile':
        return this.suggestProfileTools(context)
    }
  }

  embedToolsInContext(
    tools: Tool[],
    context: CampusContextValue
  ): EmbeddedTool[] {
    return tools.map(tool => ({
      ...tool,
      campusContext: this.enrichWithCampusContext(tool, context),
      integrationPoints: this.findIntegrationPoints(tool, context),
      communityRelevance: this.calculateCommunityRelevance(tool, context)
    }))
  }
}
```

---

## Cross-Slice Composition Patterns

### Unified Campus Experience

```typescript
/**
 * Cross-slice composition ensures seamless campus experience
 */

interface CrossSliceComposition {
  // Context preservation across navigation
  contextPreservation: {
    // Moving from Feed → Spaces preserves discovery context
    feedToSpaces: (feedContext: FeedContext) => SpacesContext

    // Moving from Spaces → Profile preserves community context
    spacesToProfile: (spaceContext: SpaceContext) => ProfileContext

    // Moving from Profile → HiveLab preserves creation context
    profileToHiveLab: (profileContext: ProfileContext) => HiveLabContext

    // Any slice → any slice preserves campus context
    preserveCampusContext: (context: CampusContextValue) => CampusContextValue
  }

  // Shared components with campus awareness
  sharedComponents: {
    CampusNavigationShell: CampusAwareNavigation
    CampusSearchBar: CampusAwareSearch
    CampusNotifications: CampusAwareNotifications
    CampusQuickActions: CampusAwareQuickActions
  }

  // Inter-slice data flow
  dataFlow: {
    // Feed activity influences space recommendations
    feedToSpaceRecommendations: ActivityBasedRecommendations

    // Space participation influences profile presentation
    spaceToProfileIntegration: ParticipationBasedProfile

    // Profile tools influence HiveLab suggestions
    profileToHiveLabSuggestions: UsageBasedSuggestions

    // HiveLab tools integrate back into feed/spaces
    hiveLabToContentIntegration: ToolBasedContentIntegration
  }
}
```

### Behavioral Psychology Integration

```typescript
/**
 * Campus-enhanced behavioral patterns
 */

interface CampusBehavioralPatterns {
  // Variable ratio reinforcement with campus context
  campusDiscovery: {
    locationSurprises: LocationBasedDiscovery[]
    communitySurprises: CommunityBasedDiscovery[]
    temporalSurprises: TimeBasedDiscovery[]
  }

  // Investment escalation with campus involvement
  campusInvolvement: {
    viewCampusActivity: 'Passive campus awareness'
    reactToCampusContent: 'Light campus engagement'
    joinCampusSpaces: 'Community investment'
    createCampusTools: 'Campus contribution'
    leadCampusCommunities: 'Campus leadership'
  }

  // Social proof with campus proximity
  campusSocialProof: {
    dormProximity: 'Friends in your building are active'
    majorRelevance: 'Students in your major are discussing'
    classConnections: 'Classmates are participating'
    campusEvent: 'Campus is buzzing about this'
  }

  // FOMO with campus urgency
  campusFOMO: {
    limitedTimeEvents: 'Event happening soon on campus'
    exclusiveSpaces: 'Invite-only campus community'
    trendingContent: 'Trending across campus today'
    lastChance: 'Registration closing soon'
  }
}
```

---

## Implementation Strategy

### Phase 1: Campus Context Foundation (Week 1)
1. Create campus context providers
2. Implement cross-slice state management
3. Build campus-aware component compositions
4. Test context preservation across navigation

### Phase 2: Slice Enhancement (Week 2-3)
1. Enhance Feed with campus activity organization
2. Enhance Spaces with campus-integrated discovery
3. Enhance Profile with campus identity integration
4. Enhance HiveLab with contextual tool integration

### Phase 3: Cross-Slice Integration (Week 4)
1. Implement context preservation patterns
2. Build shared campus-aware components
3. Create inter-slice data flow systems
4. Integrate behavioral psychology enhancements

### Phase 4: Testing & Optimization (Week 5)
1. Test campus context performance
2. Validate behavioral psychology effectiveness
3. Optimize cross-slice composition patterns
4. Measure campus experience improvements

---

## Success Metrics

### Campus Context Effectiveness
- Context preservation rate across navigation (target: >95%)
- Campus-relevant content discovery (target: +40%)
- Cross-slice interaction patterns (target: +25%)

### User Experience Improvements
- Reduced cognitive load (measured via user testing)
- Increased campus community engagement
- Higher tool adoption through contextual suggestions
- Improved retention through campus connection

### Technical Performance
- Context provider performance impact (<100ms)
- Cross-slice state management efficiency
- Component composition rendering optimization
- Memory usage with enhanced context

---

This composition system transforms HIVE into a unified campus experience while maintaining the familiar Feed/Spaces/Profile/HiveLab navigation structure. The campus context layer creates seamless, intelligent connections between all features while preserving the sophisticated behavioral psychology and technical architecture already built.