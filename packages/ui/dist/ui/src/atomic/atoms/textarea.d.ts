import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const textareaVariants: (props?: {
    variant?: "default" | "destructive" | "success" | "warning" | "ghost";
    size?: "default" | "sm" | "lg" | "xl";
    resize?: "none" | "both" | "horizontal" | "vertical";
} & import("class-variance-authority/types").ClassProp) => string;
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {
    label?: string;
    helperText?: string;
    error?: string;
    maxLength?: number;
    showCount?: boolean;
    autoResize?: boolean;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export { Textarea, textareaVariants };
//# sourceMappingURL=textarea.d.ts.map