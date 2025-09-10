import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonVariants: (props?: ({
    variant?: "link" | "primary" | "secondary" | "ghost" | "destructive" | "success" | "warning" | "info" | "accent" | "outline" | null | undefined;
    size?: "xs" | "sm" | "default" | "md" | "lg" | "xl" | "icon" | null | undefined;
    radius?: "sm" | "default" | "lg" | "none" | "full" | null | undefined;
    loading?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
declare const Button: React.MemoExoticComponent<React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>>;
export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    orientation?: "horizontal" | "vertical";
    spacing?: "none" | "sm" | "md";
}
declare const ButtonGroup: React.ForwardRefExoticComponent<ButtonGroupProps & React.RefAttributes<HTMLDivElement>>;
export interface IconButtonProps extends Omit<ButtonProps, "leftIcon" | "rightIcon" | "children"> {
    icon: React.ReactNode;
    "aria-label": string;
}
declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
export declare const ButtonPresets: {
    PrimaryCTA: (props: Omit<ButtonProps, "variant" | "size">) => import("react/jsx-runtime").JSX.Element;
    SecondaryAction: (props: Omit<ButtonProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    DestructiveAction: (props: Omit<ButtonProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    SuccessAction: (props: Omit<ButtonProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    MenuItem: (props: Omit<ButtonProps, "variant" | "size">) => import("react/jsx-runtime").JSX.Element;
    TextLink: (props: Omit<ButtonProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    CloseButton: (props: Omit<IconButtonProps, "variant" | "icon">) => import("react/jsx-runtime").JSX.Element;
};
export { Button, Button as ButtonEnhanced, ButtonGroup, IconButton, buttonVariants };
//# sourceMappingURL=button-enhanced.d.ts.map