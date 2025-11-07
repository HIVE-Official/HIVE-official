import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from '../atoms/badge';
import { cn } from '../../lib/utils';
export function TagList({ tags, max = 6, className }) {
    const display = tags.slice(0, max);
    const extra = tags.length - display.length;
    return (_jsxs("div", { className: cn('flex flex-wrap gap-2', className), children: [display.map((t) => (_jsx(Badge, { variant: "secondary", className: "capitalize", children: t }, t))), extra > 0 && _jsxs(Badge, { variant: "secondary", children: ["+", extra] })] }));
}
//# sourceMappingURL=tag-list.js.map