/**
 * HIVE State Management Framework;
 * 
 * Social-first state management with tool-level permissions and feed-centric persistence:
 * - Auth flow with .edu verification;
 * - Profile completion tracking (% complete, next steps)
 * - Tool permission levels (view, use, edit, create)
 * - Builder status progression (novice → intermediate → advanced)
 * - State persistence (always return to feed unless deep-linked)
 */

"use client";

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { hiveRoutes } from '../navigation/hive-navigation-routes';

// ============================================================================
// STATE TYPES & INTERFACES;
// ============================================================================

export type AuthStatus = 'loading' | 'unauthenticated' | 'authenticated' | 'onboarding';
export type ProfileCompletionStage = 'welcome' | 'academics' | 'handle' | 'photo' | 'legal' | 'complete';
export type BuilderLevel = 'novice' | 'intermediate' | 'advanced' | 'expert';
export type ToolPermission = 'view' | 'use' | 'edit' | 'create' | 'admin';
export type SpaceMembershipRole = 'member' | 'leader' | 'admin';
export type GhostModeStatus = 'visible' | 'ghost';

export interface User {id: string;
  handle: string;
  name: string;
  email: string;
  avatar?: string;
  
  // Academic info;
  university: string;
  year: string;
  major: string;
  
  // HIVE specific;
  builderLevel: BuilderLevel;
  ghostMode: GhostModeStatus;
  joinedAt: Date;
  lastActive: Date;
  
  // Profile completion;
  profileCompletion: {
    stage: ProfileCompletionStage;
    percentage: number;
    nextSteps: string[]};
  
  // Privacy settings (private by default during vBETA)
  privacy: {
    profileVisibility: 'private' | 'friends' | 'public';
    toolSharingDefault: 'private' | 'space' | 'public';
    activityTracking: boolean;
    friendDiscovery: boolean;
  };
  
  // Social features (unlocked in V1)
  social?: {
    friends: string[];
    blockedUsers: string[];
    favoriteSpaces: string[]
  }
}

export interface Space {id: string;
  name: string;
  description: string;
  type: 'academic' | 'residential' | 'social' | 'campus-wide';
  memberCount: number;
  isActive: boolean;
  
  // Social proof data;
  friendMembers: string[]; // Friend handles who are members;
  recentActivity: number;  // Posts/activity in last week;
  trending: boolean;       // Is trending this week;
  // RSS integration;
  rssEvents?: {
    source: string;
    lastUpdate: Date;
    eventCount: number;}
}

export interface Tool {id: string;
  name: string;
  description: string;
  category: 'personal' | 'space' | 'ritual';
  createdBy: string;
  
  // Permission system (tool-level permissions)
  permissions: {
    view: ToolPermission;      // Who can see this tool exists;
    use: ToolPermission;       // Who can interact with the tool;
    edit: ToolPermission;      // Who can modify tool settings;
    create: ToolPermission;    // Who can create similar tools;
    share: 'private' | 'space' | 'friends' | 'public'};
  
  // Social awareness;
  usageStats: {
    totalUses: number;
    uniqueUsers: number;
    lastUsed: Date;
  };
  
  // Shareable URLs;
  shareableUrl?: string;
  previewCard?: {
    title: string;
    description: string;
    image?: string;
  }
}

export interface AppState {// Authentication & user;
  auth: {
    status: AuthStatus;
    user: User | null;
    sessionToken?: string;
    emailVerified: boolean;};
  
  // Navigation & routing;
  navigation: {
    currentRoute: string;
    previousRoute: string;
    returnToFeed: boolean; // Always return to feed unless deep-linked;
    deepLinked: boolean;   // Was this session started from a deep link;
  };
  
  // Spaces & memberships;
  spaces: {
    joined: Space[];
    discovered: Space[];   // Available to browse with social proof;
    memberships: Record<string, {
      spaceId: string;
      role: SpaceMembershipRole;
      joinedAt: Date;
      isActive: boolean;
    }>
  };
  
  // Tools & permissions;
  tools: {
    personal: Tool[];      // User's personal tools;
    accessible: Tool[];    // Tools user can access in spaces;
    created: Tool[];       // Tools user has built;
    // Permission cache for performance;
    permissionCache: Record<string, {
      toolId: string;
      canView: boolean;
      canUse: boolean;
      canEdit: boolean;
      canShare: boolean;
      lastChecked: Date;
    }>
  };
  
  // Feed & social;
  feed: {
    timeline: any[];       // Feed items (posts, rituals, events)
    unreadCount: number;
    lastRefresh: Date;
    filters: {
      spaceTypes: string[];
      showFriends: boolean;
      showAnnouncements: boolean;
    }
  };
  
