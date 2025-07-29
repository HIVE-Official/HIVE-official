import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveModalVariants: (props?: {
    size?: "sm" | "lg" | "xl" | "full" | "default";
    variant?: "default" | "premium" | "success" | "destructive";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface HiveModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragEnd' | 'onDragStart'>, VariantProps<typeof hiveModalVariants> {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    showCloseButton?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    children: React.ReactNode;
}
declare const HiveModal: React.ForwardRefExoticComponent<HiveModalProps & React.RefAttributes<HTMLDivElement>>;
interface HiveConfirmModalProps extends Omit<HiveModalProps, 'children'> {
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmVariant?: 'default' | 'destructive' | 'premium';
    loading?: boolean;
}
declare const HiveConfirmModal: React.ForwardRefExoticComponent<HiveConfirmModalProps & React.RefAttributes<HTMLDivElement>>;
interface HiveAlertModalProps extends Omit<HiveModalProps, 'children'> {
    message: string;
    actionText?: string;
}
declare const HiveAlertModal: React.ForwardRefExoticComponent<HiveAlertModalProps & React.RefAttributes<HTMLDivElement>>;
export { HiveModal, HiveConfirmModal, HiveAlertModal, hiveModalVariants };
//# sourceMappingURL=hive-modal.d.ts.map