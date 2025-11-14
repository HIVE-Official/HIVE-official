import * as React from "react";
type HiveConfirmVariant = "default" | "danger";
export interface HiveConfirmModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void | Promise<void>;
    isLoading?: boolean;
    variant?: HiveConfirmVariant;
    className?: string;
}
export declare const HiveConfirmModal: React.FC<HiveConfirmModalProps>;
export {};
//# sourceMappingURL=hive-confirm-modal.d.ts.map