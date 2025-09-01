import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../lib/utils.js';
const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
};
export const HiveLogo = ({ size = 'md', variant = 'default', className, ...props }) => {
    const fillColor = variant === 'mono' ? 'currentColor' : '#FFD700';
    return (_jsxs("svg", { className: cn(sizeClasses[size], className), viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [variant === 'gradient' && (_jsx("defs", { children: _jsxs("linearGradient", { id: "hive-gradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "#FFD700" }), _jsx("stop", { offset: "100%", stopColor: "#FFA500" })] }) })), _jsx("path", { d: "M50 10L75 25V45L50 60L25 45V25L50 10Z", fill: variant === 'gradient' ? 'url(#hive-gradient)' : fillColor, stroke: variant === 'mono' ? 'currentColor' : '#FFD700', strokeWidth: "2" }), _jsx("path", { d: "M50 40L65 50V70L50 80L35 70V50L50 40Z", fill: variant === 'gradient' ? 'url(#hive-gradient)' : fillColor, stroke: variant === 'mono' ? 'currentColor' : '#FFD700', strokeWidth: "2", opacity: "0.8" }), _jsx("path", { d: "M30 30L45 40V60L30 70L15 60V40L30 30Z", fill: variant === 'gradient' ? 'url(#hive-gradient)' : fillColor, stroke: variant === 'mono' ? 'currentColor' : '#FFD700', strokeWidth: "2", opacity: "0.6" }), _jsx("path", { d: "M70 30L85 40V60L70 70L55 60V40L70 30Z", fill: variant === 'gradient' ? 'url(#hive-gradient)' : fillColor, stroke: variant === 'mono' ? 'currentColor' : '#FFD700', strokeWidth: "2", opacity: "0.6" })] }));
};
HiveLogo.displayName = 'HiveLogo';
//# sourceMappingURL=hive-logo.js.map