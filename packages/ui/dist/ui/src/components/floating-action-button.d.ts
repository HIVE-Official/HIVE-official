import React from 'react';
interface FloatingAction {
    id: string;
    title: string;
    icon: React.ReactNode;
    action: () => void;
    color?: string;
}
interface FloatingActionButtonProps {
    className?: string;
    actions?: FloatingAction[];
    mainIcon?: React.ReactNode;
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
}
export declare function FloatingActionButton({ className, actions, mainIcon, position, size, disabled }: FloatingActionButtonProps): import("react/jsx-runtime").JSX.Element;
export declare function ContextFloatingActionButton({ isVisible, position, onClose, actions }: {
    isVisible: boolean;
    position: {
        x: number;
        y: number;
    };
    onClose: () => void;
    actions?: FloatingAction[];
}): import("react/jsx-runtime").JSX.Element | null;
export type { FloatingAction };
//# sourceMappingURL=floating-action-button.d.ts.map