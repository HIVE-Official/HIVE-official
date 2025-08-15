import React from 'react';
export interface ExpandFocusProps {
    children: React.ReactNode;
    focusContent: React.ReactNode;
    isExpanded: boolean;
    onExpand: () => void;
    onCollapse: () => void;
    className?: string;
    expandedClassName?: string;
    expandFrom?: 'center' | 'top' | 'bottom' | 'left' | 'right';
    animationDuration?: number;
    backdrop?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    preservePosition?: boolean;
}
export declare const ExpandFocus: React.FC<ExpandFocusProps>;
export declare const useExpandFocus: (initialExpanded?: boolean) => {
    isExpanded: boolean;
    expand: () => void;
    collapse: () => void;
    toggle: () => void;
};
export default ExpandFocus;
//# sourceMappingURL=expand-focus.d.ts.map