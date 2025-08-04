export type NavigationStyle = 'auto' | 'sidebar' | 'tabs';
export type NavigationMode = 'sidebar' | 'topbar' | 'bottom-tabs' | 'drawer';
interface UseNavigationLayoutProps {
    userPreference?: NavigationStyle;
    onPreferenceChange?: (preference: NavigationStyle) => void;
}
interface UseNavigationLayoutReturn {
    resolvedMode: NavigationMode;
    canUsePreference: boolean;
    reasons: string[];
}
export declare function useNavigationLayout({ userPreference, onPreferenceChange }?: UseNavigationLayoutProps): UseNavigationLayoutReturn;
export {};
//# sourceMappingURL=use-navigation-layout.d.ts.map