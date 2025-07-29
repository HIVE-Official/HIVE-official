"use client";
import { createContext, useContext, useCallback, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
const NavigationContext = createContext(null);
// Route metadata for generating page info
const ROUTE_METADATA = {
    '/': { title: 'Dashboard', description: 'Your personal dashboard and activity feed' },
    '/spaces': { title: 'Spaces', description: 'Join and browse campus communities' },
    '/spaces/browse': { title: 'Browse Spaces', description: 'Discover new communities on campus' },
    '/spaces/my': { title: 'My Spaces', description: 'Your joined communities' },
    '/tools': { title: 'Tools', description: 'Browse and manage campus tools' },
    '/build': { title: 'HiveLab', description: 'Build and deploy custom campus tools' },
    '/calendar': { title: 'Calendar', description: 'View your schedule and campus events' },
    '/events': { title: 'Events', description: 'Discover campus events and activities' },
    '/resources': { title: 'Resources', description: 'Access campus resources and documentation' },
    '/profile': { title: 'Profile', description: 'Manage your campus profile and settings' },
    '/settings': { title: 'Settings', description: 'Account preferences and configuration' },
};
export function useNavigationContext() {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigationContext must be used within a NavigationProvider');
    }
    return context;
}
// Custom hook for navigation state
export function useNavigation() {
    const pathname = usePathname();
    const router = useRouter();
    const isActive = useCallback((path, matchPaths) => {
        if (pathname === path)
            return true;
        if (matchPaths) {
            return matchPaths.some(matchPath => pathname === matchPath || pathname.startsWith(matchPath + '/'));
        }
        return pathname.startsWith(path + '/');
    }, [pathname]);
    const navigate = useCallback(async (path) => {
        await router.push(path);
    }, [router]);
    const goBack = useCallback(() => {
        router.back();
    }, [router]);
    const goForward = useCallback(() => {
        router.forward();
    }, [router]);
    const generateBreadcrumbs = useCallback(() => {
        const segments = pathname.split('/').filter(Boolean);
        const breadcrumbs = [];
        let currentPath = '';
        for (const segment of segments) {
            currentPath += `/${segment}`;
            const metadata = ROUTE_METADATA[currentPath];
            if (metadata) {
                breadcrumbs.push({
                    label: metadata.breadcrumb || metadata.title,
                    href: currentPath,
                });
            }
            else {
                // Dynamic segments (like IDs)
                let label = segment;
                if (segment.length > 20) {
                    label = `${segment.slice(0, 10)}...${segment.slice(-6)}`;
                }
                else {
                    label = segment.charAt(0).toUpperCase() + segment.slice(1);
                }
                breadcrumbs.push({
                    label,
                    href: currentPath,
                });
            }
        }
        return breadcrumbs;
    }, [pathname]);
    const getPageTitle = useCallback(() => {
        const metadata = ROUTE_METADATA[pathname];
        if (metadata)
            return metadata.title;
        // Generate title from pathname
        const segments = pathname.split('/').filter(Boolean);
        if (segments.length === 0)
            return 'Dashboard';
        const lastSegment = segments[segments.length - 1];
        return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
    }, [pathname]);
    const getPageDescription = useCallback(() => {
        const metadata = ROUTE_METADATA[pathname];
        if (metadata)
            return metadata.description;
        return 'HIVE Campus Platform';
    }, [pathname]);
    return useMemo(() => ({
        currentPath: pathname,
        isActive,
        navigate,
        goBack,
        goForward,
        generateBreadcrumbs,
        getPageTitle,
        getPageDescription,
    }), [pathname, isActive, navigate, goBack, goForward, generateBreadcrumbs, getPageTitle, getPageDescription]);
}
// Hook for keyboard navigation shortcuts
export function useKeyboardNavigation() {
    const { navigate } = useNavigation();
    const handleKeyboardShortcut = useCallback((event) => {
        if (event.metaKey || event.ctrlKey) {
            switch (event.key) {
                case '1':
                    event.preventDefault();
                    navigate('/');
                    break;
                case '2':
                    event.preventDefault();
                    navigate('/spaces');
                    break;
                case '3':
                    event.preventDefault();
                    navigate('/tools');
                    break;
                case '4':
                    event.preventDefault();
                    navigate('/build');
                    break;
                case '5':
                    event.preventDefault();
                    navigate('/calendar');
                    break;
                case '6':
                    event.preventDefault();
                    navigate('/resources');
                    break;
                case '7':
                    event.preventDefault();
                    navigate('/profile');
                    break;
                case ',':
                    event.preventDefault();
                    navigate('/settings');
                    break;
                case 'p':
                    event.preventDefault();
                    navigate('/profile');
                    break;
            }
        }
    }, [navigate]);
    return { handleKeyboardShortcut };
}
// Hook for route transitions and loading states
export function useRouteTransitions() {
    const [isNavigating, setIsNavigating] = useState(false);
    const [navigationError, setNavigationError] = useState(null);
    const navigate = useCallback(async (path) => {
        setIsNavigating(true);
        setNavigationError(null);
        try {
            const router = useRouter();
            await router.push(path);
        }
        catch (error) {
            setNavigationError(error instanceof Error ? error.message : 'Navigation failed');
        }
        finally {
            setIsNavigating(false);
        }
    }, []);
    return {
        isNavigating,
        navigationError,
        navigate,
    };
}
//# sourceMappingURL=use-navigation-context.js.map