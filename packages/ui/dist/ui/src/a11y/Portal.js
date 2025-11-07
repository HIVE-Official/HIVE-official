import * as React from "react";
import { createPortal } from "react-dom";
const canUseDom = typeof window !== "undefined" && typeof document !== "undefined";
/**
 * Portal renders children into a detached DOM node (defaults to #hive-portal-root) to support overlays.
 */
export function Portal({ children, container, containerId = "hive-portal-root" }) {
    const [mountNode, setMountNode] = React.useState(null);
    const wasCreatedRef = React.useRef(false);
    React.useEffect(() => {
        if (!canUseDom)
            return;
        if (container) {
            setMountNode(container);
            wasCreatedRef.current = false;
            return;
        }
        let element = containerId ? document.getElementById(containerId) : null;
        if (!element && containerId) {
            element = document.createElement("div");
            element.id = containerId;
            document.body.appendChild(element);
            wasCreatedRef.current = true;
        }
        if (element) {
            setMountNode(element);
        }
        return () => {
            if (element && wasCreatedRef.current && element.parentNode) {
                element.parentNode.removeChild(element);
            }
        };
    }, [container, containerId]);
    if (!canUseDom)
        return null;
    if (!mountNode)
        return null;
    return createPortal(children, mountNode);
}
//# sourceMappingURL=Portal.js.map