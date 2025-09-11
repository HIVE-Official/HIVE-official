/**
 * HIVE StatCard Component - Perfect for Profile Dashboard
 * Demonstrates complete atomic composition system usage
 */
import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const statCardVariants: (props?: ({
    semantic?: "default" | "spaces" | "tools" | "activity" | "reputation" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statCardVariants> {
    icon: React.ComponentType<{
        className?: string;
    }>;
    value: string | number;
    label: string;
    trend?: {
        direction: 'up' | 'down' | 'neutral';
        value?: string;
        icon?: React.ComponentType<{
            className?: string;
        }>;
    };
    interactive?: boolean;
}
declare const StatCard: React.ForwardRefExoticComponent<StatCardProps & React.RefAttributes<HTMLDivElement>>;
export { StatCard, statCardVariants };
export declare const statCardCompositionData: {
    readonly layout: {
        readonly padding: "var(--hive-space-5)";
        readonly gap: "var(--hive-space-3)";
        readonly borderRadius: "var(--hive-radius-lg)";
        readonly backgroundColor: "var(--hive-bg-secondary)";
        readonly borderColor: "var(--hive-border-subtle)";
    };
    readonly icon: {
        readonly size: "var(--hive-icon-xl)";
        readonly padding: "var(--hive-space-3)";
        readonly borderRadius: "var(--hive-radius-lg)";
        readonly marginBottom: "var(--hive-space-2)";
    };
    readonly content: {
        readonly valueSize: "var(--hive-font-size-h2)";
        readonly valueWeight: "var(--hive-font-weight-bold)";
        readonly valueLineHeight: "var(--hive-line-height-h2)";
        readonly valueColor: "var(--hive-text-primary)";
        readonly labelSize: "var(--hive-font-size-small)";
        readonly labelWeight: "var(--hive-font-weight-medium)";
        readonly labelColor: "var(--hive-text-muted)";
        readonly labelMarginTop: "var(--hive-space-1)";
    };
    readonly semanticVariants: {
        readonly spaces: {
            readonly iconBackgroundColor: "var(--hive-info-background)";
            readonly iconColor: "var(--hive-info-primary)";
            readonly borderColor: "var(--hive-info-border)";
        };
        readonly tools: {
            readonly iconBackgroundColor: "var(--hive-success-background)";
            readonly iconColor: "var(--hive-success-primary)";
            readonly borderColor: "var(--hive-success-border)";
        };
        readonly activity: {
            readonly iconBackgroundColor: "var(--hive-warning-background)";
            readonly iconColor: "var(--hive-warning-primary)";
            readonly borderColor: "var(--hive-warning-border)";
        };
        readonly reputation: {
            readonly iconBackgroundColor: "var(--hive-gold-background)";
            readonly iconColor: "var(--hive-gold-primary)";
            readonly borderColor: "var(--hive-gold-border)";
        };
    };
};
//# sourceMappingURL=stat-card-refined.d.ts.map