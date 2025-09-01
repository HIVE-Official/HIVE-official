import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../lib/utils.js';
export const AppHeader = ({ title, subtitle, actions, sticky = true, className, children, ...props }) => {
    return (_jsx("header", { className: cn('bg-background border-b px-4 py-3', sticky && 'sticky top-0 z-50', className), ...props, children: children || (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [title && _jsx("h1", { className: "text-2xl font-bold", children: title }), subtitle && _jsx("p", { className: "text-sm text-muted-foreground", children: subtitle })] }), actions && _jsx("div", { className: "flex items-center gap-2", children: actions })] })) }));
};
//# sourceMappingURL=AppHeader.js.map