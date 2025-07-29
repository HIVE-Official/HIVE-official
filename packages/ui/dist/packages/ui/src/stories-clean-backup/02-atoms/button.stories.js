import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../../atomic/atoms/button';
import { Icon, Plus, Heart, Settings, Download } from '../../atomic/atoms';
const meta = {
    title: '02-Atoms/Button',
    component: Button,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
# Button Atom

Core button component using 100% semantic tokens (var(--hive-*)).

## Variants
- **Primary**: Main actions using brand-primary (#0070F3)
- **Secondary**: Subtle actions with borders
- **Ghost**: Minimal hover states
- **Accent**: Gold emphasis for special actions (#FFD700)
- **Destructive**: Error actions
- **Outline**: Bordered variant

## Design Principles
- Uses only semantic tokens (no hardcoded colors)
- Mobile-first responsive design
- Subtle hover/focus states
- Apple-inspired generous border radius (16px)
        `,
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'ghost', 'accent', 'destructive', 'outline'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'icon'],
        },
        loading: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
    tags: ['autodocs'],
};
export default meta;
export const AllVariants = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-[var(--hive-text-primary)]", children: "Button Variants" }), _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsx(Button, { variant: "primary", children: "Primary" }), _jsx(Button, { variant: "secondary", children: "Secondary" }), _jsx(Button, { variant: "ghost", children: "Ghost" }), _jsx(Button, { variant: "accent", children: "Gold Accent" }), _jsx(Button, { variant: "destructive", children: "Destructive" }), _jsx(Button, { variant: "outline", children: "Outline" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-[var(--hive-text-primary)]", children: "Button Sizes" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { size: "sm", children: "Small" }), _jsx(Button, { size: "md", children: "Medium" }), _jsx(Button, { size: "lg", children: "Large" }), _jsx(Button, { size: "icon", children: _jsx(Icon, { icon: Plus }) })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-[var(--hive-text-primary)]", children: "With Icons" }), _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsx(Button, { icon: _jsx(Icon, { icon: Plus }), children: "Add Space" }), _jsx(Button, { variant: "secondary", icon: _jsx(Icon, { icon: Heart }), children: "Like" }), _jsx(Button, { variant: "ghost", icon: _jsx(Icon, { icon: Settings }), iconPosition: "right", children: "Settings" }), _jsx(Button, { variant: "accent", icon: _jsx(Icon, { icon: Download }), children: "Download" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-[var(--hive-text-primary)]", children: "States" }), _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsx(Button, { loading: true, children: "Loading" }), _jsx(Button, { disabled: true, children: "Disabled" }), _jsx(Button, { fullWidth: true, children: "Full Width" })] })] })] })),
};
export const Primary = {
    args: {
        children: 'Join Space',
        variant: 'primary',
    },
};
export const Accent = {
    args: {
        children: 'Create Tool',
        variant: 'accent',
    },
    parameters: {
        docs: {
            description: {
                story: 'Gold accent button using semantic token var(--hive-brand-secondary) = #FFD700. Use sparingly for special emphasis.',
            },
        },
    },
};
export const Interactive = {
    render: () => (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Hover and click these buttons to see interactions:" }), _jsxs("div", { className: "flex gap-4", children: [_jsx(Button, { variant: "primary", children: "Hover Me" }), _jsx(Button, { variant: "accent", children: "Click Me" }), _jsx(Button, { variant: "secondary", children: "Press Me" })] })] })),
};
//# sourceMappingURL=button.stories.js.map