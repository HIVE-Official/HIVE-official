'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
import { Card } from '../../components/ui/card';
import { Text } from '../atoms/text';
import { Badge } from '../atoms/badge';
export function StatCard({ title, value, description, trend, icon, variant = 'default', className }) {
    const getTrendColor = (direction) => {
        switch (direction) {
            case 'up':
                return 'text-[var(--hive-status-success)]';
            case 'down':
                return 'text-[var(--hive-status-error)]';
            default:
                return 'text-[var(--hive-text-secondary)]';
        }
    };
    const getTrendIcon = (direction) => {
        switch (direction) {
            case 'up':
                return '↗';
            case 'down':
                return '↘';
            default:
                return '→';
        }
    };
    if (variant === 'compact') {
        return (_jsx(Card, { className: cn('p-4 hover:shadow-md transition-shadow', className), children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [icon && (_jsx("div", { className: "text-[var(--hive-brand-primary)]", children: icon })), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-secondary)]", children: title }), _jsx(Text, { variant: "heading-sm", className: "font-semibold", children: value })] })] }), trend && (_jsxs(Badge, { variant: "secondary", className: getTrendColor(trend.direction), children: [getTrendIcon(trend.direction), " ", trend.value, "%"] }))] }) }));
    }
    return (_jsx(Card, { className: cn('p-6 hover:shadow-lg transition-shadow', className), children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "space-y-1", children: [_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-secondary)]", children: title }), _jsxs("div", { className: "flex items-baseline space-x-2", children: [_jsx(Text, { variant: "heading-lg", className: "font-bold", children: value }), trend && (_jsxs("span", { className: cn('text-sm font-medium flex items-center space-x-1', getTrendColor(trend.direction)), children: [_jsx("span", { children: getTrendIcon(trend.direction) }), _jsxs("span", { children: [trend.value, "%"] }), trend.label && (_jsx(Text, { className: "ml-1 text-xs", children: trend.label }))] }))] }), description && (_jsx(Text, { variant: "body-sm", className: "text-[var(--hive-text-secondary)]", children: description }))] }), icon && (_jsx("div", { className: "text-[var(--hive-brand-primary)] text-2xl", children: icon }))] }) }));
}
// Preset configurations for common use cases
export const StatCardPresets = {
    // User engagement stats
    UserStats: (props) => (_jsx(StatCard, { variant: "default", ...props })),
    // Compact dashboard metrics
    Metric: (props) => (_jsx(StatCard, { variant: "compact", ...props })),
    // Analytics dashboard
    Analytics: (props) => (_jsx(StatCard, { variant: "detailed", ...props }))
};
//# sourceMappingURL=stat-card.js.map