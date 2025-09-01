import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const dialogVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface DialogProps extends VariantProps<typeof dialogVariants> {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}
export declare function DialogContent({ children, className, }: {
    children: React.ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function DialogHeader({ children, className, }: {
    children: React.ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function DialogTitle({ children, className, }: {
    children: React.ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function DialogDescription({ children, className, }: {
    children: React.ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function DialogTrigger({ children, onClick, className, }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare const Dialog: React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=dialog.d.ts.map