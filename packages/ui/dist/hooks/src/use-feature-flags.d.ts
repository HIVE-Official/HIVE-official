import { type FeatureFlags } from '@hive/core';
export declare function useFeatureFlags(): FeatureFlags & {
    trackEvent: (feature: keyof FeatureFlags, action: 'view' | 'interact' | 'complete' | 'abandon', metadata?: Record<string, unknown>) => void;
};
export declare function useToolBuilderVariant(): {
    variant: "code" | "template" | "visual" | "wizard";
    trackEvent: (action: "view" | "interact" | "complete" | "abandon", metadata?: Record<string, unknown>) => void;
};
export declare function useNavigationVariant(): {
    variant: "mobile" | "sidebar" | "topnav" | "command";
    trackEvent: (action: "view" | "interact" | "complete" | "abandon", metadata?: Record<string, unknown>) => void;
};
//# sourceMappingURL=use-feature-flags.d.ts.map