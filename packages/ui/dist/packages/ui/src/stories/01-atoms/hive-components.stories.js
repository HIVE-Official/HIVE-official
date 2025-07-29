import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { HiveBadge } from '../../components/hive-badge';
const meta = {
    title: '01-Atoms/HIVE Components',
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
# HIVE Atomic Components

Core atomic components that form the foundation of the HIVE design system.

## Components

- **HiveButton**: Primary interaction element with multiple variants
- **HiveCard**: Container component for content organization
- **HiveBadge**: Status and notification indicators

## Design Principles

- Consistent semantic token usage
- Mobile-first responsive design
- Accessibility-first approach
- HIVE brand integration with gold accents
        `,
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
export const ButtonVariants = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Button Variants" }), _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsx(HiveButton, { variant: "primary", children: "Primary" }), _jsx(HiveButton, { variant: "secondary", children: "Secondary" }), _jsx(HiveButton, { variant: "outline", children: "Outline" }), _jsx(HiveButton, { variant: "ghost", children: "Ghost" }), _jsx(HiveButton, { variant: "destructive", children: "Destructive" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Button Sizes" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(HiveButton, { size: "sm", children: "Small" }), _jsx(HiveButton, { size: "md", children: "Medium" }), _jsx(HiveButton, { size: "lg", children: "Large" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Button States" }), _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsx(HiveButton, { children: "Normal" }), _jsx(HiveButton, { loading: true, children: "Loading" }), _jsx(HiveButton, { disabled: true, children: "Disabled" })] })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Different button variants, sizes, and states available in the HIVE design system.',
            },
        },
    },
};
export const CardShowcase = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Card Variants" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs(HiveCard, { children: [_jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)] mb-2", children: "Default Card" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "This is a default card with standard styling." })] }), _jsxs(HiveCard, { variant: "elevated", children: [_jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)] mb-2", children: "Elevated Card" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "This card has enhanced shadow and elevation." })] }), _jsxs(HiveCard, { variant: "outline", children: [_jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)] mb-2", children: "Outline Card" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "This card uses border styling instead of background." })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Interactive Card" }), _jsx("div", { className: "max-w-md", children: _jsxs(HiveCard, { interactive: true, children: [_jsx("h4", { className: "font-semibold text-[var(--hive-text-primary)] mb-2", children: "Clickable Card" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-4", children: "This card responds to hover and click interactions." }), _jsx(HiveButton, { size: "sm", children: "Action" })] }) })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Different card variants and interactive states.',
            },
        },
    },
};
export const BadgeShowcase = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Badge Variants" }), _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsx(HiveBadge, { variant: "default", children: "Default" }), _jsx(HiveBadge, { variant: "primary", children: "Primary" }), _jsx(HiveBadge, { variant: "secondary", children: "Secondary" }), _jsx(HiveBadge, { variant: "success", children: "Success" }), _jsx(HiveBadge, { variant: "warning", children: "Warning" }), _jsx(HiveBadge, { variant: "error", children: "Error" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Badge Sizes" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(HiveBadge, { size: "sm", children: "Small" }), _jsx(HiveBadge, { size: "md", children: "Medium" }), _jsx(HiveBadge, { size: "lg", children: "Large" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold mb-6 text-[var(--hive-text-primary)]", children: "Usage Examples" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-[var(--hive-text-primary)]", children: "Notifications" }), _jsx(HiveBadge, { variant: "error", children: "3" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-[var(--hive-text-primary)]", children: "Status" }), _jsx(HiveBadge, { variant: "success", children: "Online" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-[var(--hive-text-primary)]", children: "New Feature" }), _jsx(HiveBadge, { variant: "primary", children: "NEW" })] })] })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Badge components for status indicators and notifications.',
            },
        },
    },
};
//# sourceMappingURL=hive-components.stories.js.map