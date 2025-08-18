import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const toastVariants: (props?: {
    intent?: "success" | "error" | "info";
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
} & import("class-variance-authority/types").ClassProp) => string;
export interface ToastProps extends VariantProps<typeof toastVariants> {
    message: React.ReactNode;
    isVisible: boolean;
    onClose: () => void;
    className?: string;
    duration?: number;
}
export declare const Toast: React.FC<ToastProps>;
export {};
//# sourceMappingURL=toast.d.ts.map