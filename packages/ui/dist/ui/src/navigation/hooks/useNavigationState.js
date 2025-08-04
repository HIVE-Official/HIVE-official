"use client";
/**
 * HIVE Navigation Hook - State Management
 * YC-Quality Implementation with Zero Performance Issues
 *
 * This hook provides the complete navigation state management system.
 * It's optimized for performance, accessibility, and developer experience.
 */
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { calculateNavigationLayout, createResizeHandler, createNavigationStateMemo, safeCalculateNavigationState, debugNavigationState } from '../core/engine.js';
import { getNavigationItemsWithActiveState } from '../core/data.js';
/**
 * Primary navigation state hook
 * Manages all aspects of HIVE's adaptive navigation system
 */
export const useNavigationState = ({ user, initialPreference = 'auto', enableAnalytics = true, enableDebug = false }) => {
    const router = useRouter();
    const pathname = usePathname();
    // ============================================================================
    // STATE MANAGEMENT
    // ============================================================================
    const [screenWidth, setScreenWidth] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth;
        }
        return 1200; // SSR fallback
    });
    const [userPreference, setUserPreference] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('hive-navigation-preference');
            if (saved && ['tabs', 'sidebar', 'auto'].includes(saved)) {
                return saved;
            }
        }
        return user.preferences.layout || initialPreference;
    });
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('hive-sidebar-collapsed');
            if (saved !== null) {
                return JSON.parse(saved);
            }
        }
        return user.preferences.sidebarCollapsed;
    });
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    // Performance optimization: memoized state calculation
    const memoizedCalculateState = useMemo(() => createNavigationStateMemo(), []);
    // ============================================================================
    // COMPUTED STATE
    // ============================================================================
    const navigationState = useMemo(() => {
        const state = safeCalculateNavigationState(screenWidth, userPreference, sidebarCollapsed);
        if (enableDebug) {
            debugNavigationState(state);
        }
        return state;
    }, [screenWidth, userPreference, sidebarCollapsed, enableDebug]);
    const navigationLayout = useMemo(() => {
        return calculateNavigationLayout(navigationState);
    }, [navigationState]);
    const navigationItems = useMemo(() => {
        return getNavigationItemsWithActiveState(pathname || '/');
    }, [pathname]);
    // ============================================================================
    // ACTIONS
    // ============================================================================
    const setPreference = useCallback((preference) => {
        setUserPreference(preference);
        // Persist to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('hive-navigation-preference', preference);
        }
        // Analytics event
        if (enableAnalytics) {
            // TODO: Send analytics event
            console.log('Navigation preference changed:', preference);
        }
    }, [enableAnalytics]);
    const toggleSidebar = useCallback(() => {
        setSidebarCollapsed(prev => {
            const newValue = !prev;
            // Persist to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('hive-sidebar-collapsed', JSON.stringify(newValue));
            }
            return newValue;
        });
    }, []);
    const handleMobileNavOpen = useCallback((open) => {
        setMobileNavOpen(open);
        // Prevent body scroll when mobile nav is open
        if (typeof window !== 'undefined') {
            if (open) {
                document.body.style.overflow = 'hidden';
            }
            else {
                document.body.style.overflow = '';
            }
        }
    }, []);
    const navigate = useCallback((href) => {
        // Close mobile nav when navigating
        if (mobileNavOpen) {
            setMobileNavOpen(false);
            if (typeof window !== 'undefined') {
                document.body.style.overflow = '';
            }
        }
        // Navigate using Next.js router
        router.push(href);
        // Analytics event
        if (enableAnalytics) {
            // TODO: Send navigation analytics event
            console.log('Navigation:', { from: pathname, to: href });
        }
    }, [router, mobileNavOpen, enableAnalytics]);
    // ============================================================================
    // RESPONSIVE BEHAVIOR
    // ============================================================================
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const handleResize = createResizeHandler((width) => {
            setScreenWidth(width);
            // Auto-close mobile nav on screen size change
            if (mobileNavOpen) {
                setMobileNavOpen(false);
                document.body.style.overflow = '';
            }
        });
        // Set initial width
        setScreenWidth(window.innerWidth);
        // Add event listener
        window.addEventListener('resize', handleResize);
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            // Restore body scroll on unmount
            document.body.style.overflow = '';
        };
    }, [mobileNavOpen]);
    // ============================================================================
    // KEYBOARD SHORTCUTS
    // ============================================================================
    useEffect(() => {
        if (!user.preferences.enableKeyboardShortcuts)
            return;
        const handleKeyDown = (event) => {
            const { metaKey, ctrlKey, shiftKey, key } = event;
            const isModifier = metaKey || ctrlKey;
            // Cmd/Ctrl + B: Toggle sidebar
            if (isModifier && key === 'b') {
                event.preventDefault();
                toggleSidebar();
                return;
            }
            // Escape: Close mobile nav
            if (key === 'Escape' && mobileNavOpen) {
                event.preventDefault();
                setMobileNavOpen(false);
                document.body.style.overflow = '';
                return;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [user.preferences.enableKeyboardShortcuts, toggleSidebar, mobileNavOpen]);
    // ============================================================================
    // RETURN VALUES
    // ============================================================================
    const actions = useMemo(() => ({
        setPreference,
        toggleSidebar,
        setMobileNavOpen: handleMobileNavOpen,
        navigate
    }), [setPreference, toggleSidebar, handleMobileNavOpen, navigate]);
    const context = useMemo(() => ({
        state: navigationState,
        layout: navigationLayout,
        items: navigationItems,
        user,
        actions
    }), [navigationState, navigationLayout, navigationItems, user, actions]);
    return {
        state: navigationState,
        layout: navigationLayout,
        items: navigationItems,
        actions,
        context
    };
};
// ============================================================================
// UTILITY HOOKS
// ============================================================================
/**
 * Hook for accessing current navigation section
 */
export const useCurrentNavigationSection = () => {
    const pathname = usePathname();
    return useMemo(() => {
        const path = pathname || '/';
        if (path.startsWith('/profile'))
            return 'profile';
        if (path.startsWith('/feed'))
            return 'feed';
        if (path.startsWith('/spaces'))
            return 'spaces';
        if (path.startsWith('/hivelab'))
            return 'hivelab';
        // Default to feed for root path
        if (path === '/')
            return 'feed';
        return null;
    }, [pathname]);
};
/**
 * Hook for checking if navigation is in mobile mode
 */
export const useIsMobileNavigation = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        const handleResize = createResizeHandler(checkMobile);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return isMobile;
};
/**
 * Hook for managing navigation preferences with validation
 */
export const useNavigationPreferences = (user) => {
    const [preference, setPreference] = useState(user.preferences.layout || 'auto');
    const updatePreference = useCallback((newPreference) => {
        // Validate preference
        if (!['tabs', 'sidebar', 'auto'].includes(newPreference)) {
            console.error('Invalid navigation preference:', newPreference);
            return;
        }
        setPreference(newPreference);
        // Persist to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('hive-navigation-preference', newPreference);
        }
        // TODO: Sync with user preferences API
        console.log('Updated navigation preference:', newPreference);
    }, []);
    return [preference, updatePreference];
};
//# sourceMappingURL=useNavigationState.js.map