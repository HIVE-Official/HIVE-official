import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * HIVE User Identity Molecule
 * Campus-optimized user display combining avatar, name, handle, and status
 *
 * Built using all foundation systems:
 * - Typography: Name hierarchy and handle styling
 * - Color: Campus context colors and status indicators
 * - Layout: Systematic spacing and alignment
 * - Icon: Status indicators and verification badges
 * - Interaction: Hover states and click feedback
 * - Shadow: Subtle elevation for avatars
 * - Border: Consistent radius and status rings
 * - Motion: Smooth transitions and spring animations
 */
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
// Foundation system imports
import { typographyComposition } from '../foundations/typography-composition.js';
import { layoutComposition } from '../foundations/layout-composition.js';
import { iconComposition, CheckCircle, Crown, Zap } from '../foundations/icon-composition.js';
import { shadowComposition } from '../foundations/shadow-composition.js';
import { borderComposition } from '../foundations/border-composition.js';
import { motionComposition } from '../foundations/motion-composition.js';
// === USER IDENTITY VARIANTS ===
const userIdentityVariants = cva(
// Base styles using foundation systems
[
    // Layout foundation
    layoutComposition.utils.flex.row,
    layoutComposition.utils.gap[3], // 12px gap
    'items-center',
    // Interaction foundation
    'cursor-pointer',
    'transition-all',
    `duration-[${motionComposition.durations.fast.ms}]`,
    // Campus social context
    'group'
].join(' '), {
    variants: {
        size: {
            // Icon and typography sizing using foundation systems
            micro: [
                // Avatar size
                '[&_.hive-avatar]:w-6 [&_.hive-avatar]:h-6', // 24px
                // Typography
                `[&_.hive-name]:text-[${typographyComposition.scale.small.size}]`, // 14px
                `[&_.hive-handle]:text-[${typographyComposition.scale.caption.size}]`, // 12px
                // Icon sizing
                `[&_.hive-status-icon]:${iconComposition.sizes.micro.className}` // 12px
            ],
            small: [
                // Avatar size  
                '[&_.hive-avatar]:w-8 [&_.hive-avatar]:h-8', // 32px
                // Typography
                `[&_.hive-name]:text-[${typographyComposition.scale.base.size}]`, // 16px  
                `[&_.hive-handle]:text-[${typographyComposition.scale.small.size}]`, // 14px
                // Icon sizing
                `[&_.hive-status-icon]:${iconComposition.sizes.small.className}` // 16px
            ],
            base: [
                // Avatar size
                '[&_.hive-avatar]:w-10 [&_.hive-avatar]:h-10', // 40px
                // Typography
                `[&_.hive-name]:text-[${typographyComposition.scale.large.size}]`, // 18px
                `[&_.hive-handle]:text-[${typographyComposition.scale.base.size}]`, // 16px  
                // Icon sizing
                `[&_.hive-status-icon]:${iconComposition.sizes.base.className}` // 20px
            ],
            large: [
                // Avatar size
                '[&_.hive-avatar]:w-12 [&_.hive-avatar]:h-12', // 48px
                // Typography
                `[&_.hive-name]:text-[${typographyComposition.scale.h4.size}]`, // 20px
                `[&_.hive-handle]:text-[${typographyComposition.scale.large.size}]`, // 18px
                // Icon sizing  
                `[&_.hive-status-icon]:${iconComposition.sizes.large.className}` // 24px
            ]
        },
        layout: {
            // Horizontal (default)
            horizontal: layoutComposition.utils.flex.row,
            // Vertical stack
            vertical: [
                layoutComposition.utils.flex.col,
                'items-center',
                'text-center'
            ].join(' '),
            // Compact (name only)
            compact: 'flex-row items-center'
        },
        interactive: {
            none: '',
            // Hover effects using interaction foundation
            subtle: [
                'hover:bg-[var(--hive-bg-subtle)]',
                shadowComposition.interactive.cards.interactive.hover,
                'rounded-lg p-2 -m-2'
            ].join(' '),
            // Campus social interaction
            social: [
                'hover:bg-[var(--hive-bg-subtle)]',
                'hover:scale-[1.02]',
                shadowComposition.interactive.cards.interactive.hover,
                'active:scale-[0.98]',
                'rounded-lg p-3 -m-3',
                // Focus ring using border foundation
                'focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20'
            ].join(' ')
        }
    },
    defaultVariants: {
        size: 'base',
        layout: 'horizontal',
        interactive: 'subtle'
    }
});
// === STATUS INDICATORS ===
const StatusIndicator = ({ status, className }) => {
    const statusConfig = {
        online: {
            color: 'text-[var(--hive-success-primary)]',
            bg: 'bg-[var(--hive-success-primary)]',
            label: 'Online'
        },
        away: {
            color: 'text-[var(--hive-warning-primary)]',
            bg: 'bg-[var(--hive-warning-primary)]',
            label: 'Away'
        },
        offline: {
            color: 'text-[var(--hive-text-muted)]',
            bg: 'bg-[var(--hive-text-muted)]',
            label: 'Offline'
        },
        studying: {
            color: 'text-[var(--hive-info-primary)]',
            bg: 'bg-[var(--hive-info-primary)]',
            label: 'Studying'
        }
    };
    const config = statusConfig[status] || statusConfig.offline;
    return (_jsx("div", { className: cn(
        // Base status dot
        'w-3 h-3 rounded-full border-2 border-[var(--hive-bg-primary)]', config.bg, 
        // Position
        'absolute -bottom-0.5 -right-0.5', 
        // Animation using motion foundation
        `transition-all duration-[${motionComposition.durations.fast.ms}]`, className), title: config.label }));
};
// === ROLE BADGES ===
const RoleBadge = ({ role, className }) => {
    const roleConfig = {
        student: { icon: null, color: 'text-[var(--hive-text-secondary)]' },
        faculty: { icon: CheckCircle, color: 'text-[var(--hive-info-primary)]' },
        admin: { icon: Crown, color: 'text-[var(--hive-warning-primary)]' },
        leader: { icon: Zap, color: 'text-[var(--hive-gold-primary)]' }
    };
    const config = roleConfig[role] || roleConfig.student;
    if (!config.icon)
        return null;
    const IconComponent = config.icon;
    return (_jsx(IconComponent, { className: cn('hive-status-icon', config.color, className) }));
};
// === MAIN COMPONENT ===
export const UserIdentity = React.forwardRef(({ className, size, layout, interactive, name, handle, avatar, status = 'offline', role = 'student', verified = false, showHandle = true, showStatus = true, showRole = false, onClick, onAvatarClick, ...props }, ref) => {
    return (_jsxs("div", { ref: ref, className: cn(userIdentityVariants({ size, layout, interactive }), className), onClick: onClick, role: onClick ? 'button' : undefined, tabIndex: onClick ? 0 : undefined, ...props, children: [_jsxs("div", { className: "relative shrink-0", onClick: onAvatarClick, children: [_jsx("div", { className: cn(
                        // Avatar base styles using border foundation
                        'hive-avatar', 'relative rounded-full overflow-hidden', 'bg-[var(--hive-bg-tertiary)]', `border border-[${borderComposition.colors.semantic.subtle}]`, 
                        // Shadow using shadow foundation
                        `shadow-[${shadowComposition.scale.raised.shadow}]`, 
                        // Hover effects using interaction foundation
                        'transition-all', `duration-[${motionComposition.durations.fast.ms}]`, onAvatarClick && 'cursor-pointer hover:scale-105', 
                        // Status ring for online users
                        status === 'online' && [
                            'ring-2 ring-[var(--hive-success-primary)]/30',
                            'ring-offset-2 ring-offset-[var(--hive-bg-primary)]'
                        ].join(' ')), children: avatar ? (_jsx("img", { src: avatar, alt: `${name}'s avatar`, className: "w-full h-full object-cover" })) : (
                        // Fallback avatar using typography foundation
                        _jsx("div", { className: cn('w-full h-full flex items-center justify-center', 'bg-[var(--hive-gold-background)]', 'text-[var(--hive-gold-primary)]', 'font-[var(--hive-font-family-primary)]', 'font-medium'), children: name.charAt(0).toUpperCase() })) }), showStatus && (_jsx(StatusIndicator, { status: status }))] }), _jsxs("div", { className: cn('flex flex-col', layout === 'horizontal' ? 'items-start' : 'items-center', 'min-w-0 flex-1'), children: [_jsxs("div", { className: "flex items-center gap-1.5 min-w-0", children: [_jsx("span", { className: cn('hive-name', 'font-[var(--hive-font-family-primary)]', 'font-medium', 'text-[var(--hive-text-primary)]', 'truncate', 
                                // Hover effect for interactive
                                interactive !== 'none' && 'group-hover:text-[var(--hive-gold-primary)]', 
                                // Transition using motion foundation
                                `transition-colors duration-[${motionComposition.durations.fast.ms}]`), children: name }), showRole && (_jsx(RoleBadge, { role: role })), verified && (_jsx(CheckCircle, { className: cn('hive-status-icon', 'text-[var(--hive-gold-primary)]') }))] }), showHandle && handle && (_jsxs("span", { className: cn('hive-handle', 'font-[var(--hive-font-family-primary)]', 'text-[var(--hive-text-secondary)]', 'truncate', 
                        // Campus social styling
                        'opacity-80', 
                        // Transition
                        `transition-all duration-[${motionComposition.durations.fast.ms}]`), children: ["@", handle] }))] })] }));
});
UserIdentity.displayName = 'UserIdentity';
// Type already exported inline above
export { userIdentityVariants };
//# sourceMappingURL=user-identity.js.map