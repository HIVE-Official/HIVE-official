"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { HiveModal, HiveModalContent, HiveModalHeader, HiveModalTitle, HiveModalDescription, HiveModalFooter } from "./hive-modal";
import { Button } from "./button";
const HiveConfirmModal = React.forwardRef(({ open, onOpenChange, onClose, title = "Confirm Action", description = "Are you sure you want to continue?", confirmText = "Confirm", cancelText = "Cancel", variant = "default", onConfirm, onCancel, loading = false, disabled = false, children, className, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const handleModalClose = React.useCallback((newOpen) => {
        onOpenChange?.(newOpen);
        // Call onClose when modal is being closed
        if (!newOpen && onClose) {
            onClose();
        }
    }, [onOpenChange, onClose]);
    const handleConfirm = React.useCallback(async () => {
        if (!onConfirm || loading || disabled)
            return;
        try {
            setIsLoading(true);
            await onConfirm();
            handleModalClose(false);
        }
        catch (error) {
            console.error("HiveConfirmModal: Confirm action failed:", error);
        }
        finally {
            setIsLoading(false);
        }
    }, [onConfirm, loading, disabled, handleModalClose]);
    const handleCancel = React.useCallback(() => {
        if (loading || isLoading)
            return;
        onCancel?.();
        handleModalClose(false);
    }, [onCancel, loading, isLoading, handleModalClose]);
    const getVariantStyles = () => {
        switch (variant) {
            case "destructive":
                return {
                    confirmButton: "destructive",
                    iconColor: "text-[var(--hive-status-error)]"
                };
            case "warning":
                return {
                    confirmButton: "default",
                    iconColor: "text-[var(--hive-status-warning)]"
                };
            default:
                return {
                    confirmButton: "default",
                    iconColor: "text-[var(--hive-brand-primary)]"
                };
        }
    };
    const variantStyles = getVariantStyles();
    const isProcessing = loading || isLoading;
    return (_jsx(HiveModal, { open: open, onOpenChange: handleModalClose, children: _jsxs(HiveModalContent, { className: cn("max-w-md", className), ...props, children: [_jsx(HiveModalHeader, { children: _jsxs("div", { className: "flex items-center space-x-3", children: [variant === "destructive" && (_jsx("div", { className: cn("p-2 rounded-full bg-[var(--hive-status-error-bg)]", variantStyles.iconColor), children: _jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("line", { x1: "15", y1: "9", x2: "9", y2: "15" }), _jsx("line", { x1: "9", y1: "9", x2: "15", y2: "15" })] }) })), variant === "warning" && (_jsx("div", { className: cn("p-2 rounded-full bg-[var(--hive-status-warning-bg)]", variantStyles.iconColor), children: _jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" }), _jsx("line", { x1: "12", y1: "9", x2: "12", y2: "13" }), _jsx("circle", { cx: "12", cy: "17", r: "1" })] }) })), variant === "default" && (_jsx("div", { className: cn("p-2 rounded-full bg-[var(--hive-brand-primary-bg)]", variantStyles.iconColor), children: _jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("path", { d: "m9 12 2 2 4-4" })] }) })), _jsxs("div", { children: [_jsx(HiveModalTitle, { className: "text-left", children: title }), description && (_jsx(HiveModalDescription, { className: "text-left", children: description }))] })] }) }), children && (_jsx("div", { className: "px-6 py-4", children: children })), _jsx(HiveModalFooter, { children: _jsxs("div", { className: "flex items-center justify-end space-x-3 w-full", children: [_jsx(Button, { variant: "outline", onClick: handleCancel, disabled: isProcessing, children: cancelText }), _jsx(Button, { variant: variantStyles.confirmButton, onClick: handleConfirm, disabled: disabled || isProcessing, children: isProcessing ? "Processing..." : confirmText })] }) })] }) }));
});
HiveConfirmModal.displayName = "HiveConfirmModal";
export { HiveConfirmModal };
//# sourceMappingURL=hive-confirm-modal.js.map