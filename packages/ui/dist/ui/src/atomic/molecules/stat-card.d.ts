import React from 'react';
export interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    trend?: {
        value: number;
        direction: 'up' | 'down' | 'neutral';
        label?: string;
    };
    icon?: React.ReactNode;
    variant?: 'default' | 'compact' | 'detailed';
    className?: string;
}
export declare function StatCard({ title, value, description, trend, icon, variant, className }: StatCardProps): import("react/jsx-runtime").JSX.Element;
export declare const StatCardPresets: {
    UserStats: (props: Omit<StatCardProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    Metric: (props: Omit<StatCardProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    Analytics: (props: Omit<StatCardProps, "variant">) => import("react/jsx-runtime").JSX.Element;
};
//# sourceMappingURL=stat-card.d.ts.map