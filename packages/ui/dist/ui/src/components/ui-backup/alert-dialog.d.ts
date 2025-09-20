import React from "react";
interface AlertDialogProps {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}
interface AlertDialogTriggerProps {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}
interface AlertDialogHeaderProps {
    children: React.ReactNode;
    className?: string;
}
interface AlertDialogTitleProps {
    children: React.ReactNode;
    className?: string;
}
interface AlertDialogDescriptionProps {
    children: React.ReactNode;
    className?: string;
}
interface AlertDialogFooterProps {
    children: React.ReactNode;
    className?: string;
}
interface AlertDialogActionProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}
interface AlertDialogCancelProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}
export declare const AlertDialog: React.FC<AlertDialogProps>;
export declare const AlertDialogTrigger: React.FC<AlertDialogTriggerProps>;
export declare const AlertDialogContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export declare const AlertDialogHeader: React.FC<AlertDialogHeaderProps>;
export declare const AlertDialogTitle: React.FC<AlertDialogTitleProps>;
export declare const AlertDialogDescription: React.FC<AlertDialogDescriptionProps>;
export declare const AlertDialogFooter: React.FC<AlertDialogFooterProps>;
export declare const AlertDialogAction: React.FC<AlertDialogActionProps>;
export declare const AlertDialogCancel: React.FC<AlertDialogCancelProps>;
export {};
//# sourceMappingURL=alert-dialog.d.ts.map