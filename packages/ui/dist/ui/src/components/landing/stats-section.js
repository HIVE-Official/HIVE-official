import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const defaultStats = [
    {
        value: "10+",
        label: "Partner Schools",
        description: "Universities and colleges across the region",
    },
    {
        value: "50+",
        label: "Student Communities",
        description: "Interest-based spaces for every passion",
    },
    {
        value: "100%",
        label: "Student Built",
        description: "Designed by students, for students",
    },
    {
        value: "24/7",
        label: "Campus Connection",
        description: "Real-time engagement around the clock",
    },
];
export const StatsSection = ({ stats = defaultStats, className = "", }) => {
    return (_jsx("section", { className: `py-16 px-6 bg-surface ${className}`, children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsxs("h2", { className: "text-3xl font-black font-display text-foreground mb-4", children: ["Campus energy in", _jsx("span", { className: "text-accent", children: " real numbers" })] }), _jsx("p", { className: "text-lg text-muted max-w-2xl mx-auto", children: "Building the future of campus community, one connection at a time." })] }), _jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-8", children: stats.map((stat) => (_jsxs("div", { className: "text-center p-6 rounded-lg bg-background border border-border hover:border-accent/30 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]", children: [_jsx("div", { className: "mb-3", children: _jsx("span", { className: "text-4xl font-black font-display text-accent", children: stat.value }) }), _jsx("h3", { className: "font-display font-semibold text-foreground text-lg mb-2", children: stat.label }), stat.description && (_jsx("p", { className: "text-sm text-muted", children: stat.description }))] }, stat.label))) })] }) }));
};
//# sourceMappingURL=stats-section.js.map