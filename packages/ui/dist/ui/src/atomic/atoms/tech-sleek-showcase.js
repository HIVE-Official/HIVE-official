'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Tech-Sleek Component Showcase
 * Demonstrates the Gold + Black + White branding system
 */
export const TechSleekButton = ({ variant = 'gold', children, onClick }) => {
    const variants = {
        gold: 'bg-gradient-to-br from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary-hover)] text-black border border-[var(--hive-brand-secondary)] shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:-translate-y-0.5',
        ghost: 'bg-transparent text-white border border-white/20 hover:border-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]',
        black: 'bg-black text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 hover:border-[var(--hive-brand-secondary)]/60'
    };
    return (_jsx("button", { onClick: onClick, className: `
        px-6 py-3 rounded-lg font-semibold
        transition-all duration-200 ease-out
        ${variants[variant]}
      `, children: children }));
};
export const TechSleekCard = ({ title, description, metric, active }) => {
    return (_jsxs("div", { className: `
        bg-black p-6 rounded-xl
        border transition-all duration-300
        ${active
            ? 'border-[var(--hive-brand-secondary)]/40 shadow-2xl shadow-yellow-500/10'
            : 'border-white/5 hover:border-white/10'}
        hover:transform hover:-translate-y-1
        group
      `, children: [_jsx("h3", { className: "text-white font-bold text-lg mb-2", children: title }), _jsx("p", { className: "text-white/60 text-sm mb-4", children: description }), metric && (_jsx("div", { className: `text-2xl font-bold ${active ? 'text-[var(--hive-brand-secondary)]' : 'text-white'}`, children: metric })), active && (_jsx("div", { className: "mt-4 h-0.5 bg-gradient-to-r from-transparent via-[var(--hive-brand-secondary)] to-transparent opacity-50" }))] }));
};
export const TechSleekInput = ({ placeholder, value, onChange }) => {
    return (_jsxs("div", { className: "relative", children: [_jsx("input", { type: "text", value: value, onChange: onChange, placeholder: placeholder, className: "\n          w-full px-4 py-3 rounded-lg\n          bg-white/5 border border-white/10\n          text-white placeholder-white/30\n          focus:outline-none focus:border-[var(--hive-brand-secondary)]/50\n          focus:shadow-[0_0_20px_color-mix(in srgb, var(--hive-brand-secondary) 10%, transparent)]\n          transition-all duration-200\n        " }), _jsx("div", { className: "absolute inset-0 rounded-lg pointer-events-none", children: _jsx("div", { className: "absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-[var(--hive-brand-secondary)]/0 to-transparent group-focus-within:via-[var(--hive-brand-secondary)]/10 transition-all duration-500" }) })] }));
};
export const TechSleekBadge = ({ children, variant = 'gold' }) => {
    const variants = {
        gold: 'bg-gradient-to-r from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary-hover)] text-black',
        white: 'bg-white text-black',
        black: 'bg-black text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30'
    };
    return (_jsx("span", { className: `
        px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
        ${variants[variant]}
        shadow-lg
      `, children: children }));
};
export const TechSleekToggle = ({ checked = false, onChange, label }) => {
    return (_jsxs("label", { className: "flex items-center gap-3 cursor-pointer", children: [_jsxs("div", { className: "relative", children: [_jsx("input", { type: "checkbox", className: "sr-only", checked: checked, onChange: (e) => onChange?.(e.target.checked) }), _jsx("div", { className: `
            w-12 h-6 rounded-full transition-all duration-300
            ${checked ? 'bg-[var(--hive-brand-secondary)]' : 'bg-white/20'}
          `, children: _jsx("div", { className: `
              absolute top-0.5 left-0.5 w-5 h-5 rounded-full
              transition-all duration-300
              ${checked
                                ? 'translate-x-6 bg-black'
                                : 'translate-x-0 bg-white'}
              shadow-lg
            ` }) })] }), label && _jsx("span", { className: "text-white/80 text-sm", children: label })] }));
};
export const TechSleekProgress = ({ value, max = 100 }) => {
    const percentage = (value / max) * 100;
    return (_jsxs("div", { className: "relative", children: [_jsx("div", { className: "h-1 bg-white/10 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-gradient-to-r from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary-hover)] transition-all duration-500 ease-out", style: { width: `${percentage}%` }, children: _jsx("div", { className: "h-full bg-gradient-to-r from-transparent to-white/20 animate-pulse" }) }) }), _jsx("div", { className: "absolute top-0 h-1 bg-[var(--hive-brand-secondary)] blur-md opacity-50 transition-all duration-500", style: { width: `${percentage}%` } })] }));
};
export const TechSleekDivider = ({ variant = 'gradient' }) => {
    const variants = {
        solid: 'h-px bg-white/10',
        gradient: 'h-px bg-gradient-to-r from-transparent via-[var(--hive-brand-secondary)]/30 to-transparent',
        glow: 'relative h-px bg-gradient-to-r from-transparent via-[var(--hive-brand-secondary)] to-transparent'
    };
    if (variant === 'glow') {
        return (_jsxs("div", { className: "relative", children: [_jsx("div", { className: variants[variant] }), _jsx("div", { className: "absolute inset-0 h-px bg-gradient-to-r from-transparent via-[var(--hive-brand-secondary)] to-transparent blur-md" })] }));
    }
    return _jsx("div", { className: variants[variant] });
};
export const TechSleekLogo = ({ size = 'md' }) => {
    const sizes = {
        sm: 'text-2xl',
        md: 'text-4xl',
        lg: 'text-6xl'
    };
    return (_jsx("div", { className: `${sizes[size]} font-black tracking-tight`, children: _jsxs("span", { className: "text-[var(--hive-brand-secondary)] relative", children: ["HIVE", _jsx("span", { className: "absolute inset-0 blur-xl text-[var(--hive-brand-secondary)]/30 animate-pulse", children: "HIVE" })] }) }));
};
// Showcase component demonstrating all elements
export const TechSleekShowcase = () => {
    return (_jsx("div", { className: "min-h-screen bg-black p-8", children: _jsxs("div", { className: "max-w-6xl mx-auto space-y-8", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsx(TechSleekLogo, { size: "lg" }), _jsx("p", { className: "text-white/60 mt-4", children: "Tech-Sleek Design System" }), _jsx(TechSleekDivider, { variant: "glow" })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-white text-2xl font-bold mb-4", children: "Buttons" }), _jsxs("div", { className: "flex gap-4 flex-wrap", children: [_jsx(TechSleekButton, { variant: "gold", children: "Join Space" }), _jsx(TechSleekButton, { variant: "ghost", children: "Learn More" }), _jsx(TechSleekButton, { variant: "black", children: "Settings" })] })] }), _jsx(TechSleekDivider, {}), _jsxs("section", { children: [_jsx("h2", { className: "text-white text-2xl font-bold mb-4", children: "Cards" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(TechSleekCard, { title: "Active Spaces", description: "Communities you're engaged with", metric: "24", active: true }), _jsx(TechSleekCard, { title: "Tools Created", description: "Your contributions to HIVE", metric: "7" }), _jsx(TechSleekCard, { title: "Connections", description: "Your campus network", metric: "142" })] })] }), _jsx(TechSleekDivider, {}), _jsxs("section", { children: [_jsx("h2", { className: "text-white text-2xl font-bold mb-4", children: "Form Elements" }), _jsxs("div", { className: "space-y-4 max-w-md", children: [_jsx(TechSleekInput, { placeholder: "Search for spaces..." }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(TechSleekToggle, { label: "Enable notifications" }), _jsx(TechSleekBadge, { children: "PRO" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm mb-2", children: [_jsx("span", { className: "text-white/60", children: "Profile Completion" }), _jsx("span", { className: "text-[var(--hive-brand-secondary)]", children: "85%" })] }), _jsx(TechSleekProgress, { value: 85 })] })] })] }), _jsx(TechSleekDivider, { variant: "gradient" }), _jsxs("section", { children: [_jsx("h2", { className: "text-white text-2xl font-bold mb-4", children: "Typography" }), _jsxs("div", { className: "space-y-2", children: [_jsx("h1", { className: "text-white text-5xl font-bold", children: "Display Heading" }), _jsx("h2", { className: "text-[var(--hive-brand-secondary)] text-3xl font-semibold", children: "Gold Accent Header" }), _jsx("p", { className: "text-white/87 text-lg", children: "Primary body text for main content" }), _jsx("p", { className: "text-white/60 text-base", children: "Secondary text for descriptions" }), _jsx("p", { className: "text-white/40 text-sm", children: "Muted text for captions and hints" })] })] })] }) }));
};
export default TechSleekShowcase;
//# sourceMappingURL=tech-sleek-showcase.js.map