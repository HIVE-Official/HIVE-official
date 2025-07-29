import React from 'react';
export interface QuickAction {
    id: string;
    title: string;
    description?: string;
    icon: React.ReactNode;
    action: () => void;
    category: 'create' | 'navigate' | 'social' | 'system';
    shortcut?: string;
    disabled?: boolean;
}
interface QuickActionsMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onAction?: (action: QuickAction) => void;
    position?: {
        x: number;
        y: number;
    } | null;
    className?: string;
}
export declare function QuickActionsMenu({ isOpen, onClose, onAction, position, className }: QuickActionsMenuProps): import("react/jsx-runtime").JSX.Element;
export declare function useQuickActionsMenu(): {
    isOpen: boolean;
    position: {
        x: number;
        y: number;
    };
    open: (pos?: {
        x: number;
        y: number;
    }) => void;
    close: () => void;
    toggle: (pos?: {
        x: number;
        y: number;
    }) => void;
};
export {};
//# sourceMappingURL=quick-actions-menu.d.ts.map