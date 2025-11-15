/**
 * Dialog Component - Compatibility layer for components expecting Dialog
 * Maps to our HiveModal components for consistency
 */
import React from 'react';
import { HiveModal, HiveModalHeader, HiveModalTitle, HiveModalDescription, HiveModalFooter } from './hive-modal';
export declare const Dialog: typeof HiveModal;
export declare const DialogContent: ({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) => import("react/jsx-runtime").JSX.Element;
export declare const DialogHeader: typeof HiveModalHeader;
export declare const DialogTitle: typeof HiveModalTitle;
export declare const DialogDescription: typeof HiveModalDescription;
export declare const DialogFooter: typeof HiveModalFooter;
export declare const DialogTrigger: ({ children, asChild: _asChild, ..._props }: {
    children: React.ReactNode;
    asChild?: boolean;
    [key: string]: any;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=dialog.d.ts.map