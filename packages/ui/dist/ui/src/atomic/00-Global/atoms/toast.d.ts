/**
 * Toast - Notification toast primitive
 *
 * Features:
 * - Auto-dismiss after 4 seconds
 * - 4 variants: default, success, error, warning
 * - White glow focus states
 * - Framer Motion animations
 * - Max 3 toasts visible at once (managed by ToastProvider)
 *
 * Based on Radix UI Toast + HIVE design system
 *
 * Usage:
 * ```tsx
 * import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastClose, useToast } from '@hive/ui';
 *
 * // In your app layout
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 *
 * // In a component
 * const { toast } = useToast();
 *
 * toast({
 *   title: "Space joined!",
 *   description: "You're now a member of CS Study Group",
 *   variant: "success"
 * });
 * ```
 */
import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { type VariantProps } from 'class-variance-authority';
export declare const ToastViewport: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastViewportProps & React.RefAttributes<HTMLOListElement>, "ref"> & React.RefAttributes<HTMLOListElement>>;
export declare const Toast: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastProps & React.RefAttributes<HTMLLIElement>, "ref"> & VariantProps<(props?: {
    variant?: "success" | "error" | "warning" | "default";
} & import("class-variance-authority/types").ClassProp) => string> & React.RefAttributes<HTMLLIElement>>;
export declare const ToastIcon: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & VariantProps<(props?: {
    variant?: "success" | "error" | "warning" | "default";
} & import("class-variance-authority/types").ClassProp) => string> & React.RefAttributes<HTMLDivElement>>;
export declare const ToastAction: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastActionProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export declare const ToastClose: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastCloseProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export declare const ToastTitle: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastTitleProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const ToastDescription: React.ForwardRefExoticComponent<Omit<ToastPrimitives.ToastDescriptionProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export declare const ToastProvider: React.FC<ToastPrimitives.ToastProviderProps>;
export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
export type ToastActionElement = React.ReactElement<typeof ToastAction>;
//# sourceMappingURL=toast.d.ts.map