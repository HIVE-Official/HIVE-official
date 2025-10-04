"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { useCampusContext } from "./campus-context.js";
// Slice context React context
const SliceContext = React.createContext(undefined);
/**
 * Slice Context Provider
 * Manages context for each slice while integrating with campus context
 */
export function SliceContextProvider({ children, initialSlice = 'feed' }) {
    const campusContext = useCampusContext();
    // Current slice state
    const [currentSlice, setCurrentSlice] = React.useState(initialSlice);
    // Feed context state
    const [feedContext, setFeedContext] = React.useState({
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
    });
    // Spaces context state
    const [spacesContext, setSpacesContext] = React.useState({
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
    });
    // Profile context state
    const [profileContext, setProfileContext] = React.useState({
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
    });
    // HiveLab context state
    const [hiveLabContext, setHiveLabContext] = React.useState({
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
    });
    // Update campus tool context when slice changes
    React.useEffect(() => {
        campusContext.actions.updateToolContext(currentSlice);
    }, [currentSlice, campusContext.actions]);
    // Sync spaces context with campus community data
    React.useEffect(() => {
        setSpacesContext(prev => ({
            ...prev,
            organization: {
                ...prev.organization,
                joinedSpaces: campusContext.community.userSpaces,
                recommendedSpaces: campusContext.community.suggestedSpaces
            }
        }));
    }, [campusContext.community.userSpaces, campusContext.community.suggestedSpaces]);
    // Sync location context with spaces discovery
    React.useEffect(() => {
        if (campusContext.location.current) {
            setSpacesContext(prev => ({
                ...prev,
                discovery: {
                    ...prev.discovery,
                    locationFilter: campusContext.location.current?.name || null
                }
            }));
        }
    }, [campusContext.location.current]);
    // Context preservation logic
    const preserveContextOnNavigation = React.useCallback((fromSlice, toSlice) => {
        switch (fromSlice) {
            case 'feed':
                if (toSlice === 'spaces') {
                    // Preserve feed discovery context in spaces
                    const feedInterests = feedContext.interactions.recentEngagements;
                    setSpacesContext(prev => ({
                        ...prev,
                        discovery: {
                            ...prev.discovery,
                            sortBy: 'relevance' // Switch to relevance based on feed engagement
                        }
                    }));
                }
                break;
            case 'spaces':
                if (toSlice === 'profile') {
                    // Preserve space context in profile
                    setProfileContext(prev => ({
                        ...prev,
                        presence: {
                            ...prev.presence,
                            activeSpaces: spacesContext.participation.activeSpaces.map(space => space.id)
                        }
                    }));
                }
                else if (toSlice === 'hivelab') {
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
                    }));
                }
                break;
            case 'profile':
                if (toSlice === 'hivelab') {
                    // Preserve profile tools in HiveLab
                    setHiveLabContext(prev => ({
                        ...prev,
                        creation: {
                            ...prev.creation,
                            // Suggest tools based on profile interests
                        }
                    }));
                }
                break;
            case 'hivelab':
                if (toSlice === 'feed') {
                    // Suggest sharing tools in feed
                    setFeedContext(prev => ({
                        ...prev,
                        campusIntegration: {
                            ...prev.campusIntegration,
                            // Add tool sharing suggestions
                        }
                    }));
                }
                break;
        }
    }, [feedContext, spacesContext, profileContext, hiveLabContext]);
    // Handle slice changes with context preservation
    const handleSetCurrentSlice = React.useCallback((newSlice) => {
        const oldSlice = currentSlice;
        preserveContextOnNavigation(oldSlice, newSlice);
        setCurrentSlice(newSlice);
    }, [currentSlice, preserveContextOnNavigation]);
    // Context update functions
    const updateFeedContext = React.useCallback((updates) => {
        setFeedContext(prev => ({ ...prev, ...updates }));
    }, []);
    const updateSpacesContext = React.useCallback((updates) => {
        setSpacesContext(prev => ({ ...prev, ...updates }));
    }, []);
    const updateProfileContext = React.useCallback((updates) => {
        setProfileContext(prev => ({ ...prev, ...updates }));
    }, []);
    const updateHiveLabContext = React.useCallback((updates) => {
        setHiveLabContext(prev => ({ ...prev, ...updates }));
    }, []);
    const contextValue = React.useMemo(() => ({
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
    ]);
    return (_jsx(SliceContext.Provider, { value: contextValue, children: children }));
}
/**
 * Hook to use slice context
 */
export function useSliceContext() {
    const context = React.useContext(SliceContext);
    if (context === undefined) {
        throw new Error('useSliceContext must be used within a SliceContextProvider');
    }
    return context;
}
/**
 * Hook for feed-specific context
 */
export function useFeedContext() {
    const { feedContext, actions, currentSlice } = useSliceContext();
    // Auto-update current slice when this hook is used
    React.useEffect(() => {
        if (currentSlice !== 'feed') {
            actions.setCurrentSlice('feed');
        }
    }, [currentSlice, actions]);
    return {
        content: feedContext.content,
        filters: feedContext.filters,
        interactions: feedContext.interactions,
        campusIntegration: feedContext.campusIntegration,
        updateContext: actions.updateFeedContext
    };
}
/**
 * Hook for spaces-specific context
 */
export function useSpacesContext() {
    const { spacesContext, actions, currentSlice } = useSliceContext();
    // Auto-update current slice when this hook is used
    React.useEffect(() => {
        if (currentSlice !== 'spaces') {
            actions.setCurrentSlice('spaces');
        }
    }, [currentSlice, actions]);
    return {
        organization: spacesContext.organization,
        discovery: spacesContext.discovery,
        participation: spacesContext.participation,
        campusIntegration: spacesContext.campusIntegration,
        updateContext: actions.updateSpacesContext
    };
}
/**
 * Hook for profile-specific context
 */
export function useProfileContext() {
    const { profileContext, actions, currentSlice } = useSliceContext();
    // Auto-update current slice when this hook is used
    React.useEffect(() => {
        if (currentSlice !== 'profile') {
            actions.setCurrentSlice('profile');
        }
    }, [currentSlice, actions]);
    return {
        identity: profileContext.identity,
        connections: profileContext.connections,
        activity: profileContext.activity,
        presence: profileContext.presence,
        updateContext: actions.updateProfileContext
    };
}
/**
 * Hook for HiveLab-specific context
 */
export function useHiveLabContext() {
    const { hiveLabContext, actions, currentSlice } = useSliceContext();
    // Auto-update current slice when this hook is used
    React.useEffect(() => {
        if (currentSlice !== 'hivelab') {
            actions.setCurrentSlice('hivelab');
        }
    }, [currentSlice, actions]);
    return {
        creation: hiveLabContext.creation,
        management: hiveLabContext.management,
        integration: hiveLabContext.integration,
        campusEcosystem: hiveLabContext.campusEcosystem,
        updateContext: actions.updateHiveLabContext
    };
}
//# sourceMappingURL=slice-context.js.map