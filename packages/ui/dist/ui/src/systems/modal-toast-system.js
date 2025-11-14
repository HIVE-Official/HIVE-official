'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Modal and Toast System
 * Global notification and dialog infrastructure for HIVE
 */
import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
const ModalContext = createContext({
    modals: [],
    openModal: () => '',
    closeModal: () => { },
    closeAllModals: () => { },
});
const useModal = () => useContext(ModalContext);
const ToastContext = createContext({
    toasts: [],
    showToast: () => '',
    removeToast: () => { },
    clearToasts: () => { },
});
const useToast = () => useContext(ToastContext);
// Modal Provider
const ModalProvider = ({ children }) => {
    const [modals, setModals] = useState([]);
    const openModal = useCallback((modal) => {
        const id = `modal-${Date.now()}-${Math.random()}`;
        const newModal = { ...modal, id };
        setModals(prev => [...prev, newModal]);
        return id;
    }, []);
    const closeModal = useCallback((id) => {
        setModals(prev => prev.filter(m => m.id !== id));
    }, []);
    const closeAllModals = useCallback(() => {
        setModals([]);
    }, []);
    return (_jsxs(ModalContext.Provider, { value: { modals, openModal, closeModal, closeAllModals }, children: [children, modals.map(modal => (_jsx(ModalRenderer, { modal: modal, onClose: () => closeModal(modal.id) }, modal.id)))] }));
};
// Toast Provider
const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const showToast = useCallback((toast) => {
        const id = `toast-${Date.now()}-${Math.random()}`;
        const newToast = { ...toast, id };
        setToasts(prev => [...prev, newToast]);
        // Auto-remove after duration
        if (toast.duration !== 0) {
            setTimeout(() => {
                removeToast(id);
            }, toast.duration || 5000);
        }
        return id;
    }, []);
    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);
    const clearToasts = useCallback(() => {
        setToasts([]);
    }, []);
    return (_jsxs(ToastContext.Provider, { value: { toasts, showToast, removeToast, clearToasts }, children: [children, _jsx(ToastContainer, { toasts: toasts, onRemove: removeToast })] }));
};
// Modal Renderer Component
const ModalRenderer = ({ modal, onClose }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && modal.closeOnOverlay !== false) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [modal.closeOnOverlay, onClose]);
    if (!mounted)
        return null;
    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4',
    };
    const modalContent = (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [_jsx("div", { className: "absolute inset-0 bg-black/70 backdrop-blur-sm", onClick: modal.closeOnOverlay !== false ? onClose : undefined }), _jsxs("div", { className: cn('relative w-full bg-black border border-white/10 rounded-xl shadow-2xl', 'animate-in fade-in zoom-in-95 duration-200', sizes[modal.size || 'md']), children: [(modal.title || modal.closeButton !== false) && (_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-white/10", children: [modal.title && (_jsx("h2", { className: "text-xl font-bold text-white", children: modal.title })), modal.closeButton !== false && (_jsx("button", { onClick: onClose, className: "ml-auto p-2 text-white/60 hover:text-white transition-colors", children: _jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }))] })), _jsx("div", { className: "p-6 max-h-[70vh] overflow-y-auto", children: modal.content }), modal.actions && modal.actions.length > 0 && (_jsx("div", { className: "flex items-center justify-end gap-3 p-6 border-t border-white/10", children: modal.actions.map((action, index) => (_jsx("button", { onClick: action.onClick, className: cn('px-4 py-2 rounded-lg font-medium transition-all', action.variant === 'primary' && 'bg-[var(--hive-brand-secondary)] text-black hover:bg-[var(--hive-brand-secondary-hover)]', action.variant === 'secondary' && 'bg-white/10 text-white hover:bg-white/20', action.variant === 'danger' && 'bg-red-500 text-white hover:bg-red-600', !action.variant && 'bg-white/10 text-white hover:bg-white/20'), children: action.label }, index))) }))] })] }));
    return createPortal(modalContent, document.getElementById('modal-root') || document.body);
};
// Toast Container Component
const ToastContainer = ({ toasts, onRemove }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted)
        return null;
    const container = (_jsx("div", { className: "fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none", children: toasts.map(toast => (_jsx(ToastItem, { toast: toast, onRemove: () => onRemove(toast.id) }, toast.id))) }));
    return createPortal(container, document.getElementById('toast-root') || document.body);
};
// Individual Toast Component
const ToastItem = ({ toast, onRemove }) => {
    const [isLeaving, setIsLeaving] = useState(false);
    const handleRemove = () => {
        setIsLeaving(true);
        setTimeout(onRemove, 200);
    };
    const typeStyles = {
        success: 'border-green-500 bg-green-500/10',
        error: 'border-red-500 bg-red-500/10',
        warning: 'border-orange-500 bg-orange-500/10',
        info: 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10',
    };
    const typeIcons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
    };
    return (_jsx("div", { className: cn('pointer-events-auto min-w- max-w- p-4 rounded-lg', 'bg-black border shadow-xl', 'animate-in slide-in-from-right fade-in duration-200', isLeaving && 'animate-out slide-out-to-right fade-out duration-200', typeStyles[toast.type || 'info']), children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("span", { className: cn('flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold', toast.type === 'success' && 'bg-green-500 text-white', toast.type === 'error' && 'bg-red-500 text-white', toast.type === 'warning' && 'bg-orange-500 text-white', (!toast.type || toast.type === 'info') && 'bg-[var(--hive-brand-secondary)] text-black'), children: typeIcons[toast.type || 'info'] }), _jsxs("div", { className: "flex-1", children: [toast.title && (_jsx("h4", { className: "font-semibold text-white mb-1", children: toast.title })), _jsx("p", { className: "text-sm text-white/80", children: toast.message }), toast.action && (_jsx("button", { onClick: toast.action.onClick, className: "mt-2 text-sm font-medium text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary-hover)] transition-colors", children: toast.action.label }))] }), _jsx("button", { onClick: handleRemove, className: "flex-shrink-0 p-1 text-white/40 hover:text-white transition-colors", children: _jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }) }));
};
// Combined Provider
const NotificationProvider = ({ children }) => {
    return (_jsx(ModalProvider, { children: _jsx(ToastProvider, { children: children }) }));
};
// Utility Hooks
const useConfirm = () => {
    const { openModal, closeModal } = useModal();
    const confirm = useCallback((options) => {
        return new Promise((resolve) => {
            const modalId = openModal({
                title: options.title || 'Confirm',
                content: (_jsx("div", { className: "text-white/80", children: options.message })),
                size: 'sm',
                actions: [
                    {
                        label: options.cancelLabel || 'Cancel',
                        variant: 'secondary',
                        onClick: () => {
                            closeModal(modalId);
                            resolve(false);
                        },
                    },
                    {
                        label: options.confirmLabel || 'Confirm',
                        variant: options.variant === 'danger' ? 'danger' : 'primary',
                        onClick: () => {
                            closeModal(modalId);
                            resolve(true);
                        },
                    },
                ],
            });
        });
    }, [openModal, closeModal]);
    return confirm;
};
// Named exports are preferred over default exports
export { ModalProvider, ToastProvider, NotificationProvider, useModal, useToast, useConfirm, };
//# sourceMappingURL=modal-toast-system.js.map