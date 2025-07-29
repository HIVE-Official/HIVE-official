import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Radio, SingleRadio } from '../../../atomic/atoms/radio';
import { HiveCard } from '../../../components/hive-card';
const meta = {
    title: '02-atoms/Form Controls/Radio',
    component: Radio,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Radio Component** - A selection control for mutually exclusive choices

Part of the HIVE Atomic Design System with PRD-aligned styling and enhanced accessibility.

## Features
- **PRD-Aligned Colors**: Uses semantic gold/ruby for checked/error states
- **Accessibility**: Full ARIA support with proper focus management
- **2 Variants**: Default and card layout options
- **3 Sizes**: sm, md, lg with proper touch targets
- **Dual API**: Single radio or radio group components
- **Responsive**: Touch-friendly targets for mobile
- **Consistent**: Follows HIVE design token system
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        name: {
            control: 'text',
            description: 'Name attribute for the radio group'
        },
        options: {
            description: 'Array of radio options with value, label, and optional description'
        },
        value: {
            control: 'text',
            description: 'The controlled selected value'
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Radio size variant'
        },
        variant: {
            control: 'select',
            options: ['default', 'card'],
            description: 'Visual style variant'
        },
        orientation: {
            control: 'select',
            options: ['vertical', 'horizontal'],
            description: 'Layout orientation'
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the entire group is disabled'
        },
        error: {
            control: 'text',
            description: 'Error message to display'
        },
        onChange: {
            action: 'value changed',
            description: 'Callback when selection changes'
        }
    }
};
export default meta;
const basicOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
];
const detailedOptions = [
    {
        value: 'basic',
        label: 'Basic Plan',
        description: 'Perfect for individuals getting started'
    },
    {
        value: 'pro',
        label: 'Pro Plan',
        description: 'For professionals and small teams'
    },
    {
        value: 'enterprise',
        label: 'Enterprise Plan',
        description: 'Advanced features for large organizations'
    }
];
// Default Radio Group
export const Default = {
    args: {
        name: 'default-radio',
        options: basicOptions,
        value: 'option1'
    }
};
// With Descriptions
export const WithDescriptions = {
    args: {
        name: 'plans-radio',
        options: detailedOptions,
        value: 'pro'
    }
};
// Card Variant
export const CardVariant = {
    args: {
        name: 'card-radio',
        options: detailedOptions,
        variant: 'card',
        value: 'basic'
    }
};
// Size Variants
export const SizeVariants = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Small Size" }), _jsx(Radio, { name: "small-radio", options: basicOptions, size: "sm", value: "option1" })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Medium Size" }), _jsx(Radio, { name: "medium-radio", options: basicOptions, size: "md", value: "option2" })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Large Size" }), _jsx(Radio, { name: "large-radio", options: basicOptions, size: "lg", value: "option3" })] })] }))
};
// Orientation Options
export const OrientationOptions = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Vertical (Default)" }), _jsx(Radio, { name: "vertical-radio", options: basicOptions, orientation: "vertical", value: "option1" })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Horizontal" }), _jsx(Radio, { name: "horizontal-radio", options: basicOptions, orientation: "horizontal", value: "option2" })] })] }))
};
// Disabled States
export const DisabledStates = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Entire Group Disabled" }), _jsx(Radio, { name: "disabled-group", options: basicOptions, disabled: true, value: "option1" })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Individual Options Disabled" }), _jsx(Radio, { name: "partial-disabled", options: [
                            { value: 'enabled1', label: 'Enabled Option' },
                            { value: 'disabled1', label: 'Disabled Option', disabled: true },
                            { value: 'enabled2', label: 'Another Enabled Option' }
                        ], value: "enabled1" })] })] }))
};
// Error State
export const ErrorState = {
    args: {
        name: 'error-radio',
        options: basicOptions,
        error: 'Please select an option to continue'
    }
};
// Single Radio Component
export const SingleRadioComponent = {
    render: () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Basic Single Radio" }), _jsx(SingleRadio, { name: "single", value: "basic", label: "Basic Option", checked: true })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "With Description" }), _jsx(SingleRadio, { name: "single-desc", value: "premium", label: "Premium Option", description: "Includes advanced features and priority support", checked: true })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Card Variant" }), _jsx(SingleRadio, { name: "single-card", value: "card", label: "Card Style", description: "Enhanced visual emphasis with card styling", variant: "card", checked: true })] })] }))
};
// Real-world Example
export const RealWorldExample = {
    render: () => (_jsxs(HiveCard, { className: "p-6 space-y-6 max-w-md", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Choose Your Plan" }), _jsx(Radio, { name: "subscription-plans", options: [
                    {
                        value: 'free',
                        label: 'Free',
                        description: 'Basic features for personal projects'
                    },
                    {
                        value: 'pro',
                        label: 'Pro - $9/month',
                        description: 'Advanced features and priority support'
                    },
                    {
                        value: 'team',
                        label: 'Team - $29/month',
                        description: 'Collaboration tools and team management'
                    },
                    {
                        value: 'enterprise',
                        label: 'Enterprise',
                        description: 'Custom solutions and dedicated support',
                        disabled: true
                    }
                ], variant: "card", value: "pro" }), _jsx("div", { className: "pt-4 border-t border-[var(--hive-border-default)]", children: _jsx("p", { className: "text-sm text-gray-400", children: "You can change your plan anytime in settings" }) })] }))
};
// Accessibility Demo
export const AccessibilityDemo = {
    render: () => (_jsxs("div", { className: "space-y-4 max-w-md", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Accessibility Features" }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Keyboard navigation (Tab, Arrow keys, Space)" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Screen reader support with proper labeling" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Focus indicators" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Touch-friendly tap targets (44px minimum)" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Proper ARIA roles and states" })] }), _jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-4 space-y-3", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Try keyboard navigation:" }), _jsx(Radio, { name: "a11y-demo", options: [
                            {
                                value: 'option1',
                                label: 'First Option',
                                description: 'Tab to focus, use arrow keys to navigate, Space to select'
                            },
                            {
                                value: 'option2',
                                label: 'Second Option',
                                description: 'Screen reader announces label and description'
                            },
                            {
                                value: 'option3',
                                label: 'Third Option',
                                description: 'Focus indicators meet WCAG contrast requirements'
                            }
                        ], value: "option1" })] })] }))
};
//# sourceMappingURL=radio.stories.js.map