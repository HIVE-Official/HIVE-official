/**
 * Input component - bridge to atomic design system
 * Maps standard input props to HIVE enhanced input
 */
import React from 'react';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: 'sm' | 'default' | 'lg';
}
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=input.d.ts.map