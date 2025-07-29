import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveSelectVariants: (props?: {
    variant?: "default" | "premium" | "minimal";
    size?: "default" | "sm" | "lg";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface SelectOption {
    value: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    group?: string;
}
export interface HiveSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>, VariantProps<typeof hiveSelectVariants> {
    options: SelectOption[];
    value?: string | string[];
    defaultValue?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    placeholder?: string;
    searchable?: boolean;
    searchPlaceholder?: string;
    multiple?: boolean;
    clearable?: boolean;
    creatable?: boolean;
    disabled?: boolean;
    error?: boolean;
    loading?: boolean;
    maxHeight?: string;
    noOptionsMessage?: string;
    emptySearchMessage?: string;
    renderOption?: (option: SelectOption) => React.ReactNode;
    renderValue?: (value: string | string[], options: SelectOption[]) => React.ReactNode;
}
declare const HiveSelect: React.ForwardRefExoticComponent<HiveSelectProps & React.RefAttributes<HTMLDivElement>>;
export declare const HiveSelectTags: React.FC<{
    options: SelectOption[];
    value: string[];
    onRemove: (value: string) => void;
    maxDisplay?: number;
}>;
export { HiveSelect, hiveSelectVariants };
//# sourceMappingURL=hive-select.d.ts.map