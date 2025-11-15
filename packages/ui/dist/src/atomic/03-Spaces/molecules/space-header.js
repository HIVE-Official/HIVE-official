'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Users, MoreVertical, Check, Loader2, Share2 } from 'lucide-react';
import { Button } from '../../00-Global/atoms/button';
import { MotionDiv } from '../../../shells/motion-safe';
import { cn } from '../../../lib/utils';
const HIVE_EASING = {
    reveal: [0.23, 1, 0.32, 1],
    interactive: [0.25, 0.46, 0.45, 0.94],
};
export function SpaceHeader({ space, memberCount, onlineCount, membershipState, isLeader = false, compact = false, onJoin, onLeave, onSettings, onShare, className, }) {
    const { name, iconUrl } = space;
    const displayName = name?.trim() || 'Space';
    // Generate monogram from first letter of space name
    const monogram = displayName.charAt(0).toUpperCase() || 'H';
    const isJoined = membershipState === 'joined';
    const isPending = membershipState === 'pending';
    const isLoading = membershipState === 'loading';
    const isJoinable = membershipState === 'not_joined' && Boolean(onJoin);
    const isLeavable = membershipState === 'joined' && Boolean(onLeave);
    const buttonDisabled = isLoading || isPending || (!isJoinable && !isLeavable);
    const buttonVariant = membershipState === 'not_joined' ? 'brand' : 'outline';
    const buttonLabel = (() => {
        switch (membershipState) {
            case 'joined':
                return 'Joined';
            case 'pending':
                return 'Request Pending';
            case 'loading':
                return 'Loading...';
            default:
                return 'Join Space';
        }
    })();
    const handlePrimaryAction = () => {
        if (membershipState === 'not_joined') {
            onJoin?.();
        }
        if (membershipState === 'joined') {
            onLeave?.();
        }
    };
    const layoutPadding = compact ? 'px-3 md:px-4 py-2.5 md:py-3' : 'px-4 md:px-6 py-3 md:py-4';
    const contentGap = compact ? 'gap-3 md:gap-3.5' : 'gap-3 md:gap-4';
    const statsGap = compact ? 'gap-2.5 md:gap-3' : 'gap-3 md:gap-4';
    const titleTypography = compact
        ? 'text-[20px] leading-[24px] md:text-[22px] md:leading-[26px]'
        : 'text-[22px] leading-[26px]';
    const iconSizing = compact ? 'w-10 h-10 md:w-12 md:h-12' : 'w-10 h-10 md:w-14 md:h-14';
    const statsTypography = 'text-[12px] leading-[16px]';
    return (_jsx(MotionDiv, { className: cn('space-header relative bg-[var(--hive-background-secondary)] border-b border-[var(--hive-border-default)]', className), initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3, ease: HIVE_EASING.reveal }, "data-state": membershipState, children: _jsx("div", { className: cn('max-w-[1200px] mx-auto', layoutPadding), children: _jsxs("div", { className: cn('flex items-start justify-between', contentGap), children: [_jsxs("div", { className: cn('flex items-start min-w-0 flex-1', contentGap), children: [_jsx("div", { className: cn('flex-shrink-0 rounded-lg overflow-hidden border border-[var(--hive-border-hover)] flex items-center justify-center', iconSizing), children: iconUrl ? (_jsx("img", { src: iconUrl, alt: `${displayName} icon`, className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-primary)]/70 flex items-center justify-center", children: _jsx("span", { className: "text-sm md:text-base font-bold text-black", children: monogram }) })) }), _jsxs("div", { className: "min-w-0 flex-1 pt-0.5 md:pt-1", children: [_jsx("h1", { className: cn(titleTypography, 'font-semibold text-[var(--hive-text-primary)] truncate'), children: displayName }), _jsxs("div", { className: cn('flex items-center mt-1 md:mt-2 text-[var(--hive-text-secondary)]', statsGap, statsTypography), children: [_jsxs("span", { className: "inline-flex items-center gap-1.5", children: [_jsx(Users, { className: "w-3 h-3 md:w-3.5 md:h-3.5" }), _jsxs("span", { "aria-label": `${memberCount} members`, children: [memberCount.toLocaleString(), " ", memberCount === 1 ? 'member' : 'members'] })] }), onlineCount !== undefined && onlineCount > 0 && (_jsxs("span", { className: "inline-flex items-center gap-1.5 text-[var(--hive-brand-primary)]", children: [_jsx("span", { "aria-hidden": "true", className: "w-1.5 h-1.5 rounded-full bg-[var(--hive-brand-primary)] animate-pulse shadow-[0_0_8px_var(--hive-brand-primary)]" }), _jsxs("span", { "aria-label": `${onlineCount} members online`, children: [onlineCount.toLocaleString(), " online"] })] }))] })] })] }), _jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [onShare && (_jsx(Button, { variant: "ghost", size: "sm", onClick: onShare, "aria-label": "Share space", className: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-brand-primary)]", children: _jsx(Share2, { className: "w-4 h-4" }) })), _jsxs(Button, { variant: buttonVariant, size: "sm", onClick: handlePrimaryAction, disabled: buttonDisabled, "aria-pressed": isJoined, "aria-label": membershipState === 'joined'
                                    ? 'Leave space'
                                    : membershipState === 'not_joined'
                                        ? 'Join space'
                                        : buttonLabel, children: [isLoading && _jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin", "aria-hidden": "true" }), isJoined && !isLoading && (_jsx(Check, { className: "mr-2 h-4 w-4", "aria-hidden": "true" })), _jsx("span", { children: buttonLabel })] }), _jsx("span", { className: "sr-only", "aria-live": "polite", children: membershipState === 'joined'
                                    ? 'You are a member of this space.'
                                    : membershipState === 'pending'
                                        ? 'Join request pending approval.'
                                        : membershipState === 'loading'
                                            ? 'Updating membership status.'
                                            : 'Join this space to participate.' }), isLeader && (_jsx(Button, { variant: "ghost", size: "sm", onClick: onSettings, className: "hidden md:flex text-[var(--hive-text-secondary)] hover:text-[var(--hive-brand-primary)] transition-colors", "aria-label": "Space settings", children: _jsx(MoreVertical, { className: "w-4 h-4" }) }))] })] }) }) }));
}
//# sourceMappingURL=space-header.js.map