/**
 * HIVE Modal Component
 * Simple modal wrapper that integrates with the design system
 */
import React from 'react';
export interface HiveModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    closeOnOverlay?: boolean;
}
export declare function HiveModal({ open, onOpenChange, children, className, size, closeOnOverlay }: HiveModalProps): import("react/jsx-runtime").JSX.Element;
export declare function HiveModalHeader({ children, className, showCloseButton, onClose }: {
    children: React.ReactNode;
    className?: string;
    showCloseButton?: boolean;
    onClose?: () => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function HiveModalTitle({ children, className }: {
    children: React.ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function HiveModalDescription({ children, className }: {
    children: React.ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function HiveModalContent({ children, className }: {
    children: React.ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function HiveModalFooter({ children, className }: {
    children: React.ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=hive-modal.d.ts.map