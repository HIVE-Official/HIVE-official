import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { HiveCard, HiveButton, HiveBadge } from '../../components';
const meta = {
    title: '01-Foundation/Theme System',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**HIVE's Dark Luxury Theme System**

A sophisticated design token system implementing HIVE's "matte obsidian glass" aesthetic. Creates the premium campus infrastructure feel that positions HIVE as serious academic platform.

## Theme Philosophy
- **Matte Obsidian Glass**: Dark luxury aesthetic inspired by matte black sports cars
- **Campus Infrastructure**: Colors that feel substantial and trustworthy for university platform
- **Premium Without Flashy**: Sophisticated luxury that doesn't distract from productivity
- **Builder Empowerment**: Visual language that makes students feel like powerful creators

## Color Psychology
- **Deep Blacks**: Convey seriousness and professional quality
- **Warm Golds**: Add premium accents without being flashy
- **Neutral Grays**: Create sophisticated information hierarchy
- **Status Colors**: Refined versions that maintain luxury feel

## Design Token Architecture
- **Semantic Naming**: Tokens named by purpose, not appearance
- **Theme Variants**: Support for different luxury variations
- **Accessibility Compliance**: WCAG 2.1 AA contrast ratios maintained
- **CSS Custom Properties**: Runtime theming capability

## Brand Differentiation
The theme system ensures HIVE tools are instantly recognizable when shared across campus, creating natural brand awareness and quality signaling.
        `
            }
        }
    },
    tags: ['autodocs'],
};
export default meta;
// Design token examples
const colorTokens = {
    primary: {
        'hive-background': 'var(--hive-background-primary)',
        'hive-background-card': '#111114',
        'hive-background-muted': '#1A1A1E',
        'hive-background-subtle': '#222228'
    },
    accent: {
        'hive-accent': 'var(--hive-brand-secondary)',
        'hive-accent-muted': '#E6C200',
        'hive-accent-subtle': '#4D4000'
    },
    foreground: {
        'hive-foreground': '#FAFAFA',
        'hive-foreground-muted': 'var(--hive-text-tertiary)',
        'hive-foreground-subtle': 'var(--hive-text-disabled)'
    },
    semantic: {
        'hive-success': 'var(--hive-status-success)',
        'hive-warning': 'var(--hive-status-warning)',
        'hive-destructive': 'var(--hive-status-error)',
        'hive-info': 'var(--hive-status-info)'
    },
    borders: {
        'hive-border': '#27272A',
        'hive-border-muted': '#1F1F23'
    }
};
const spacingTokens = {
    'hive-spacing-xs': '0.25rem',
    'hive-spacing-sm': '0.5rem',
    'hive-spacing-md': '0.75rem',
    'hive-spacing-lg': '1rem',
    'hive-spacing-xl': '1.25rem',
    'hive-spacing-2xl': '1.5rem',
    'hive-spacing-3xl': '2rem',
    'hive-spacing-4xl': '2.5rem',
    'hive-spacing-5xl': '3rem',
    'hive-spacing-6xl': '4rem',
    'hive-spacing-7xl': '5rem',
    'hive-spacing-8xl': '6rem',
    'hive-spacing-9xl': 'max-h-32'
};
const typographyTokens = {
    'hive-text-xs': '0.75rem',
    'hive-text-sm': '0.875rem',
    'hive-text-base': '1rem',
    'hive-text-lg': '1.125rem',
    'hive-text-xl': '1.25rem',
    'hive-text-2xl': '1.5rem',
    'hive-text-3xl': '1.875rem',
    'hive-text-4xl': '2.25rem',
    'hive-text-5xl': '3rem',
    'hive-text-6xl': '3.75rem'
};
export const ColorPalette = {
    render: () => (_jsx("div", { className: "space-y-8", children: Object.entries(colorTokens).map(([category, colors]) => (_jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold mb-4 capitalize", children: [category, " Colors"] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: Object.entries(colors).map(([name, value]) => (_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "w-full h-16 rounded-lg border border-hive-border", style: { backgroundColor: value } }), _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "text-sm font-medium", children: name }), _jsx("div", { className: "text-xs text-muted-foreground font-mono", children: value })] })] }, name))) })] }, category))) }))
};
export const SpacingScale = {
    render: () => (_jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Spacing Tokens" }), _jsx("div", { className: "space-y-4", children: Object.entries(spacingTokens).map(([name, value]) => (_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-32 text-sm font-mono", children: name }), _jsx("div", { className: "text-sm text-muted-foreground w-16", children: value }), _jsx("div", { className: "bg-hive-accent rounded", style: { width: value, height: '1rem' } })] }, name))) })] }))
};
export const TypographyScale = {
    render: () => (_jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Typography Tokens" }), _jsx("div", { className: "space-y-4", children: Object.entries(typographyTokens).map(([name, value]) => (_jsxs("div", { className: "flex items-center gap-8", children: [_jsx("div", { className: "w-32 text-sm font-mono", children: name }), _jsx("div", { className: "text-sm text-muted-foreground w-16", children: value }), _jsx("div", { style: { fontSize: value }, className: "font-medium", children: "The quick brown fox jumps over the lazy dog" })] }, name))) })] }))
};
export const ComponentShowcase = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Theme in Action" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs(HiveCard, { className: "p-6", children: [_jsx("h4", { className: "font-semibold mb-2", children: "Tool Performance" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Active Users" }), _jsx(HiveBadge, { variant: "success", children: "+28%" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Response Time" }), _jsx(HiveBadge, { variant: "default", children: "156ms" })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm", children: "Error Rate" }), _jsx(HiveBadge, { variant: "destructive", children: "0.02%" })] })] })] }), _jsxs(HiveCard, { className: "p-6", children: [_jsx("h4", { className: "font-semibold mb-2", children: "Space Activity" }), _jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "text-3xl font-bold text-hive-accent", children: "2,156" }), _jsx("div", { className: "text-sm text-hive-foreground-muted", children: "Total Members" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { size: "sm", children: "Join Space" }), _jsx(HiveButton, { size: "sm", variant: "outline", children: "Preview" })] })] })] }), _jsxs(HiveCard, { className: "p-6", children: [_jsx("h4", { className: "font-semibold mb-2", children: "Builder Status" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-hive-accent rounded-full" }), _jsx("span", { className: "text-sm", children: "Active in HiveLAB" })] }), _jsx("div", { className: "text-sm text-hive-foreground-muted", children: "Building: Study Timer Pro" }), _jsx(HiveButton, { size: "sm", className: "w-full", children: "Continue Building" })] })] })] })] }))
};
export const SemanticColors = {
    render: () => (_jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Semantic Color Usage" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium", children: "Status Indicators" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-3 p-3 border border-hive-border rounded-lg", children: [_jsx("div", { className: "w-3 h-3 bg-hive-success rounded-full" }), _jsx("span", { className: "text-sm", children: "Tool Build Successful" })] }), _jsxs("div", { className: "flex items-center gap-3 p-3 border border-hive-border rounded-lg", children: [_jsx("div", { className: "w-3 h-3 bg-hive-warning rounded-full" }), _jsx("span", { className: "text-sm", children: "Space Activation Pending" })] }), _jsxs("div", { className: "flex items-center gap-3 p-3 border border-hive-border rounded-lg", children: [_jsx("div", { className: "w-3 h-3 bg-hive-destructive rounded-full" }), _jsx("span", { className: "text-sm", children: "Build Failed" })] }), _jsxs("div", { className: "flex items-center gap-3 p-3 border border-hive-border rounded-lg", children: [_jsx("div", { className: "w-3 h-3 bg-hive-info rounded-full" }), _jsx("span", { className: "text-sm", children: "New Elements Available" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium", children: "Action Buttons" }), _jsxs("div", { className: "space-y-2", children: [_jsx(HiveButton, { className: "w-full", variant: "default", children: "Primary Action" }), _jsx(HiveButton, { className: "w-full", variant: "outline", children: "Secondary Action" }), _jsx(HiveButton, { className: "w-full", variant: "destructive", children: "Destructive Action" }), _jsx(HiveButton, { className: "w-full", variant: "ghost", children: "Ghost Action" })] })] })] })] }))
};
export const DarkLuxuryVariants = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Dark Luxury Variations" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium", children: "Matte Obsidian (Default)" }), _jsx("div", { className: "p-6 bg-hive-background-card border border-hive-border rounded-lg", children: _jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "font-semibold", children: "Study Timer Pro" }), _jsx("div", { className: "text-sm text-hive-foreground-muted", children: "Advanced pomodoro timer with analytics" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveBadge, { variant: "default", children: "Productivity" }), _jsx(HiveBadge, { variant: "success", children: "Popular" })] })] }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium", children: "Charcoal Variant" }), _jsx("div", { className: "p-6 rounded-lg border", style: {
                                    backgroundColor: '#16161A',
                                    borderColor: '#2A2A30',
                                    color: '#F5F5F5'
                                }, children: _jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "font-semibold", children: "GPA Calculator" }), _jsx("div", { className: "text-sm opacity-75", children: "Track your academic performance" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("span", { className: "px-2 py-1 bg-zinc-700 text-xs rounded", children: "Academic" }), _jsx("span", { className: "px-2 py-1 bg-green-700 text-xs rounded", children: "Trending" })] })] }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium", children: "Graphite Variant" }), _jsx("div", { className: "p-6 rounded-lg border", style: {
                                    backgroundColor: '#1C1C21',
                                    borderColor: '#333338',
                                    color: '#FAFAFA'
                                }, children: _jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "font-semibold", children: "Schedule Maker" }), _jsx("div", { className: "text-sm opacity-75", children: "Optimize your class schedule" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("span", { className: "px-2 py-1 bg-slate-700 text-xs rounded", children: "Planning" }), _jsx("span", { className: "px-2 py-1 bg-blue-700 text-xs rounded", children: "New" })] })] }) })] })] })] }))
};
export const AccessibilityCompliance = {
    render: () => (_jsxs("div", { className: "space-y-6", children: [_jsx("h3", { className: "text-lg font-semibold", children: "WCAG 2.1 AA Compliance" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium", children: "Contrast Ratios" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center p-3 border border-hive-border rounded-lg", children: [_jsx("span", { className: "text-sm", children: "Primary Text" }), _jsx("span", { className: "text-xs bg-green-100 text-green-800 px-2 py-1 rounded", children: "15.8:1 \u2713" })] }), _jsxs("div", { className: "flex justify-between items-center p-3 border border-hive-border rounded-lg", children: [_jsx("span", { className: "text-sm text-hive-foreground-muted", children: "Secondary Text" }), _jsx("span", { className: "text-xs bg-green-100 text-green-800 px-2 py-1 rounded", children: "9.2:1 \u2713" })] }), _jsxs("div", { className: "flex justify-between items-center p-3 border border-hive-border rounded-lg", children: [_jsx("span", { className: "text-sm text-hive-accent", children: "Accent Text" }), _jsx("span", { className: "text-xs bg-green-100 text-green-800 px-2 py-1 rounded", children: "11.3:1 \u2713" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium", children: "Interactive Elements" }), _jsxs("div", { className: "space-y-3", children: [_jsx(HiveButton, { className: "w-full focus:ring-2 focus:ring-hive-accent focus:ring-offset-2 focus:ring-offset-hive-background", children: "Focus Visible Button" }), _jsx("div", { className: "relative", children: _jsx("input", { type: "text", placeholder: "Focus visible input", className: "w-full p-3 bg-hive-background-card border border-hive-border rounded-lg focus:ring-2 focus:ring-hive-accent focus:ring-offset-2 focus:ring-offset-hive-background focus:border-hive-accent" }) }), _jsx("div", { className: "text-xs text-hive-foreground-muted", children: "All interactive elements have clear focus indicators with gold outline" })] })] })] })] }))
};
//# sourceMappingURL=theme-system.stories.js.map