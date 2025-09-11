import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { type VariantProps } from "class-variance-authority";
declare const selectTriggerVariants: (props?: ({
    variant?: "error" | "default" | "success" | "warning" | "brand" | null | undefined;
    size?: "default" | "sm" | "lg" | "xl" | null | undefined;
    radius?: "default" | "sm" | "lg" | "none" | "full" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const selectContentVariants: (props?: ({
    position?: "popper" | "item" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const Select: React.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: React.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React.RefAttributes<HTMLSpanElement>>;
declare const SelectTrigger: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectTriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "error" | "default" | "success" | "warning" | "brand" | null | undefined;
    size?: "default" | "sm" | "lg" | "xl" | null | undefined;
    radius?: "default" | "sm" | "lg" | "none" | "full" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & React.RefAttributes<HTMLButtonElement>>;
declare const SelectScrollUpButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollUpButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectScrollDownButton: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectScrollDownButtonProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectContent: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & VariantProps<(props?: ({
    position?: "popper" | "item" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & React.RefAttributes<HTMLDivElement>>;
declare const SelectLabel: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectLabelProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectItem: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const SelectSeparator: React.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectSeparatorProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export interface HiveSelectProps extends VariantProps<typeof selectTriggerVariants> {
    placeholder?: string;
    error?: string;
    success?: string;
    helperText?: string;
    label?: string;
    required?: boolean;
    value?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
}
declare const HiveSelect: React.ForwardRefExoticComponent<HiveSelectProps & React.RefAttributes<never>>;
export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton, HiveSelect, selectTriggerVariants, selectContentVariants, };
//# sourceMappingURL=select-radix.d.ts.map