import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const alertVariants: (props?: {
    variant?: "default" | "destructive" | "success" | "warning" | "info";
} & import("class-variance-authority/types").ClassProp) => string;
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
    icon?: React.ReactNode;
    dismissible?: boolean;
    onDismiss?: () => void;
}
declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
declare const AlertTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const AlertDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
export declare const AlertIcons: {
    info: import("react/jsx-runtime").JSX.Element;
    success: import("react/jsx-runtime").JSX.Element;
    warning: import("react/jsx-runtime").JSX.Element;
    error: import("react/jsx-runtime").JSX.Element;
};
export { Alert, AlertTitle, AlertDescription, alertVariants };
//# sourceMappingURL=alert.d.ts.map