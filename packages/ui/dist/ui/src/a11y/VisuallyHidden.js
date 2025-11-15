import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils";
const visuallyHiddenStyles = {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
};
/**
 * VisuallyHidden hides content from sighted users while keeping it available to assistive technology.
 * Useful for screen-reader-only labels, descriptions, or announcements.
 */
export const VisuallyHidden = React.forwardRef(({ className, style, ...props }, ref) => {
    return (_jsx("span", { ref: ref, className: cn("hive-visually-hidden", className), style: { ...visuallyHiddenStyles, ...style }, ...props }));
});
VisuallyHidden.displayName = "VisuallyHidden";
//# sourceMappingURL=VisuallyHidden.js.map