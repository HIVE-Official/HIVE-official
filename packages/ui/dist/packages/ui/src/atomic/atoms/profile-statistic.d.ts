import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { LucideIcon } from 'lucide-react';
declare const profileStatisticVariants: (props?: {
    size?: "xs" | "sm" | "lg" | "md";
    variant?: "default" | "ghost" | "compact" | "highlight";
    interactive?: boolean;
    trend?: "none" | "up" | "down" | "neutral";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface ProfileStatisticProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profileStatisticVariants> {
    value: string | number;
    label: string;
    icon?: LucideIcon;
    iconColor?: 'default' | 'gold' | 'secondary' | 'success' | 'warning' | 'error';
    change?: number;
    changeLabel?: string;
    showTrend?: boolean;
    emphasis?: 'normal' | 'gold' | 'secondary';
    loading?: boolean;
    onClick?: () => void;
}
export declare function ProfileStatistic({ value, label, icon: Icon, iconColor, change, changeLabel, showTrend, emphasis, loading, onClick, size, variant, interactive, trend, className, ...props }: ProfileStatisticProps): import("react/jsx-runtime").JSX.Element;
export { profileStatisticVariants };
//# sourceMappingURL=profile-statistic.d.ts.map