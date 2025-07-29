import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const switchVariants: (props?: {
    size?: "default" | "sm" | "lg" | "xl";
    variant?: "error" | "default" | "success" | "warning" | "info";
} & import("class-variance-authority/dist/types").ClassProp) => string;
declare const switchLabelVariants: (props?: {
    color?: "error" | "primary" | "secondary" | "success" | "warning" | "info" | "tertiary";
    weight?: "medium" | "normal" | "semibold";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>, VariantProps<typeof switchVariants> {
    label?: string;
    description?: string;
    error?: string;
    labelPosition?: "left" | "right";
    showIcons?: boolean;
    checkedIcon?: React.ReactNode;
    uncheckedIcon?: React.ReactNode;
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement> & VariantProps<typeof switchLabelVariants>;
    onCheckedChange?: (checked: boolean) => void;
}
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement>>;
export interface SwitchGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
    spacing?: "none" | "sm" | "md" | "lg";
    label?: string;
    description?: string;
    error?: string;
}
declare const SwitchGroup: React.ForwardRefExoticComponent<SwitchGroupProps & React.RefAttributes<HTMLDivElement>>;
export interface SwitchCardProps extends SwitchProps {
    icon?: React.ReactNode;
    badge?: React.ReactNode;
}
declare const SwitchCard: React.ForwardRefExoticComponent<SwitchCardProps & React.RefAttributes<HTMLInputElement>>;
export declare const SwitchPresets: {
    Notifications: (props: Omit<SwitchProps, "label">) => import("react/jsx-runtime").JSX.Element;
    DarkMode: (props: Omit<SwitchProps, "label" | "showIcons">) => import("react/jsx-runtime").JSX.Element;
    Privacy: (props: Omit<SwitchProps, "label">) => import("react/jsx-runtime").JSX.Element;
    AutoSave: (props: Omit<SwitchProps, "label">) => import("react/jsx-runtime").JSX.Element;
};
export { Switch, SwitchGroup, SwitchCard, switchVariants };
//# sourceMappingURL=switch-enhanced.d.ts.map