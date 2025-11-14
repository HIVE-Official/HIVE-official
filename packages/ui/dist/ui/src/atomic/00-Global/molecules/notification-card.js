"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardHeader, CardTitle, CardDescription, } from "../atoms/card.js";
import { Badge } from "../atoms/badge.js";
export function NotificationCard({ title, message, timestamp, type = "system", read = false, className, ...props }) {
    return (_jsx(Card, { className: className, ...props, children: _jsxs(CardHeader, { className: "flex-row items-center justify-between", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-base text-hive-text-primary", children: title }), message ? (_jsx(CardDescription, { className: "text-hive-text-secondary", children: message })) : null, timestamp ? (_jsx("div", { className: "mt-1 text-xs text-hive-text-tertiary", children: timestamp })) : null] }), _jsx(Badge, { variant: read ? "secondary" : "default", className: "capitalize", children: type })] }) }));
}
//# sourceMappingURL=notification-card.js.map