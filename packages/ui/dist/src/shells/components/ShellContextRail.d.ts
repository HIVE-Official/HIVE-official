/**
 * ShellContextRail - Right context panel for desktop
 * Displays campus signals and live metrics
 */
import React from 'react';
export interface ContextMetric {
    /** Icon component */
    icon: React.ElementType;
    /** Metric label */
    label: string;
    /** Metric value */
    value: string;
    /** Color tone class */
    tone: string;
}
export interface ShellContextRailProps {
    /** Optional custom metrics to display */
    metrics?: ContextMetric[];
}
export declare function ShellContextRail({ metrics }: ShellContextRailProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ShellContextRail.d.ts.map