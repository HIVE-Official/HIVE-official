import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const alertVariants: (props?: ({
    variant?: "error" | "default" | "success" | "warning" | "info" | "hive" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
    dismissible?: boolean;
    onDismiss?: () => void;
    icon?: React.ReactNode;
}
declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
declare const AlertTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const AlertDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
export declare const AlertIcons: {
    Success: () => import("react/jsx-runtime").JSX.Element;
    Warning: () => import("react/jsx-runtime").JSX.Element;
    Error: () => import("react/jsx-runtime").JSX.Element;
    Info: () => import("react/jsx-runtime").JSX.Element;
    HIVE: () => import("react/jsx-runtime").JSX.Element;
};
export declare const CampusAlerts: {
    AchievementAlert: ({ children, ...props }: Omit<AlertProps, "variant" | "icon">) => import("react/jsx-runtime").JSX.Element;
    DeadlineAlert: ({ children, ...props }: Omit<AlertProps, "variant" | "icon">) => import("react/jsx-runtime").JSX.Element;
    SystemAlert: ({ children, ...props }: Omit<AlertProps, "variant" | "icon">) => import("react/jsx-runtime").JSX.Element;
    InfoAlert: ({ children, ...props }: Omit<AlertProps, "variant" | "icon">) => import("react/jsx-runtime").JSX.Element;
    HIVEAlert: ({ children, ...props }: Omit<AlertProps, "variant" | "icon">) => import("react/jsx-runtime").JSX.Element;
};
export { Alert, AlertTitle, AlertDescription, alertVariants };
//# sourceMappingURL=alert.d.ts.map