import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SimpleAvatar } from '../atoms/simple-avatar.js';
import { cn } from '../../lib/utils.js';
export function UserAvatarGroup({ users, max = 5, size = 'sm', className }) {
    const display = users.slice(0, max);
    const extra = users.length - display.length;
    const sizePx = size === 'xs' ? 20 : size === 'sm' ? 28 : 36;
    return (_jsxs("div", { className: cn('flex -space-x-2', className), children: [display.map((u) => (_jsx(SimpleAvatar, { src: u.imageUrl, fallback: (u.name?.[0] || '?').toUpperCase(), className: "ring-2 ring-[var(--hive-background-secondary)]", style: { width: sizePx, height: sizePx }, title: u.name }, u.id))), extra > 0 && (_jsxs("div", { className: "inline-flex items-center justify-center rounded-full bg-hive-background-tertiary text-hive-text-secondary ring-2 ring-[var(--hive-background-secondary)]", style: { width: sizePx, height: sizePx, fontSize: sizePx / 2.8 }, "aria-label": `+${extra} more`, children: ["+", extra] }))] }));
}
//# sourceMappingURL=user-avatar-group.js.map