import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from '../badge';
export const Header = ({ onLogin, className = "", }) => {
    return (_jsx("header", { className: `px-6 pt-8 ${className}`, children: _jsxs("nav", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex items-center space-x-3", children: _jsx("div", { className: "text-2xl font-black tracking-tight text-accent font-display", children: "HIVE" }) }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsx(Badge, { variant: "secondary", className: "border-border text-muted font-mono text-xs", children: "v1.0 BETA" }), onLogin && (_jsx("button", { onClick: onLogin, className: "text-sm font-medium text-muted hover:text-accent transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]", children: "Sign In" }))] })] }) }));
};
//# sourceMappingURL=header.js.map