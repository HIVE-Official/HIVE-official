import * as React from "react";
export interface ClickAwayListenerProps {
    /**
     * Single child element to monitor for outside clicks.
     */
    children: React.ReactElement;
    /**
     * Handler fired when a pointer event occurs outside the child element.
     */
    onClickAway: (event: MouseEvent | TouchEvent | PointerEvent) => void;
    /**
     * Disable the listener. Useful when the overlay is closed.
     */
    active?: boolean;
}
/**
 * ClickAwayListener detects pointer interactions that happen outside the provided child.
 * Useful for menus, popovers, or any surface that should dismiss on outside click.
 */
export declare function ClickAwayListener({ children, onClickAway, active }: ClickAwayListenerProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
//# sourceMappingURL=ClickAwayListener.d.ts.map