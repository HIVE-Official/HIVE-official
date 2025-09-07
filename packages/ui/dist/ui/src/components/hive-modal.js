import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { forwardRef } from 'react';
import { cn } from '../lib/utils.js';
import { cva } from 'class-variance-authority';
import { X } from 'lucide-react';
const hiveModalVariants = cva('', {
    variants: {
        size: {
            sm: 'max-w-sm',
            default: 'max-w-lg',
            lg: 'max-w-2xl',
            xl: 'max-w-4xl',
            full: 'max-w-full'
        },
        variant: {
            default: '',
            destructive: '',
            success: '',
            premium: ''
        }
    },
    defaultVariants: {
        size: 'default',
        variant: 'default'
    }
});
const HiveModal = forwardRef(({ className, isOpen, open, onClose, onOpenChange, title, description, showCloseButton = true, closeOnBackdropClick = true, closeOnEscape = true, size, variant, children, ...props }, ref) => {
    const isVisible = open ?? isOpen ?? false;
    const handleClose = () => {
        onClose?.();
        onOpenChange?.(false);
    };
    React.useEffect(() => {
        if (!isVisible || !closeOnEscape)
            return;
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isVisible, closeOnEscape]);
    if (!isVisible)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 z-50", children: [_jsx("div", { className: "fixed inset-0 bg-black/50 backdrop-blur-sm", onClick: closeOnBackdropClick ? handleClose : undefined, "aria-hidden": "true" }), _jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto", children: _jsxs("div", { ref: ref, className: cn('relative w-full bg-[var(--hive-background-primary)] border border-[var(--hive-border-primary)] rounded-lg shadow-xl mx-auto', hiveModalVariants({ size, variant }), className), ...props, children: [(title || showCloseButton) && (_jsxs("div", { className: "flex items-start justify-between p-6 border-b border-[var(--hive-border-primary)]", children: [title && (_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: title }), description && (_jsx("p", { className: "mt-1 text-sm text-[var(--hive-text-secondary)]", children: description }))] })), showCloseButton && (_jsx("button", { onClick: handleClose, className: "ml-auto p-1 rounded-md hover:bg-[var(--hive-interactive-hover)] transition-colors", "aria-label": "Close modal", children: _jsx(X, { className: "h-5 w-5 text-[var(--hive-text-secondary)]" }) }))] })), _jsx("div", { className: "p-6", children: children })] }) })] }));
});
HiveModal.displayName = 'HiveModal';
const HiveConfirmModal = forwardRef(({ confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, confirmVariant = 'default', loading = false, ...props }, ref) => {
    const handleCancel = () => {
        onCancel?.();
        props.onClose?.();
        props.onOpenChange?.(false);
    };
    return (_jsx(HiveModal, { ref: ref, ...props, children: _jsxs("div", { className: "flex justify-end gap-3 mt-6", children: [_jsx("button", { onClick: handleCancel, disabled: loading, className: "px-4 py-2 text-sm font-medium text-[var(--hive-text-secondary)] hover:bg-[var(--hive-interactive-hover)] rounded-md transition-colors", children: cancelText }), _jsx("button", { onClick: onConfirm, disabled: loading, className: cn("px-4 py-2 text-sm font-medium rounded-md transition-colors", confirmVariant === 'destructive' && "bg-red-600 text-white hover:bg-red-700", confirmVariant === 'premium' && "bg-[var(--hive-brand-secondary)] text-black hover:bg-[var(--hive-brand-secondary-hover)]", confirmVariant === 'default' && "bg-[var(--hive-text-primary)] text-[var(--hive-background-primary)] hover:opacity-90"), children: loading ? 'Loading...' : confirmText })] }) }));
});
HiveConfirmModal.displayName = 'HiveConfirmModal';
const HiveAlertModal = forwardRef(({ message, actionText = 'OK', ...props }, ref) => {
    return (_jsx(HiveModal, { ref: ref, ...props, children: _jsxs("div", { children: [_jsx("p", { className: "text-[var(--hive-text-primary)]", children: message }), _jsx("div", { className: "flex justify-end mt-6", children: _jsx("button", { onClick: () => {
                            props.onClose?.();
                            props.onOpenChange?.(false);
                        }, className: "px-4 py-2 text-sm font-medium bg-[var(--hive-text-primary)] text-[var(--hive-background-primary)] hover:opacity-90 rounded-md transition-colors", children: actionText }) })] }) }));
});
HiveAlertModal.displayName = 'HiveAlertModal';
export { HiveModal, HiveConfirmModal, HiveAlertModal, hiveModalVariants };
//# sourceMappingURL=hive-modal.js.map