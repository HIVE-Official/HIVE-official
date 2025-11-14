'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, } from "../atoms/dialog.js";
import { Button } from "../atoms/button.js";
import { cn } from "../../../lib/utils.js";
export const HiveConfirmModal = ({ open, onOpenChange, title, description, confirmText = "Confirm", cancelText = "Cancel", onConfirm, isLoading = false, variant = "default", className, }) => {
    const [submitting, setSubmitting] = React.useState(false);
    const handleConfirm = async () => {
        if (!onConfirm) {
            onOpenChange(false);
            return;
        }
        try {
            setSubmitting(true);
            await onConfirm();
            onOpenChange(false);
        }
        finally {
            setSubmitting(false);
        }
    };
    const isDanger = variant === "danger";
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: cn("max-w-md", className), children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: title }), description && (_jsx(DialogDescription, { children: description }))] }), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), disabled: submitting || isLoading, children: cancelText }), _jsx(Button, { type: "button", onClick: handleConfirm, disabled: submitting || isLoading, className: cn(isDanger &&
                                "bg-[var(--hive-status-error)] text-black hover:bg-[var(--hive-status-error)]/90"), children: submitting || isLoading ? "Working..." : confirmText })] })] }) }));
};
//# sourceMappingURL=hive-confirm-modal.js.map