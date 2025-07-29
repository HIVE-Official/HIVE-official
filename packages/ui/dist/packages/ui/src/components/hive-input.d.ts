import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveInputVariants: (props?: {
    variant?: "disabled" | "error" | "default" | "premium" | "minimal" | "success";
    size?: "default" | "sm" | "lg" | "xl";
    radius?: "default" | "sm" | "lg" | "xl";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface HiveInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof hiveInputVariants> {
    label?: string;
    helperText?: string;
    errorText?: string;
    successText?: string;
    showCharacterCount?: boolean;
    maxLength?: number;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onClear?: () => void;
    loading?: boolean;
    floatingLabel?: boolean;
    asChild?: boolean;
}
declare const HiveInput: React.ForwardRefExoticComponent<HiveInputProps & React.RefAttributes<HTMLInputElement>>;
declare const HiveToolNameInput: React.ForwardRefExoticComponent<Omit<HiveInputProps, "label" | "placeholder"> & React.RefAttributes<HTMLInputElement>>;
declare const HiveSpaceNameInput: React.ForwardRefExoticComponent<Omit<HiveInputProps, "label" | "placeholder"> & React.RefAttributes<HTMLInputElement>>;
declare const HiveSearchInput: React.ForwardRefExoticComponent<Omit<HiveInputProps, "type" | "label" | "placeholder"> & React.RefAttributes<HTMLInputElement>>;
declare const HivePasswordInput: React.ForwardRefExoticComponent<Omit<HiveInputProps, "type"> & React.RefAttributes<HTMLInputElement>>;
export { HiveInput, HiveToolNameInput, HiveSpaceNameInput, HiveSearchInput, HivePasswordInput, hiveInputVariants };
declare const Input: React.ForwardRefExoticComponent<Omit<HiveInputProps, "label" | "floatingLabel"> & React.RefAttributes<HTMLInputElement>>;
export { Input, HiveInput as InputAdvanced };
//# sourceMappingURL=hive-input.d.ts.map