'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveModal, HiveModalHeader, HiveModalTitle, HiveModalDescription, HiveModalFooter } from './hive-modal';
import { HiveButton } from './hive-button';
export function HiveConfirmModal({ open, onOpenChange, title, description, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, variant = 'default', isLoading = false }) {
    const handleConfirm = () => {
        onConfirm();
        onOpenChange(false);
    };
    return (_jsxs(HiveModal, { open: open, onOpenChange: onOpenChange, size: "sm", children: [_jsxs(HiveModalHeader, { onClose: () => onOpenChange(false), children: [_jsx(HiveModalTitle, { children: title }), description && (_jsx(HiveModalDescription, { children: description }))] }), _jsx(HiveModalFooter, { children: _jsxs("div", { className: "flex justify-end space-x-3", children: [_jsx(HiveButton, { variant: "ghost", onClick: () => onOpenChange(false), disabled: isLoading, children: cancelText }), _jsx(HiveButton, { variant: variant === 'danger' ? 'destructive' : 'brand', onClick: handleConfirm, disabled: isLoading, children: isLoading ? 'Loading...' : confirmText })] }) })] }));
}
//# sourceMappingURL=hive-confirm-modal.js.map