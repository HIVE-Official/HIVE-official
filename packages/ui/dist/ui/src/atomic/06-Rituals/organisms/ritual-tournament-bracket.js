'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Card } from '../../00-Global/atoms/card';
import { Button } from '../../00-Global/atoms/button';
import { cn } from '../../lib/utils';
export const RitualTournamentBracket = ({ title = 'Tournament', matchups, currentRound, onVote, className, ...props }) => {
    const rounds = React.useMemo(() => {
        const grouped = {};
        for (const m of matchups) {
            grouped[m.round] = grouped[m.round] ? [...grouped[m.round], m] : [m];
        }
        return Object.entries(grouped)
            .map(([r, ms]) => ({ round: Number(r), matchups: ms }))
            .sort((a, b) => a.round - b.round);
    }, [matchups]);
    return (_jsxs("div", { className: cn('space-y-4', className), ...props, children: [_jsx("h3", { className: "text-lg font-semibold text-white", children: title }), _jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: rounds.map(({ round, matchups }) => (_jsxs(Card, { className: cn('border-white/10 bg-white/5 p-4', currentRound === round && 'ring-1 ring-[var(--hive-brand-primary)]/40'), children: [_jsxs("div", { className: "mb-2 text-sm text-white/70", children: ["Round ", round] }), _jsx("div", { className: "space-y-3", children: matchups.map((m) => (_jsxs("div", { className: "flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-black/30 p-3", children: [_jsx("div", { className: "flex-1 text-white/90", children: m.a }), _jsx("span", { className: "px-2 text-xs text-white/50", children: "vs" }), _jsx("div", { className: "flex-1 text-right text-white/90", children: m.b }), onVote && (_jsxs("div", { className: "ml-3 flex gap-1", children: [_jsx(Button, { size: "sm", variant: "secondary", onClick: () => onVote(m.id, 'a'), children: "Vote A" }), _jsx(Button, { size: "sm", variant: "secondary", onClick: () => onVote(m.id, 'b'), children: "Vote B" })] }))] }, m.id))) })] }, round))) })] }));
};
//# sourceMappingURL=ritual-tournament-bracket.js.map