import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveButton, HiveCard } from '../../components';
// Temporary placeholder component for debugging
const PlaceholderMotion = ({ children }) => _jsx("div", { className: "motion-wrapper", children: children });
const meta = {
    title: '04-Hive/Hive Motion Wrapper',
    component: PlaceholderMotion,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**Advanced motion wrapper with liquid metal effects (Debugging Mode)**

Specialized motion wrapper component that applies HIVE's signature liquid metal physics and magnetic interactions to any content. Core component for creating premium campus infrastructure feel.

## When to Use
- Wrapping tool components for magnetic assembly
- Adding liquid metal interactions to Space elements
- Creating ripple effects on touch interactions
- Orchestrated animations for Builder workflows

## Design Principles
- **Liquid Metal Physics**: Smooth, substantial motion that feels premium
- **Magnetic Interactions**: Elements attract and snap with realistic physics
- **Ripple Effects**: Touch feedback that spreads like liquid metal
- **Orchestrated Timing**: Coordinated animations across multiple elements

## Accessibility
- WCAG 2.1 AA compliant motion with reduced motion support
- Meaningful motion that enhances rather than distracts
- Clear visual feedback for interactive states
- Keyboard interaction support
        `
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
export const BasicMotion = {
    render: () => (_jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "font-semibold", children: "Motion Components (Debugging)" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [_jsx(PlaceholderMotion, { children: _jsx(HiveButton, { className: "w-full h-16", children: "Button Motion" }) }), _jsx(PlaceholderMotion, { children: _jsx(HiveCard, { className: "p-4 cursor-pointer hover:border-hive-accent transition-colors", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl mb-2", children: "\uD83D\uDCCA" }), _jsx("div", { className: "text-sm", children: "Card Motion" })] }) }) }), _jsx(PlaceholderMotion, { children: _jsx("div", { className: "h-16 bg-hive-accent rounded-lg flex items-center justify-center cursor-pointer", children: _jsx("span", { className: "text-[var(--hive-background-primary)] font-medium", children: "Custom Element" }) }) })] }), _jsx("div", { className: "mt-8 p-4 bg-hive-background-muted rounded-lg", children: _jsxs("p", { className: "text-sm text-hive-foreground-muted", children: [_jsx("strong", { children: "Note:" }), " This story is in debugging mode. The actual motion components are temporarily disabled while we resolve import issues with the Framer Motion dependencies."] }) })] }))
};
export const PlaceholderDemo = {
    render: () => (_jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "font-semibold", children: "Motion System Development" }), _jsxs("div", { className: "p-6 border border-hive-border rounded-lg", children: [_jsx("h4", { className: "font-medium mb-4", children: "Available Motion Components" }), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("h5", { className: "font-medium mb-2", children: "Core Components:" }), _jsxs("ul", { className: "space-y-1 text-hive-foreground-muted", children: [_jsx("li", { children: "\u2022 HiveRipple - Touch feedback" }), _jsx("li", { children: "\u2022 HiveMagneticHover - Hover interactions" }), _jsx("li", { children: "\u2022 HiveCascade - Sequential reveals" }), _jsx("li", { children: "\u2022 HiveFloat - Weightless animations" })] })] }), _jsxs("div", { children: [_jsx("h5", { className: "font-medium mb-2", children: "Advanced Effects:" }), _jsxs("ul", { className: "space-y-1 text-hive-foreground-muted", children: [_jsx("li", { children: "\u2022 HiveShimmer - Loading states" }), _jsx("li", { children: "\u2022 HiveGlowPulse - Status indicators" }), _jsx("li", { children: "\u2022 HivePageTransition - View changes" }), _jsx("li", { children: "\u2022 HiveToolPlant - Tool dropping" })] })] })] })] })] }))
};
//# sourceMappingURL=hive-motion-wrapper.stories.js.map