  // App configuration;
  ui: {
    theme: 'dark' | 'light';
    reducedMotion: boolean;
    compactMode: boolean;
    
    // Mobile responsive;
    isMobile: boolean;
    bottomTabsVisible: boolean;
    
    // Modals & overlays;
    activeModal: string | null;
    commandPaletteOpen: boolean;
    notificationsOpen: boolean;
  };
  
  // Feature flags & experiments;
  features: {
    socialFeaturesEnabled: boolean;  // V1 unlock;
    builderToolsEnabled: boolean;    // HiveLAB access;
    ritualParticipation: boolean;    // Ritual engagement;
    deepLinkSharing: boolean;        // URL sharing;
  }
}

// ============================================================================
// STATE ACTIONS;
// ============================================================================

export type StateAction =
  // Auth actions;
  | { type: 'AUTH_START_LOGIN'; payload: { email: string } }
  | { type: 'AUTH_VERIFY_EMAIL'; payload: { token: string } }
  | { type: 'AUTH_LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_UPDATE_PROFILE'; payload: Partial<User> }
  
  // Profile completion;
  | { type: 'PROFILE_ADVANCE_STAGE'; payload: { stage: ProfileCompletionStage; data: any } }
  | { type: 'PROFILE_UPDATE_COMPLETION'; payload: { percentage: number; nextSteps: string[] } }
  
  // Navigation;
  | { type: 'NAVIGATE_TO'; payload: { route: string; fromDeepLink?: boolean } }
  | { type: 'NAVIGATE_BACK_TO_FEED' }
  | { type: 'SET_RETURN_TO_FEED'; payload: boolean }
  
  // Spaces & memberships;
  | { type: 'SPACE_JOIN'; payload: { spaceId: string; role?: SpaceMembershipRole } }
  | { type: 'SPACE_LEAVE'; payload: { spaceId: string } }
  | { type: 'SPACES_LOAD_DISCOVERED'; payload: { spaces: Space[] } }
  | { type: 'SPACE_UPDATE_SOCIAL_PROOF'; payload: { spaceId: string; memberCount: number; friendMembers: string[] } }
  
  // Tools & permissions;
  | { type: 'TOOL_CREATE'; payload: { tool: Tool } }
  | { type: 'TOOL_UPDATE_PERMISSIONS'; payload: { toolId: string; permissions: Tool['permissions'] } }
  | { type: 'TOOL_CACHE_PERMISSIONS'; payload: { toolId: string; permissions: any } }
  | { type: 'TOOLS_LOAD_ACCESSIBLE'; payload: { tools: Tool[] } }
  
  // Feed & social;
  | { type: 'FEED_REFRESH'; payload: { items: any[] } }
  | { type: 'FEED_UPDATE_FILTERS'; payload: Partial<AppState['feed']['filters']> }
  | { type: 'FEED_MARK_READ' }
  
  // UI state;
  | { type: 'UI_SET_MOBILE'; payload: boolean }
  | { type: 'UI_TOGGLE_COMMAND_PALETTE' }
  | { type: 'UI_OPEN_MODAL'; payload: string }
  | { type: 'UI_CLOSE_MODAL' }
  
  // Features;
  | { type: 'FEATURE_ENABLE'; payload: { feature: keyof AppState['features']; enabled: boolean } };

// ============================================================================
// STATE REDUCER;
// ============================================================================

const initialState: AppState = {
  auth: {
    status: 'loading',
    user: null,
    emailVerified: false;
  },
  navigation: {
    currentRoute: hiveRoutes.defaultRoute,
    previousRoute: '',
    returnToFeed: true,
    deepLinked: false;
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
      showAnnouncements: true;
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
    notificationsOpen: false;
  },
  features: {
    socialFeaturesEnabled: false,  // V1 unlock;
    builderToolsEnabled: true,     // Available in vBETA;
    ritualParticipation: true,     // Core feature;
    deepLinkSharing: true          // Essential for growth;
  }
};

function stateReducer(state: AppState, action: StateAction): AppState {
  switch (action.type) {
    case 'AUTH_LOGIN_SUCCESS':
      return {
        ...state,
        auth: {
          ...state.auth,
          status: action.payload.user.profileCompletion.stage === 'complete' ? 'authenticated' : 'onboarding',
          user: action.payload.user,
          sessionToken: action.payload.token,
          emailVerified: true;
        }
      };
      
    case 'AUTH_LOGOUT':
      return {
        ...initialState,
        navigation: {
          ...initialState.navigation,
          currentRoute: hiveRoutes.routes.feed // Always return to feed;
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
          returnToFeed: !action.payload.fromDeepLink // Only return to feed if not deep-linked;
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
          deepLinked: false;
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
              isActive: true;
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
          bottomTabsVisible: action.payload // Show bottom tabs on mobile;
        }
      };
      
    case 'FEATURE_ENABLE':
      return {
        ...state,
        features: {
          ...state.features,
          [action.payload.feature]: action.payload.enabled;
        }
      };
      
    default:
      return state;
  }
}

