import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const selectVariants: (props?: {
    variant?: "default" | "success" | "warning" | "error" | "brand";
    size?: "default" | "sm" | "lg" | "xl";
    radius?: "default" | "sm" | "lg" | "none" | "full";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
    description?: string;
}
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>, VariantProps<typeof selectVariants> {
    options: SelectOption[];
    placeholder?: string;
    error?: string;
    success?: string;
    helperText?: string;
    label?: string;
    required?: boolean;
    allowClear?: boolean;
    onClear?: () => void;
}
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;
export interface MultiSelectProps extends Omit<SelectProps, 'value' | 'onChange'> {
    value?: string[];
    onChange?: (value: string[]) => void;
    maxSelected?: number;
}
declare const MultiSelect: React.ForwardRefExoticComponent<MultiSelectProps & React.RefAttributes<HTMLSelectElement>>;
export interface SelectGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
    spacing?: "none" | "sm" | "md";
}
declare const SelectGroup: React.ForwardRefExoticComponent<SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
export declare const SelectPresets: {
    Country: (props: Omit<SelectProps, "options">) => import("react/jsx-runtime").JSX.Element;
    Priority: (props: Omit<SelectProps, "options">) => import("react/jsx-runtime").JSX.Element;
    Status: (props: Omit<SelectProps, "options">) => import("react/jsx-runtime").JSX.Element;
    Size: (props: Omit<SelectProps, "options">) => import("react/jsx-runtime").JSX.Element;
};
export { Select, MultiSelect, SelectGroup, selectVariants };
//# sourceMappingURL=select-enhanced.d.ts.map