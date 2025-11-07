import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils.js";
/**
 * SkipToContent provides a focusable link that lets keyboard and assistive technology users jump directly
 * to the primary page content, bypassing navigation chrome.
 */
export const SkipToContent = React.forwardRef(({ targetId = "main-content", children = "Skip to main content", className, href, style, ...props }, ref) => {
    const derivedHref = href ?? `#${targetId}`;
    return (_jsx("a", { ref: ref, href: derivedHref, className: cn("hive-skip-link pointer-events-auto absolute left-6 top-6 z-[1000] -translate-y-24 rounded-full bg-[var(--hive-background-primary,rgba(12,12,12,0.92))] px-5 py-2 text-sm font-semibold text-[var(--hive-text-contrast,#ffffff)] shadow-lg outline-none transition-transform duration-200 focus-visible:translate-y-0 focus-visible:ring-2 focus-visible:ring-[var(--hive-focus-ring,#ffd166)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hive-background-page,#050505)]", className), style: { clipPath: "inset(-1px)", ...style }, ...props, children: children }));
});
SkipToContent.displayName = "SkipToContent";
//# sourceMappingURL=SkipToContent.js.map