import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../lib/utils.js';
export const BottomNavBar = ({ items = [], className, ...props }) => {
    return (_jsx("nav", { className: cn('fixed bottom-0 left-0 right-0 bg-background border-t z-50', className), ...props, children: _jsx("div", { className: "flex justify-around items-center h-16", children: items.map((item, index) => (_jsxs("button", { onClick: item.onClick, className: cn('flex flex-col items-center justify-center flex-1 h-full px-2 py-2', 'hover:bg-accent hover:text-accent-foreground transition-colors', item.active && 'text-primary'), children: [item.icon && _jsx("div", { className: "mb-1", children: item.icon }), _jsx("span", { className: "text-xs", children: item.label })] }, index))) }) }));
};
//# sourceMappingURL=BottomNavBar.js.map