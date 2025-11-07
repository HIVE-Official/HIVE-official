import * as React from 'react';
export interface FeatureUsageStats {
    installs?: number;
    activeUsers?: number;
    completionRate?: number;
}
export interface RitualFeatureDropProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    countdownLabel?: string;
    onUnlock?: () => void;
    stats?: FeatureUsageStats;
}
export declare const RitualFeatureDrop: React.FC<RitualFeatureDropProps>;
//# sourceMappingURL=ritual-feature-drop.d.ts.map