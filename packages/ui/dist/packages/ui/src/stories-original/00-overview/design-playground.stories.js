import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HiveButton, HiveCard, HiveBadge } from '../../components';
import { Palette, Sliders, Eye, Code } from 'lucide-react';
const meta = {
    title: '00-Overview/Design Playground',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Interactive playground to experiment with HIVE design tokens and see live results.',
            },
        },
    },
};
export default meta;
export const InteractivePlayground = {
    render: () => {
        const [selectedTokens, setSelectedTokens] = useState({
            primaryColor: 'var(--hive-brand-secondary)',
            backgroundColor: 'var(--hive-background-primary)',
            textColor: 'var(--hive-text-primary)',
            borderRadius: '1rem',
            spacing: '1.5rem',
            motionDuration: '0.4s',
        });
        const [currentComponent, setCurrentComponent] = useState('button');
        const tokenOptions = {
            primaryColor: ['var(--hive-brand-secondary)', 'var(--hive-status-success)', 'var(--hive-status-info)', 'var(--hive-status-error)', 'var(--hive-status-info)'],
            backgroundColor: ['var(--hive-background-primary)', 'var(--hive-background-secondary)', 'var(--hive-background-tertiary)', 'var(--hive-background-interactive)'],
            textColor: ['var(--hive-text-primary)', 'var(--hive-text-secondary)', 'var(--hive-text-tertiary)', 'var(--hive-brand-secondary)'],
            borderRadius: ['0.5rem', '0.75rem', '1rem', '1.5rem', '2rem'],
            spacing: ['0.5rem', '1rem', '1.5rem', '2rem', '2.5rem'],
            motionDuration: ['0.2s', '0.4s', '0.6s', '0.8s', '1.2s'],
        };
        return (_jsx("div", { className: "bg-[var(--hive-background-primary)] min-h-screen p-8", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsxs("h1", { className: "text-4xl font-bold text-[var(--hive-text-primary)] mb-4 flex items-center justify-center", children: [_jsx(Palette, { className: "w-10 h-10 mr-4 text-[var(--hive-brand-secondary)]" }), "Design Token Playground"] }), _jsx("p", { className: "text-lg text-[var(--hive-text-secondary)] max-w-3xl mx-auto", children: "Experiment with HIVE design tokens in real-time. Adjust colors, spacing, motion, and see how they affect components instantly." })] }), _jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-8", children: [_jsx("div", { className: "xl:col-span-1", children: _jsxs(HiveCard, { variant: "default", size: "lg", children: [_jsxs("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-6 flex items-center", children: [_jsx(Sliders, { className: "w-5 h-5 mr-2 text-[var(--hive-brand-secondary)]" }), "Design Controls"] }), _jsxs("div", { className: "mb-6", children: [_jsx("label", { className: "text-sm font-medium text-[var(--hive-text-secondary)] mb-3 block", children: "Component Type" }), _jsx("div", { className: "flex gap-2 flex-wrap", children: ['button', 'card', 'input', 'badge'].map((comp) => (_jsx(HiveButton, { variant: currentComponent === comp ? 'primary' : 'outline', size: "sm", onClick: () => setCurrentComponent(comp), children: comp.charAt(0).toUpperCase() + comp.slice(1) }, comp))) })] }), _jsx("div", { className: "space-y-6", children: Object.entries(tokenOptions).map(([tokenName, options]) => (_jsxs("div", { children: [_jsx("label", { className: "text-sm font-medium text-[var(--hive-text-secondary)] mb-3 block capitalize", children: tokenName.replace(/([A-Z])/g, ' $1').trim() }), _jsx("div", { className: "grid grid-cols-5 gap-2", children: options.map((option) => (_jsx("button", { className: `
                              h-8 rounded-lg border transition-all
                              ${selectedTokens[tokenName] === option
                                                                ? 'border-[var(--hive-brand-secondary)] ring-2 ring-[var(--hive-brand-secondary)]/30'
                                                                : 'border-[var(--hive-border-default)] hover:border-[var(--hive-brand-secondary)]/50'}
                            `, style: {
                                                                backgroundColor: tokenName.includes('Color') ? option : 'var(--hive-background-tertiary)',
                                                                color: tokenName === 'textColor' ? option : 'var(--hive-text-tertiary)'
                                                            }, onClick: () => setSelectedTokens(prev => ({
                                                                ...prev,
                                                                [tokenName]: option
                                                            })), children: tokenName.includes('Color') ? '' : option }, option))) })] }, tokenName))) }), _jsx("div", { className: "mt-8 pt-6 border-t border-[var(--hive-border-default)]", children: _jsx(HiveButton, { variant: "outline", onClick: () => setSelectedTokens({
                                                    primaryColor: 'var(--hive-brand-secondary)',
                                                    backgroundColor: 'var(--hive-background-primary)',
                                                    textColor: 'var(--hive-text-primary)',
                                                    borderRadius: '1rem',
                                                    spacing: '1.5rem',
                                                    motionDuration: '0.4s',
                                                }), className: "w-full", children: "Reset to Defaults" }) })] }) }), _jsx("div", { className: "xl:col-span-2", children: _jsxs(HiveCard, { variant: "elevated", size: "lg", children: [_jsxs("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)] mb-6 flex items-center", children: [_jsx(Eye, { className: "w-5 h-5 mr-2 text-[var(--hive-brand-secondary)]" }), "Live Preview"] }), _jsx("div", { className: "min-h-100 rounded-xl border border-[var(--hive-border-default)] p-8 flex items-center justify-center", style: {
                                                backgroundColor: selectedTokens.backgroundColor,
                                                padding: selectedTokens.spacing
                                            }, children: _jsxs("div", { className: "flex flex-col items-center gap-6", children: [currentComponent === 'button' && (_jsxs("div", { className: "flex flex-col gap-4 items-center", children: [_jsx("button", { className: "px-6 py-3 font-medium transition-all duration-300 hover:scale-105", style: {
                                                                    backgroundColor: selectedTokens.primaryColor,
                                                                    color: selectedTokens.backgroundColor,
                                                                    borderRadius: selectedTokens.borderRadius,
                                                                    transitionDuration: selectedTokens.motionDuration,
                                                                }, children: "Primary Button" }), _jsx("button", { className: "px-6 py-3 font-medium transition-all duration-300 hover:scale-105 border-2", style: {
                                                                    backgroundColor: 'transparent',
                                                                    color: selectedTokens.primaryColor,
                                                                    borderColor: selectedTokens.primaryColor,
                                                                    borderRadius: selectedTokens.borderRadius,
                                                                    transitionDuration: selectedTokens.motionDuration,
                                                                }, children: "Outline Button" })] })), currentComponent === 'card' && (_jsxs("div", { className: "w-80 p-6 border border-[var(--hive-border-default)] backdrop-blur-sm", style: {
                                                            backgroundColor: `${selectedTokens.primaryColor}10`,
                                                            borderColor: `${selectedTokens.primaryColor}30`,
                                                            borderRadius: selectedTokens.borderRadius,
                                                            padding: selectedTokens.spacing,
                                                        }, children: [_jsx("h3", { className: "text-lg font-semibold mb-2", style: { color: selectedTokens.textColor }, children: "Sample Card" }), _jsx("p", { className: "text-sm opacity-80", style: { color: selectedTokens.textColor }, children: "This card demonstrates how the selected tokens affect component appearance." }), _jsx("div", { className: "mt-4", children: _jsx("span", { className: "inline-block px-3 py-1 text-xs font-medium rounded-full", style: {
                                                                        backgroundColor: selectedTokens.primaryColor,
                                                                        color: selectedTokens.backgroundColor,
                                                                        borderRadius: selectedTokens.borderRadius,
                                                                    }, children: "Tag" }) })] })), currentComponent === 'input' && (_jsx("div", { className: "w-80", children: _jsx("input", { type: "text", placeholder: "Enter some text...", className: "w-full px-4 py-3 border border-[var(--hive-border-default)] focus:outline-none focus:ring-2 transition-all", style: {
                                                                backgroundColor: `${selectedTokens.backgroundColor}80`,
                                                                color: selectedTokens.textColor,
                                                                borderRadius: selectedTokens.borderRadius,
                                                                borderColor: `${selectedTokens.primaryColor}30`,
                                                                transitionDuration: selectedTokens.motionDuration,
                                                            } }) })), currentComponent === 'badge' && (_jsx("div", { className: "flex gap-3 flex-wrap justify-center", children: ['Default', 'Success', 'Warning', 'Error'].map((type, index) => (_jsx("span", { className: "inline-flex items-center px-3 py-1 text-sm font-medium", style: {
                                                                backgroundColor: index === 0 ? selectedTokens.primaryColor :
                                                                    index === 1 ? 'var(--hive-status-success)' :
                                                                        index === 2 ? 'var(--hive-status-warning)' : 'var(--hive-status-error)',
                                                                color: selectedTokens.backgroundColor,
                                                                borderRadius: selectedTokens.borderRadius,
                                                            }, children: type }, type))) })), _jsxs("div", { className: "mt-8 p-4 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-default)] w-full max-w-md", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-secondary)] mb-3", children: "Current Values" }), _jsx("div", { className: "space-y-2 text-xs font-mono", children: Object.entries(selectedTokens).map(([key, value]) => (_jsxs("div", { className: "flex justify-between", children: [_jsxs("span", { className: "text-[var(--hive-text-tertiary)]", children: [key, ":"] }), _jsx("span", { className: "text-[var(--hive-brand-secondary)]", children: value })] }, key))) })] })] }) }), _jsxs("div", { className: "mt-8", children: [_jsxs("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4 flex items-center", children: [_jsx(Code, { className: "w-5 h-5 mr-2 text-[var(--hive-brand-secondary)]" }), "Generated CSS Custom Properties"] }), _jsx("div", { className: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-4 overflow-x-auto", children: _jsx("pre", { className: "text-sm font-mono text-[var(--hive-text-secondary)]", children: `:root {
  --hive-brand-primary: ${selectedTokens.primaryColor};
  --hive-background-primary: ${selectedTokens.backgroundColor};
  --hive-text-primary: ${selectedTokens.textColor};
  --hive-radius-default: ${selectedTokens.borderRadius};
  --hive-spacing-default: ${selectedTokens.spacing};
  --hive-duration-smooth: ${selectedTokens.motionDuration};
}` }) })] })] }) })] }), _jsxs("div", { className: "mt-12", children: [_jsx("h2", { className: "text-3xl font-bold text-[var(--hive-text-primary)] mb-8 text-center", children: "Real-World Usage Examples" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs(HiveCard, { variant: "gold-accent", size: "default", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-3", children: "Campus Infrastructure" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm mb-4", children: "These tokens create the foundation for premium campus infrastructure that students trust and rely on daily." }), _jsx(HiveBadge, { variant: "gold", size: "sm", children: "Infrastructure" })] }), _jsxs(HiveCard, { variant: "default", size: "default", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-3", children: "Tool Building" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm mb-4", children: "Consistent tokens ensure all student-created Tools feel native to the HIVE platform and maintain quality standards." }), _jsx(HiveBadge, { variant: "success", size: "sm", children: "Tools" })] }), _jsxs(HiveCard, { variant: "default", size: "default", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-3", children: "Space Activation" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] text-sm mb-4", children: "Motion and color tokens create smooth transitions during Space activation and community growth phases." }), _jsx(HiveBadge, { variant: "info", size: "sm", children: "Spaces" })] })] })] })] }) }));
    },
    parameters: {
        layout: 'fullscreen',
    },
};
//# sourceMappingURL=design-playground.stories.js.map