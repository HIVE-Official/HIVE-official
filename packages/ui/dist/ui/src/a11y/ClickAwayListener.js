import * as React from "react";
function assignRef(ref, value) {
    if (typeof ref === "function") {
        ref(value);
    }
    else if (ref) {
        ref.current = value;
    }
}
/**
 * ClickAwayListener detects pointer interactions that happen outside the provided child.
 * Useful for menus, popovers, or any surface that should dismiss on outside click.
 */
export function ClickAwayListener({ children, onClickAway, active = true }) {
    const nodeRef = React.useRef(null);
    React.useEffect(() => {
        if (!active)
            return;
        const handlePointerDown = (event) => {
            const node = nodeRef.current;
            if (!node)
                return;
            const target = event.target;
            if (target && !node.contains(target)) {
                onClickAway(event);
            }
        };
        document.addEventListener("pointerdown", handlePointerDown, true);
        document.addEventListener("touchstart", handlePointerDown, true);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown, true);
            document.removeEventListener("touchstart", handlePointerDown, true);
        };
    }, [active, onClickAway]);
    const child = React.Children.only(children);
    const { ref: childRef } = child;
    const setRef = React.useCallback((node) => {
        nodeRef.current = node;
        assignRef(childRef, node);
    }, [childRef]);
    return React.cloneElement(child, { ref: setRef });
}
//# sourceMappingURL=ClickAwayListener.js.map