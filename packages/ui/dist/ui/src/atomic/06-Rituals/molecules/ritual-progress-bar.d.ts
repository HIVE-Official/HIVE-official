import * as React from 'react';
export interface RitualMilestone {
    percentage: number;
    label: string;
    isCompleted: boolean;
}
export interface RitualProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    progress: number;
    milestones?: RitualMilestone[];
    showPercentage?: boolean;
    label?: string;
    variant?: 'default' | 'compact';
}
export declare const RitualProgressBar: React.ForwardRefExoticComponent<RitualProgressBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ritual-progress-bar.d.ts.map