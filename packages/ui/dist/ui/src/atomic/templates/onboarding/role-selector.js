'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GraduationCap, Users, Building2, Check, Sparkles } from 'lucide-react';
import { MotionDiv, MotionButton } from '../../../shells/motion-safe.js';
import { cn } from '../../../lib/utils.js';
import { enterTransition, popTransition, HIVE_EASING } from './motion-presets.js';
const ROLE_OPTIONS = [
    {
        value: 'student',
        title: 'UB Student',
        description: 'Dive into rituals, courses, and the clubs that keep campus alive.',
        icon: Users,
        badge: 'Beta cohort',
    },
    {
        value: 'faculty',
        title: 'Faculty & Staff',
        description: 'Support student builders, moderate quietly, spotlight wins.',
        icon: GraduationCap,
        badge: 'Mentor access',
    },
    {
        value: 'alumni',
        title: 'Alumni',
        description: 'Stay tapped into Buffalo moments and mentor current students.',
        icon: Building2,
        badge: 'Give back',
    },
];
export const RoleSelector = ({ selectedRole, onSelect }) => {
    return (_jsxs(MotionDiv, { initial: { opacity: 0, y: 24, scale: 0.98 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: enterTransition, className: "space-y-[var(--hive-spacing-6)]", children: [_jsx("div", { className: "grid gap-4 md:grid-cols-3", children: ROLE_OPTIONS.map((role, index) => {
                    const Icon = role.icon;
                    const isActive = selectedRole === role.value;
                    return (_jsxs(MotionButton, { type: "button", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.08 * index, ...enterTransition }, whileHover: { y: -6, scale: 1.015 }, whileTap: { scale: 0.985 }, onClick: () => onSelect(role.value), className: cn('relative text-left rounded-2xl border p-5 transition-all duration-300 w-full h-full overflow-hidden group', 'bg-gradient-to-br from-[rgba(255,255,255,0.04)] via-[rgba(17,17,19,0.65)] to-[rgba(9,9,10,0.92)] backdrop-blur-2xl', 'hover:border-[var(--hive-brand-primary)]/60 hover:bg-[var(--hive-background-secondary)]/70', isActive
                            ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-background-secondary)]/70 shadow-[0_18px_40px_rgba(255,215,0,0.12)]'
                            : 'border-[var(--hive-border-primary)]/60 bg-transparent'), "aria-pressed": isActive, children: [_jsx(MotionDiv, { "aria-hidden": true, className: "pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100", initial: { opacity: 0 }, animate: { opacity: isActive ? 0.35 : 0 }, transition: { duration: 0.45, ease: HIVE_EASING.silk }, style: { background: 'linear-gradient(135deg, rgba(255,215,0,0.28), rgba(76,95,255,0.18))' } }), _jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx(MotionDiv, { className: "w-11 h-11 rounded-full bg-[var(--hive-brand-primary)]/12 flex items-center justify-center", initial: { scale: 0.92 }, animate: { scale: isActive ? 1.05 : 1 }, transition: { duration: 0.25, ease: HIVE_EASING.magnetic }, children: _jsx(Icon, { className: "h-5 w-5 text-[var(--hive-brand-primary)]", "aria-hidden": true }) }), isActive ? (_jsxs(MotionDiv, { initial: { opacity: 0, scale: 0.6 }, animate: { opacity: 1, scale: 1 }, transition: popTransition, className: "inline-flex items-center gap-1 text-xs font-semibold text-[var(--hive-brand-primary)]", children: [_jsx(Check, { className: "h-4 w-4", "aria-hidden": true }), "Selected"] })) : (role.badge && (_jsx("span", { className: "text-[10px] uppercase tracking-[0.3em] text-[var(--hive-text-muted)]", children: role.badge })))] }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: role.title }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)] leading-relaxed", children: role.description })] })] }, role.value));
                }) }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-[var(--hive-text-muted)] justify-center", children: [_jsx(Sparkles, { className: "h-3 w-3", "aria-hidden": true }), "We keep UB communities campus-only. Your role powers tailored rituals and spaces."] })] }));
};
//# sourceMappingURL=role-selector.js.map