import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const hiveModalOverlayVariants: (props?: import("class-variance-authority/types").ClassProp) => string;
declare const hiveModalContentVariants: (props?: {
    size?: "default" | "sm" | "lg" | "xl" | "full";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HiveModalProps extends VariantProps<typeof hiveModalContentVariants> {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onClose?: () => void;
    children: React.ReactNode;
    className?: string;
}
declare function HiveModal({ open, onOpenChange, onClose, children, size, className }: HiveModalProps): import("react/jsx-runtime").JSX.Element;
interface HiveModalHeaderProps {
    children: React.ReactNode;
    className?: string;
}
declare function HiveModalHeader({ children, className }: HiveModalHeaderProps): import("react/jsx-runtime").JSX.Element;
interface HiveModalTitleProps {
    children: React.ReactNode;
    className?: string;
}
declare function HiveModalTitle({ children, className }: HiveModalTitleProps): import("react/jsx-runtime").JSX.Element;
interface HiveModalDescriptionProps {
    children: React.ReactNode;
    className?: string;
}
declare function HiveModalDescription({ children, className }: HiveModalDescriptionProps): import("react/jsx-runtime").JSX.Element;
interface HiveModalContentProps {
    children: React.ReactNode;
    className?: string;
}
declare function HiveModalContent({ children, className }: HiveModalContentProps): import("react/jsx-runtime").JSX.Element;
interface HiveModalFooterProps {
    children: React.ReactNode;
    className?: string;
}
declare function HiveModalFooter({ children, className }: HiveModalFooterProps): import("react/jsx-runtime").JSX.Element;
interface HiveModalCloseProps {
    children?: React.ReactNode;
    className?: string;
    asChild?: boolean;
}
declare function HiveModalClose({ children, className, asChild }: HiveModalCloseProps): import("react/jsx-runtime").JSX.Element;
export { HiveModal, HiveModalHeader, HiveModalTitle, HiveModalDescription, HiveModalContent, HiveModalFooter, HiveModalClose, hiveModalContentVariants, hiveModalOverlayVariants, };
//# sourceMappingURL=hive-modal.d.ts.map