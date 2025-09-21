import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const textareaEnhancedVariants: (props?: {
    variant?: "default" | "destructive" | "success" | "warning" | "outline" | "ghost";
    size?: "default" | "sm" | "lg" | "xl";
    resize?: "none" | "both" | "horizontal" | "vertical";
    rounded?: "none" | "sm" | "lg" | "xl" | "full" | "md";
} & import("class-variance-authority/types").ClassProp) => string;
export interface TextareaEnhancedProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaEnhancedVariants> {
    label?: string;
    description?: string;
    helperText?: string;
    error?: string;
    maxLength?: number;
    showCount?: boolean;
    autoResize?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    footerContent?: React.ReactNode;
    onClear?: () => void;
    showClearButton?: boolean;
    required?: boolean;
    optional?: boolean;
}
declare const TextareaEnhanced: React.ForwardRefExoticComponent<TextareaEnhancedProps & React.RefAttributes<HTMLTextAreaElement>>;
export { TextareaEnhanced, textareaEnhancedVariants };
//# sourceMappingURL=textarea-enhanced.d.ts.map