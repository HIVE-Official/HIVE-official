import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const textareaVariants: (props?: ({
    variant?: "error" | "default" | "success" | "warning" | "brand" | null | undefined;
    size?: "default" | "sm" | "lg" | "xl" | null | undefined;
    radius?: "default" | "sm" | "lg" | "none" | "full" | null | undefined;
    resize?: "none" | "horizontal" | "vertical" | "both" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
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
export { Textarea, Textarea as TextareaEnhanced, CodeTextarea, TextareaGroup, textareaVariants };
//# sourceMappingURL=textarea-enhanced.d.ts.map