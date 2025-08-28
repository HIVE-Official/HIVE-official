/**
 * HIVE Responsive Foundation System
 * Centralized responsive utilities based on our best component patterns
 * Mobile-first approach for social-utility platform
 */
export declare const breakpoints: {
    readonly mobile: "320px";
    readonly sm: "640px";
    readonly md: "768px";
    readonly lg: "1024px";
    readonly xl: "1280px";
    readonly '2xl': "1536px";
};
export declare const responsiveBreakpoints: {
    readonly mobile: "320px";
    readonly sm: "640px";
    readonly md: "768px";
    readonly lg: "1024px";
    readonly xl: "1280px";
    readonly '2xl': "1536px";
};
export type ResponsiveBreakpoint = keyof typeof breakpoints;
export type ResponsiveSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TouchTarget = keyof typeof touchTargets;
export declare const touchTargets: {
    readonly minimum: "min-h-[44px] min-w-[44px]";
    readonly comfortable: "min-h-[48px] min-w-[48px]";
    readonly spacious: "min-h-[56px] min-w-[56px]";
};
export declare const responsiveSpace: (props?: {
    size?: "sm" | "md" | "lg" | "xl" | "xs";
    gap?: "sm" | "md" | "lg" | "xl" | "xs";
} & import("class-variance-authority/types").ClassProp) => string;
export declare const responsiveText: (props?: {
    size?: "sm" | "lg" | "xl" | "base" | "xs" | "2xl" | "3xl";
} & import("class-variance-authority/types").ClassProp) => string;
export declare const responsiveContainer: (props?: {
    size?: "content" | "feed" | "full" | "app";
} & import("class-variance-authority/types").ClassProp) => string;
export declare const mobileNavigation: {
    readonly bottomTabs: "fixed bottom-0 left-0 right-0 bg-[var(--hive-background-primary)]/95 backdrop-blur-sm border-t border-[var(--hive-border-primary)] h-16 sm:hidden";
    readonly drawer: "fixed inset-y-0 left-0 z-50 w-64 bg-[var(--hive-background-primary)] transform transition-transform sm:translate-x-0 sm:static sm:w-auto";
    readonly header: "sticky top-0 z-40 bg-[var(--hive-background-primary)]/95 backdrop-blur-sm border-b border-[var(--hive-border-primary)] h-14 sm:h-16";
};
export declare const touchInteractions: {
    readonly tapTarget: "min-h-[48px] min-w-[48px] flex items-center justify-center";
    readonly swipeCard: "touch-pan-x select-none";
    readonly pullZone: "overscroll-y-contain";
    readonly scrollContainer: "overflow-auto -webkit-overflow-scrolling-touch";
};
export declare const socialGrid: (props?: {
    type?: "feed" | "profile" | "cards" | "dashboard";
} & import("class-variance-authority/types").ClassProp) => string;
export declare const visibility: {
    readonly mobileOnly: "block sm:hidden";
    readonly desktopOnly: "hidden sm:block";
    readonly tabletUp: "hidden md:block";
    readonly desktopUp: "hidden lg:block";
};
export declare const responsiveAnimations: {
    readonly motion: "motion-safe:transition-all motion-safe:duration-300";
    readonly transform: "transform-gpu";
    readonly blur: "backdrop-blur-sm supports-[backdrop-filter]:bg-[var(--hive-background-primary)]/80";
};
export declare const a11yResponsive: {
    readonly focus: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)]/30 focus-visible:ring-offset-2";
    readonly srOnly: "sr-only";
    readonly highContrast: "contrast-more:border-2 contrast-more:border-current";
};
/**
 * Utility function to combine responsive classes safely
 */
export declare function combineResponsive(...classes: (string | undefined | null | false)[]): string;
/**
 * Get responsive container props for common patterns
 */
export declare function getContainerProps(type?: 'feed' | 'content' | 'app' | 'full'): {
    className: string;
};
/**
 * Get mobile-optimized touch props
 */
export declare function getTouchProps(): {
    className: string;
};
//# sourceMappingURL=responsive-foundation.d.ts.map