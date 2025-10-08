import * as React from "react";
export interface Stat {
    label: string;
    value: number | string;
    href?: string;
    icon?: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
}
export interface StatGridProps extends React.HTMLAttributes<HTMLDivElement> {
    stats: Stat[];
    /** Layout variant */
    variant?: "grid" | "inline";
    /** Number of columns (only applies to grid variant) */
    columns?: 2 | 3 | 4;
}
declare const StatGrid: React.ForwardRefExoticComponent<StatGridProps & React.RefAttributes<HTMLDivElement>>;
export { StatGrid };
//# sourceMappingURL=stat-grid.d.ts.map