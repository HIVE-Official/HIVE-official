import type { NavigationState, NavigationLayout, NavigationPreference, NavigationUser, NavigationItem, NavigationContext } from '../core/types';
interface UseNavigationStateOptions {
    user: NavigationUser;
    initialPreference?: NavigationPreference;
    enableAnalytics?: boolean;
    enableDebug?: boolean;
}
interface UseNavigationStateReturn {
    state: NavigationState;
    layout: NavigationLayout;
    items: ReadonlyArray<NavigationItem>;
    actions: {
        setPreference: (preference: NavigationPreference) => void;
        toggleSidebar: () => void;
        setMobileNavOpen: (open: boolean) => void;
        navigate: (href: string) => void;
    };
    context: NavigationContext;
}
/**
 * Primary navigation state hook
 * Manages all aspects of HIVE's adaptive navigation system
 */
export declare const useNavigationState: ({ user, initialPreference, enableAnalytics, enableDebug }: UseNavigationStateOptions) => UseNavigationStateReturn;
/**
 * Hook for accessing current navigation section
 */
export declare const useCurrentNavigationSection: () => "feed" | "spaces" | "profile" | "hivelab" | null;
/**
 * Hook for checking if navigation is in mobile mode
 */
export declare const useIsMobileNavigation: () => boolean;
/**
 * Hook for managing navigation preferences with validation
 */
export declare const useNavigationPreferences: (user: NavigationUser) => readonly [NavigationPreference, (newPreference: NavigationPreference) => void];
export {};
//# sourceMappingURL=useNavigationState.d.ts.map