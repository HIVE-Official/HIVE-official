/**
 * HIVE Navigation Routes - Social-First Campus Platform
 * 
 * Feed-centric navigation with short URLs optimized for GroupMe sharing:
 * - /feed (default home - social gravity well)
 * - /s/[space-id] (spaces: /s/cs-majors, /s/dorm-west)  
 * - /u/[user-handle] (profiles: /u/sarah, /u/mike.chen)
 * - /lab (HiveLAB for builders)
 * 
 * Mobile: Bottom tabs (Feed | Spaces | Profile | Lab)
 * Desktop: Sidebar with feed-first mental model
 */

"use client";

import React from 'react';
import { 
  Home, 
  Users, 
  User, 
  Wrench,
  Search,
  Bell,
  Settings,
  Heart,
  MessageCircle,
  Bookmark,
  TrendingUp,
  Calendar,
  GraduationCap,
  Building,
  Coffee,
  MapPin,
  Zap,
  Sparkles
} from 'lucide-react';

import type { NavigationSection, NavigationItem } from './hive-navigation-system';

// ============================================================================
// HIVE SOCIAL-FIRST ROUTE STRUCTURE 
// ============================================================================

export interface HiveRouteConfig {
  // Route structure follows social-first consumption patterns
  routes: {
    // Primary routes (main navigation)
    feed: string;           // "/feed" - social gravity well
    spaces: string;         // "/spaces" - browse/discover spaces 
    profile: string;        // "/profile" - personal command center
    lab: string;           // "/lab" - builder empowerment console
    
    // Dynamic routes with short URLs for sharing
    space: (spaceId: string) => string;    // "/s/cs-majors"
    user: (handle: string) => string;      // "/u/sarah" 
    tool: (toolId: string) => string;      // "/t/gpa-calc"
    ritual: (ritualId: string) => string;  // "/r/first-light"
    
    // Deep link patterns for viral sharing  
    spaceTools: (spaceId: string) => string;        // "/s/cs-majors/tools"
    spaceMembers: (spaceId: string) => string;      // "/s/cs-majors/members"
    spaceEvents: (spaceId: string) => string;       // "/s/cs-majors/events"
    userTools: (handle: string) => string;          // "/u/sarah/tools"
    
    // Utility routes
    search: string;         // "/search"
    notifications: string;  // "/notifications" 
    settings: string;      // "/settings"
    onboarding: string;    // "/onboarding"
  };
  
  // State persistence rules
  defaultRoute: string;     // Where to redirect on refresh/error
  socialGravityWell: string; // Where users naturally return
  
  // Sharing configuration
  shareableRoutes: string[]; // Routes that generate preview cards
  attribution: string;       // "Created in HIVE" for external links
}

export const hiveRoutes: HiveRouteConfig = {
  routes: {
    // Primary navigation - social consumption first
    feed: '/feed',
    spaces: '/spaces', 
    profile: '/profile',
    lab: '/lab',
    
    // Short URLs optimized for GroupMe/Discord sharing
    space: (spaceId: string) => `/s/${spaceId}`,
    user: (handle: string) => `/u/${handle}`,
    tool: (toolId: string) => `/t/${toolId}`,
    ritual: (ritualId: string) => `/r/${ritualId}`,
    
    // Deep navigation within entities
    spaceTools: (spaceId: string) => `/s/${spaceId}/tools`,
    spaceMembers: (spaceId: string) => `/s/${spaceId}/members`, 
    spaceEvents: (spaceId: string) => `/s/${spaceId}/events`,
    userTools: (handle: string) => `/u/${handle}/tools`,
    
    // Utility routes
    search: '/search',
    notifications: '/notifications',
    settings: '/settings', 
    onboarding: '/onboarding',
  },
  
  // Feed as social gravity well
  defaultRoute: '/feed',
  socialGravityWell: '/feed',
  
  // Routes that generate social preview cards
  shareableRoutes: [
    '/s/', '/u/', '/t/', '/r/', '/feed'
  ],
  attribution: 'Created in HIVE'
};

// ============================================================================
// FEED-CENTRIC NAVIGATION STRUCTURE
// ============================================================================

/**
 * Main navigation sections optimized for social consumption
 * Feed-first with utility depth when needed
 */
