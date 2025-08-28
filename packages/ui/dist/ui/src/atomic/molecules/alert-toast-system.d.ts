import React from 'react';
export type AlertVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type AlertSize = 'sm' | 'md' | 'lg';
export interface AlertProps {
    variant?: AlertVariant;
    size?: AlertSize;
    title?: string;
    description?: string;
    icon?: React.ReactNode;
    dismissible?: boolean;
    onDismiss?: () => void;
    actions?: React.ReactNode;
    className?: string;
    children?: React.ReactNode;
}
export interface ToastProps {
    id: string;
    variant?: AlertVariant;
    title: string;
    description?: string;
    icon?: React.ReactNode;
    duration?: number;
    dismissible?: boolean;
    action?: {
        label: string;
        onClick: () => void;
    };
}
export interface ToastContextValue {
    toasts: ToastProps[];
    addToast: (toast: Omit<ToastProps, 'id'>) => void;
    removeToast: (id: string) => void;
    clearAll: () => void;
}
export declare function Alert({ variant, size, title, description, icon, dismissible, onDismiss, actions, className, children }: AlertProps): import("react/jsx-runtime").JSX.Element;
export declare function useToast(): ToastContextValue;
export declare function ToastProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare const toast: {
    success: (title: string, description?: string, options?: Partial<ToastProps>) => {
        id?: string;
        variant: AlertVariant;
        title: string;
        description: string;
        icon?: React.ReactNode;
        duration?: number;
        dismissible?: boolean;
        action?: {
            label: string;
            onClick: () => void;
        };
    };
    error: (title: string, description?: string, options?: Partial<ToastProps>) => {
        id?: string;
        variant: AlertVariant;
        title: string;
        description: string;
        icon?: React.ReactNode;
        duration?: number;
        dismissible?: boolean;
        action?: {
            label: string;
            onClick: () => void;
        };
    };
    warning: (title: string, description?: string, options?: Partial<ToastProps>) => {
        id?: string;
        variant: AlertVariant;
        title: string;
        description: string;
        icon?: React.ReactNode;
        duration?: number;
        dismissible?: boolean;
        action?: {
            label: string;
            onClick: () => void;
        };
    };
    info: (title: string, description?: string, options?: Partial<ToastProps>) => {
        id?: string;
        variant: AlertVariant;
        title: string;
        description: string;
        icon?: React.ReactNode;
        duration?: number;
        dismissible?: boolean;
        action?: {
            label: string;
            onClick: () => void;
        };
    };
    default: (title: string, description?: string, options?: Partial<ToastProps>) => {
        id?: string;
        variant: AlertVariant;
        title: string;
        description: string;
        icon?: React.ReactNode;
        duration?: number;
        dismissible?: boolean;
        action?: {
            label: string;
            onClick: () => void;
        };
    };
};
export declare const AlertPresets: {
    ErrorBoundary: (props: Omit<AlertProps, "variant" | "dismissible">) => import("react/jsx-runtime").JSX.Element;
    Success: (props: Omit<AlertProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    Warning: (props: Omit<AlertProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    Info: (props: Omit<AlertProps, "variant">) => import("react/jsx-runtime").JSX.Element;
};
//# sourceMappingURL=alert-toast-system.d.ts.map