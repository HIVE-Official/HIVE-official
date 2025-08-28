"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { ErrorBoundary } from './error-boundary';
import { cn } from '../../lib/utils';
const dialogVariants = cva('relative bg-surface rounded-xl shadow-2xl border-2 border-accent/20 overflow-hidden ring-1 ring-white/10', {
    variants: {
        size: {
            sm: 'w-full max-w-sm',
            md: 'w-full max-w-md',
            lg: 'w-full max-w-lg',
            xl: 'w-full max-w-xl',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});
export function DialogContent({ children, className, }) {
    return _jsx("div", { className: cn("px-6 pb-6", className), children: children });
}
export function DialogHeader({ children, className, }) {
    return _jsx("div", { className: cn("p-6 pb-4", className), children: children });
}
export function DialogTitle({ children, className, }) {
    return _jsx("h2", { className: cn("text-h3 font-display font-semibold", className), children: children });
}
export function DialogDescription({ children, className, }) {
    return _jsx("p", { className: cn("mt-2 text-body text-muted", className), children: children });
}
export function DialogTrigger({ children, onClick, className, }) {
    return _jsx("button", { onClick: onClick, className: className, children: children });
}
export const Dialog = React.forwardRef(({ isOpen, onClose, title, description, children, size, className, }, ref) => {
    const dialogRef = React.useRef(null);
    React.useEffect(() => {
        if (isOpen) {
            const handleEscape = (e) => {
                if (e.key === 'Escape')
                    onClose();
            };
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen, onClose]);
    // Merge refs
    const mergedRef = React.useMemo(() => {
        if (ref) {
            return (node) => {
                if (typeof ref === 'function')
                    ref(node);
                else if (ref)
                    ref.current = node;
                dialogRef.current = node;
            };
        }
        return dialogRef;
    }, [ref]);
    // Handle click outside
    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    return (_jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md", onClick: handleBackdropClick, role: "presentation", children: _jsxs(motion.div, { ref: mergedRef, role: "dialog", "aria-labelledby": "dialog-title", "aria-describedby": description ? 'dialog-description' : undefined, "aria-modal": "true", className: dialogVariants({ size, className }), initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }, children: [_jsx("button", { onClick: onClose, className: "absolute top-4 right-4 p-1 text-muted hover:text-foreground transition-colors duration-base", "aria-label": "Close dialog", children: _jsx(X, { className: "h-4 w-4" }) }), _jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: title }), description && (_jsx(DialogDescription, { children: description }))] }), _jsx(ErrorBoundary, { children: _jsx(DialogContent, { children: children }) })] }) })) }));
});
Dialog.displayName = 'Dialog';
//# sourceMappingURL=dialog.js.map