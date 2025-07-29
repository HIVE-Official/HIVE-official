import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HivePremiumButton, HivePremiumCard } from '../../components';
import { Star, Crown, Zap, Shield, Sparkles, Diamond, Trophy, Gem } from 'lucide-react';
const meta = {
    title: '05-Premium/Premium Components',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Premium variants of HIVE components with enhanced visual effects and luxury styling for pro features and premium experiences.',
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
export const PremiumButtons = {
    render: () => (_jsxs("div", { className: "grid grid-cols-2 gap-6 p-8", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Premium Buttons" }), _jsxs(HivePremiumButton, { size: "sm", children: [_jsx(Crown, { className: "w-4 h-4" }), "Upgrade Pro"] }), _jsxs(HivePremiumButton, { children: [_jsx(Star, { className: "w-4 h-4" }), "Premium Feature"] }), _jsxs(HivePremiumButton, { size: "lg", children: [_jsx(Zap, { className: "w-5 h-5" }), "Unlock Premium"] }), _jsxs(HivePremiumButton, { variant: "outline", children: [_jsx(Shield, { className: "w-4 h-4" }), "Premium Support"] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "States & Variants" }), _jsxs(HivePremiumButton, { disabled: true, children: [_jsx(Sparkles, { className: "w-4 h-4" }), "Disabled State"] }), _jsxs(HivePremiumButton, { variant: "ghost", children: [_jsx(Diamond, { className: "w-4 h-4" }), "Ghost Premium"] }), _jsxs(HivePremiumButton, { className: "w-full", children: [_jsx(Trophy, { className: "w-4 h-4" }), "Full Width Premium"] })] })] })),
};
export const PremiumCards = {
    render: () => (_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 p-8 max-w-6xl", children: [_jsxs(HivePremiumCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx(Crown, { className: "w-6 h-6 text-amber-400" }), _jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)]", children: "Premium Space" })] }), _jsx("p", { className: "text-gray-300 mb-4", children: "Unlock advanced analytics, priority support, and exclusive features for your space." }), _jsxs(HivePremiumButton, { size: "sm", children: [_jsx(Gem, { className: "w-4 h-4" }), "Upgrade Now"] })] }), _jsxs(HivePremiumCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx(Zap, { className: "w-6 h-6 text-blue-400" }), _jsx("h3", { className: "text-xl font-bold text-[var(--hive-text-primary)]", children: "Pro Tools" })] }), _jsx("p", { className: "text-gray-300 mb-4", children: "Access premium tool templates and advanced customization options." }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HivePremiumButton, { size: "sm", variant: "outline", children: "Learn More" }), _jsx(HivePremiumButton, { size: "sm", children: "Get Pro" })] })] }), _jsx(HivePremiumCard, { className: "p-6 lg:col-span-2", children: _jsxs("div", { className: "text-center", children: [_jsx(Star, { className: "w-8 h-8 text-yellow-400 mx-auto mb-4" }), _jsx("h3", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-2", children: "Premium Experience" }), _jsx("p", { className: "text-gray-300 mb-6 max-w-2xl mx-auto", children: "Elevate your campus experience with premium features, priority support, and exclusive access to beta tools and advanced analytics." }), _jsxs(HivePremiumButton, { size: "lg", children: [_jsx(Trophy, { className: "w-5 h-5" }), "Start Premium Trial"] })] }) })] })),
};
export const PremiumFeatureShowcase = {
    render: () => (_jsxs("div", { className: "p-8 space-y-8 max-w-4xl", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Premium Components" }), _jsx("p", { className: "text-gray-400", children: "Enhanced components with luxury styling and premium effects" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
                    { icon: Shield, title: "Premium Security", desc: "Enhanced protection" },
                    { icon: Zap, title: "Lightning Fast", desc: "Priority processing" },
                    { icon: Crown, title: "VIP Access", desc: "Exclusive features" },
                ].map((feature, i) => (_jsxs(HivePremiumCard, { className: "p-6 text-center", children: [_jsx(feature.icon, { className: "w-8 h-8 mx-auto mb-4 text-amber-400" }), _jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)] mb-2", children: feature.title }), _jsx("p", { className: "text-gray-400 text-sm mb-4", children: feature.desc }), _jsx(HivePremiumButton, { size: "sm", variant: "outline", className: "w-full", children: "Learn More" })] }, i))) })] })),
};
//# sourceMappingURL=premium-components.stories.js.map