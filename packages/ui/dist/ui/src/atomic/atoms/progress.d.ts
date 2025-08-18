import React from 'react';
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: number;
    max?: number;
    variant?: 'default' | 'gradient' | 'striped' | 'circular';
    size?: 'sm' | 'md' | 'lg';
    color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    showValue?: boolean;
    animated?: boolean;
    indeterminate?: boolean;
    label?: string;
}
export declare const Progress: React.ForwardRefExoticComponent<ProgressProps & React.RefAttributes<HTMLDivElement>>;
interface CircularProgressProps extends Omit<ProgressProps, 'variant'> {
    strokeWidth?: number;
}
declare const CircularProgress: React.ForwardRefExoticComponent<CircularProgressProps & React.RefAttributes<HTMLDivElement>>;
export { CircularProgress };
export declare const LoadingProgress: React.FC<Omit<ProgressProps, 'indeterminate'>>;
export declare const SuccessProgress: React.FC<Omit<ProgressProps, 'color'>>;
export declare const ErrorProgress: React.FC<Omit<ProgressProps, 'color'>>;
export declare const CircularSpinner: React.FC<Omit<ProgressProps, 'variant' | 'indeterminate'>>;
//# sourceMappingURL=progress.d.ts.map