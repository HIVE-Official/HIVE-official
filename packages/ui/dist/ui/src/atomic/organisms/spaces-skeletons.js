"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from "../atoms/skeleton.js";
export function SpaceBoardSkeleton() {
    return (_jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(ComposerSkeleton, {}), [0, 1, 2, 3].map((i) => (_jsxs("div", { className: "rounded-xl border border-[var(--hive-border-subtle)] p-4", children: [_jsx(Skeleton, { className: "h-6 w-1/2" }), _jsxs("div", { className: "mt-3 space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-5/6" }), _jsx(Skeleton, { className: "h-4 w-2/3" })] })] }, i)))] }), _jsx("div", { className: "space-y-4", children: [0, 1].map((i) => (_jsx(RailWidgetSkeleton, {}, i))) })] }));
}
export function ComposerSkeleton() {
    return (_jsxs("div", { className: "rounded-2xl border border-[var(--hive-border-subtle)] p-4", children: [_jsx(Skeleton, { className: "h-5 w-28" }), _jsxs("div", { className: "mt-3 space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-5/6" })] }), _jsxs("div", { className: "mt-4 flex items-center gap-2", children: [_jsx(Skeleton, { className: "h-9 w-9 rounded-xl" }), _jsx(Skeleton, { className: "h-9 w-9 rounded-xl" }), _jsx(Skeleton, { className: "ml-auto h-9 w-24 rounded-xl" })] })] }));
}
export function RailWidgetSkeleton() {
    return (_jsxs("div", { className: "rounded-xl border border-[var(--hive-border-subtle)] p-4", children: [_jsx(Skeleton, { className: "h-5 w-1/3" }), _jsxs("div", { className: "mt-3 space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-2/3" }), _jsx(Skeleton, { className: "h-9 w-full rounded-xl" })] })] }));
}
//# sourceMappingURL=spaces-skeletons.js.map