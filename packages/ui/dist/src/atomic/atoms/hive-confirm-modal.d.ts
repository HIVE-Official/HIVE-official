import * as React from "react";
export interface HiveConfirmModalProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onClose?: () => void;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive" | "warning";
    onConfirm?: () => void | Promise<void>;
    onCancel?: () => void;
    loading?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    className?: string;
}
declare const HiveConfirmModal: React.ForwardRefExoticComponent<HiveConfirmModalProps & React.RefAttributes<HTMLDivElement>>;
export { HiveConfirmModal };
//# sourceMappingURL=hive-confirm-modal.d.ts.map