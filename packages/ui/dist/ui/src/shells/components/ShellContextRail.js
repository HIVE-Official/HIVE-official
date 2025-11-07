'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MotionDiv, MotionAside } from '../motion-safe.js';
import { TrendingUp, Activity, Sparkles } from 'lucide-react';
// HIVE Easing Curves
const HIVE_EASING = {
    silk: [0.16, 1, 0.3, 1],
};
const DEFAULT_METRICS = [
    { icon: TrendingUp, label: 'Active rituals', value: '12 live', tone: 'text-emerald-300' },
    { icon: Activity, label: 'Spaces with momentum', value: '28 trending', tone: 'text-sky-300' },
    { icon: Sparkles, label: 'Tool installs today', value: '+9 installs', tone: 'text-amber-300' },
];
export function ShellContextRail({ metrics = DEFAULT_METRICS }) {
    return (_jsx(MotionAside, { role: "complementary", "aria-label": "Context", className: "hidden xl:block w-72 border-l border-white/8 px-5 py-6 bg-[#0C0F13]/90", initial: { x: 240, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { duration: 0.4, ease: HIVE_EASING.silk }, children: _jsxs("div", { className: "space-y-5 text-white/75", children: [_jsxs("header", { className: "space-y-1", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-white/45", children: "Campus Signals" }), _jsx("p", { className: "text-sm font-medium text-white/80", children: "Live metrics refresh every few minutes." })] }), _jsx("div", { className: "space-y-3", children: metrics.map((item, index) => {
                        const Icon = item.icon;
                        return (_jsxs(MotionDiv, { className: "flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5", initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.05, duration: 0.25, ease: HIVE_EASING.silk }, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-md bg-white/8 text-white/80", children: _jsx(Icon, { className: "h-4 w-4" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-white/45", children: item.label }), _jsx("p", { className: "text-sm font-semibold text-white/80", children: item.value })] })] }), _jsx("div", { className: `h-2 w-2 rounded-full ${item.tone}` })] }, item.label));
                    }) }), _jsxs("footer", { className: "rounded-lg border border-white/10 bg-white/[0.04] px-3 py-3 text-xs text-white/60", children: [_jsx("p", { className: "font-medium text-white/75", children: "Need something surfaced?" }), _jsx("p", { className: "mt-1", children: "Route requests to student leaders or tap the command palette." })] })] }) }));
}
//# sourceMappingURL=ShellContextRail.js.map