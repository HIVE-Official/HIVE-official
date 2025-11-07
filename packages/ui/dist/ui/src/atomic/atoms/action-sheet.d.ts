import React from 'react';
import { SheetHeader, SheetDescription, SheetTitle } from './sheet';
declare const ActionSheetRoot: React.FC<import("@radix-ui/react-dialog").DialogProps>;
declare const ActionSheetTrigger: React.ForwardRefExoticComponent<import("@radix-ui/react-dialog").DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const ActionSheetClose: React.ForwardRefExoticComponent<import("@radix-ui/react-dialog").DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
declare const ActionSheetContent: React.ForwardRefExoticComponent<Omit<import("./sheet").SheetContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    showHandle?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const ActionSheetHeader: {
    ({ className, ...props }: React.ComponentPropsWithoutRef<typeof SheetHeader>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const ActionSheetTitle: {
    ({ className, ...props }: React.ComponentPropsWithoutRef<typeof SheetTitle>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const ActionSheetDescription: {
    ({ className, ...props }: React.ComponentPropsWithoutRef<typeof SheetDescription>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
type ActionSheetItemTone = 'default' | 'danger';
export interface ActionSheetItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    tone?: ActionSheetItemTone;
    hint?: string;
    leadingIcon?: React.ReactNode;
}
declare const ActionSheetItem: React.ForwardRefExoticComponent<ActionSheetItemProps & React.RefAttributes<HTMLButtonElement>>;
declare const ActionSheetSeparator: {
    ({ className }: {
        className?: string;
    }): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const ActionSheetCancel: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
export { ActionSheetRoot as ActionSheet, ActionSheetTrigger, ActionSheetClose, ActionSheetContent, ActionSheetHeader, ActionSheetTitle, ActionSheetDescription, ActionSheetItem, ActionSheetSeparator, ActionSheetCancel };
//# sourceMappingURL=action-sheet.d.ts.map