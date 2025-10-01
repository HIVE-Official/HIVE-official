'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
const statusConfig = {
    online: {
        color: 'bg-green-500',
        ringColor: 'ring-green-500/20',
        label: 'Online',
        pulseAnimation: true
    },
    away: {
        color: 'bg-yellow-500',
        ringColor: 'ring-yellow-500/20',
        label: 'Away',
        pulseAnimation: false
    },
    ghost: {
        // Ghost mode: appears offline but user is actually online
        color: 'bg-gray-500',
        ringColor: 'ring-gray-500/20',
        label: 'Offline', // Intentionally misleading for ghost mode
        pulseAnimation: false
    },
    offline: {
        color: 'bg-gray-500',
        ringColor: 'ring-gray-500/20',
        label: 'Offline',
        pulseAnimation: false
    }
};
const sizeConfig = {
    sm: {
        dot: 'h-2 w-2',
        ring: 'h-3 w-3',
        text: 'text-xs'
    },
    md: {
        dot: 'h-3 w-3',
        ring: 'h-4 w-4',
        text: 'text-sm'
    },
    lg: {
        dot: 'h-4 w-4',
        ring: 'h-5 w-5',
        text: 'text-base'
    }
};
export const PresenceIndicator = ({ status, size = 'md', showLabel = false, lastSeen, className }) => {
    const config = statusConfig[status];
    const sizeClasses = sizeConfig[size];
    // Format last seen for offline/ghost users
    const getLastSeenText = () => {
        if (!lastSeen || status === 'online' || status === 'away')
            return null;
        const now = new Date();
        const diff = now.getTime() - lastSeen.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        if (minutes < 1)
            return 'Just now';
        if (minutes < 60)
            return `${minutes}m ago`;
        if (hours < 24)
            return `${hours}h ago`;
        if (days < 7)
            return `${days}d ago`;
        return 'Long ago';
    };
    const lastSeenText = getLastSeenText();
    return (_jsxs("div", { className: cn('flex items-center gap-2', className), children: [_jsxs("div", { className: "relative", children: [config.pulseAnimation && (_jsx("div", { className: cn('absolute inset-0 animate-ping', sizeClasses.ring, config.color, 'rounded-full opacity-75') })), _jsx("div", { className: cn('absolute inset-0', sizeClasses.ring, 'rounded-full ring-2', config.ringColor) }), _jsx("div", { className: cn('relative', sizeClasses.dot, config.color, 'rounded-full') })] }), showLabel && (_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: cn(sizeClasses.text, 'text-white font-medium'), children: config.label }), lastSeenText && (_jsx("span", { className: cn('text-gray-500', size === 'sm' ? 'text-[10px]' : 'text-xs'), children: lastSeenText }))] }))] }));
};
//# sourceMappingURL=presence-indicator.js.map