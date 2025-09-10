import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../lib/utils.js';
export const HiveMenu = ({ className, items = [], children, ...props }) => {
    return (_jsxs("div", { className: cn('space-y-1', className), ...props, children: [items.map((item) => (_jsx("button", { onClick: item.onClick, className: "w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground", children: item.label }, item.value))), children] }));
};
export const hiveMenuVariants = {};
//# sourceMappingURL=hive-menu.js.map