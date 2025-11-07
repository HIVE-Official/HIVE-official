'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '../atoms/card.js';
import { Button } from '../atoms/button.js';
export const RitualLeak = ({ title = 'Mystery Leak', clues, onReveal, ...props }) => {
    return (_jsxs(Card, { className: "border-white/10 bg-white/5 p-5", ...props, children: [_jsx("h3", { className: "mb-3 text-lg font-semibold text-white", children: title }), _jsx("div", { className: "space-y-3", children: clues.map((c) => (_jsxs("div", { className: "flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-3", children: [_jsx("div", { className: "text-sm text-white/80", children: c.hint }), _jsx(Button, { size: "sm", variant: "secondary", onClick: () => onReveal?.(c.id), disabled: c.revealed, children: c.revealed ? 'Revealed' : 'Reveal' })] }, c.id))) })] }));
};
//# sourceMappingURL=ritual-leak.js.map