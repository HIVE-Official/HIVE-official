import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch } from '../../../atomic/atoms/switch';
import { Label } from '../../../atomic/atoms/label';
import { HiveCard } from '../../../components/hive-card';
const meta = {
    title: '02-atoms/Form Controls/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Switch Component** - A toggle control for binary choices

Part of the HIVE Atomic Design System with PRD-aligned styling and enhanced accessibility.

## Features
- **PRD-Aligned Colors**: Uses semantic blue-600 for active states
- **Accessibility**: Full ARIA support with proper focus management
- **Responsive**: Touch-friendly targets for mobile
- **Consistent**: Follows HIVE design token system
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'The controlled checked state of the switch'
        },
        defaultChecked: {
            control: 'boolean',
            description: 'The default checked state when uncontrolled'
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the switch is disabled'
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Switch size variant'
        },
        onCheckedChange: {
            action: 'checked changed',
            description: 'Callback when the checked state changes'
        }
    }
};
export default meta;
// Default Switch
export const Default = {
    args: {
        defaultChecked: false
    }
};
// Checked Switch
export const Checked = {
    args: {
        defaultChecked: true
    }
};
// Disabled States
export const Disabled = {
    args: {
        disabled: true,
        defaultChecked: false
    }
};
export const DisabledChecked = {
    args: {
        disabled: true,
        defaultChecked: true
    }
};
// Size Variants
export const SmallSize = {
    args: {
        size: 'sm',
        defaultChecked: true
    }
};
export const MediumSize = {
    args: {
        size: 'md',
        defaultChecked: true
    }
};
export const LargeSize = {
    args: {
        size: 'lg',
        defaultChecked: true
    }
};
// With Labels (Common Usage Pattern)
export const WithLabel = {
    render: () => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "notifications", defaultChecked: true }), _jsx(Label, { htmlFor: "notifications", children: "Enable notifications" })] }))
};
export const FormExample = {
    render: () => (_jsxs(HiveCard, { className: "p-6 space-y-4 max-w-md", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Privacy Settings" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "ghost-mode", className: "text-sm font-medium", children: "Ghost Mode" }), _jsx("p", { className: "text-xs text-gray-400", children: "Hide your online status" })] }), _jsx(Switch, { id: "ghost-mode" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "notifications", className: "text-sm font-medium", children: "Push Notifications" }), _jsx("p", { className: "text-xs text-gray-400", children: "Get alerts for important updates" })] }), _jsx(Switch, { id: "notifications", defaultChecked: true })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "analytics", className: "text-sm font-medium", children: "Analytics" }), _jsx("p", { className: "text-xs text-gray-400", children: "Help improve HIVE with usage data" })] }), _jsx(Switch, { id: "analytics", defaultChecked: true })] })] }))
};
// Accessibility Demo
export const AccessibilityDemo = {
    render: () => (_jsxs("div", { className: "space-y-4 max-w-md", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Accessibility Features" }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Keyboard navigation (Tab, Space, Enter)" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Screen reader support with ARIA labels" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Focus indicators" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Touch-friendly tap targets (44px minimum)" })] }), _jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "a11y-demo", children: "Accessible Switch" }), _jsx(Switch, { id: "a11y-demo", "aria-describedby": "a11y-help", defaultChecked: true })] }), _jsx("p", { id: "a11y-help", className: "text-xs text-gray-400 mt-1", children: "Tab to focus, Space to toggle" })] })] }))
};
//# sourceMappingURL=switch.stories.js.map