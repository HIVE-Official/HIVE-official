'use client';
/**
 * useShellState - Shell context and state management
 * Provides global shell state including sidebar, mobile detection, and dark mode
 */
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
export const ShellContext = createContext({
    isSidebarOpen: true,
    toggleSidebar: () => { },
    isMobile: false,
    currentSlice: 'feed',
    shellReady: false,
    isDarkMode: true,
    toggleDarkMode: () => { },
    notificationCount: 0,
    messageCount: 0,
    isSidebarCollapsed: false,
    setSidebarCollapsed: () => { },
});
/**
 * Hook to access shell context
 * Must be used within a ShellContext.Provider
 */
export const useShell = () => {
    const context = useContext(ShellContext);
    if (!context) {
        console.warn('useShell must be used within ShellContext.Provider');
        // Return default values to prevent crashes
        return {
            isSidebarOpen: true,
            toggleSidebar: () => { },
            isMobile: false,
            currentSlice: 'feed',
            shellReady: false,
            isDarkMode: true,
            toggleDarkMode: () => { },
            notificationCount: 0,
            messageCount: 0,
            isSidebarCollapsed: false,
            setSidebarCollapsed: () => { },
        };
    }
    return context;
};
/**
 * Hook to initialize shell state
 * Call this in the UniversalShell component
 */
export function useShellState(notificationCountProp = 0, messageCountProp = 0) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [shellReady, setShellReady] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const notificationCount = notificationCountProp ?? 0;
    const messageCount = messageCountProp ?? 0;
    // Detect mobile/desktop
    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const update = () => {
            const mobile = !mq.matches;
            setIsMobile(mobile);
            setIsSidebarOpen(!mobile);
            if (mobile)
                setIsSidebarCollapsed(false);
        };
        update();
        mq.addEventListener('change', update);
        setShellReady(true);
        return () => mq.removeEventListener('change', update);
    }, []);
    // Determine current vertical slice from pathname
    const getCurrentSlice = useCallback(() => {
        if (pathname?.includes('/feed'))
            return 'feed';
        if (pathname?.includes('/spaces'))
            return 'spaces';
        if (pathname?.includes('/profile'))
            return 'profile';
        if (pathname?.includes('/hivelab') || pathname?.includes('/tools'))
            return 'hivelab';
        if (pathname?.includes('/events'))
            return 'events';
        if (pathname?.includes('/messages'))
            return 'messages';
        if (pathname?.includes('/rituals'))
            return 'rituals';
        return 'feed';
    }, [pathname]);
    const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), []);
    const toggleDarkMode = useCallback(() => setIsDarkMode((prev) => !prev), []);
    const currentSidebarWidth = useMemo(() => {
        if (isMobile || !isSidebarOpen)
            return 0;
        return isSidebarCollapsed ? 72 : 256;
    }, [isMobile, isSidebarOpen, isSidebarCollapsed]);
    const handleNavigate = useCallback((path) => {
        if (!path)
            return;
        let target = path;
        if (path === '/discover') {
            target = '/spaces?tab=discover';
        }
        try {
            router.push(target);
        }
        catch (error) {
            if (typeof window !== 'undefined') {
                window.location.href = target;
            }
        }
    }, [router]);
    const contextValue = {
        isSidebarOpen,
        toggleSidebar,
        isMobile,
        currentSlice: getCurrentSlice(),
        shellReady,
        isDarkMode,
        toggleDarkMode,
        notificationCount,
        messageCount,
        isSidebarCollapsed,
        setSidebarCollapsed: setIsSidebarCollapsed,
    };
    return {
        contextValue,
        handleNavigate,
        currentSidebarWidth,
    };
}
//# sourceMappingURL=useShellState.js.map