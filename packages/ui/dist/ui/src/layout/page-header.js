import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../lib/utils";
import { HStack, Stack } from "./stack";
const stackAlignmentClass = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
};
const textAlignmentClass = {
    start: "text-left",
    center: "text-center",
    end: "text-right",
};
const densityGap = {
    comfortable: "gap-3",
    compact: "gap-2",
};
export const PageHeader = React.forwardRef(({ eyebrow, title, description, meta, actions, className, align = "start", density = "comfortable", children, helper, ...props }, ref) => {
    return (_jsxs(Stack, { ref: ref, className: cn("w-full gap-6 border-b border-[var(--hive-border-subtle)] pb-6", className), align: "stretch", ...props, children: [_jsxs("div", { className: cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between", stackAlignmentClass[align], textAlignmentClass[align]), children: [_jsxs(Stack, { className: cn("gap-3", densityGap[density], textAlignmentClass[align]), align: align, children: [eyebrow && (_jsx("span", { className: "text-xs font-medium uppercase tracking-[0.16em] text-[var(--hive-text-muted)]", children: eyebrow })), title && (_jsx("h1", { className: "text-3xl font-semibold tracking-tight text-[var(--hive-text-primary)] md:text-4xl", children: title })), description && (_jsx("p", { className: "max-w-3xl text-base text-[var(--hive-text-secondary)] md:text-lg", children: description })), helper] }), actions ? _jsx("div", { className: "flex items-center gap-3", children: actions }) : null] }), children, meta && (_jsx(HStack, { gap: "sm", className: cn("flex-wrap text-sm text-[var(--hive-text-muted)]", textAlignmentClass[align]), align: align, children: meta }))] }));
});
PageHeader.displayName = "PageHeader";
export const SectionHeader = React.forwardRef(({ overline, title, description, actions, align = "start", density = "comfortable", className, ...props }, ref) => {
    return (_jsxs("div", { ref: ref, className: cn("flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className), ...props, children: [_jsxs(Stack, { className: cn("max-w-3xl", densityGap[density], textAlignmentClass[align]), align: align, children: [overline && (_jsx("span", { className: "text-xs font-medium uppercase tracking-[0.12em] text-[var(--hive-text-muted)]", children: overline })), title && (_jsx("h2", { className: "text-2xl font-semibold tracking-tight text-[var(--hive-text-primary)]", children: title })), description && (_jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] md:text-base", children: description }))] }), actions ? _jsx("div", { className: "flex items-center gap-3", children: actions }) : null] }));
});
SectionHeader.displayName = "SectionHeader";
//# sourceMappingURL=page-header.js.map