import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from '../../badge';
import { cn } from '../../lib/utils';
export const CampusCard = ({ name, domain, status, remainingSpots, selected, onClick, className }) => {
    const isActive = status === 'active';
    return (_jsx("button", { onClick: onClick, disabled: !isActive, className: cn('group relative w-full rounded-xl border p-4 transition-all', 'hover:border-accent/50 hover:shadow-md', selected && 'border-accent bg-accent/5', !isActive && 'cursor-not-allowed opacity-50', className), children: _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex flex-col items-start gap-1", children: [_jsx("h3", { className: "text-lg font-semibold text-white", children: name }), _jsx("p", { className: "text-sm text-muted-foreground", children: domain })] }), _jsx("div", { className: "flex flex-col items-end gap-2", children: status === 'coming_soon' ? (_jsx(Badge, { variant: "outline", className: "border-border text-muted-foreground", children: "Coming Soon" })) : remainingSpots !== undefined ? (_jsxs(Badge, { variant: "outline", className: "border-accent/50 text-accent", children: [remainingSpots, " spots left"] })) : null })] }) }));
};
//# sourceMappingURL=campus-card.js.map