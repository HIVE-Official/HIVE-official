import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils.js";
function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
}
function usePaginationRange(page, pageCount, siblingCount = 1) {
    const totalNumbers = siblingCount * 2 + 3; // current + siblings + first/last
    const totalBlocks = totalNumbers + 2; // with ellipses
    if (pageCount <= totalBlocks) {
        return Array.from({ length: pageCount }, (_, i) => i + 1);
    }
    const leftSibling = Math.max(page - siblingCount, 1);
    const rightSibling = Math.min(page + siblingCount, pageCount);
    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < pageCount - 1;
    const range = [];
    range.push(1);
    if (showLeftEllipsis)
        range.push("…");
    for (let i = leftSibling; i <= rightSibling; i++)
        range.push(i);
    if (showRightEllipsis)
        range.push("…");
    range.push(pageCount);
    return range;
}
export function Pagination({ page, pageCount, onPageChange, siblingCount = 1, showFirstLast = true, showInput = true, className, ...props }) {
    const range = usePaginationRange(page, pageCount, siblingCount);
    const shouldReduce = useReducedMotion();
    const goTo = (p) => onPageChange(clamp(p, 1, pageCount));
    return (_jsxs("div", { className: cn("flex flex-wrap items-center gap-2", className), ...props, children: [_jsx(NavButton, { label: "Prev", disabled: page <= 1, onClick: () => goTo(page - 1) }), showFirstLast && (_jsx(NavButton, { label: "First", disabled: page === 1, onClick: () => goTo(1) })), _jsx(motion.div, { className: "flex items-center gap-1", layout: true, children: _jsx(AnimatePresence, { initial: false, children: range.map((item, i) => item === "…" ? (_jsx(motion.span, { "aria-hidden": true, className: "px-2 text-[color-mix(in_srgb,var(--hive-text-tertiary,#8E90A2) 80%,transparent)]", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: shouldReduce ? 0 : 0.12 }, children: "\u2026" }, `ellipsis-${i}-${page}`)) : (_jsx(PageButton, { active: item === page, onClick: () => goTo(item), children: item }, item))) }) }), showFirstLast && (_jsx(NavButton, { label: "Last", disabled: page === pageCount, onClick: () => goTo(pageCount) })), _jsx(NavButton, { label: "Next", disabled: page >= pageCount, onClick: () => goTo(page + 1) }), showInput && (_jsxs("form", { onSubmit: (e) => {
                    e.preventDefault();
                    const form = e.target;
                    const input = form.elements.namedItem("page");
                    const value = parseInt(input.value, 10);
                    if (!Number.isNaN(value))
                        goTo(value);
                }, className: "ml-2 flex items-center gap-2 text-sm", "aria-label": "Jump to page", children: [_jsx("label", { className: "text-[var(--hive-text-secondary)]", htmlFor: "pagination-input", children: "Go to" }), _jsx("input", { id: "pagination-input", name: "page", type: "number", min: 1, max: pageCount, defaultValue: page, className: "w-16 rounded-md border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] px-2 py-1 text-[var(--hive-text-primary)] outline-none focus:ring-2 focus:ring-[var(--hive-interactive-focus)]" }), _jsxs("span", { className: "text-[var(--hive-text-tertiary)]", children: ["of ", pageCount] })] }))] }));
}
function NavButton({ label, disabled, onClick }) {
    return (_jsx(motion.button, { type: "button", disabled: disabled, onClick: onClick, whileTap: { scale: disabled ? 1 : 0.98 }, className: cn("rounded-md border px-3 py-1.5 text-sm font-medium transition-colors", "border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)]", "hover:bg-[var(--hive-background-tertiary)] hover:text-[var(--hive-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)]", disabled && "opacity-40 pointer-events-none"), children: label }));
}
function PageButton({ active, onClick, children }) {
    return (_jsx(motion.button, { type: "button", "aria-current": active ? "page" : undefined, onClick: onClick, layout: true, whileTap: { scale: 0.98 }, className: cn("min-w-[36px] rounded-md px-2.5 py-1.5 text-sm font-semibold", active
            ? "bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)]"
            : "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-default)]"), children: children }));
}
//# sourceMappingURL=pagination.js.map