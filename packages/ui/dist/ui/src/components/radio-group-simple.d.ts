/**
 * Simple RadioGroup component - for tool elements
 * Uses standard HTML radio inputs with HIVE styling
 */
import React from 'react';
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: string;
    onValueChange?: (value: string) => void;
    name: string;
    disabled?: boolean;
}
export declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
export interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    value: string;
}
export declare const RadioGroupItem: React.ForwardRefExoticComponent<RadioGroupItemProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=radio-group-simple.d.ts.map