// ============================================================================
// STATE CONTEXT & PROVIDER;
// ============================================================================

interface StateContextType {state: AppState;
  dispatch: React.Dispatch<StateAction>;
  
  // Computed values;
  isAuthenticated: boolean;
  isOnboarding: boolean;
  currentUser: User | null;
  
  // Helper functions;
  checkToolPermission: (toolId: string, permission: ToolPermission) => boolean;
  getSpaceMembership: (spaceId: string) => any | null;
  shouldReturnToFeed: () => boolean;
  getProfileCompletionPercentage: () => number;}

const StateContext = createContext<StateContextType | null>(null);

export const useHiveState = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useHiveState must be used within a HiveStateProvider')
  }}
  return context;
};

// ============================================================================
// STATE PROVIDER COMPONENT;
// ============================================================================

interface HiveStateProviderProps {children: React.ReactNode;
  initialUser?: User;
  persistenceKey?: string;}

export function HiveStateProvider({ 
  children, 
  initialUser,
  persistenceKey = 'hive-state' 
}: HiveStateProviderProps) {
  const [state, dispatch] = useReducer(stateReducer, {
    ...initialState,
    auth: {
      ...initialState.auth,
      status: initialUser ? 'authenticated' : 'unauthenticated',
      user: initialUser || null;
    }
  });
  
  // Handle mobile detection;
  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile !== state.ui.isMobile) {
        dispatch({type: 'UI_SET_MOBILE', payload: isMobile)}
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile)
  }, [state.ui.isMobile]);
  
  // State persistence (minimal for privacy)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const persistedData = {
        theme: state.ui.theme,
        compactMode: state.ui.compactMode,
        feedFilters: state.feed.filters,
        lastRoute: state.navigation.currentRoute;
      };
      localStorage.setItem(persistenceKey, JSON.stringify(persistedData))
    }
  }, [state.ui.theme, state.ui.compactMode, state.feed.filters, state.navigation.currentRoute, persistenceKey]);
  
  // Computed values;
  const isAuthenticated = state.auth.status === 'authenticated';
  const isOnboarding = state.auth.status === 'onboarding';
  const currentUser = state.auth.user;
  
  // Helper functions;
  const checkToolPermission = (toolId: string, permission: ToolPermission): boolean => {
    const cached = state.tools.permissionCache[toolId];
    if (cached && new Date().getTime() - cached.lastChecked.getTime() < 5 * 60 * 1000) {
      // Use cached permission if less than 5 minutes old;
      switch (permission) {
        case 'view': return cached.canView;
        case 'use': return cached.canUse;
        case 'edit': return cached.canEdit;
        default: return false;
      }}
    }
    
    // Fallback to user's builder level for now;
    if (!currentUser) return permission === 'view';
    
    switch (currentUser.builderLevel) {
      case 'expert': return true;
      case 'advanced': return permission !== 'admin';
      case 'intermediate': return ['view', 'use'].includes(permission);
      case 'novice': return permission === 'view';
      default: return false;
    }
  };
  
  const getSpaceMembership = (spaceId: string) => {
    return state.spaces.memberships[spaceId] || null;
  };
  
  const shouldReturnToFeed = (): boolean => {
    return state.navigation.returnToFeed && !state.navigation.deepLinked;
  };
  
  const getProfileCompletionPercentage = (): number => {
    return currentUser?.profileCompletion.percentage || 0
  };
  
  const value: StateContextType = {
    state,
    dispatch,
    isAuthenticated,
    isOnboarding,
    currentUser,
    checkToolPermission,
    getSpaceMembership,
    shouldReturnToFeed,
    getProfileCompletionPercentage;
  };
  
  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  )
}

// ============================================================================
// PERMISSION UTILITIES;
// ============================================================================

/**
 * Check if user can perform action on tool;
 */
export function canPerformToolAction(
  user: User | null,
  tool: Tool,
  action: 'view' | 'use' | 'edit' | 'create' | 'share'
): boolean {
  if (!user) return action === 'view' && tool.permissions.view === 'view';
  
  // Tool creator has all permissions;
  if (tool.createdBy === user.id) return true;
  
  // Check specific permission levels;
  const requiredLevel = tool.permissions[action as keyof Tool['permissions']];
  
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
 * Generate shareable URL for tool with proper attribution;
 */
export function generateToolShareUrl(tool: Tool, baseUrl: string = ''): string {
  const url = `${baseUrl}/t/${tool.id}`;
  const urlObj = new URL(url, window?.location?.origin || 'https://hive.campus');
  
  // Add sharing attribution;
  urlObj.searchParams.set('ref', 'tool_share');
  urlObj.searchParams.set('utm_source', 'hive_tool');
  urlObj.searchParams.set('created_by', tool.createdBy);
  
  return urlObj.toString()
}

