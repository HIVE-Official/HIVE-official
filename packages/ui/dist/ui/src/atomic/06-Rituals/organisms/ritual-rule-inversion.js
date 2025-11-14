'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '../../00-Global/atoms/card.js';
export const RitualRuleInversion = ({ ruleDescription, notes, ...props }) => {
    return (_jsxs(Card, { className: "border-amber-400/30 bg-amber-400/10 p-5", ...props, children: [_jsx("div", { className: "text-xs uppercase tracking-widest text-amber-300", children: "Rule Inversion" }), _jsx("h3", { className: "mt-1 text-lg font-semibold text-amber-100", children: ruleDescription }), notes && _jsx("p", { className: "mt-2 text-sm text-amber-200/80", children: notes })] }));
};
//# sourceMappingURL=ritual-rule-inversion.js.map