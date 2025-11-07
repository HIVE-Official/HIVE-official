import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";
export function Breadcrumbs({ items, separator = "/", className, ...props }) {
    const shouldReduce = useReducedMotion();
    return (_jsx(motion.nav, { "aria-label": "Breadcrumb", className: cn("flex items-center gap-2 text-sm", className), initial: { opacity: 0, y: shouldReduce ? 0 : 4 }, animate: { opacity: 1, y: 0 }, transition: { duration: shouldReduce ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }, ...props, children: items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (_jsxs(React.Fragment, { children: [i > 0 && (_jsx("span", { "aria-hidden": true, className: "text-[color-mix(in_srgb,var(--hive-text-tertiary,#8E90A2) 70%,transparent)]", children: separator })), item.href && !isLast ? (_jsx("a", { href: item.href, className: "truncate text-[color-mix(in_srgb,var(--hive-text-secondary,#C0C2CC) 88%,transparent)] hover:text-[var(--hive-brand-primary,#FACC15)] transition-colors", children: item.label })) : (_jsx("span", { className: "truncate font-semibold text-[var(--hive-text-primary,#F9FAFB)]", "aria-current": isLast ? "page" : undefined, children: item.label }))] }, `${item.label}-${i}`));
        }) }));
}
//# sourceMappingURL=breadcrumbs.js.map