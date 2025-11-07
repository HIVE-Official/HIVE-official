/**
 * 🎯 HIVE Universal Shell Component (Refactored)
 * The Minimal & Intuitive App Shell
 *
 * ARCHITECTURE:
 * - Extracted sub-components for maintainability
 * - Composition pattern for flexibility
 * - Smart defaults reduce configuration
 * - Clean separation of concerns
 *
 * DESIGN SYSTEM COMPLIANCE:
 * ✅ Gold (#FFD700) signature brand color
 * ✅ Framer Motion with HIVE easing curves
 * ✅ Glass morphism effects
 * ✅ Geist Sans typography (font-sans)
 * ✅ Mobile-first with 44px touch targets
 * ✅ Dark luxury aesthetic
 */
import React from 'react';
/**
 * Navigation item for desktop sidebar with support for nested children
 *
 * @example
 * ```tsx
 * const navItem: ShellNavItem = {
 *   id: 'spaces',
 *   label: 'Spaces',
 *   icon: Users,
 *   path: '/spaces',
 *   color: 'from-green-500/20 to-emerald-500/20',
 *   children: [
 *     { id: 'spaces-orgs', label: 'Student Orgs', path: '/spaces?category=orgs' }
 *   ]
 * };
 * ```
 */
export interface ShellNavItem {
    /** Unique identifier for the navigation item */
    id: string;
    /** Display label shown to users */
    label: string;
    /** Lucide icon component to display */
    icon?: React.ElementType;
    /** Route path for navigation (e.g., '/feed', '/spaces') */
    path?: string;
    /** Tailwind gradient classes for glow effect (e.g., 'from-blue-500/20 to-purple-500/20') */
    color?: string;
    /** Number to display in badge (e.g., unread count) */
    badge?: number;
    /** Nested child navigation items for expandable sections */
    children?: ShellNavItem[];
}
/**
 * Navigation item for mobile bottom tab bar
 *
 * @example
 * ```tsx
 * const mobileNav: ShellMobileNavItem = {
 *   id: 'feed',
 *   icon: Home,
 *   label: 'Feed',
 *   path: '/feed',
 *   badge: 3
 * };
 * ```
 */
export interface ShellMobileNavItem {
    /** Unique identifier for the tab */
    id: string;
    /** Lucide icon component for the tab */
    icon: React.ElementType;
    /** Label shown below icon (keep short, 1-2 words) */
    label: string;
    /** Route path for navigation */
    path?: string;
    /** Badge number to display on tab */
    badge?: number;
    /** Custom click handler (overrides path navigation) */
    onClick?: () => void;
}
/**
 * Individual space link for "My Spaces" sidebar section
 */
export interface ShellSpaceLink {
    /** Unique space identifier */
    id: string;
    /** Space display name */
    label: string;
    /** Route to space page */
    href?: string;
    /** Visual status indicator: 'live' (green), 'quiet' (gray), 'new' (blue) */
    status?: 'live' | 'quiet' | 'new';
    /** Metadata text (e.g., "You lead · 300 members") */
    meta?: string;
}
/**
 * Section grouping for "My Spaces" sidebar
 *
 * @example
 * ```tsx
 * const section: ShellSpaceSection = {
 *   id: 'residential',
 *   label: 'Residential',
 *   description: 'Dorm & living communities',
 *   spaces: [
 *     { id: 's1', label: 'Governors Hall', href: '/spaces/governors', status: 'live' }
 *   ],
 *   emptyCopy: 'Add your hall so neighbors can find you.',
 *   actionLabel: 'Update hall',
 *   actionHref: '/profile'
 * };
 * ```
 */
export interface ShellSpaceSection {
    /** Unique section identifier (e.g., 'residential', 'student_org') */
    id: string;
    /** Section heading (e.g., 'Residential', 'Student Org') */
    label: string;
    /** Optional description shown in empty state */
    description?: string;
    /** Array of spaces in this section */
    spaces: ShellSpaceLink[];
    /** CTA button text for empty state */
    actionLabel?: string;
    /** CTA button href for empty state */
    actionHref?: string;
    /** Message to show when section has no spaces */
    emptyCopy?: string;
}
/**
 * Breadcrumb navigation item
 */
export interface ShellBreadcrumbItem {
    /** Breadcrumb text */
    label: string;
    /** Optional link (omit for current page) */
    href?: string;
}
/**
 * Props for the UniversalShell component - the main app-level layout shell
 *
 * @example Basic Usage
 * ```tsx
 * <UniversalShell
 *   variant="full"
 *   navItems={DEFAULT_SIDEBAR_NAV_ITEMS}
 *   mobileNavItems={DEFAULT_MOBILE_NAV_ITEMS}
 *   notificationCount={5}
 * >
 *   <YourPageContent />
 * </UniversalShell>
 * ```
 *
 * @example Minimal Shell (Public Pages)
 * ```tsx
 * <UniversalShell variant="minimal">
 *   <PublicProfileContent />
 * </UniversalShell>
 * ```
 */
export interface UniversalShellProps {
    /** Page content to render inside the shell */
    children: React.ReactNode;
    /** Additional CSS classes for the shell container */
    className?: string;
    /**
     * Shell display mode
     * - 'full': Shows sidebar, header, and optional context rail (authenticated pages)
     * - 'minimal': Shows header only (public pages, marketing)
     * @default 'full'
     */
    variant?: 'full' | 'minimal';
    /**
     * Sidebar visual style
     * - 'default': Full sidebar with widgets and rich styling
     * - 'sleek': Minimal sidebar with compact layout
     * @default 'default'
     */
    sidebarStyle?: 'default' | 'sleek';
    /**
     * Header visual style
     * - 'default': Full header with all actions
     * - 'hidden': No header (sidebar-first experience)
     * - 'minimal': Header with reduced action set
     * @default 'default'
     */
    headerStyle?: 'default' | 'hidden' | 'minimal';
    /** Desktop sidebar navigation items */
    navItems?: ShellNavItem[];
    /** Mobile bottom tab navigation items */
    mobileNavItems?: ShellMobileNavItem[];
    /** Unread notification count (shows badge on bell icon) */
    notificationCount?: number;
    /** Unread message count (shows badge on message icon) */
    messageCount?: number;
    /** Custom breadcrumb trail (overrides auto-generated breadcrumbs) */
    breadcrumbs?: ShellBreadcrumbItem[];
    /** Whether to show breadcrumb navigation below header */
    showBreadcrumbs?: boolean;
    /** User's joined spaces organized by sections */
    mySpaces?: ShellSpaceSection[];
    /** Real-time notification data for dropdown */
    notifications?: Array<Record<string, unknown>>;
    /** Loading state for notifications */
    notificationsLoading?: boolean;
    /** Error message if notifications failed to load */
    notificationsError?: string | null;
    /** Callback when user clicks on a notification */
    onNotificationNavigate?: (url: string) => void;
    /** Callback when user opens command palette (⌘K) */
    onOpenCommand?: () => void;
    /**
     * Whether to show the right context rail on desktop
     * Typically hidden on individual space pages for focused content
     * @default true
     */
    showContextRail?: boolean;
}
export declare const DEFAULT_SIDEBAR_NAV_ITEMS: ShellNavItem[];
export declare const DEFAULT_MOBILE_NAV_ITEMS: ShellMobileNavItem[];
/**
 * Main Shell Component with HIVE Design System
 * Refactored for minimal complexity and maximum maintainability
 */
export declare const UniversalShell: React.FC<UniversalShellProps>;
export default UniversalShell;
//# sourceMappingURL=UniversalShell.d.ts.map