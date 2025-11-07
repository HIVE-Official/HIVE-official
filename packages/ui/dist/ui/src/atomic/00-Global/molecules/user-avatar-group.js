"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SimpleAvatar } from "../atoms/simple-avatar";
import { cn } from "../../lib/utils";
/**
 * Overlapping avatar group with optional "+N" overflow indicator.
 */
export function UserAvatarGroup({ users, max = 5, size = "sm", className, }) {
    const display = users.slice(0, max);
    const extra = users.length - display.length;
    const sizePx = size === "xs" ? 20 : size === "sm" ? 28 : 36;
    const avatarStyle = {
        width: sizePx,
        height: sizePx,
    };
    return (_jsxs("div", { className: cn("flex -space-x-2", className), children: [display.map((user) => (_jsx(SimpleAvatar, { src: user.imageUrl ?? undefined, fallback: (user.name?.[0] || "?").toUpperCase(), className: "ring-2 ring-[var(--hive-background-secondary)]", style: avatarStyle, title: user.name ?? undefined }, user.id))), extra > 0 ? (_jsxs("div", { className: "inline-flex items-center justify-center rounded-full bg-hive-background-tertiary text-hive-text-secondary ring-2 ring-[var(--hive-background-secondary)]", style: avatarStyle, "aria-label": `+${extra} more`, children: ["+", extra] })) : null] }));
}
//# sourceMappingURL=user-avatar-group.js.map