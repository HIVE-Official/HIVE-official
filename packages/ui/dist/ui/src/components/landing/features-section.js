import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const defaultFeatures = [
    {
        icon: "🏫",
        title: "Campus Communities",
        description: "Connect with students from your school through verified, private communities built around shared interests.",
        highlight: true,
    },
    {
        icon: "⚡",
        title: "Real-time Engagement",
        description: "Join live discussions, share moments, and stay connected with what's happening on campus right now.",
    },
    {
        icon: "🎯",
        title: "Interest-Based Spaces",
        description: "Find your tribe through academic interests, hobbies, clubs, and activities that matter to you.",
    },
    {
        icon: "📚",
        title: "Academic Support",
        description: "Collaborate on projects, form study groups, and get help from peers in your courses.",
    },
    {
        icon: "🏆",
        title: "Achievement System",
        description: "Earn recognition for your contributions and celebrate milestones with your campus community.",
    },
    {
        icon: "🔒",
        title: "Privacy First",
        description: "School-exclusive communities with robust privacy controls and authentic student verification.",
    },
];
export const FeaturesSection = ({ features = defaultFeatures, className = "", }) => {
    return (_jsx("section", { className: `py-16 px-6 ${className}`, children: _jsxs("div", { className: "max-w-6xl mx-auto", children: [_jsxs("div", { className: "text-center mb-16", children: [_jsxs("h2", { className: "text-4xl font-black font-display text-foreground mb-4", children: ["Everything you need for", _jsx("br", {}), _jsx("span", { className: "text-accent", children: "campus connection" })] }), _jsx("p", { className: "text-xl text-muted max-w-2xl mx-auto", children: "Built specifically for student life, designed to enhance real connections and meaningful engagement." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: features.map((feature) => (_jsxs("div", { className: `p-6 rounded-lg border transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] hover:border-accent/30 ${feature.highlight
                            ? 'bg-surface border-accent/20 ring-1 ring-accent/10'
                            : 'bg-surface border-border hover:bg-surface/80'}`, children: [_jsxs("div", { className: "flex items-center space-x-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 bg-background rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-xl", children: feature.icon }) }), _jsx("h3", { className: "font-display font-semibold text-foreground text-lg", children: feature.title })] }), _jsx("p", { className: "text-muted leading-relaxed", children: feature.description })] }, feature.title))) })] }) }));
};
//# sourceMappingURL=features-section.js.map