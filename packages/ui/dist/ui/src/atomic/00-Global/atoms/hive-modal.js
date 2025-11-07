'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
export function HiveModal({ open, onOpenChange, children, className, size = 'md', closeOnOverlay = true }) {
    if (!open)
        return null;
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget && closeOnOverlay) {
            onOpenChange(false);
        }
    };
    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl'
    };
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [_jsx("div", { className: "fixed inset-0 bg-black/80 backdrop-blur-sm", onClick: handleOverlayClick }), _jsx("div", { className: cn('relative w-full mx-4 bg-hive-background-secondary border border-hive-border-primary rounded-lg shadow-xl', sizeClasses[size], className), children: children })] }));
}
// Modal subcomponents for better composition
export function HiveModalHeader({ children, className, showCloseButton = true, onClose }) {
    return (_jsx("div", { className: cn('px-6 pt-6 pb-4 border-b border-hive-border-secondary', className), children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsx("div", { className: "flex-1", children: children }), showCloseButton && onClose && (_jsx("button", { onClick: onClose, className: "ml-4 text-hive-text-muted hover:text-hive-text-primary transition-colors", children: _jsx(X, { className: "w-5 h-5" }) }))] }) }));
}
export function HiveModalTitle({ children, className }) {
    return (_jsx("h2", { className: cn('text-xl font-semibold text-hive-text-primary', className), children: children }));
}
export function HiveModalDescription({ children, className }) {
    return (_jsx("p", { className: cn('mt-2 text-sm text-hive-text-secondary', className), children: children }));
}
export function HiveModalContent({ children, className }) {
    return (_jsx("div", { className: cn('p-6', className), children: children }));
}
export function HiveModalFooter({ children, className }) {
    return (_jsx("div", { className: cn('px-6 pb-6 pt-4 border-t border-hive-border-secondary', className), children: children }));
}
//# sourceMappingURL=hive-modal.js.map