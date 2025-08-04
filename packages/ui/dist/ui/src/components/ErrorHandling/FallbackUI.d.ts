import React from 'react';
type FallbackStrategy = 'progressive-disclosure' | 'simplified-mode' | 'cached-content' | 'offline-capable' | 'essential-only' | 'graceful-exit';
type FeatureCategory = 'core' | 'social' | 'creation' | 'analytics' | 'advanced' | 'experimental';
type FallbackContext = {
    area: 'profile' | 'spaces' | 'tools' | 'feed' | 'onboarding' | 'auth' | 'global';
    user?: {
        isBuilder?: boolean;
        hasCreatedTools?: boolean;
        campusRole?: 'student' | 'faculty' | 'admin';
    };
    criticalFeatures: FeatureCategory[];
    availableOffline?: string[];
};
interface FallbackUIProps {
    reason?: string;
    failedFeatures?: FeatureCategory[];
    severity?: 'minor' | 'moderate' | 'severe' | 'critical';
    strategy?: FallbackStrategy;
    context?: FallbackContext;
    workingFeatures?: string[];
    cachedData?: any;
    offlineCapabilities?: string[];
    onRetry?: () => Promise<void>;
    onSwitchMode?: (mode: 'simplified' | 'offline' | 'essential') => void;
    onNavigateToWorking?: (area: string) => void;
    title?: string;
    description?: string;
    encouragingMessage?: string;
    showFeatureStatus?: boolean;
    className?: string;
    children?: React.ReactNode;
}
declare function prioritizeFeatures(context: FallbackContext, failedFeatures: FeatureCategory[]): {
    stillWorking: FeatureCategory[];
    degraded: FeatureCategory[];
    unavailable: FeatureCategory[];
};
declare function generateFallbackMessage(context: FallbackContext, failedFeatures: FeatureCategory[], severity: string): {
    title: string;
    description: string;
    encouragement: string;
    alternatives: string[];
};
declare function FeatureStatus({ category, status }: {
    category: FeatureCategory;
    status: 'working' | 'degraded' | 'unavailable';
}): import("react/jsx-runtime").JSX.Element;
export declare const FallbackUI: React.FC<FallbackUIProps>;
export { prioritizeFeatures, generateFallbackMessage, FeatureStatus };
export type { FallbackUIProps, FallbackStrategy, FeatureCategory, FallbackContext };
//# sourceMappingURL=FallbackUI.d.ts.map