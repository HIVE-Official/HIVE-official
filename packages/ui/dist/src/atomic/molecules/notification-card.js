import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardTitle, CardDescription } from '../atoms/card';
import { Badge } from '../atoms/badge';
export function NotificationCard({ title, message, timestamp, type = 'system', read = false }) {
    return (_jsx(Card, { className: "w-full", children: _jsxs(CardHeader, { className: "flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-base text-hive-text-primary", children: title }), message && _jsx(CardDescription, { className: "text-hive-text-secondary", children: message }), timestamp && _jsx("div", { className: "text-xs text-hive-text-tertiary mt-1", children: timestamp })] }), _jsx(Badge, { variant: read ? 'secondary' : 'default', className: "capitalize", children: type })] }) }));
}
//# sourceMappingURL=notification-card.js.map