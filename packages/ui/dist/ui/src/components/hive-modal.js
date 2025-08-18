"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations } from '../motion/hive-motion-system';
import { X } from 'lucide-react';
// HIVE Modal System - Matte Obsidian Glass with Liquid Metal Motion
// Premium modal components that feel like sophisticated hardware interfaces
const hiveModalVariants = cva(
// Base modal styles - matte obsidian glass with heavy radius
"relative bg-[var(--hive-background-primary)]/60 backdrop-blur-2xl border rounded-2xl shadow-2xl max-w-lg w-full mx-4", {
    variants: {
        size: {
            sm: "max-w-sm",
            default: "max-w-lg",
            lg: "max-w-2xl",
            xl: "max-w-4xl",
            full: "max-w-7xl",
        },
        variant: {
            // Standard modal - matte obsidian glass
            default: "border-white/20 shadow-black/40",
            // Premium modal - gold accent
            premium: "border-yellow-500/30 shadow-yellow-500/10",
            // Destructive modal - red accent
            destructive: "border-red-500/30 shadow-red-500/10",
            // Success modal - green accent
            success: "border-green-500/30 shadow-green-500/10",
        }
    },
    defaultVariants: {
        size: "default",
        variant: "default",
    },
});
// Backdrop animation variants
const backdropVariants = {
    hidden: {
        opacity: 0,
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    visible: {
        opacity: 1,
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing,
        }
    }
};
// Modal content animation variants
const modalVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        y: 50,
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing,
            type: "spring",
            stiffness: 300,
            damping: 25,
        }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: -20,
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    }
};
const HiveModal = React.forwardRef(({ className, variant, size, isOpen, open, onClose, onOpenChange, title, description, showCloseButton = true, closeOnBackdropClick = true, closeOnEscape = true, children, ...props }, ref) => {
    // Support both prop patterns
    const modalIsOpen = open ?? isOpen ?? false;
    const handleClose = onOpenChange ? () => onOpenChange(false) : onClose ?? (() => { });
    // Handle escape key
    useEffect(() => {
        if (!closeOnEscape)
            return;
        const handleEscape = (e) => {
            if (e.key === 'Escape' && modalIsOpen) {
                handleClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [modalIsOpen, handleClose, closeOnEscape]);
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (modalIsOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [modalIsOpen]);
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && closeOnBackdropClick) {
            handleClose();
        }
    };
    return (_jsx(AnimatePresence, { mode: "wait", children: modalIsOpen && (_jsxs(motion.div, { className: "fixed inset-0 z-50 flex items-center justify-center", initial: "hidden", animate: "visible", exit: "hidden", children: [_jsx(motion.div, { className: "absolute inset-0 bg-[var(--hive-background-primary)]/80 backdrop-blur-sm", variants: backdropVariants, onClick: handleBackdropClick }), _jsxs(motion.div, { ref: ref, className: cn(hiveModalVariants({ variant, size, className })), variants: modalVariants, ...props, children: [(title || description || showCloseButton) && (_jsxs("div", { className: "flex items-start justify-between p-8 pb-4", children: [_jsxs("div", { className: "space-y-2", children: [title && (_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: title })), description && (_jsx("p", { className: "text-gray-400 text-sm leading-relaxed", children: description }))] }), showCloseButton && (_jsx(motion.button, { className: "text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 transition-colors p-2 -mt-2 -mr-2", onClick: handleClose, whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(X, { size: 20 }) }))] })), _jsx("div", { className: cn("px-8", (title || description || showCloseButton) ? "pb-8" : "py-8"), children: children })] })] })) }));
});
HiveModal.displayName = "HiveModal";
const HiveConfirmModal = React.forwardRef(({ confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel, confirmVariant = 'default', loading = false, onClose, ...props }, ref) => {
    const handleCancel = () => {
        onCancel?.();
        onClose();
    };
    const handleConfirm = () => {
        onConfirm();
        if (!loading) {
            onClose();
        }
    };
    const confirmButtonClass = {
        default: "bg-[var(--hive-text-primary)]/10 hover:bg-[var(--hive-text-primary)]/20 text-[var(--hive-text-primary)] border-white/20",
        destructive: "bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30",
        premium: "bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border-yellow-500/30"
    }[confirmVariant];
    return (_jsx(HiveModal, { ref: ref, onClose: onClose, ...props, children: _jsxs("div", { className: "flex justify-end space-x-4 mt-8", children: [_jsx(motion.button, { className: "px-6 py-3 rounded-xl bg-[var(--hive-text-primary)]/5 hover:bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)]/80 border border-white/10 transition-all", onClick: handleCancel, disabled: loading, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: cancelText }), _jsx(motion.button, { className: cn("px-6 py-3 rounded-xl border transition-all", confirmButtonClass, loading && "opacity-50 cursor-not-allowed"), onClick: handleConfirm, disabled: loading, whileHover: { scale: loading ? 1 : 1.02 }, whileTap: { scale: loading ? 1 : 0.98 }, children: loading ? (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(motion.div, { className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full", animate: { rotate: 360 }, transition: { duration: 1, repeat: Infinity, ease: "linear" } }), _jsx("span", { children: "Loading..." })] })) : (confirmText) })] }) }));
});
HiveConfirmModal.displayName = "HiveConfirmModal";
const HiveAlertModal = React.forwardRef(({ message, actionText = "OK", onClose, ...props }, ref) => {
    return (_jsx(HiveModal, { ref: ref, onClose: onClose, ...props, children: _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-gray-300 leading-relaxed mb-8", children: message }), _jsx(motion.button, { className: "px-8 py-3 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30 transition-all", onClick: onClose, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: actionText })] }) }));
});
HiveAlertModal.displayName = "HiveAlertModal";
export { HiveModal, HiveConfirmModal, HiveAlertModal, hiveModalVariants };
//# sourceMappingURL=hive-modal.js.map