export function createHiveNavigationSections(currentUser?: { handle: string; name: string }): NavigationSection[] {
  return [
    // PRIMARY SOCIAL CONSUMPTION
    {
      id: 'primary',
      label: 'Main',
      items: [
        {
          id: 'feed', 
          label: 'Feed',
          icon: Home,
          href: hiveRoutes.routes.feed,
          description: 'Campus pulse - where everything happens',
          keywords: ['home', 'timeline', 'activity', 'social'],
          shortcut: '⌘ + H'
        },
        {
          id: 'spaces',
          label: 'Spaces', 
          icon: Users,
          href: hiveRoutes.routes.spaces,
          description: 'Browse and join campus communities',
          keywords: ['communities', 'groups', 'browse', 'discover'],
          shortcut: '⌘ + S'
        },
        {
          id: 'profile',
          label: 'Profile',
          icon: User, 
          href: hiveRoutes.routes.profile,
          description: 'Your personal command center',
          keywords: ['dashboard', 'personal', 'tools', 'settings'],
          shortcut: '⌘ + P'
        }
      ]
    },
    
    // BUILDER EMPOWERMENT (15% power users)
    {
      id: 'builder',
      label: 'Build',
      items: [
        {
          id: 'lab',
          label: 'HiveLAB',
          icon: Wrench,
          href: hiveRoutes.routes.lab,
          description: 'Create tools and experiences',
          keywords: ['build', 'create', 'tools', 'lab', 'maker'],
          shortcut: '⌘ + L',
          badge: {
            variant: 'warning',
            count: 3 // New elements available
          }
        }
      ]
    },
    
    // SPACE DISCOVERY (Social proof + FOMO)
    {
      id: 'discover',
      label: 'Campus',
      collapsible: true,
      items: [
        {
          id: 'academic-spaces',
          label: 'Academic',
          icon: GraduationCap,
          href: '/spaces/academic',
          description: 'Study groups, majors, courses',
          children: [
            {
              id: 'cs-majors',
              label: 'CS Majors',
              href: hiveRoutes.routes.space('cs-majors'),
              badge: { count: 127, variant: 'success' } // Social proof
            },
            {
              id: 'bio-pre-med', 
              label: 'Bio & Pre-Med',
              href: hiveRoutes.routes.space('bio-pre-med'),
              badge: { count: 89, variant: 'success' }
            },
            {
              id: 'business-school',
              label: 'Business School', 
              href: hiveRoutes.routes.space('business-school'),
              badge: { count: 156, variant: 'success' }
            }
          ]
        },
        {
          id: 'residential-spaces',
          label: 'Residential',
          icon: Building,
          href: '/spaces/residential', 
          description: 'Dorms, apartments, neighborhoods',
          children: [
            {
              id: 'west-campus',
              label: 'West Campus',
              href: hiveRoutes.routes.space('west-campus'),
              badge: { count: 234, variant: 'success' }
            },
            {
              id: 'north-quad',
              label: 'North Quad',
              href: hiveRoutes.routes.space('north-quad'), 
              badge: { count: 178, variant: 'success' }
            }
          ]
        },
        {
          id: 'social-spaces',
          label: 'Social',
          icon: Coffee,
          href: '/spaces/social',
          description: 'Clubs, interests, activities', 
          children: [
            {
              id: 'intramural-sports',
              label: 'Intramural Sports',
              href: hiveRoutes.routes.space('intramural-sports'),
              badge: { count: 312, variant: 'success' }
            },
            {
              id: 'gaming-club',
              label: 'Gaming Club', 
              href: hiveRoutes.routes.space('gaming-club'),
              badge: { count: 98, variant: 'success' }
            }
          ]
        },
        {
          id: 'campus-wide',
          label: 'Campus-wide', 
          icon: MapPin,
          href: '/spaces/campus-wide',
          description: 'University events and announcements',
          children: [
            {
              id: 'events-board',
              label: 'Events Board',
              href: hiveRoutes.routes.space('events-board'),
              badge: { count: 1247, variant: 'success' } // Massive social proof
            },
            {
              id: 'announcements',
              label: 'Announcements',
              href: hiveRoutes.routes.space('announcements'),
              badge: { count: 892, variant: 'success' }
            }
          ]
        }
      ]
    },
    
    // PERSONAL UTILITIES (Secondary)
    {
      id: 'personal',
      label: 'Personal',
      collapsible: true,
      defaultCollapsed: true, // Less important than social consumption
      items: [
        {
          id: 'saved',
          label: 'Saved',
          icon: Bookmark,
          href: '/saved',
          description: 'Your saved posts and tools',
          keywords: ['bookmarks', 'saved', 'favorites']
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: Bell,
          href: hiveRoutes.routes.notifications,
          description: 'Activity and updates',
          badge: { count: 5, variant: 'error', pulse: true }
        },
        {
          id: 'calendar',
          label: 'Calendar',
          icon: Calendar, 
          href: '/calendar',
          description: 'Your schedule and events'
        },
        {
          id: 'settings',
          label: 'Settings',
          icon: Settings,
          href: hiveRoutes.routes.settings,
          description: 'Account and privacy settings'
        }
      ]
    }
  ];
}

