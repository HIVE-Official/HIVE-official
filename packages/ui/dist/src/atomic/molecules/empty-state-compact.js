import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
import { Button } from '../atoms/button';
export function EmptyStateCompact({ title, description, actionLabel, onAction, className }) {
    return (_jsxs("div", { className: cn('rounded-hive-card border border-hive-border-default bg-hive-background-secondary p-4 text-center', className), children: [_jsx("div", { className: "text-sm font-medium text-hive-text-primary", children: title }), description && _jsx("div", { className: "text-xs text-hive-text-secondary mt-1", children: description }), actionLabel && (_jsx("div", { className: "mt-3", children: _jsx(Button, { size: "sm", onClick: onAction, children: actionLabel }) }))] }));
}
//# sourceMappingURL=empty-state-compact.js.map