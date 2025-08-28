import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const checkboxVariants: (props?: {
    size?: "default" | "sm" | "lg" | "xl";
    variant?: "error" | "default" | "success" | "warning" | "info";
    radius?: "default" | "sm" | "lg" | "none" | "full";
} & import("class-variance-authority/types").ClassProp) => string;
declare const checkboxLabelVariants: (props?: {
    color?: "error" | "primary" | "secondary" | "success" | "warning" | "info" | "tertiary";
    weight?: "medium" | "normal" | "semibold";
} & import("class-variance-authority/types").ClassProp) => string;
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>, VariantProps<typeof checkboxVariants> {
    label?: string;
    description?: string;
    error?: string;
    required?: boolean;
    indeterminate?: boolean;
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement> & VariantProps<typeof checkboxLabelVariants>;
}
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;
export interface CheckboxGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
    spacing?: "none" | "sm" | "md" | "lg";
    label?: string;
    description?: string;
    error?: string;
    required?: boolean;
}
declare const CheckboxGroup: React.ForwardRefExoticComponent<CheckboxGroupProps & React.RefAttributes<HTMLDivElement>>;
export interface CheckboxCardProps extends CheckboxProps {
    icon?: React.ReactNode;
    badge?: React.ReactNode;
}
declare const CheckboxCard: React.ForwardRefExoticComponent<CheckboxCardProps & React.RefAttributes<HTMLInputElement>>;
export declare const CheckboxPresets: {
    Terms: (props: Omit<CheckboxProps, "label" | "required">) => import("react/jsx-runtime").JSX.Element;
    Newsletter: (props: Omit<CheckboxProps, "label">) => import("react/jsx-runtime").JSX.Element;
    RememberMe: (props: Omit<CheckboxProps, "label">) => import("react/jsx-runtime").JSX.Element;
    SelectAll: (props: Omit<CheckboxProps, "label">) => import("react/jsx-runtime").JSX.Element;
};
export { Checkbox, CheckboxGroup, CheckboxCard, checkboxVariants };
//# sourceMappingURL=checkbox-enhanced.d.ts.map