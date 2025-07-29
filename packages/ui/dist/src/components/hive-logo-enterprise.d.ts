import React from 'react';
interface HiveLogoConfig {
    analytics?: {
        provider: 'google-analytics' | 'mixpanel' | 'amplitude' | 'custom';
        trackingId?: string;
        customTracker?: (event: string, properties: Record<string, any>) => void;
    };
    abTesting?: {
        provider: 'optimizely' | 'launchdarkly' | 'split' | 'custom';
        getUserVariant?: (experimentId: string, userId?: string) => string;
    };
    featureFlags?: {
        provider: 'launchdarkly' | 'split' | 'unleash' | 'custom';
        isEnabled?: (flagName: string) => boolean;
    };
    brandCustomization?: {
        allowCustomColors?: boolean;
        allowCustomSizes?: boolean;
        allowLogoReplacement?: boolean;
        whitelabelMode?: boolean;
    };
    performance?: {
        enableMetrics?: boolean;
        enableLazyLoading?: boolean;
        enablePreloading?: boolean;
        optimizeForLowEnd?: boolean;
    };
    security?: {
        enableCSP?: boolean;
        allowedOrigins?: string[];
        requireIntegrity?: boolean;
    };
}
export declare const HiveLogoProvider: React.FC<{
    config: HiveLogoConfig;
    children: React.ReactNode;
}>;
export declare const useHiveLogoConfig: () => HiveLogoConfig;
interface EnterpriseLogoProps {
    variant?: 'primary' | 'gold' | 'inverted' | 'custom';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
    experimentId?: string;
    userId?: string;
    sessionId?: string;
    customTheme?: {
        primaryColor?: string;
        secondaryColor?: string;
        accentColor?: string;
        fontFamily?: string;
    };
    whiteLabel?: {
        companyName?: string;
        logoUrl?: string;
        hideHiveBranding?: boolean;
    };
    context?: string;
    trackingProperties?: Record<string, any>;
    accessibility?: {
        ariaLabel?: string;
        announceChanges?: boolean;
        highContrast?: boolean;
    };
    className?: string;
    onClick?: () => void;
}
export declare const HiveLogoEnterprise: React.MemoExoticComponent<({ variant, size, experimentId, userId, sessionId, customTheme, whiteLabel, context, trackingProperties, accessibility, className, onClick, ...props }: EnterpriseLogoProps) => import("react/jsx-runtime").JSX.Element>;
export declare const HiveLogoAnalyticsDashboard: React.FC<{
    dateRange?: {
        start: Date;
        end: Date;
    };
    className?: string;
}>;
export {};
//# sourceMappingURL=hive-logo-enterprise.d.ts.map