import * as React from "react";
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    label: string;
    value: string | number;
    description?: string;
    trend?: "up" | "down" | "neutral";
    trendValue?: string;
    badge?: string;
    badgeVariant?: "default" | "secondary" | "destructive" | "outline";
    progress?: number;
    progressColor?: string;
    size?: "sm" | "default";
}
declare const StatCard: React.ForwardRefExoticComponent<StatCardProps & React.RefAttributes<HTMLDivElement>>;
export { StatCard };
//# sourceMappingURL=stat-card.d.ts.map