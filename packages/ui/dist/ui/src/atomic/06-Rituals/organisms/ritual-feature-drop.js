'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '../../00-Global/atoms/card';
import { Button } from '../../00-Global/atoms/button';
import { PercentBar } from '../atoms/percent-bar';
export const RitualFeatureDrop = ({ title, description, countdownLabel, onUnlock, stats, ...props }) => {
    const percent = Math.max(0, Math.min(100, Math.round(stats?.completionRate ?? 0)));
    return (_jsxs(Card, { className: "border-white/10 bg-white/5 p-5", ...props, children: [_jsx("div", { className: "mb-2 text-xs uppercase tracking-[0.18em] text-white/50", children: "Feature Drop" }), _jsx("h3", { className: "text-lg font-semibold text-white", children: title }), description && _jsx("p", { className: "mt-1 text-sm text-white/70", children: description }), countdownLabel && (_jsx("p", { className: "mt-2 text-xs text-white/60", children: countdownLabel })), _jsxs("div", { className: "mt-4", children: [_jsx(PercentBar, { value: percent }), _jsxs("div", { className: "mt-1 text-xs text-white/60", children: [percent, "% unlocked"] })] }), _jsx("div", { className: "mt-4", children: _jsx(Button, { onClick: onUnlock, children: "Unlock" }) })] }));
};
//# sourceMappingURL=ritual-feature-drop.js.map