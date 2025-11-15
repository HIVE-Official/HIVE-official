import * as React from "react";
export interface FocusTrapProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * When false the focus trap is inert and does nothing.
     */
    active?: boolean;
    /**
     * CSS selector or element that should receive initial focus when the trap activates.
     */
    initialFocus?: string | HTMLElement;
    /**
     * When true, focus returns to the previously focused element when the trap unmounts.
     */
    returnFocus?: boolean;
    /**
     * Callback fired when Escape is pressed while the trap is active.
     */
    onEscape?: () => void;
    /**
     * Prevent escape from deactivating the trap. Defaults to true.
     */
    escapeDeactivates?: boolean;
}
/**
 * FocusTrap keeps focus within a region (dialog, sheet, dropdown) and restores the previously
 * focused element on cleanup. It is intentionally dependency-free to work on the edge.
 */
export declare const FocusTrap: React.ForwardRefExoticComponent<FocusTrapProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FocusTrap.d.ts.map