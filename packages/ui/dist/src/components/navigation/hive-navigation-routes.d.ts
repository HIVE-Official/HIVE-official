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
import React from 'react';
import type { NavigationSection, NavigationItem } from './hive-navigation-system';
export interface HiveRouteConfig {
    routes: {
        feed: string;
        spaces: string;
        profile: string;
        lab: string;
        space: (spaceId: string) => string;
        user: (handle: string) => string;
        tool: (toolId: string) => string;
        ritual: (ritualId: string) => string;
        spaceTools: (spaceId: string) => string;
        spaceMembers: (spaceId: string) => string;
        spaceEvents: (spaceId: string) => string;
        userTools: (handle: string) => string;
        search: string;
        notifications: string;
        settings: string;
        onboarding: string;
    };
    defaultRoute: string;
    socialGravityWell: string;
    shareableRoutes: string[];
    attribution: string;
}
export declare const hiveRoutes: HiveRouteConfig;
/**
 * Main navigation sections optimized for social consumption
 * Feed-first with utility depth when needed
 */
export declare function createHiveNavigationSections(currentUser?: {
    handle: string;
    name: string;
}): NavigationSection[];
/**
 * Mobile bottom tab navigation - 4 core tabs
 * Feed | Spaces | Profile | Lab
 */
export interface MobileTabItem {
    id: string;
    label: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    href: string;
    badge?: number;
}
export declare const mobileBottomTabs: MobileTabItem[];
/**
 * Quick actions for power users and search functionality
 */
export declare const quickActions: NavigationItem[];
/**
 * Check if a route is shareable (generates preview cards)
 */
export declare function isShareableRoute(path: string): boolean;
/**
 * Generate shareable URL with attribution
 */
export declare function createShareableUrl(path: string, baseUrl?: string): string;
/**
 * Extract entity info from route for social previews
 */
export declare function parseRouteEntity(path: string): {
    type: string;
    id: string;
} | null;
/**
 * Get route breadcrumbs for navigation context
 */
export declare function getRouteBreadcrumbs(path: string): Array<{
    label: string;
    href: string;
}>;
export { hiveRoutes as default };
//# sourceMappingURL=hive-navigation-routes.d.ts.map