/**
 * Button component - bridge to atomic design system
 * Maps standard button props to HIVE enhanced button variants
 */
import React from 'react';
import { type ButtonProps as HiveButtonProps } from '../../atomic/atoms/button-enhanced';
type StandardVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type StandardSize = 'xs' | 'sm' | 'default' | 'lg';
export interface ButtonProps extends Omit<HiveButtonProps, 'variant' | 'size'> {
    variant?: StandardVariant;
    size?: StandardSize;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=button.d.ts.map