'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../lib/utils.js';
import { Button } from '../atoms/button.js';
import { Card } from '../atoms/card.js';
import { Badge } from '../atoms/badge.js';
import { PercentBar } from '../atoms/percent-bar.js';
import { Clock, Calendar, Users, TrendingUp, ArrowLeft } from 'lucide-react';
import { RitualTournamentBracket } from '../organisms/ritual-tournament-bracket.js';
import { RitualFeatureDrop } from '../organisms/ritual-feature-drop.js';
import { RitualFoundingClass } from '../organisms/ritual-founding-class.js';
import { RitualRuleInversion } from '../organisms/ritual-rule-inversion.js';
import { RitualLeak } from '../organisms/ritual-leak.js';
import { RitualLaunchCountdown } from '../organisms/ritual-launch-countdown.js';
const statusBadgeTone = {
    draft: 'bg-white/10 text-white/70 border-white/20',
    upcoming: 'bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/20',
    active: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',
    cooldown: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
    ended: 'bg-white/5 text-white/50 border-white/10',
};
const statusLabel = {
    draft: 'Draft',
    upcoming: 'Upcoming',
    active: 'Live Now',
    cooldown: 'Cooldown',
    ended: 'Ended',
};
export const RitualDetailLayout = React.forwardRef(({ ritual, onPrimaryAction, onBack, onTournamentVote, onFeatureUnlock, onLeakReveal, className, ...props }, ref) => {
    const participants = ritual.metrics.participants ?? 0;
    const completionRate = ritual.metrics.completionRate ?? 0;
    const submissions = ritual.metrics.submissions ?? 0;
    const handlePrimary = React.useCallback(() => {
        if (onPrimaryAction) {
            onPrimaryAction(ritual.cta.href);
        }
    }, [onPrimaryAction, ritual.cta.href]);
    return (_jsxs("div", { ref: ref, className: cn('mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 md:px-8', className), ...props, children: [_jsxs("div", { className: "flex items-center justify-between gap-3", children: [onBack ? (_jsxs(Button, { variant: "ghost", size: "sm", onClick: onBack, className: "gap-2 text-white/70", children: [_jsx(ArrowLeft, { className: "h-4 w-4" }), "Back to rituals"] })) : (_jsx("span", {})), _jsx(Badge, { className: cn('uppercase tracking-[0.28em]', statusBadgeTone[ritual.status]), children: statusLabel[ritual.status] })] }), _jsx(Card, { className: "overflow-hidden border-white/10 bg-gradient-to-br from-[var(--hive-background-secondary)] via-[var(--hive-background-primary)] to-black p-6 md:p-8", children: _jsxs("div", { className: "flex flex-col gap-6 md:flex-row md:items-center md:justify-between", children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60", children: [_jsx("span", { children: "Ritual" }), _jsx("span", { children: ritual.archetype.replace('_', ' ') })] }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-semibold text-white md:text-4xl", children: ritual.title }), ritual.subtitle ? (_jsx("p", { className: "mt-2 max-w-2xl text-base text-white/70", children: ritual.subtitle })) : null] }), ritual.description ? (_jsx("p", { className: "max-w-2xl text-sm leading-relaxed text-white/65", children: ritual.description })) : null, _jsxs("div", { className: "flex flex-wrap items-center gap-4 text-xs text-white/60", children: [_jsxs("span", { className: "inline-flex items-center gap-2", children: [_jsx(Calendar, { className: "h-4 w-4" }), new Date(ritual.schedule.startsAt).toLocaleString()] }), _jsxs("span", { className: "inline-flex items-center gap-2", children: [_jsx(Clock, { className: "h-4 w-4" }), ritual.schedule.countdownLabel] }), _jsxs("span", { className: "inline-flex items-center gap-2", children: [_jsx(TrendingUp, { className: "h-4 w-4" }), "Duration ", ritual.schedule.durationMinutes, "m"] })] })] }), _jsx(Button, { size: "lg", onClick: onPrimaryAction ? handlePrimary : undefined, className: cn(ritual.cta.variant === 'primary'
                                ? 'bg-[var(--hive-brand-primary)] text-black hover:bg-[var(--hive-brand-primary)]/90'
                                : 'bg-white/10 text-white hover:bg-white/20'), asChild: !onPrimaryAction, children: onPrimaryAction ? (_jsx("span", { children: ritual.cta.label })) : (_jsx("a", { href: ritual.cta.href, children: ritual.cta.label })) })] }) }), _jsxs(Card, { className: "border-white/10 bg-white/5 p-5", children: [_jsx("h2", { className: "mb-3 text-lg font-semibold text-white", children: "Experience" }), (() => {
                        switch (ritual.archetype) {
                            case 'TOURNAMENT': {
                                const rounds = ritual.config?.tournament?.rounds || [];
                                const currentRoundId = ritual.config?.tournament?.currentRound;
                                const currentRound = rounds.find((r) => r.id === currentRoundId) || rounds[0];
                                const matchups = (currentRound?.matchups || []).map((m) => ({
                                    id: m.id || m.matchupId || String(Math.random()).slice(2),
                                    round: 1,
                                    a: m.competitor1?.name || m.a || 'A',
                                    b: m.competitor2?.name || m.b || 'B',
                                    votesA: m.competitor1?.votes,
                                    votesB: m.competitor2?.votes,
                                }));
                                return (_jsx(RitualTournamentBracket, { matchups: matchups, currentRound: 1, onVote: onTournamentVote }));
                            }
                            case 'FEATURE_DROP':
                                return (_jsx(RitualFeatureDrop, { title: ritual.config?.featureDrop?.feature?.name || ritual.title, description: ritual.config?.featureDrop?.feature?.description || ritual.subtitle, countdownLabel: ritual.schedule.countdownLabel, stats: { completionRate: ritual.metrics.completionRate }, onUnlock: onFeatureUnlock }));
                            case 'FOUNDING_CLASS':
                                return (_jsx(RitualFoundingClass, { members: ritual.metrics?.topParticipants || [] }));
                            case 'RULE_INVERSION':
                                return (_jsx(RitualRuleInversion, { ruleDescription: ritual.config?.ruleInversion?.temporaryInversions?.[0]?.description || 'Temporary campus rule inverted', notes: ritual.config?.ruleInversion?.temporaryInversions?.[0]?.inversionWindow?.message }));
                            case 'LEAK':
                                return (_jsx(RitualLeak, { title: ritual.config?.leak?.hiddenRitual?.name || 'Mystery Leak', clues: (ritual.config?.leak?.clues || []).map((c, i) => ({ id: String(i + 1), hint: c.clue })), onReveal: onLeakReveal }));
                            case 'LAUNCH_COUNTDOWN':
                                return (_jsx(RitualLaunchCountdown, { targetTime: ritual.config?.countdown?.launchDate || ritual.schedule.endsAt }));
                            default:
                                return _jsx("p", { className: "text-sm text-white/70", children: "This ritual does not have a specialized experience yet." });
                        }
                    })()] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [_jsxs(Card, { className: "border-white/10 bg-white/5 p-5", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between text-sm text-white/50", children: [_jsx("span", { children: "Participants" }), _jsx(Users, { className: "h-4 w-4" })] }), _jsx("div", { className: "text-3xl font-semibold text-white", children: participants.toLocaleString() }), _jsxs("p", { className: "mt-2 text-xs text-white/50", children: ["Joined since ", new Date(ritual.schedule.startsAt).toLocaleDateString()] })] }), _jsxs(Card, { className: "border-white/10 bg-white/5 p-5", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between text-sm text-white/50", children: [_jsx("span", { children: "Submissions" }), _jsx(TrendingUp, { className: "h-4 w-4" })] }), _jsx("div", { className: "text-3xl font-semibold text-white", children: submissions.toLocaleString() }), _jsx("p", { className: "mt-2 text-xs text-white/50", children: "Includes tool drops, posts, and votes." })] }), _jsxs(Card, { className: "border-white/10 bg-white/5 p-5", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between text-sm text-white/50", children: [_jsx("span", { children: "Completion" }), _jsx(Clock, { className: "h-4 w-4" })] }), _jsx(PercentBar, { value: completionRate, className: "h-2" }), _jsxs("p", { className: "mt-3 text-3xl font-semibold text-white", children: [Math.round(completionRate), "%"] }), _jsx("p", { className: "mt-2 text-xs text-white/50", children: "Students who reached the ritual finish line." })] })] }), _jsxs(Card, { className: "border-white/10 bg-white/5 p-6", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsx("h2", { className: "text-lg font-semibold text-white", children: "Leaderboard" }), _jsx("span", { className: "text-xs text-white/50", children: "Top participants (demo)" })] }), _jsx("div", { className: "grid gap-3 md:grid-cols-2", children: [1, 2, 3, 4].map((rank) => (_jsxs("div", { className: "flex items-center justify-between rounded-lg border border-white/10 bg-black/30 p-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs text-white/70", children: rank }), _jsxs("div", { children: [_jsxs("div", { className: "text-sm text-white/90", children: ["Student ", rank] }), _jsxs("div", { className: "text-xs text-white/50", children: ["Completed actions: ", 5 - (rank - 1)] })] })] }), _jsxs("div", { className: "text-sm text-white/80", children: [Math.max(0, Math.round(completionRate) - rank * 5), "%"] })] }, rank))) })] }), _jsxs(Card, { className: "border-white/10 bg-white/5 p-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-white", children: "Archetype Configuration" }), _jsx("p", { className: "text-sm text-white/60", children: "Snapshot of the ritual blueprint powering this experience." })] }), _jsxs(Badge, { variant: "outline", className: "border-white/20 text-xs text-white/70", children: ["Campus: ", ritual.campusId] })] }), _jsx("pre", { className: "mt-4 max-h-80 overflow-auto rounded-xl bg-black/50 p-4 text-xs text-white/70", children: JSON.stringify(ritual.config, null, 2) })] })] }));
});
RitualDetailLayout.displayName = 'RitualDetailLayout';
//# sourceMappingURL=ritual-detail-layout.js.map