// ============================================================================
// MOBILE BOTTOM TAB NAVIGATION
// ============================================================================

/**
 * Mobile bottom tab navigation - 4 core tabs
 * Feed | Spaces | Profile | Lab
 */
export interface MobileTabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: number;
}

export const mobileBottomTabs: MobileTabItem[] = [
  {
    id: 'feed',
    label: 'Feed', 
    icon: Home,
    href: hiveRoutes.routes.feed
  },
  {
    id: 'spaces',
    label: 'Spaces',
    icon: Users, 
    href: hiveRoutes.routes.spaces
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    href: hiveRoutes.routes.profile
  },
  {
    id: 'lab',
    label: 'Lab',
    icon: Sparkles, // More magical than wrench for mobile
    href: hiveRoutes.routes.lab,
    badge: 3 // Builder opportunities
  }
];

// ============================================================================
// QUICK ACTION ITEMS (Command palette style)
// ============================================================================

/**
 * Quick actions for power users and search functionality
 */
export const quickActions: NavigationItem[] = [
  {
    id: 'search',
    label: 'Search everything',
    icon: Search,
    href: hiveRoutes.routes.search,
    shortcut: '⌘ + K',
    keywords: ['search', 'find', 'discover']
  },
  {
    id: 'create-tool',
    label: 'Create new tool',
    icon: Zap,
    href: '/lab/create',
    shortcut: '⌘ + T',
    keywords: ['create', 'build', 'tool', 'make']
  },
  {
    id: 'join-space',
    label: 'Join a space',
    icon: Heart,
    href: '/spaces?view=browse',
    shortcut: '⌘ + J', 
    keywords: ['join', 'community', 'space', 'group']
  },
  {
    id: 'start-ritual',
    label: 'Start a ritual',
    icon: Sparkles,
    href: '/rituals/create',
    keywords: ['ritual', 'community', 'start', 'create']
  }
];

// ============================================================================
// ROUTE UTILITIES
// ============================================================================

/**
 * Check if a route is shareable (generates preview cards)
 */
export function isShareableRoute(path: string): boolean {
  return hiveRoutes.shareableRoutes.some(route => path.startsWith(route));
}

/**
 * Generate shareable URL with attribution
 */
export function createShareableUrl(path: string, baseUrl: string = ''): string {
  const url = `${baseUrl}${path}`;
  
  // Add attribution parameter for tracking
  const urlObj = new URL(url, window?.location?.origin || 'https://hive.campus');
  urlObj.searchParams.set('ref', 'share');
  urlObj.searchParams.set('utm_source', 'hive_share');
  
  return urlObj.toString();
}

/**
 * Extract entity info from route for social previews
 */
export function parseRouteEntity(path: string): { type: string; id: string } | null {
  const patterns = [
    { regex: /^\/s\/([^\/]+)/, type: 'space' },
    { regex: /^\/u\/([^\/]+)/, type: 'user' },
    { regex: /^\/t\/([^\/]+)/, type: 'tool' },
    { regex: /^\/r\/([^\/]+)/, type: 'ritual' }
  ];
  
  for (const pattern of patterns) {
    const match = path.match(pattern.regex);
    if (match) {
      return { type: pattern.type, id: match[1] };
    }
  }
  
  return null;
}

/**
 * Get route breadcrumbs for navigation context
 */
export function getRouteBreadcrumbs(path: string): Array<{ label: string; href: string }> {
  const breadcrumbs = [{ label: 'Feed', href: hiveRoutes.routes.feed }];
  
  // Parse route segments
  const segments = path.split('/').filter(Boolean);
  
  if (segments.length === 0) {
    return breadcrumbs;
  }
  
  switch (segments[0]) {
    case 's':
      breadcrumbs.push({ label: 'Spaces', href: hiveRoutes.routes.spaces });
      if (segments[1]) {
        breadcrumbs.push({ label: segments[1], href: `/s/${segments[1]}` });
      }
      break;
      
    case 'u': 
      if (segments[1]) {
        breadcrumbs.push({ label: segments[1], href: `/u/${segments[1]}` });
      }
      break;
      
    case 'lab':
      breadcrumbs.push({ label: 'HiveLAB', href: hiveRoutes.routes.lab });
      break;
      
    case 'spaces':
      breadcrumbs.push({ label: 'Spaces', href: hiveRoutes.routes.spaces });
      break;
      
    case 'profile':
      breadcrumbs.push({ label: 'Profile', href: hiveRoutes.routes.profile });
      break;
  }
  
  return breadcrumbs;
}

// ============================================================================
// EXPORT EVERYTHING
// ============================================================================

export { hiveRoutes as default };