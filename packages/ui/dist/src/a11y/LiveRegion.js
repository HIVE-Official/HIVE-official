import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { VisuallyHidden } from "./VisuallyHidden";
/**
 * LiveRegion announces dynamic updates to assistive technology using aria-live.
 * Useful for toasts, async status updates, and background operations.
 */
export const LiveRegion = React.forwardRef(({ message, politeness = "polite", visible = false, clearAfter = 4000, children, ...props }, ref) => {
    const [announcement, setAnnouncement] = React.useState(message ?? null);
    React.useEffect(() => {
        if (message === undefined)
            return;
        setAnnouncement(message ?? "");
        if (message && typeof clearAfter === "number" && clearAfter > 0) {
            const timeout = window.setTimeout(() => {
                setAnnouncement("");
            }, clearAfter);
            return () => window.clearTimeout(timeout);
        }
        return undefined;
    }, [message, clearAfter]);
    const role = politeness === "assertive" ? "alert" : "status";
    const Component = visible ? "div" : VisuallyHidden;
    return (_jsx(Component, { ref: ref, role: role, "aria-live": politeness, "aria-atomic": "true", ...props, children: children ?? announcement }));
});
LiveRegion.displayName = "LiveRegion";
//# sourceMappingURL=LiveRegion.js.map