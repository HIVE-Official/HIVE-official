import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from '../../../atomic/atoms/label';
import { Input } from '../../../atomic/atoms/input';
import { HiveCard } from '../../../components/hive-card';
import { Switch } from '../../../atomic/atoms/switch';
import { Checkbox } from '../../../atomic/atoms/checkbox';
const meta = {
    title: '02-atoms/Core Foundation/Label',
    component: Label,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Label Component** - Accessible form labels with required indicators and flexible styling

Part of the HIVE Atomic Design System providing proper form field labeling and accessibility.

## Features
- **3 Variants**: Default block, inline flex, floating animation
- **3 Sizes**: sm, md, lg with appropriate text sizing  
- **Required Indicator**: Automatic asterisk with ARIA labeling
- **Accessibility**: Proper htmlFor association and screen reader support
- **Flexible Layout**: Block, inline, and floating positioning options
- **Disabled States**: Visual indication when form fields are disabled
- **Design Token Integration**: Uses HIVE semantic color tokens

## Use Cases
- **Form Fields**: Associate labels with input elements
- **Required Fields**: Indicate mandatory form fields with asterisk
- **Inline Elements**: Label checkboxes, switches, and radio buttons
- **Floating Labels**: Animated labels for modern input styling
- **Accessibility**: Ensure proper screen reader support

## Accessibility Notes
- Always use htmlFor to associate with form elements
- Required indicator includes aria-label for screen readers
- Supports disabled state for better UX clarity
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        htmlFor: {
            control: 'text',
            description: 'ID of the form element this label is associated with'
        },
        required: {
            control: 'boolean',
            description: 'Show required asterisk indicator'
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Label text size'
        },
        variant: {
            control: 'select',
            options: ['default', 'inline', 'floating'],
            description: 'Label layout variant'
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state styling'
        },
        children: {
            control: 'text',
            description: 'Label text content'
        }
    }
};
export default meta;
// Default Label
export const Default = {
    args: {
        children: 'Email Address',
        htmlFor: 'email'
    }
};
// All Variants
export const AllVariants = {
    render: () => (_jsxs("div", { className: "space-y-8 max-w-md", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Default (Block)" }), _jsx(Label, { htmlFor: "default-input", children: "Full Name" }), _jsx(Input, { id: "default-input", placeholder: "Enter your full name" })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Inline" }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "terms" }), _jsx(Label, { htmlFor: "terms", variant: "inline", children: "I agree to the terms and conditions" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "notifications" }), _jsx(Label, { htmlFor: "notifications", variant: "inline", children: "Enable notifications" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Floating (CSS-only)" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "floating-input", placeholder: " ", className: "peer" }), _jsx(Label, { htmlFor: "floating-input", variant: "floating", className: "bg-gray-900 px-1", children: "Floating Label" })] })] })] }))
};
// All Sizes
export const AllSizes = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { size: "sm", htmlFor: "small-input", children: "Small Label" }), _jsx(Input, { id: "small-input", placeholder: "Small input field", inputSize: "sm" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { size: "md", htmlFor: "medium-input", children: "Medium Label" }), _jsx(Input, { id: "medium-input", placeholder: "Medium input field", inputSize: "md" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { size: "lg", htmlFor: "large-input", children: "Large Label" }), _jsx(Input, { id: "large-input", placeholder: "Large input field", inputSize: "lg" })] })] }))
};
// Required Labels
export const RequiredLabels = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "required-email", required: true, children: "Email Address" }), _jsx(Input, { id: "required-email", type: "email", placeholder: "your@email.com", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "required-password", required: true, children: "Password" }), _jsx(Input, { id: "required-password", type: "password", placeholder: "Create a strong password", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "optional-phone", children: "Phone Number" }), _jsx(Input, { id: "optional-phone", type: "tel", placeholder: "+1 (555) 000-0000" }), _jsx("p", { className: "text-xs text-gray-400", children: "Optional field" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "required-terms", required: true }), _jsx(Label, { htmlFor: "required-terms", variant: "inline", required: true, children: "I agree to the privacy policy" })] })] }))
};
// Disabled States
export const DisabledStates = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "disabled-input", disabled: true, children: "Disabled Field" }), _jsx(Input, { id: "disabled-input", placeholder: "Cannot edit this field", disabled: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "disabled-required", disabled: true, required: true, children: "Disabled Required Field" }), _jsx(Input, { id: "disabled-required", placeholder: "Disabled and required", disabled: true, required: true })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "disabled-checkbox", disabled: true }), _jsx(Label, { htmlFor: "disabled-checkbox", variant: "inline", disabled: true, children: "Disabled checkbox option" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "disabled-switch", disabled: true }), _jsx(Label, { htmlFor: "disabled-switch", variant: "inline", disabled: true, children: "Disabled switch option" })] })] }))
};
// Form Examples
export const FormExamples = {
    render: () => (_jsxs(HiveCard, { className: "p-6 space-y-6 max-w-lg", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Contact Information" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "first-name", required: true, children: "First Name" }), _jsx(Input, { id: "first-name", placeholder: "John" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "last-name", required: true, children: "Last Name" }), _jsx(Input, { id: "last-name", placeholder: "Doe" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email-form", required: true, children: "Email Address" }), _jsx(Input, { id: "email-form", type: "email", placeholder: "john.doe@example.com" }), _jsx("p", { className: "text-xs text-gray-400", children: "We'll use this for account verification" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "phone-form", children: "Phone Number" }), _jsx(Input, { id: "phone-form", type: "tel", placeholder: "+1 (555) 000-0000" }), _jsx("p", { className: "text-xs text-gray-400", children: "Optional - for account recovery" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "newsletter" }), _jsx(Label, { htmlFor: "newsletter", variant: "inline", children: "Subscribe to our newsletter" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "terms-form", required: true }), _jsx(Label, { htmlFor: "terms-form", variant: "inline", required: true, children: "I agree to the terms of service" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "marketing" }), _jsx(Label, { htmlFor: "marketing", variant: "inline", children: "Allow marketing communications" })] })] }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx("button", { className: "px-4 py-2 bg-gray-600 text-[var(--hive-text-primary)] rounded-lg", children: "Cancel" }), _jsx("button", { className: "px-4 py-2 bg-blue-600 text-[var(--hive-text-primary)] rounded-lg", children: "Save Contact" })] })] }))
};
// Floating Label Demo
export const FloatingLabelDemo = {
    render: () => (_jsxs("div", { className: "space-y-8 max-w-md", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Floating Labels" }), _jsx("p", { className: "text-sm text-gray-400", children: "Click in the fields to see the floating animation" })] }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "relative", children: [_jsx(Input, { id: "floating-email", type: "email", placeholder: " ", className: "peer" }), _jsx(Label, { htmlFor: "floating-email", variant: "floating", className: "bg-gray-900 px-1", children: "Email Address" })] }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "floating-password", type: "password", placeholder: " ", className: "peer" }), _jsx(Label, { htmlFor: "floating-password", variant: "floating", className: "bg-gray-900 px-1", required: true, children: "Password" })] }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "floating-company", placeholder: " ", className: "peer", defaultValue: "Acme Corp" }), _jsx(Label, { htmlFor: "floating-company", variant: "floating", className: "bg-gray-900 px-1", children: "Company Name" })] })] }), _jsx("div", { className: "p-4 bg-blue-50 rounded-lg border border-blue-200", children: _jsxs("p", { className: "text-sm text-blue-800", children: [_jsx("strong", { children: "Note:" }), " Floating labels require careful CSS setup with peer classes. The input needs ", _jsx("code", { children: "placeholder=\" \"" }), " (single space) to work with the", _jsx("code", { children: "peer-placeholder-shown" }), " modifier."] }) })] }))
};
// Label Hierarchy
export const LabelHierarchy = {
    render: () => (_jsxs("div", { className: "space-y-8 max-w-2xl", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Label, { size: "lg", className: "text-[var(--hive-text-primary)] font-semibold", children: "Section Title (Large Label)" }), _jsx("p", { className: "text-gray-400", children: "Large labels can be used for section headings and major form groups." })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Label, { size: "md", className: "text-[var(--hive-text-primary)] font-medium", children: "Subsection Title (Medium Label)" }), _jsx("p", { className: "text-gray-400", children: "Medium labels are the default size for most form fields and content labels." })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Label, { size: "sm", className: "text-gray-300", children: "Detail Label (Small Label)" }), _jsx("p", { className: "text-gray-400", children: "Small labels work well for secondary information, metadata, and compact forms." })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-8", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Label, { size: "lg", children: "Personal Information" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "demo-name", required: true, children: "Full Name" }), _jsx(Input, { id: "demo-name", placeholder: "Enter your name" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "demo-email", required: true, children: "Email" }), _jsx(Input, { id: "demo-email", type: "email", placeholder: "your@email.com" })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Label, { size: "lg", children: "Preferences" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "demo-notifications" }), _jsx(Label, { htmlFor: "demo-notifications", variant: "inline", children: "Email notifications" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "demo-newsletter" }), _jsx(Label, { htmlFor: "demo-newsletter", variant: "inline", children: "Newsletter subscription" })] })] })] })] })] }))
};
// Interactive Demo
export const Interactive = {
    render: (args) => (_jsxs("div", { className: "space-y-4 max-w-md", children: [_jsx(Label, { ...args }), args.htmlFor && (_jsx(Input, { id: args.htmlFor, placeholder: "Associated input field" }))] })),
    args: {
        children: 'Interactive Label',
        htmlFor: 'interactive-input',
        required: false,
        size: 'md',
        variant: 'default',
        disabled: false
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo - use the controls below to test different label configurations including size, variant, required state, and disabled styling.'
            }
        }
    }
};
//# sourceMappingURL=label.stories.js.map