import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveMultiSelectVariants: (props?: {
    variant?: "default" | "minimal" | "elevated" | "premium";
    size?: "default" | "sm" | "lg" | "xl";
} & import("class-variance-authority/types").ClassProp) => string;
export interface MultiSelectOption {
    value: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    group?: string;
    variant?: 'default' | 'premium' | 'elevated' | 'minimal';
    metadata?: Record<string, any>;
}
export interface HiveMultiSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>, VariantProps<typeof hiveMultiSelectVariants> {
    options: MultiSelectOption[];
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    maxTags?: number;
    maxHeight?: string;
    creatable?: boolean;
    clearable?: boolean;
    disabled?: boolean;
    error?: boolean;
    loading?: boolean;
    noOptionsMessage?: string;
    emptySearchMessage?: string;
    createOptionMessage?: string;
    tagLimit?: number;
    showCount?: boolean;
    groupBy?: string;
    renderTag?: (option: MultiSelectOption, onRemove: () => void) => React.ReactNode;
    renderOption?: (option: MultiSelectOption) => React.ReactNode;
    renderCreateOption?: (query: string) => React.ReactNode;
    onCreateOption?: (query: string) => MultiSelectOption;
    validateNewOption?: (query: string) => boolean;
}
declare const HiveMultiSelect: React.ForwardRefExoticComponent<HiveMultiSelectProps & React.RefAttributes<HTMLDivElement>>;
export { HiveMultiSelect, hiveMultiSelectVariants };
//# sourceMappingURL=hive-multi-select.d.ts.map