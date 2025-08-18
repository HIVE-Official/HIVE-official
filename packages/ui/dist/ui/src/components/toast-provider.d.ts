import React from 'react';
import { type ToastProps } from './toast';
type ToastOptions = Omit<ToastProps, 'isVisible' | 'onClose' | 'message'>;
interface ToastContextValue {
    showToast: (message: string, options?: ToastOptions) => void;
    hideToast: () => void;
}
export declare const useToast: () => ToastContextValue;
export interface ToastProviderProps {
    children: React.ReactNode;
}
export declare const ToastProvider: React.FC<ToastProviderProps>;
export {};
//# sourceMappingURL=toast-provider.d.ts.map