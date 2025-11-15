'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '../../00-Global/atoms/card';
export const RitualFoundingClass = ({ title = 'Founding Class', members, ...props }) => {
    return (_jsxs(Card, { className: "border-white/10 bg-white/5 p-5", ...props, children: [_jsx("h3", { className: "mb-3 text-lg font-semibold text-white", children: title }), _jsx("div", { className: "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4", children: members.map((m) => (_jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 p-3", children: [_jsx("div", { className: "h-8 w-8 shrink-0 rounded-full bg-white/10", "aria-hidden": true }), _jsx("div", { className: "truncate text-sm text-white/80", children: m.name })] }, m.id))) })] }));
};
//# sourceMappingURL=ritual-founding-class.js.map