import React from 'react';
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface SelectProps {
    options: SelectOption[];
    value?: string | string[];
    placeholder?: string;
    multiple?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    disabled?: boolean;
    error?: string;
    label?: string;
    helperText?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'outline' | 'filled' | 'ghost';
    fullWidth?: boolean;
    onChange?: (value: string | string[]) => void;
    onSearch?: (query: string) => void;
}
export declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=select.d.ts.map