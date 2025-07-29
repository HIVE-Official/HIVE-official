import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from '../../../atomic/atoms/checkbox';
import { Label } from '../../../atomic/atoms/label';
import { HiveCard } from '../../../components/hive-card';
const meta = {
    title: '02-atoms/Form Controls/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Checkbox Component** - A selection control for multiple choices

Part of the HIVE Atomic Design System with PRD-aligned styling and enhanced accessibility.

## Features
- **PRD-Aligned Colors**: Uses semantic blue-600 for checked states
- **Accessibility**: Full ARIA support with proper focus management
- **Indeterminate State**: Supports partial selection for groups
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
            description: 'The controlled checked state of the checkbox'
        },
        defaultChecked: {
            control: 'boolean',
            description: 'The default checked state when uncontrolled'
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the checkbox is disabled'
        },
        indeterminate: {
            control: 'boolean',
            description: 'Whether the checkbox is in an indeterminate state'
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Checkbox size variant'
        },
        onCheckedChange: {
            action: 'checked changed',
            description: 'Callback when the checked state changes'
        }
    }
};
export default meta;
// Default Checkbox
export const Default = {
    args: {
        defaultChecked: false
    }
};
// Checked Checkbox
export const Checked = {
    args: {
        defaultChecked: true
    }
};
// Indeterminate State
export const Indeterminate = {
    args: {
        indeterminate: true
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
export const DisabledIndeterminate = {
    args: {
        disabled: true,
        indeterminate: true
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
    render: () => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "terms", defaultChecked: true }), _jsx(Label, { htmlFor: "terms", children: "I agree to the terms and conditions" })] }))
};
// Checkbox Group Example
export const CheckboxGroup = {
    render: () => (_jsxs(HiveCard, { className: "p-6 space-y-4 max-w-md", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Select Interests" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "tech", defaultChecked: true }), _jsx(Label, { htmlFor: "tech", children: "Technology" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "design", defaultChecked: true }), _jsx(Label, { htmlFor: "design", children: "Design" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "business" }), _jsx(Label, { htmlFor: "business", children: "Business" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "art" }), _jsx(Label, { htmlFor: "art", children: "Art & Creative" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "sports" }), _jsx(Label, { htmlFor: "sports", children: "Sports" })] })] })] }))
};
// Nested Checkbox Group (Parent-Child)
export const NestedCheckboxes = {
    render: () => (_jsxs(HiveCard, { className: "p-6 space-y-4 max-w-md", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Notification Preferences" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "all-notifications", indeterminate: true }), _jsx(Label, { htmlFor: "all-notifications", className: "font-medium", children: "All Notifications" })] }), _jsxs("div", { className: "ml-6 space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "email", defaultChecked: true }), _jsx(Label, { htmlFor: "email", children: "Email updates" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "push", defaultChecked: true }), _jsx(Label, { htmlFor: "push", children: "Push notifications" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "sms" }), _jsx(Label, { htmlFor: "sms", children: "SMS alerts" })] })] })] })] }))
};
// Accessibility Demo
export const AccessibilityDemo = {
    render: () => (_jsxs("div", { className: "space-y-4 max-w-md", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Accessibility Features" }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Keyboard navigation (Tab, Space)" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Screen reader support with ARIA labels" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Focus indicators" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Touch-friendly tap targets (44px minimum)" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Indeterminate state support" })] }), _jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-4 space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "a11y-demo-1", "aria-describedby": "a11y-help-1", defaultChecked: true }), _jsx(Label, { htmlFor: "a11y-demo-1", children: "Accessible Checkbox" })] }), _jsx("p", { id: "a11y-help-1", className: "text-xs text-gray-400", children: "Tab to focus, Space to toggle" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "a11y-demo-2", indeterminate: true, "aria-describedby": "a11y-help-2" }), _jsx(Label, { htmlFor: "a11y-demo-2", children: "Partially Selected" })] }), _jsx("p", { id: "a11y-help-2", className: "text-xs text-gray-400", children: "Indeterminate state properly announced by screen readers" })] })] }))
};
//# sourceMappingURL=checkbox.stories.js.map