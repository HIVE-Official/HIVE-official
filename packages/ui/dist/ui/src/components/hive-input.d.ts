import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveInputVariants: (props?: {
    variant?: "error" | "default" | "disabled" | "success" | "minimal" | "premium";
    size?: "default" | "sm" | "lg" | "xl";
    radius?: "default" | "sm" | "lg" | "xl";
} & import("class-variance-authority/types").ClassProp) => string;
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
    'aria-label'?: string;
    'aria-describedby'?: string;
    'data-testid'?: string;
    required?: boolean;
}
declare const HiveInput: React.ForwardRefExoticComponent<HiveInputProps & React.RefAttributes<HTMLInputElement>>;
declare const HiveToolNameInput: React.ForwardRefExoticComponent<Omit<HiveInputProps, "label" | "placeholder"> & React.RefAttributes<HTMLInputElement>>;
declare const HiveSpaceNameInput: React.ForwardRefExoticComponent<Omit<HiveInputProps, "label" | "placeholder"> & React.RefAttributes<HTMLInputElement>>;
declare const HiveSearchInput: React.ForwardRefExoticComponent<Omit<HiveInputProps, "type" | "label" | "placeholder"> & React.RefAttributes<HTMLInputElement>>;
declare const HivePasswordInput: React.ForwardRefExoticComponent<Omit<HiveInputProps, "type"> & React.RefAttributes<HTMLInputElement>>;
export { HiveInput, HiveToolNameInput, HiveSpaceNameInput, HiveSearchInput, HivePasswordInput, hiveInputVariants };
//# sourceMappingURL=hive-input.d.ts.map