export interface HiveConfirmModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    variant?: 'default' | 'danger';
    isLoading?: boolean;
}
export declare function HiveConfirmModal({ open, onOpenChange, title, description, confirmText, cancelText, onConfirm, variant, isLoading }: HiveConfirmModalProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=hive-confirm-modal.d.ts.map