import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const radioVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare const radioIndicatorVariants: (props?: ({
    size?: "sm" | "default" | "lg" | "xl" | null | undefined;
    variant?: "error" | "success" | "warning" | "info" | "default" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const radioLabelVariants: (props?: ({
    color?: "error" | "primary" | "secondary" | "success" | "warning" | "info" | "tertiary" | null | undefined;
    weight?: "medium" | "normal" | "semibold" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>, VariantProps<typeof radioVariants> {
    label?: string;
    description?: string;
    error?: string;
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement> & VariantProps<typeof radioLabelVariants>;
}
declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;
export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    name: string;
    value?: string;
    onChange?: (value: string) => void;
    orientation?: "horizontal" | "vertical";
    spacing?: "none" | "sm" | "md" | "lg";
    label?: string;
    description?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
}
declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
export interface RadioCardProps extends RadioProps {
    icon?: React.ReactNode;
    badge?: React.ReactNode;
    value: string;
}
declare const RadioCard: React.ForwardRefExoticComponent<RadioCardProps & React.RefAttributes<HTMLInputElement>>;
export declare const RadioPresets: {
    PaymentMethod: ({ options, ...props }: {
        options: Array<{
            value: string;
            label: string;
            icon?: React.ReactNode;
        }>;
    } & Omit<RadioGroupProps, "children">) => import("react/jsx-runtime").JSX.Element;
    Priority: (props: Omit<RadioGroupProps, "children">) => import("react/jsx-runtime").JSX.Element;
    Size: (props: Omit<RadioGroupProps, "children">) => import("react/jsx-runtime").JSX.Element;
    Theme: (props: Omit<RadioGroupProps, "children">) => import("react/jsx-runtime").JSX.Element;
};
export { Radio, RadioGroup, RadioCard, radioVariants, radioIndicatorVariants };
//# sourceMappingURL=radio-group.d.ts.map