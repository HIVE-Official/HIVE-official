import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const textareaVariants: (props?: {
    variant?: "success" | "warning" | "default" | "outline" | "ghost" | "destructive" | "subtle";
    size?: "sm" | "lg" | "xl" | "default";
    resize?: "none" | "both" | "horizontal" | "vertical";
    rounded?: "sm" | "md" | "lg" | "xl" | "full" | "none";
} & import("class-variance-authority/types").ClassProp) => string;
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {
    label?: React.ReactNode;
    helperText?: React.ReactNode;
    error?: React.ReactNode;
    maxLength?: number;
    showCount?: boolean;
    autoResize?: boolean;
    description?: React.ReactNode;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    footerContent?: React.ReactNode;
    onClear?: () => void;
    showClearButton?: boolean;
    required?: boolean;
    optional?: boolean;
    wrapperClassName?: string;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export { Textarea, textareaVariants };
//# sourceMappingURL=textarea.d.ts.map