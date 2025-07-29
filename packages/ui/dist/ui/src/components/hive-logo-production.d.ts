import React from 'react';
interface LogoAnalytics {
    onLogoView?: (variant: string, context: string) => void;
    onLogoClick?: (variant: string, context: string) => void;
    onLogoHover?: (variant: string, context: string) => void;
    userId?: string;
    sessionId?: string;
}
interface AccessibilityOptions {
    ariaLabel?: string;
    ariaDescription?: string;
    role?: string;
    tabIndex?: number;
    focusable?: boolean;
    announceChanges?: boolean;
}
interface ProductionLogoProps {
    variant?: 'primary' | 'gold' | 'inverted' | 'monochrome' | 'brand' | 'custom';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    lazy?: boolean;
    preload?: boolean;
    optimizeForSpeed?: boolean;
    enablePerformanceMetrics?: boolean;
    accessibility?: AccessibilityOptions;
    analytics?: LogoAnalytics;
    customColors?: {
        primary?: string;
        secondary?: string;
        accent?: string;
    };
    brandingOverride?: {
        companyName?: string;
        logoUrl?: string;
    };
    abTestVariant?: string;
    experimentId?: string;
    gestures?: {
        enableSwipe?: boolean;
        enableLongPress?: boolean;
        enableDoubleClick?: boolean;
    };
    context?: 'navigation' | 'hero' | 'footer' | 'sidebar' | 'modal' | 'email' | 'print';
    environment?: 'development' | 'staging' | 'production';
    className?: string;
    children?: React.ReactNode;
}
export declare const HiveLogoProductionAnimated: React.MemoExoticComponent<({ variant, size, lazy, preload, optimizeForSpeed, enablePerformanceMetrics, accessibility, analytics, customColors, context, environment, className, ...props }: ProductionLogoProps) => import("react/jsx-runtime").JSX.Element>;
export declare const HiveLogoEnterprise: React.MemoExoticComponent<({ variant, size, customColors, brandingOverride, abTestVariant, experimentId, accessibility, analytics, context, className, ...props }: ProductionLogoProps) => import("react/jsx-runtime").JSX.Element>;
export declare const HiveLogoInteractiveAdvanced: React.MemoExoticComponent<({ variant, size, gestures, accessibility, analytics, context, className, children, ...props }: ProductionLogoProps) => import("react/jsx-runtime").JSX.Element>;
export declare const HiveLogoAccessible: React.MemoExoticComponent<({ variant, size, accessibility, context, className, ...props }: ProductionLogoProps) => import("react/jsx-runtime").JSX.Element>;
export declare const HiveLogoPerformanceMonitored: React.MemoExoticComponent<({ variant, size, enablePerformanceMetrics, optimizeForSpeed, analytics, environment, className, ...props }: ProductionLogoProps) => import("react/jsx-runtime").JSX.Element>;
export { HiveLogoProductionAnimated as ProductionAnimatedLogo, HiveLogoEnterprise as EnterpriseLogo, HiveLogoInteractiveAdvanced as AdvancedInteractiveLogo, HiveLogoAccessible as AccessibleLogo, HiveLogoPerformanceMonitored as PerformanceMonitoredLogo, };
//# sourceMappingURL=hive-logo-production.d.ts.map