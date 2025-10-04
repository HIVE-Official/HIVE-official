"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Card, CardContent } from "../atoms/card";
import { Button } from "../atoms/button";
import { Badge } from "../atoms/badge";
import { cn } from "../../lib/utils";
const UserCard = React.forwardRef(({ className, name, handle, avatar, bio, badge, badgeVariant = "secondary", actionLabel, onAction, actionVariant = "default", isOnline, disabled, ...props }, ref) => {
    // Generate initials from name
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    return (_jsx(Card, { ref: ref, className: cn("transition-all duration-smooth ease-liquid hover:shadow-md hover:border-primary/50", disabled && "opacity-60 pointer-events-none", className), ...props, children: _jsxs(CardContent, { className: "flex items-start gap-3 p-4", children: [_jsxs("div", { className: "relative shrink-0", children: [_jsx("div", { className: "h-16 w-14 overflow-hidden rounded-lg border-2 border-border bg-muted transition-smooth ease-liquid", children: avatar ? (_jsx("img", { src: avatar, alt: name, className: "h-full w-full object-cover" })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center bg-primary/10 text-sm font-semibold text-primary", children: initials })) }), isOnline && (_jsx("div", { className: "absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-card bg-green-500 transition-smooth ease-liquid" }))] }), _jsxs("div", { className: "flex flex-1 flex-col gap-1 min-w-0", children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsxs("div", { className: "flex flex-col min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-foreground truncate", children: name }), badge && (_jsx(Badge, { variant: badgeVariant, className: "shrink-0 transition-smooth ease-liquid", children: badge }))] }), _jsx("span", { className: "text-xs text-muted-foreground truncate", children: handle })] }), actionLabel && (_jsx(Button, { variant: actionVariant, size: "sm", onClick: onAction, disabled: disabled, className: "shrink-0 transition-smooth ease-liquid", children: actionLabel }))] }), bio && (_jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: bio }))] })] }) }));
});
UserCard.displayName = "UserCard";
export { UserCard };
//# sourceMappingURL=user-card.js.map