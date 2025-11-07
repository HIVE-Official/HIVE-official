import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { MotionDiv } from "../../shells/motion-safe";
declare const selectVariants: (props?: {
    variant?: "success" | "default" | "destructive" | "subtle";
    size?: "sm" | "lg" | "default";
} & import("class-variance-authority/types").ClassProp) => string;
declare const selectContentVariants: (props?: {
    position?: "item-aligned" | "popper";
    appearance?: "default";
} & import("class-variance-authority/types").ClassProp) => string;
declare const selectItemVariants: (props?: {
    variant?: "default" | "destructive";
    appearance?: "default" | "subtle";
} & import("class-variance-authority/types").ClassProp) => string;
export interface SelectProps extends VariantProps<typeof selectVariants> {
    value?: string;
    onValueChange?: (value: string) => void;
    defaultValue?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    children: React.ReactNode;
}
declare function Select({ value, onValueChange, defaultValue, open, onOpenChange, disabled, children, }: SelectProps): import("react/jsx-runtime").JSX.Element;
export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof selectVariants> {
}
declare const SelectTrigger: React.ForwardRefExoticComponent<SelectTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
    placeholder?: string;
}
declare const SelectValue: React.ForwardRefExoticComponent<SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
type MotionDivProps = React.ComponentProps<typeof MotionDiv>;
export interface SelectContentProps extends MotionDivProps, VariantProps<typeof selectContentVariants> {
}
declare const SelectContent: React.ForwardRefExoticComponent<Omit<SelectContentProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof selectItemVariants> {
    value: string;
    disabled?: boolean;
}
declare const SelectItem: React.ForwardRefExoticComponent<SelectItemProps & React.RefAttributes<HTMLDivElement>>;
export type SelectLabelProps = React.HTMLAttributes<HTMLDivElement>;
declare const SelectLabel: React.ForwardRefExoticComponent<SelectLabelProps & React.RefAttributes<HTMLDivElement>>;
export type SelectSeparatorProps = React.HTMLAttributes<HTMLDivElement>;
declare const SelectSeparator: React.ForwardRefExoticComponent<SelectSeparatorProps & React.RefAttributes<HTMLDivElement>>;
export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel, SelectSeparator, selectVariants, selectContentVariants, selectItemVariants, };
//# sourceMappingURL=select.d.ts.map