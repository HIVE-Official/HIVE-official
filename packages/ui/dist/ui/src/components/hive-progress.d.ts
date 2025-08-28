import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveProgressVariants: (props?: {
    variant?: "default" | "minimal" | "premium" | "gradient";
    size?: "default" | "sm" | "lg" | "xl" | "xs";
} & import("class-variance-authority/types").ClassProp) => string;
declare const progressFillVariants: (props?: {
    variant?: "default" | "success" | "warning" | "info" | "gradient" | "danger";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HiveProgressBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value'>, VariantProps<typeof hiveProgressVariants> {
    value: number;
    max?: number;
    label?: string;
    showValue?: boolean;
    showPercentage?: boolean;
    animated?: boolean;
    striped?: boolean;
    pulse?: boolean;
    fillVariant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'gradient';
}
export declare const HiveProgressBar: React.ForwardRefExoticComponent<HiveProgressBarProps & React.RefAttributes<HTMLDivElement>>;
export interface HiveCircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number;
    max?: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    backgroundColor?: string;
    showValue?: boolean;
    showPercentage?: boolean;
    animated?: boolean;
    children?: React.ReactNode;
}
export declare const HiveCircularProgress: React.ForwardRefExoticComponent<HiveCircularProgressProps & React.RefAttributes<HTMLDivElement>>;
export interface StepProgressItem {
    id: string;
    label: string;
    description?: string;
    status: 'pending' | 'current' | 'completed' | 'error';
    icon?: React.ReactNode;
}
export interface HiveStepProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
    steps: StepProgressItem[];
    direction?: 'horizontal' | 'vertical';
    showConnectors?: boolean;
    clickable?: boolean;
    onStepClick?: (step: StepProgressItem, index: number) => void;
}
export declare const HiveStepProgress: React.ForwardRefExoticComponent<HiveStepProgressProps & React.RefAttributes<HTMLDivElement>>;
export interface HiveSpinnerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
    size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
    color?: string;
    speed?: 'slow' | 'normal' | 'fast';
    variant?: 'spin' | 'pulse' | 'bounce' | 'dots' | 'bars';
    label?: string;
}
export declare const HiveSpinner: React.ForwardRefExoticComponent<HiveSpinnerProps & React.RefAttributes<HTMLDivElement>>;
export interface HiveSkeletonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> {
    width?: string | number;
    height?: string | number;
    variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
    animated?: boolean;
    lines?: number;
}
export declare const HiveSkeleton: React.ForwardRefExoticComponent<HiveSkeletonProps & React.RefAttributes<HTMLDivElement>>;
export interface HiveProgressProps {
    variant?: 'bar' | 'circular' | 'step' | 'spinner' | 'skeleton';
    value?: number;
    max?: number;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    status?: 'default' | 'success' | 'warning' | 'error';
    showLabel?: boolean;
    showValue?: boolean;
    showPercentage?: boolean;
    animated?: boolean;
    label?: string;
    steps?: StepProgressItem[];
    currentStep?: number;
    className?: string;
}
export declare const HiveProgress: React.ForwardRefExoticComponent<HiveProgressProps & React.RefAttributes<HTMLDivElement>>;
export declare const Progress: React.ForwardRefExoticComponent<HiveProgressProps & React.RefAttributes<HTMLDivElement>>;
export declare const ProgressBar: React.ForwardRefExoticComponent<HiveProgressBarProps & React.RefAttributes<HTMLDivElement>>;
export declare const CircularProgress: React.ForwardRefExoticComponent<HiveCircularProgressProps & React.RefAttributes<HTMLDivElement>>;
export declare const StepProgress: React.ForwardRefExoticComponent<HiveStepProgressProps & React.RefAttributes<HTMLDivElement>>;
export declare const Spinner: React.ForwardRefExoticComponent<HiveSpinnerProps & React.RefAttributes<HTMLDivElement>>;
export { hiveProgressVariants, progressFillVariants };
//# sourceMappingURL=hive-progress.d.ts.map