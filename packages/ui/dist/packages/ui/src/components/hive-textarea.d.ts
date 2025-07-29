import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveTextareaVariants: (props?: {
    variant?: "disabled" | "error" | "default" | "premium" | "minimal" | "success";
    size?: "default" | "sm" | "lg" | "xl";
    radius?: "default" | "sm" | "lg" | "xl";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface HiveTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>, VariantProps<typeof hiveTextareaVariants> {
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
    resize?: boolean;
    asChild?: boolean;
}
declare const HiveTextarea: React.ForwardRefExoticComponent<HiveTextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
declare const HiveToolDescriptionTextarea: React.ForwardRefExoticComponent<Omit<HiveTextareaProps, "label" | "placeholder"> & React.RefAttributes<HTMLTextAreaElement>>;
declare const HiveSpaceDescriptionTextarea: React.ForwardRefExoticComponent<Omit<HiveTextareaProps, "label" | "placeholder"> & React.RefAttributes<HTMLTextAreaElement>>;
declare const HiveFeedbackTextarea: React.ForwardRefExoticComponent<Omit<HiveTextareaProps, "label" | "placeholder"> & React.RefAttributes<HTMLTextAreaElement>>;
declare const HiveCodeTextarea: React.ForwardRefExoticComponent<Omit<HiveTextareaProps, "className" | "label"> & React.RefAttributes<HTMLTextAreaElement>>;
export { HiveTextarea, HiveToolDescriptionTextarea, HiveSpaceDescriptionTextarea, HiveFeedbackTextarea, HiveCodeTextarea, hiveTextareaVariants };
declare const Textarea: React.ForwardRefExoticComponent<Omit<HiveTextareaProps, "label" | "floatingLabel"> & React.RefAttributes<HTMLTextAreaElement>>;
export { Textarea, HiveTextarea as TextareaAdvanced };
//# sourceMappingURL=hive-textarea.d.ts.map