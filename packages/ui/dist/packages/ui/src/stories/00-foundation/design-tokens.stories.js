import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const meta = {
    title: '00-Foundation/Design Tokens',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
# HIVE Design Tokens

Complete semantic token system powering the HIVE platform design system.

## Token Categories

### Colors
- **Brand Colors**: Primary blue (#0070F3), secondary gold (#FFD700)
- **Surface Colors**: Background, foreground, and surface variations
- **Text Colors**: Primary, secondary, tertiary, and disabled states
- **Status Colors**: Success, warning, error, and info states
- **Border Colors**: Default, muted, and interactive borders

### Typography
- **Font Families**: Sans, mono, and display fonts
- **Font Sizes**: 12px to 48px responsive scale
- **Font Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Line Heights**: Optimized for readability and density

### Spacing
- **Scale**: 4px base unit (0.25rem) with powers of 2
- **Breakpoints**: Mobile-first responsive design
- **Layout**: Container, section, and component spacing

### Elevation
- **Shadows**: Subtle depth for cards and overlays
- **Z-Index**: Layering system for modals, dropdowns, and overlays

## Usage Guidelines

All HIVE components use semantic tokens exclusively. Never use hardcoded values.

**Good**: \`var(--hive-brand-primary)\`
**Bad**: \`#0070F3\`

This ensures consistency, theming support, and maintainability across the platform.
        `,
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
export const ColorTokens = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Brand Colors" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "w-full h-20 bg-[var(--hive-brand-primary)] rounded-lg border" }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Primary" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] font-mono text-xs", children: "--hive-brand-primary" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "w-full h-20 bg-[var(--hive-brand-secondary)] rounded-lg border" }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Secondary" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] font-mono text-xs", children: "--hive-brand-secondary" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "w-full h-20 bg-[var(--hive-brand-accent)] rounded-lg border" }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Accent" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] font-mono text-xs", children: "--hive-brand-accent" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "w-full h-20 bg-[var(--hive-brand-muted)] rounded-lg border" }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Muted" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] font-mono text-xs", children: "--hive-brand-muted" })] })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Surface Colors" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "w-full h-20 bg-[var(--hive-background-primary)] border rounded-lg" }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Background Primary" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] font-mono text-xs", children: "--hive-background-primary" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "w-full h-20 bg-[var(--hive-background-secondary)] border rounded-lg" }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Background Secondary" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] font-mono text-xs", children: "--hive-background-secondary" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "w-full h-20 bg-[var(--hive-surface-primary)] border rounded-lg" }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Surface Primary" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] font-mono text-xs", children: "--hive-surface-primary" })] })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Status Colors" }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "w-full h-20 bg-[var(--hive-status-success)] rounded-lg" }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Success" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] font-mono text-xs", children: "--hive-status-success" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "w-full h-20 bg-[var(--hive-status-warning)] rounded-lg" }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Warning" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] font-mono text-xs", children: "--hive-status-warning" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "w-full h-20 bg-[var(--hive-status-error)] rounded-lg" }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Error" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] font-mono text-xs", children: "--hive-status-error" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "w-full h-20 bg-[var(--hive-status-info)] rounded-lg" }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Info" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] font-mono text-xs", children: "--hive-status-info" })] })] })] })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Complete color token system with semantic naming for consistent theming.',
            },
        },
    },
};
export const TypographyTokens = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Text Colors" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-text-primary)] rounded border" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Primary Text" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] font-mono text-sm", children: "--hive-text-primary" })] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-text-secondary)] rounded border" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Secondary Text" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] font-mono text-sm", children: "--hive-text-secondary" })] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-8 h-8 bg-[var(--hive-text-tertiary)] rounded border" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: "Tertiary Text" }), _jsx("div", { className: "text-[var(--hive-text-secondary)] font-mono text-sm", children: "--hive-text-tertiary" })] })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Typography Scale" }), _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "text-4xl font-bold text-[var(--hive-text-primary)]", children: "Display Large (36px)" }), _jsx("div", { className: "text-3xl font-semibold text-[var(--hive-text-primary)]", children: "Heading 1 (30px)" }), _jsx("div", { className: "text-2xl font-semibold text-[var(--hive-text-primary)]", children: "Heading 2 (24px)" }), _jsx("div", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: "Heading 3 (20px)" }), _jsx("div", { className: "text-lg font-medium text-[var(--hive-text-primary)]", children: "Heading 4 (18px)" }), _jsx("div", { className: "text-base text-[var(--hive-text-primary)]", children: "Body Large (16px)" }), _jsx("div", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Body Small (14px)" }), _jsx("div", { className: "text-xs text-[var(--hive-text-tertiary)]", children: "Caption (12px)" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Font Weights" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-lg font-normal text-[var(--hive-text-primary)]", children: "Normal (400)" }), _jsx("div", { className: "text-lg font-medium text-[var(--hive-text-primary)]", children: "Medium (500)" }), _jsx("div", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Semibold (600)" }), _jsx("div", { className: "text-lg font-bold text-[var(--hive-text-primary)]", children: "Bold (700)" })] })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Typography system with semantic text colors and consistent scale.',
            },
        },
    },
};
export const SpacingTokens = {
    render: () => (_jsx("div", { className: "space-y-8", children: _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Spacing Scale" }), _jsx("div", { className: "space-y-4", children: [
                        { size: '0.25rem', name: '1', class: 'w-1' },
                        { size: '0.5rem', name: '2', class: 'w-2' },
                        { size: '0.75rem', name: '3', class: 'w-3' },
                        { size: '1rem', name: '4', class: 'w-4' },
                        { size: '1.25rem', name: '5', class: 'w-5' },
                        { size: '1.5rem', name: '6', class: 'w-6' },
                        { size: '2rem', name: '8', class: 'w-8' },
                        { size: '3rem', name: '12', class: 'w-12' },
                        { size: '4rem', name: '16', class: 'w-16' },
                        { size: '6rem', name: '24', class: 'w-24' },
                    ].map((item) => (_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: `${item.class} h-6 bg-[var(--hive-brand-primary)] rounded` }), _jsxs("div", { children: [_jsxs("div", { className: "font-medium text-[var(--hive-text-primary)]", children: ["Space ", item.name] }), _jsx("div", { className: "text-[var(--hive-text-secondary)] font-mono text-sm", children: item.size })] })] }, item.name))) })] }) })),
    parameters: {
        docs: {
            description: {
                story: 'Consistent spacing scale based on 4px (0.25rem) units.',
            },
        },
    },
};
export const BorderRadiusTokens = {
    render: () => (_jsx("div", { className: "space-y-8", children: _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Border Radius Scale" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: [
                        { name: 'None', class: 'rounded-none', value: '0px' },
                        { name: 'Small', class: 'rounded-sm', value: '2px' },
                        { name: 'Default', class: 'rounded', value: '4px' },
                        { name: 'Medium', class: 'rounded-md', value: '6px' },
                        { name: 'Large', class: 'rounded-lg', value: '8px' },
                        { name: 'XLarge', class: 'rounded-xl', value: '12px' },
                        { name: '2XLarge', class: 'rounded-2xl', value: '16px' },
                        { name: 'Full', class: 'rounded-full', value: '9999px' },
                    ].map((item) => (_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: `w-full h-16 bg-[var(--hive-surface-primary)] border ${item.class}` }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: item.name }), _jsx("div", { className: "text-[var(--hive-text-secondary)] font-mono text-xs", children: item.value })] })] }, item.name))) })] }) })),
    parameters: {
        docs: {
            description: {
                story: 'Border radius system from sharp to fully rounded corners.',
            },
        },
    },
};
export const ElevationTokens = {
    render: () => (_jsx("div", { className: "space-y-8", children: _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Shadow Elevation" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
                        { name: 'Small', class: 'shadow-sm', description: 'Subtle depth for buttons and inputs' },
                        { name: 'Default', class: 'shadow', description: 'Standard cards and components' },
                        { name: 'Medium', class: 'shadow-md', description: 'Elevated panels and dropdowns' },
                        { name: 'Large', class: 'shadow-lg', description: 'Modals and important overlays' },
                        { name: 'XLarge', class: 'shadow-xl', description: 'Major floating elements' },
                        { name: '2XLarge', class: 'shadow-2xl', description: 'Maximum elevation for focus' },
                    ].map((item) => (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: `w-full h-24 bg-[var(--hive-surface-primary)] rounded-lg ${item.class}` }), _jsxs("div", { children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)]", children: item.name }), _jsx("div", { className: "text-[var(--hive-text-secondary)] text-sm", children: item.description })] })] }, item.name))) })] }) })),
    parameters: {
        docs: {
            description: {
                story: 'Elevation system using shadows to create visual hierarchy.',
            },
        },
    },
};
//# sourceMappingURL=design-tokens.stories.js.map