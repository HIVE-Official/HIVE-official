import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const textareaVariants: (props?: {
    variant?: "error" | "default" | "success" | "warning" | "brand";
    size?: "default" | "sm" | "lg" | "xl";
    radius?: "default" | "sm" | "lg" | "none" | "full";
    resize?: "none" | "both" | "horizontal" | "vertical";
} & import("class-variance-authority/types").ClassProp) => string;
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {
    error?: string;
    success?: string;
    helperText?: string;
    label?: string;
    required?: boolean;
    showCharCount?: boolean;
    maxLength?: number;
    autoResize?: boolean;
    minRows?: number;
    maxRows?: number;
}
declare const Textarea: React.ForwardRefExoticComponent<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export interface CodeTextareaProps extends Omit<TextareaProps, 'className'> {
    language?: string;
    showLineNumbers?: boolean;
}
declare const CodeTextarea: React.ForwardRefExoticComponent<CodeTextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export interface TextareaGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
    spacing?: "none" | "sm" | "md";
}
declare const TextareaGroup: React.ForwardRefExoticComponent<TextareaGroupProps & React.RefAttributes<HTMLDivElement>>;
export declare const TextareaPresets: {
    Comment: (props: Omit<TextareaProps, "placeholder" | "size">) => import("react/jsx-runtime").JSX.Element;
    Description: (props: Omit<TextareaProps, "placeholder" | "size">) => import("react/jsx-runtime").JSX.Element;
    Notes: (props: Omit<TextareaProps, "placeholder">) => import("react/jsx-runtime").JSX.Element;
    Code: (props: Omit<CodeTextareaProps, "placeholder">) => import("react/jsx-runtime").JSX.Element;
    Feedback: (props: Omit<TextareaProps, "placeholder" | "size">) => import("react/jsx-runtime").JSX.Element;
};
export { Textarea, CodeTextarea, TextareaGroup, textareaVariants };
//# sourceMappingURL=textarea.d.ts.map