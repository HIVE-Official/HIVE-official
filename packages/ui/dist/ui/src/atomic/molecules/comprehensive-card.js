import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * HIVE Comprehensive Card Molecule
 * Campus-optimized card system combining header, content, and actions with complete foundation integration
 *
 * Built using all foundation systems:
 * - Typography: Consistent card text hierarchy with campus font stack
 * - Color: Campus semantic colors and contextual background variants
 * - Layout: Systematic spacing between header, content, and action sections
 * - Icon: Contextual icons for card actions and status indicators
 * - Interaction: Hover states, click feedback, and keyboard navigation
 * - Shadow: Dynamic elevation system for card states and interactions
 * - Border: Consistent radius system and semantic border colors
 * - Motion: Liquid card animations with spring physics and morphing effects
 */
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils.js';
// Foundation system imports
import { typographyComposition } from '../foundations/typography-composition.js';
import { layoutComposition } from '../foundations/layout-composition.js';
import { iconComposition, MoreVertical, ExternalLink, Heart, MessageCircle, Share2, Bookmark, Clock, Users } from '../foundations/icon-composition.js';
import { shadowComposition } from '../foundations/shadow-composition.js';
import { motionComposition } from '../foundations/motion-composition.js';
// === CARD VARIANTS ===
const comprehensiveCardVariants = cva(
// Base card styles using foundation systems
[
    // Layout foundation
    'relative flex flex-col',
    'w-full',
    // Border foundation
    'rounded-lg',
    'border',
    'border-[var(--hive-border-subtle)]',
    // Background using color foundation
    'bg-[var(--hive-bg-secondary)]',
    // Shadow foundation
    `shadow-[${shadowComposition.scale.raised.shadow}]`,
    // Motion foundation
    'transition-all',
    `duration-[${motionComposition.durations.standard.ms}]`,
    // Campus social context
    'group'
].join(' '), {
    variants: {
        variant: {
            // Default campus card
            default: '',
            // Elevated with stronger shadow
            elevated: [
                `shadow-[${shadowComposition.scale.floating.shadow}]`,
                'hover:shadow-[var(--hive-shadow-xl)]'
            ].join(' '),
            // Interactive card with hover effects
            interactive: [
                'cursor-pointer',
                'hover:bg-[var(--hive-bg-interactive)]',
                'hover:border-[var(--hive-border-glass-strong)]',
                shadowComposition.interactive.cards.interactive.hover,
                'active:scale-[0.98]',
                // Focus ring using border foundation
                'focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20'
            ].join(' '),
            // Glass morphism effect
            glass: [
                'bg-[var(--hive-bg-tertiary)]/80',
                'backdrop-blur-lg',
                'border-[var(--hive-border-glass)]'
            ].join(' '),
            // Campus notification card
            notification: [
                'bg-[var(--hive-info-background)]',
                'border-[var(--hive-info-border)]',
                'border-l-4',
                'border-l-[var(--hive-info-primary)]'
            ].join(' '),
            // Campus announcement card
            announcement: [
                'bg-[var(--hive-gold-background)]',
                'border-[var(--hive-gold-border)]',
                'border-l-4',
                'border-l-[var(--hive-gold-primary)]'
            ].join(' ')
        },
        size: {
            compact: [
                // Padding using layout foundation
                'p-4',
                layoutComposition.utils.gap[3], // 12px internal gap
                // Header sizing
                '[&_.hive-card-header]:gap-2',
                // Content sizing
                '[&_.hive-card-content]:gap-2'
            ],
            comfortable: [
                // Padding
                'p-5',
                layoutComposition.utils.gap[4], // 16px internal gap
                // Header sizing
                '[&_.hive-card-header]:gap-3',
                // Content sizing
                '[&_.hive-card-content]:gap-3'
            ],
            spacious: [
                // Padding
                'p-6',
                layoutComposition.utils.gap[4], // 16px internal gap
                // Header sizing
                '[&_.hive-card-header]:gap-4',
                // Content sizing
                '[&_.hive-card-content]:gap-4'
            ]
        },
        campus: {
            // Standard campus context
            default: '',
            // Space card styling
            space: [
                'border-[var(--hive-info-border)]',
                'hover:border-[var(--hive-info-primary)]/50'
            ].join(' '),
            // Tool card styling
            tool: [
                'border-[var(--hive-success-border)]',
                'hover:border-[var(--hive-success-primary)]/50'
            ].join(' '),
            // Event card styling
            event: [
                'border-[var(--hive-warning-border)]',
                'hover:border-[var(--hive-warning-primary)]/50'
            ].join(' '),
            // Profile card styling
            profile: [
                'border-[var(--hive-gold-border)]',
                'hover:border-[var(--hive-gold-primary)]/50'
            ].join(' ')
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'comfortable',
        campus: 'default'
    }
});
const CardHeaderComponent = React.forwardRef(({ title, subtitle, avatar, icon: IconComponent, badge, timestamp, menuActions, onMenuActionClick, className }, ref) => {
    const [showMenu, setShowMenu] = React.useState(false);
    if (!title && !subtitle && !avatar && !IconComponent)
        return null;
    return (_jsxs("div", { ref: ref, className: cn('hive-card-header', 'flex items-start justify-between', className), children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [avatar && (_jsx("img", { src: avatar, alt: title || 'Card avatar', className: cn('w-10 h-10 rounded-full object-cover', 'border border-[var(--hive-border-subtle)]', `shadow-[${shadowComposition.scale.raised.shadow}]`) })), IconComponent && !avatar && (_jsx("div", { className: cn('w-10 h-10 rounded-lg flex items-center justify-center', 'bg-[var(--hive-bg-subtle)]', 'border border-[var(--hive-border-subtle)]'), children: _jsx(IconComponent, { className: cn(iconComposition.sizes.base.className, 'text-[var(--hive-text-secondary)]') }) })), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [title && (_jsx("h3", { className: cn('font-[var(--hive-font-family-primary)]', 'font-semibold', `text-[${typographyComposition.scale.base.size}]`, 'text-[var(--hive-text-primary)]', 'truncate'), children: title })), badge && (_jsx("span", { className: cn('inline-flex items-center px-2 py-0.5', 'rounded-full', 'font-[var(--hive-font-family-primary)]', 'font-medium', `text-[${typographyComposition.scale.caption.size}]`, 'bg-[var(--hive-gold-background)]', 'text-[var(--hive-gold-primary)]', 'border border-[var(--hive-gold-border)]'), children: badge }))] }), subtitle && (_jsx("p", { className: cn('font-[var(--hive-font-family-primary)]', `text-[${typographyComposition.scale.small.size}]`, 'text-[var(--hive-text-secondary)]', 'truncate'), children: subtitle })), timestamp && (_jsxs("div", { className: "flex items-center gap-1 mt-1", children: [_jsx(Clock, { className: cn(iconComposition.sizes.micro.className, 'text-[var(--hive-text-muted)]') }), _jsx("span", { className: cn('font-[var(--hive-font-family-primary)]', `text-[${typographyComposition.scale.caption.size}]`, 'text-[var(--hive-text-muted)]'), children: timestamp })] }))] })] }), menuActions && menuActions.length > 0 && (_jsxs("div", { className: "relative", children: [_jsx("button", { className: cn('p-1.5 rounded-md', 'text-[var(--hive-text-muted)]', 'hover:text-[var(--hive-text-primary)]', 'hover:bg-[var(--hive-bg-subtle)]', 'focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20', `transition-colors duration-[${motionComposition.durations.fast.ms}]`), onClick: () => setShowMenu(!showMenu), "aria-label": "Card menu", children: _jsx(MoreVertical, { className: iconComposition.sizes.base.className }) }), showMenu && (_jsx("div", { className: cn('absolute top-full right-0 mt-1 z-10', 'min-w-[160px]', 'bg-[var(--hive-bg-tertiary)]', 'border border-[var(--hive-border-glass)]', 'rounded-lg', `shadow-[${shadowComposition.scale.floating.shadow}]`, 'backdrop-blur-lg', 'p-1', 'animate-in slide-in-from-top-1 fade-in-50'), children: menuActions.map(action => (_jsxs("button", { className: cn('w-full flex items-center gap-3 px-3 py-2', 'rounded-md', 'font-[var(--hive-font-family-primary)]', `text-[${typographyComposition.scale.small.size}]`, 'text-left', action.destructive
                                ? 'text-[var(--hive-error-primary)] hover:bg-[var(--hive-error-background)]'
                                : 'text-[var(--hive-text-primary)] hover:bg-[var(--hive-bg-subtle)]', 'disabled:opacity-50 disabled:cursor-not-allowed', `transition-colors duration-[${motionComposition.durations.fast.ms}]`), disabled: action.disabled, onClick: () => {
                                action.onClick?.();
                                onMenuActionClick?.(action.id);
                                setShowMenu(false);
                            }, children: [action.icon && (_jsx(action.icon, { className: iconComposition.sizes.small.className })), action.label] }, action.id))) }))] }))] }));
});
CardHeaderComponent.displayName = 'CardHeaderComponent';
const CardActionsComponent = React.forwardRef(({ actions, onActionClick, className }, ref) => {
    if (!actions || actions.length === 0)
        return null;
    return (_jsx("div", { ref: ref, className: cn('hive-card-actions', 'flex items-center justify-between', 'pt-4 border-t border-[var(--hive-border-subtle)]', className), children: _jsx("div", { className: "flex items-center gap-2", children: actions.map(action => {
                const IconComponent = action.icon;
                return (_jsxs("button", { className: cn('inline-flex items-center gap-2 px-3 py-1.5', 'rounded-lg', 'font-[var(--hive-font-family-primary)]', 'font-medium', `text-[${typographyComposition.scale.small.size}]`, 'border', 
                    // Variant styling
                    action.variant === 'primary' && [
                        'bg-[var(--hive-gold-background)]',
                        'text-[var(--hive-gold-primary)]',
                        'border-[var(--hive-gold-border)]',
                        'hover:bg-[var(--hive-gold-primary)]',
                        'hover:text-[var(--hive-bg-primary)]'
                    ].join(' '), action.variant === 'secondary' && [
                        'bg-[var(--hive-bg-tertiary)]',
                        'text-[var(--hive-text-primary)]',
                        'border-[var(--hive-border-subtle)]',
                        'hover:bg-[var(--hive-bg-subtle)]'
                    ].join(' '), (!action.variant || action.variant === 'ghost') && [
                        'bg-transparent',
                        'text-[var(--hive-text-secondary)]',
                        'border-transparent',
                        'hover:bg-[var(--hive-bg-subtle)]',
                        'hover:text-[var(--hive-text-primary)]'
                    ].join(' '), 
                    // States
                    'disabled:opacity-50 disabled:cursor-not-allowed', 'focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20', `transition-all duration-[${motionComposition.durations.fast.ms}]`), disabled: action.disabled, onClick: () => {
                        action.onClick?.();
                        onActionClick?.(action.id);
                    }, children: [IconComponent && (_jsx(IconComponent, { className: iconComposition.sizes.small.className })), action.label] }, action.id));
            }) }) }));
});
CardActionsComponent.displayName = 'CardActionsComponent';
// === MAIN COMPONENT ===
export const ComprehensiveCard = React.forwardRef(({ className, variant, size, campus, header, content, footer, title, subtitle, avatar, icon, badge, timestamp, actions, menuActions, campusOptimized = false, onClick, onActionClick, children, ...props }, ref) => {
    return (_jsxs("div", { ref: ref, className: cn(comprehensiveCardVariants({ variant, size, campus }), 
        // Campus optimizations
        campusOptimized && [
            // Enhanced mobile touch targets
            '[&_button]:min-h-[44px]',
            // Improved mobile spacing
            'gap-3 sm:gap-4',
            // Better mobile borders
            'border-2 sm:border'
        ].join(' '), className), onClick: onClick, role: onClick ? 'button' : undefined, tabIndex: onClick ? 0 : undefined, ...props, children: [(header || title || subtitle || avatar || icon) && (_jsx(CardHeaderComponent, { title: title, subtitle: subtitle, avatar: avatar, icon: icon, badge: badge, timestamp: timestamp, menuActions: menuActions, onMenuActionClick: onActionClick })), header && (_jsx("div", { className: "hive-card-header", children: header })), (content || children) && (_jsx("div", { className: "hive-card-content flex-1", children: content || children })), footer && (_jsx("div", { className: "hive-card-footer", children: footer })), _jsx(CardActionsComponent, { actions: actions, onActionClick: onActionClick })] }));
});
ComprehensiveCard.displayName = 'ComprehensiveCard';
// === CAMPUS CARD PRESETS ===
export const campusCardPresets = {
    // Space card preset
    spaceCard: {
        variant: 'interactive',
        campus: 'space',
        actions: [
            { id: 'join', label: 'Join Space', variant: 'primary', icon: Users },
            { id: 'bookmark', label: 'Bookmark', icon: Bookmark }
        ]
    },
    // Tool card preset
    toolCard: {
        variant: 'interactive',
        campus: 'tool',
        actions: [
            { id: 'use', label: 'Use Tool', variant: 'primary', icon: ExternalLink },
            { id: 'like', label: 'Like', icon: Heart },
            { id: 'share', label: 'Share', icon: Share2 }
        ]
    },
    // Event card preset
    eventCard: {
        variant: 'elevated',
        campus: 'event',
        actions: [
            { id: 'rsvp', label: 'RSVP', variant: 'primary' },
            { id: 'share', label: 'Share Event', icon: Share2 }
        ]
    },
    // Profile card preset
    profileCard: {
        variant: 'glass',
        campus: 'profile',
        actions: [
            { id: 'connect', label: 'Connect', variant: 'primary' },
            { id: 'message', label: 'Message', icon: MessageCircle }
        ]
    }
};
// Types already exported inline above
export { comprehensiveCardVariants };
//# sourceMappingURL=comprehensive-card.js.map