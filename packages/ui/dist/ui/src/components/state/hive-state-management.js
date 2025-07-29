/**
 * HIVE State Management Framework
 *
 * Social-first state management with tool-level permissions and feed-centric persistence:
 * - Auth flow with .edu verification
 * - Profile completion tracking (% complete, next steps)
 * - Tool permission levels (view, use, edit, create)
 * - Builder status progression (novice → intermediate → advanced)
 * - State persistence (always return to feed unless deep-linked)
 */
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useReducer, useEffect } from 'react';
import { hiveRoutes } from '../navigation/hive-navigation-routes';
// ============================================================================
// STATE REDUCER
// ============================================================================
const initialState = {
    auth: {
        status: 'loading',
        user: null,
        emailVerified: false
    },
    navigation: {
        currentRoute: hiveRoutes.defaultRoute,
        previousRoute: '',
        returnToFeed: true,
        deepLinked: false
    },
    spaces: {
        joined: [],
        discovered: [],
        memberships: {}
    },
    tools: {
        personal: [],
        accessible: [],
        created: [],
        permissionCache: {}
    },
    feed: {
        timeline: [],
        unreadCount: 0,
        lastRefresh: new Date(),
        filters: {
            spaceTypes: ['academic', 'residential', 'social', 'campus-wide'],
            showFriends: true,
            showAnnouncements: true
        }
    },
    ui: {
        theme: 'dark',
        reducedMotion: false,
        compactMode: false,
        isMobile: false,
        bottomTabsVisible: true,
        activeModal: null,
        commandPaletteOpen: false,
        notificationsOpen: false
    },
    features: {
        socialFeaturesEnabled: false, // V1 unlock
        builderToolsEnabled: true, // Available in vBETA
        ritualParticipation: true, // Core feature
        deepLinkSharing: true // Essential for growth
    }
};
function stateReducer(state, action) {
    switch (action.type) {
        case 'AUTH_LOGIN_SUCCESS':
            return {
                ...state,
                auth: {
                    ...state.auth,
                    status: action.payload.user.profileCompletion.stage === 'complete' ? 'authenticated' : 'onboarding',
                    user: action.payload.user,
                    sessionToken: action.payload.token,
                    emailVerified: true
                }
            };
        case 'AUTH_LOGOUT':
            return {
                ...initialState,
                navigation: {
                    ...initialState.navigation,
                    currentRoute: hiveRoutes.routes.feed // Always return to feed
                }
            };
        case 'NAVIGATE_TO':
            return {
                ...state,
                navigation: {
                    ...state.navigation,
                    previousRoute: state.navigation.currentRoute,
                    currentRoute: action.payload.route,
                    deepLinked: action.payload.fromDeepLink || false,
                    returnToFeed: !action.payload.fromDeepLink // Only return to feed if not deep-linked
                }
            };
        case 'NAVIGATE_BACK_TO_FEED':
            return {
                ...state,
                navigation: {
                    ...state.navigation,
                    previousRoute: state.navigation.currentRoute,
                    currentRoute: hiveRoutes.socialGravityWell,
                    returnToFeed: true,
                    deepLinked: false
                }
            };
        case 'SPACE_JOIN':
            return {
                ...state,
                spaces: {
                    ...state.spaces,
                    memberships: {
                        ...state.spaces.memberships,
                        [action.payload.spaceId]: {
                            spaceId: action.payload.spaceId,
                            role: action.payload.role || 'member',
                            joinedAt: new Date(),
                            isActive: true
                        }
                    }
                }
            };
        case 'TOOL_CACHE_PERMISSIONS':
            return {
                ...state,
                tools: {
                    ...state.tools,
                    permissionCache: {
                        ...state.tools.permissionCache,
                        [action.payload.toolId]: {
                            ...action.payload.permissions,
                            lastChecked: new Date()
                        }
                    }
                }
            };
        case 'UI_SET_MOBILE':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    isMobile: action.payload,
                    bottomTabsVisible: action.payload // Show bottom tabs on mobile
                }
            };
        case 'FEATURE_ENABLE':
            return {
                ...state,
                features: {
                    ...state.features,
                    [action.payload.feature]: action.payload.enabled
                }
            };
        default:
            return state;
    }
}
const StateContext = createContext(null);
export const useHiveState = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useHiveState must be used within a HiveStateProvider');
    }
    return context;
};
export function HiveStateProvider({ children, initialUser, persistenceKey = 'hive-state' }) {
    const [state, dispatch] = useReducer(stateReducer, {
        ...initialState,
        auth: {
            ...initialState.auth,
            status: initialUser ? 'authenticated' : 'unauthenticated',
            user: initialUser || null
        }
    });
    // Handle mobile detection
    useEffect(() => {
        const checkMobile = () => {
            const isMobile = window.innerWidth < 768;
            if (isMobile !== state.ui.isMobile) {
                dispatch({ type: 'UI_SET_MOBILE', payload: isMobile });
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [state.ui.isMobile]);
    // State persistence (minimal for privacy)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const persistedData = {
                theme: state.ui.theme,
                compactMode: state.ui.compactMode,
                feedFilters: state.feed.filters,
                lastRoute: state.navigation.currentRoute
            };
            localStorage.setItem(persistenceKey, JSON.stringify(persistedData));
        }
    }, [state.ui.theme, state.ui.compactMode, state.feed.filters, state.navigation.currentRoute, persistenceKey]);
    // Computed values
    const isAuthenticated = state.auth.status === 'authenticated';
    const isOnboarding = state.auth.status === 'onboarding';
    const currentUser = state.auth.user;
    // Helper functions
    const checkToolPermission = (toolId, permission) => {
        const cached = state.tools.permissionCache[toolId];
        if (cached && new Date().getTime() - cached.lastChecked.getTime() < 5 * 60 * 1000) {
            // Use cached permission if less than 5 minutes old
            switch (permission) {
                case 'view': return cached.canView;
                case 'use': return cached.canUse;
                case 'edit': return cached.canEdit;
                default: return false;
            }
        }
        // Fallback to user's builder level for now
        if (!currentUser)
            return permission === 'view';
        switch (currentUser.builderLevel) {
            case 'expert': return true;
            case 'advanced': return permission !== 'admin';
            case 'intermediate': return ['view', 'use'].includes(permission);
            case 'novice': return permission === 'view';
            default: return false;
        }
    };
    const getSpaceMembership = (spaceId) => {
        return state.spaces.memberships[spaceId] || null;
    };
    const shouldReturnToFeed = () => {
        return state.navigation.returnToFeed && !state.navigation.deepLinked;
    };
    const getProfileCompletionPercentage = () => {
        return currentUser?.profileCompletion.percentage || 0;
    };
    const value = {
        state,
        dispatch,
        isAuthenticated,
        isOnboarding,
        currentUser,
        checkToolPermission,
        getSpaceMembership,
        shouldReturnToFeed,
        getProfileCompletionPercentage
    };
    return (_jsx(StateContext.Provider, { value: value, children: children }));
}
// ============================================================================
// PERMISSION UTILITIES
// ============================================================================
/**
 * Check if user can perform action on tool
 */
export function canPerformToolAction(user, tool, action) {
    if (!user)
        return action === 'view' && tool.permissions.view === 'view';
    // Tool creator has all permissions
    if (tool.createdBy === user.id)
        return true;
    // Check specific permission levels
    const requiredLevel = tool.permissions[action];
    switch (requiredLevel) {
        case 'view': return true;
        case 'use': return user.builderLevel !== 'novice' || tool.category === 'personal';
        case 'edit': return ['intermediate', 'advanced', 'expert'].includes(user.builderLevel);
        case 'create': return ['advanced', 'expert'].includes(user.builderLevel);
        case 'admin': return user.builderLevel === 'expert';
        default: return false;
    }
}
/**
 * Generate shareable URL for tool with proper attribution
 */
export function generateToolShareUrl(tool, baseUrl = '') {
    const url = `${baseUrl}/t/${tool.id}`;
    const urlObj = new URL(url, window?.location?.origin || 'https://hive.campus');
    // Add sharing attribution
    urlObj.searchParams.set('ref', 'tool_share');
    urlObj.searchParams.set('utm_source', 'hive_tool');
    urlObj.searchParams.set('created_by', tool.createdBy);
    return urlObj.toString();
}
//# sourceMappingURL=hive-state-management.js.map