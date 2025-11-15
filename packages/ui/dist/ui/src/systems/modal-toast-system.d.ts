/**
 * Modal and Toast System
 * Global notification and dialog infrastructure for HIVE
 */
import React from 'react';
export interface ModalConfig {
    id: string;
    title?: string;
    content: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closeOnOverlay?: boolean;
    closeButton?: boolean;
    actions?: Array<{
        label: string;
        onClick: () => void;
        variant?: 'primary' | 'secondary' | 'danger';
    }>;
}
export interface ToastConfig {
    id: string;
    title?: string;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}
interface ModalContextType {
    modals: ModalConfig[];
    openModal: (modal: Omit<ModalConfig, 'id'>) => string;
    closeModal: (id: string) => void;
    closeAllModals: () => void;
}
declare const useModal: () => ModalContextType;
interface ToastContextType {
    toasts: ToastConfig[];
    showToast: (toast: Omit<ToastConfig, 'id'>) => string;
    /**
     * Convenience alias matching the `useToast().toast(...)` pattern
     * used across the apps. Internally delegates to `showToast`.
     */
    toast: (toast: Omit<ToastConfig, 'id'>) => string;
    removeToast: (id: string) => void;
    clearToasts: () => void;
}
declare const useToast: () => ToastContextType;
declare const ModalProvider: React.FC<{
    children: React.ReactNode;
}>;
declare const ToastProvider: React.FC<{
    children: React.ReactNode;
}>;
declare const NotificationProvider: React.FC<{
    children: React.ReactNode;
}>;
declare const useConfirm: () => (options: {
    title?: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "danger" | "warning" | "info";
}) => Promise<boolean>;
export { ModalProvider, ToastProvider, NotificationProvider, useModal, useToast, useConfirm, };
//# sourceMappingURL=modal-toast-system.d.ts.map