'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from '../../components/framer-motion-proxy.js';
import { cn } from '../../lib/utils.js';
export const CampusIdentityHeader = ({ user, variant = 'default', showStatus = true, onAvatarClick, onEditClick, className }) => {
    const { name, handle, avatar, year, major, dorm, isOnline = false, isBuilder = false, completionPercentage = 0 } = user || {};
    const getInitials = (name) => {
        if (!name)
            return 'U';
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };
    const formatHandle = (handle) => {
        if (!handle)
            return '@user';
        return handle.startsWith('@') ? handle : `@${handle}`;
    };
    return (_jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: {
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1] // HIVE liquid metal easing
        }, className: cn(
        // BentoGrid-inspired card treatment
        'relative overflow-hidden rounded-2xl', 
        // HIVE luxury background with sophisticated glass morphism
        'bg-gradient-to-br from-charcoal/90 via-charcoal/80 to-graphite/90', 'backdrop-blur-xl border border-steel/10', 
        // Subtle inner glow for premium feel
        'shadow-[inset_0_1px_0_0_var(--hive-interactive-hover)]', 
        // Interactive hover states with magnetic feel
        'hover:border-steel/20 hover:shadow-[inset_0_1px_0_0_var(--hive-interactive-active)]', 'transition-all duration-300 ease-hive-smooth', 
        // Responsive padding with bento spacing
        'p-6 md:p-8 lg:p-10', 
        // Mobile-first layout
        'flex items-center gap-6', className), children: [_jsxs("div", { className: "absolute inset-0 opacity-5", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" }), _jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-gold/20 to-transparent rounded-full blur-xl" }), _jsx("div", { className: "absolute bottom-0 left-0 w-24 h-24 bg-gradient-radial from-platinum/10 to-transparent rounded-full blur-lg" })] }), _jsx(motion.div, { whileHover: {
                    scale: 1.05,
                    transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
                }, whileTap: { scale: 0.98 }, onClick: onAvatarClick, className: "relative cursor-pointer group flex-shrink-0", children: _jsxs("div", { className: "relative", children: [completionPercentage > 0 && (_jsxs("svg", { className: "absolute inset-0 w-20 h-20 md:w-24 md:h-24 -rotate-90 transform", viewBox: "0 0 96 96", children: [_jsx("circle", { cx: "48", cy: "48", r: "42", className: "fill-none stroke-steel/20", strokeWidth: "2" }), _jsx("circle", { cx: "48", cy: "48", r: "42", className: "fill-none stroke-gold transition-all duration-1000 drop-shadow-[0_0_6px_color-mix(in_srgb,var(--hive-brand-secondary)_50%,transparent)]", strokeWidth: "2", strokeDasharray: `${(completionPercentage / 100) * 264} 264`, strokeLinecap: "round" })] })), _jsxs("div", { className: "relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-charcoal via-graphite to-charcoal border-2 border-steel/20 group-hover:border-[var(--hive-brand-secondary)]/40 transition-all duration-300 shadow-lg", children: [avatar ? (_jsx("img", { src: avatar, alt: `${name || 'User'}'s avatar`, className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-charcoal via-graphite to-slate text-platinum font-bold text-xl md:text-2xl", children: getInitials(name) })), _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" })] }), showStatus && (_jsx("div", { className: cn('absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full border-3 border-charcoal shadow-lg', isOnline ? 'bg-emerald' : 'bg-steel'), children: isOnline && (_jsx(motion.div, { animate: {
                                    scale: [1, 1.2, 1],
                                    opacity: [1, 0.7, 1]
                                }, transition: {
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "easeInOut"
                                }, className: "w-full h-full bg-emerald rounded-full shadow-[0_0_8px_color-mix(in_srgb,var(--hive-status-success)_60%,transparent)]" })) }))] }) }), _jsxs("div", { className: "flex-1 min-w-0 relative", children: [_jsx("div", { className: "flex items-start justify-between mb-3", children: _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center gap-3 mb-1", children: [_jsx("h2", { className: "text-platinum font-bold text-xl md:text-2xl truncate tracking-tight", children: name || 'Unknown User' }), isBuilder && (_jsxs(motion.div, { initial: { scale: 0, rotate: -10 }, animate: { scale: 1, rotate: 0 }, transition: {
                                                delay: 0.4,
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 20
                                            }, className: "relative", children: [_jsx("div", { className: "px-3 py-1 bg-gradient-to-r from-gold/20 to-champagne/20 border border-[var(--hive-brand-secondary)]/30 rounded-full backdrop-blur-sm", children: _jsx("span", { className: "text-[var(--hive-brand-secondary)] text-xs font-semibold tracking-wide", children: "Builder" }) }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent rounded-full blur-sm" })] }))] }), _jsx("p", { className: "text-silver/80 text-sm font-mono tracking-wider mb-3", children: formatHandle(handle) })] }) }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "flex items-center gap-2 text-sm", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-[var(--hive-brand-secondary)]/60" }), _jsx("span", { className: "text-platinum font-medium", children: major || 'Undeclared' }), _jsx("span", { className: "text-steel/60", children: "\u2022" }), _jsxs("span", { className: "text-mercury font-medium", children: ["Class of '", year ? year.slice(-2) : 'TBD'] })] }) }), dorm && (_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-platinum/40" }), _jsx("span", { className: "text-mercury", children: dorm })] })), showStatus && (_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx("div", { className: cn('w-1.5 h-1.5 rounded-full', isOnline ? 'bg-emerald shadow-[0_0_4px_color-mix(in_srgb,var(--hive-status-success)_50%,transparent)]' : 'bg-steel/60') }), _jsx("span", { className: cn('font-medium text-sm', isOnline ? 'text-emerald' : 'text-steel'), children: isOnline ? 'Active on Campus' : 'Away' })] }))] }), completionPercentage > 0 && completionPercentage < 100 && (_jsxs("div", { className: "mt-4 pt-3 border-t border-steel/10", children: [_jsxs("div", { className: "flex items-center justify-between text-xs text-mercury", children: [_jsx("span", { children: "Profile Completion" }), _jsxs("span", { className: "font-medium", children: [completionPercentage, "%"] })] }), _jsx("div", { className: "mt-1 h-1 bg-steel/20 rounded-full overflow-hidden", children: _jsx(motion.div, { initial: { width: 0 }, animate: { width: `${completionPercentage}%` }, transition: { duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }, className: "h-full bg-gradient-to-r from-gold to-champagne rounded-full" }) })] }))] }), onEditClick && (_jsxs(motion.button, { whileHover: {
                    scale: 1.05,
                    boxShadow: "0 2 32px color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)"
                }, whileTap: { scale: 0.95 }, onClick: onEditClick, className: cn('relative p-3 rounded-2xl bg-gradient-to-br from-charcoal/60 to-graphite/60', 'border border-steel/20 backdrop-blur-md', 'hover:border-[var(--hive-brand-secondary)]/40 hover:from-charcoal/80 hover:to-graphite/80', 'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-transparent', 'transition-all duration-300 ease-hive-smooth', 'shadow-lg hover:shadow-xl', 'flex-shrink-0 group'), "aria-label": "Edit campus profile", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" }), _jsx("svg", { className: "w-5 h-5 text-silver group-hover:text-[var(--hive-brand-secondary)] transition-colors duration-300 relative z-10", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }) })] }))] }));
};
// Compact variant for use in navigation or cards
export const CompactCampusIdentity = (props) => (_jsx(CampusIdentityHeader, { ...props, variant: "compact" }));
export default CampusIdentityHeader;
//# sourceMappingURL=campus-identity-header.js.map