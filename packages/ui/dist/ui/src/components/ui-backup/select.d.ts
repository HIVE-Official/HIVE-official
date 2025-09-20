/**
 * Select component - simplified bridge for tool elements
 * Creates a basic select using standard HTML select element with HIVE styling
 */
import React from 'react';
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    onValueChange?: (value: string) => void;
}
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
export declare const SelectTrigger: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
export declare const SelectContent: ({ children }: {
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const SelectValue: ({ placeholder }: {
    placeholder?: string;
}) => import("react/jsx-runtime").JSX.Element;
export declare const SelectItem: ({ value, children, disabled }: {
    value: string;
    children: React.ReactNode;
    disabled?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=select.d.ts.map