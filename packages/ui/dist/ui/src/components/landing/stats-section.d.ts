import React from 'react';
export interface Stat {
    value: string;
    label: string;
    description?: string;
}
export interface StatsSectionProps {
    stats?: Stat[];
    className?: string;
}
export declare const StatsSection: React.FC<StatsSectionProps>;
//# sourceMappingURL=stats-section.d.ts.map