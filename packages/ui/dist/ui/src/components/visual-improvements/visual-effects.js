import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from "../lib/utils";
// GOLD PARTICLE SYSTEM
export const GoldParticles = ({ density = 20, className }) => {
    const particles = Array.from({ length: density }, (_, i) => i);
    return (_jsx("div", { className: cn("absolute inset-0 overflow-hidden pointer-events-none", className), children: particles.map((i) => (_jsx("div", { className: "absolute w-1 h-1 bg-accent rounded-full opacity-30 animate-float", style: {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
            } }, i))) }));
};
// ENERGY RIPPLE EFFECT
export const EnergyRipple = ({ trigger = false, className }) => {
    return (_jsx("div", { className: cn("absolute inset-0 pointer-events-none", className), children: trigger && (_jsx("div", { className: "absolute inset-0 border-2 border-accent rounded-full animate-ping opacity-75", style: { animationDuration: '2s' } })) }));
};
// GLOW AURA
export const GlowAura = ({ intensity = 'medium', color = 'accent', className }) => {
    const intensityClasses = {
        low: 'blur-sm opacity-20',
        medium: 'blur-md opacity-30',
        high: 'blur-lg opacity-40',
        extreme: 'blur-xl opacity-60'
    };
    const colorClasses = {
        accent: 'bg-accent',
        white: 'bg-white',
        blue: 'bg-surface'
    };
    return (_jsx("div", { className: cn("absolute inset-0 -z-10 transition-all duration-300", colorClasses[color], intensityClasses[intensity], className) }));
};
// CAMPUS ENERGY METER
export const EnergyMeter = ({ level = 50, showLabel = true, className }) => {
    const getEnergyColor = (level) => {
        if (level < 30)
            return 'text-muted-foreground';
        if (level < 60)
            return 'text-accent/60';
        if (level < 80)
            return 'text-accent';
        return 'text-accent brightness-125';
    };
    const getEnergyLabel = (level) => {
        if (level < 30)
            return 'Study Mode';
        if (level < 60)
            return 'Active Campus';
        if (level < 80)
            return 'High Energy';
        return 'Party Mode';
    };
    return (_jsxs("div", { className: cn("flex items-center gap-3", className), children: [_jsxs("div", { className: "relative w-24 h-2 bg-surface-02 rounded-full overflow-hidden", children: [_jsx("div", { className: cn("absolute left-0 top-0 h-full transition-all duration-500 ease-out", "bg-gradient-to-r from-accent/60 to-accent rounded-full", level > 70 && "animate-pulse"), style: { width: `${Math.min(level, 100)}%` } }), level > 80 && (_jsx("div", { className: "absolute inset-0 bg-accent/20 animate-pulse rounded-full" }))] }), showLabel && (_jsx("span", { className: cn("text-sm font-medium transition-colors", getEnergyColor(level)), children: getEnergyLabel(level) }))] }));
};
// MAGNETIC FIELD EFFECT
export const MagneticField = ({ active = false, children, className }) => {
    return (_jsxs("div", { className: cn("relative transition-all duration-300", active && "transform hover:scale-105", className), children: [active && (_jsx("div", { className: "absolute inset-[-10px] bg-gradient-radial from-accent/10 via-accent/5 to-transparent rounded-2xl blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300" })), children] }));
};
// HOLOGRAPHIC BORDER
export const HolographicBorder = ({ className, children }) => {
    return (_jsxs("div", { className: cn("relative p-[2px] rounded-xl overflow-hidden", className), children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-accent via-white to-accent animate-spin-slow opacity-75", style: { animationDuration: '3s' } }), _jsx("div", { className: "relative bg-surface rounded-xl p-4", children: children })] }));
};
// RETRO SCAN LINES
export const RetroScanLines = ({ className }) => {
    return (_jsx("div", { className: cn("absolute inset-0 pointer-events-none", "bg-gradient-to-b from-transparent via-accent/5 to-transparent", "bg-[length:100%_4px] animate-scan opacity-30", className) }));
};
// CAMPUS MESH PATTERN
export const CampusMesh = ({ opacity = 0.1, className }) => {
    return (_jsx("div", { className: cn("absolute inset-0 pointer-events-none", className), style: {
            backgroundImage: `
          linear-gradient(rgba(255,215,0,${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,215,0,${opacity}) 1px, transparent 1px)
        `,
            backgroundSize: '20px 20px'
        } }));
};
// ENERGY BURST ANIMATION
export const EnergyBurst = ({ trigger = false, className }) => {
    return (_jsx("div", { className: cn("absolute inset-0 pointer-events-none overflow-hidden", className), children: trigger && (_jsxs(_Fragment, { children: [_jsx("div", { className: "absolute inset-0 bg-accent/20 animate-ping rounded-full" }), _jsx("div", { className: "absolute inset-[-50%] border-4 border-accent animate-spin opacity-50 rounded-full", style: { animationDuration: '0.5s' } }), _jsx("div", { className: "absolute inset-[-100%] bg-gradient-radial from-accent/30 to-transparent animate-pulse", style: { animationDuration: '0.8s' } })] })) }));
};
// FLOATING ELEMENTS
export const FloatingElement = ({ children, delay = 0, duration = 3, className }) => {
    return (_jsx("div", { className: cn("animate-float", className), style: {
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
        }, children: children }));
};
//# sourceMappingURL=visual-effects.js.map