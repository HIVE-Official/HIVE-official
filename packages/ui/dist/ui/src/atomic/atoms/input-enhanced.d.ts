import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const inputVariants: (props?: ({
    variant?: "error" | "default" | "ghost" | "success" | "warning" | "filled" | "brand" | null | undefined;
    size?: "default" | "sm" | "lg" | "xl" | "md" | null | undefined;
    radius?: "default" | "sm" | "lg" | "none" | "full" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    leftElement?: React.ReactNode;
    rightElement?: React.ReactNode;
    error?: string;
    success?: string;
    helperText?: string;
    label?: string;
    required?: boolean;
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'type'> {
    onClear?: () => void;
    showClearButton?: boolean;
}
declare const SearchInput: React.ForwardRefExoticComponent<SearchInputProps & React.RefAttributes<HTMLInputElement>>;
export type PasswordInputProps = Omit<InputProps, 'type' | 'rightIcon'>;
declare const PasswordInput: React.ForwardRefExoticComponent<PasswordInputProps & React.RefAttributes<HTMLInputElement>>;
export interface NumberInputProps extends Omit<InputProps, 'type'> {
    min?: number;
    max?: number;
    step?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
    showControls?: boolean;
}
declare const NumberInput: React.ForwardRefExoticComponent<NumberInputProps & React.RefAttributes<HTMLInputElement>>;
export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
    spacing?: "none" | "sm" | "md";
}
declare const InputGroup: React.ForwardRefExoticComponent<InputGroupProps & React.RefAttributes<HTMLDivElement>>;
export declare const InputPresets: {
    Email: (props: Omit<InputProps, "type">) => import("react/jsx-runtime").JSX.Element;
    Phone: (props: Omit<InputProps, "type">) => import("react/jsx-runtime").JSX.Element;
    URL: (props: Omit<InputProps, "type">) => import("react/jsx-runtime").JSX.Element;
    Search: (props: Omit<SearchInputProps, "type">) => import("react/jsx-runtime").JSX.Element;
    Currency: (props: Omit<InputProps, "leftElement">) => import("react/jsx-runtime").JSX.Element;
};
export interface FloatingLabelInputProps extends Omit<InputProps, 'label'> {
    label: string;
    labelClassName?: string;
}
declare const FloatingLabelInput: React.ForwardRefExoticComponent<FloatingLabelInputProps & React.RefAttributes<HTMLInputElement>>;
export { Input, Input as InputEnhanced, SearchInput, PasswordInput, NumberInput, InputGroup, FloatingLabelInput, inputVariants };
//# sourceMappingURL=input-enhanced.d.ts.map