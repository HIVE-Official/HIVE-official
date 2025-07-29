import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '../../../atomic/atoms/input';
import { HiveCard } from '../../../components/hive-card';
import { Search, Mail, User, Lock, Phone, CreditCard, Calendar, MapPin, DollarSign, Globe } from 'lucide-react';
const meta = {
    title: '02-atoms/Core Foundation/Input',
    component: Input,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Input Component** - A clean, PRD-aligned text input with Vercel-inspired styling

Part of the HIVE Atomic Design System with enhanced accessibility and consistent interactions.

## Features
- **3 Variants**: Default, ghost, filled with subtle styling differences
- **3 Sizes**: sm (32px), md (10), lg (48px) with proper touch targets
- **Icon Support**: Leading and trailing icon positions
- **Password Toggle**: Built-in show/hide functionality for password fields
- **Error States**: Visual error indicators with helper text
- **Helper Text**: Additional context and guidance
- **Full Accessibility**: WCAG 2.1 AA compliant with proper focus management
- **PRD-Aligned**: Clean, Vercel-inspired design with 16px radius

## Design Token Usage
Uses semantic color tokens with focus on blue-400 for interactions and proper contrast ratios.

## Input Types Supported
- **Text**: Standard text input
- **Email**: Email validation styling
- **Password**: Built-in toggle visibility
- **Number**: Numeric input with proper formatting
- **Tel**: Phone number input
- **URL**: Website address input
- **Search**: Search input with appropriate styling
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'ghost', 'filled'],
            description: 'Visual style variant'
        },
        inputSize: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Input size (affects height and padding)'
        },
        label: {
            control: 'text',
            description: 'Label text above the input'
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text'
        },
        helperText: {
            control: 'text',
            description: 'Helper text below the input'
        },
        error: {
            control: 'text',
            description: 'Error message (overrides helperText)'
        },
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
            description: 'HTML input type'
        },
        fullWidth: {
            control: 'boolean',
            description: 'Expand to full container width'
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state'
        }
    }
};
export default meta;
// Default Input
export const Default = {
    args: {
        label: 'Name',
        placeholder: 'Enter your name'
    }
};
// All Variants
export const AllVariants = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsx(Input, { label: "Default Variant", placeholder: "Clean border styling", variant: "default", helperText: "Standard input with border" }), _jsx(Input, { label: "Ghost Variant", placeholder: "Minimal styling", variant: "ghost", helperText: "Borderless until focused" }), _jsx(Input, { label: "Filled Variant", placeholder: "Background filled", variant: "filled", helperText: "Solid background styling" })] }))
};
// All Sizes
export const AllSizes = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsx(Input, { label: "Small (32px)", placeholder: "Compact input", inputSize: "sm", helperText: "For dense layouts" }), _jsx(Input, { label: "Medium (10)", placeholder: "Standard input", inputSize: "md", helperText: "Default size for most use cases" }), _jsx(Input, { label: "Large (48px)", placeholder: "Spacious input", inputSize: "lg", helperText: "Enhanced touch targets" })] }))
};
// With Icons
export const WithIcons = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsx(Input, { label: "Search", placeholder: "Search anything...", leftIcon: _jsx(Search, { className: "w-4 h-4" }), type: "search" }), _jsx(Input, { label: "Email", placeholder: "your@email.com", leftIcon: _jsx(Mail, { className: "w-4 h-4" }), type: "email" }), _jsx(Input, { label: "Profile", placeholder: "Username", leftIcon: _jsx(User, { className: "w-4 h-4" }), rightIcon: _jsx(Globe, { className: "w-4 h-4" }) }), _jsx(Input, { label: "Amount", placeholder: "0.00", leftIcon: _jsx(DollarSign, { className: "w-4 h-4" }), type: "number" })] }))
};
// Input Types
export const InputTypes = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsx(Input, { label: "Text Input", placeholder: "Enter text", type: "text", helperText: "Standard text input" }), _jsx(Input, { label: "Email Address", placeholder: "user@example.com", type: "email", leftIcon: _jsx(Mail, { className: "w-4 h-4" }), helperText: "Email validation styling" }), _jsx(Input, { label: "Password", placeholder: "Enter password", type: "password", leftIcon: _jsx(Lock, { className: "w-4 h-4" }), helperText: "Built-in show/hide toggle" }), _jsx(Input, { label: "Phone Number", placeholder: "+1 (555) 000-0000", type: "tel", leftIcon: _jsx(Phone, { className: "w-4 h-4" }), helperText: "Phone number input" }), _jsx(Input, { label: "Website URL", placeholder: "https://example.com", type: "url", leftIcon: _jsx(Globe, { className: "w-4 h-4" }), helperText: "URL validation styling" }), _jsx(Input, { label: "Credit Card", placeholder: "1234 5678 9012 3456", type: "text", leftIcon: _jsx(CreditCard, { className: "w-4 h-4" }), helperText: "Formatted number input" })] }))
};
// Error States
export const ErrorStates = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsx(Input, { label: "Required Field", placeholder: "This field is required", error: "This field cannot be empty", value: "" }), _jsx(Input, { label: "Invalid Email", placeholder: "Enter valid email", type: "email", leftIcon: _jsx(Mail, { className: "w-4 h-4" }), error: "Please enter a valid email address", value: "invalid-email" }), _jsx(Input, { label: "Password Too Short", placeholder: "Minimum 8 characters", type: "password", leftIcon: _jsx(Lock, { className: "w-4 h-4" }), error: "Password must be at least 8 characters", value: "123" }), _jsx(Input, { label: "Invalid Phone", placeholder: "+1 (555) 000-0000", type: "tel", leftIcon: _jsx(Phone, { className: "w-4 h-4" }), error: "Please enter a valid phone number", value: "invalid" })] }))
};
// Disabled States
export const DisabledStates = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsx(Input, { label: "Disabled Empty", placeholder: "Cannot edit this field", disabled: true, helperText: "This field is read-only" }), _jsx(Input, { label: "Disabled with Value", value: "Preset value", disabled: true, leftIcon: _jsx(User, { className: "w-4 h-4" }), helperText: "Field contains preset data" }), _jsx(Input, { label: "Disabled Password", type: "password", value: "hiddenpassword", disabled: true, leftIcon: _jsx(Lock, { className: "w-4 h-4" }), helperText: "Password field is locked" })] }))
};
// Password Functionality
export const PasswordFunctionality = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsx(Input, { label: "Current Password", placeholder: "Enter current password", type: "password", leftIcon: _jsx(Lock, { className: "w-4 h-4" }), helperText: "Click the eye icon to toggle visibility" }), _jsx(Input, { label: "New Password", placeholder: "Create new password", type: "password", leftIcon: _jsx(Lock, { className: "w-4 h-4" }), helperText: "Must be at least 8 characters with symbols" }), _jsx(Input, { label: "Confirm Password", placeholder: "Confirm new password", type: "password", leftIcon: _jsx(Lock, { className: "w-4 h-4" }), helperText: "Must match the password above" })] }))
};
// Form Example
export const FormExample = {
    render: () => (_jsxs(HiveCard, { className: "p-6 space-y-6 max-w-lg", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Create Account" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(Input, { label: "First Name", placeholder: "John", leftIcon: _jsx(User, { className: "w-4 h-4" }) }), _jsx(Input, { label: "Last Name", placeholder: "Doe", leftIcon: _jsx(User, { className: "w-4 h-4" }) })] }), _jsx(Input, { label: "Email Address", placeholder: "user@example.com", type: "email", leftIcon: _jsx(Mail, { className: "w-4 h-4" }), helperText: "We'll use this for account verification" }), _jsx(Input, { label: "Phone Number", placeholder: "+1 (555) 000-0000", type: "tel", leftIcon: _jsx(Phone, { className: "w-4 h-4" }), helperText: "Optional - for account recovery" }), _jsx(Input, { label: "Password", placeholder: "Create a strong password", type: "password", leftIcon: _jsx(Lock, { className: "w-4 h-4" }), helperText: "At least 8 characters with symbols and numbers" }), _jsx(Input, { label: "Company (Optional)", placeholder: "Acme Corporation", variant: "ghost", helperText: "Help us customize your experience" }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx("button", { className: "px-4 py-2 bg-gray-600 text-[var(--hive-text-primary)] rounded-lg", children: "Cancel" }), _jsx("button", { className: "px-4 py-2 bg-blue-600 text-[var(--hive-text-primary)] rounded-lg", children: "Create Account" })] })] }))
};
// Search Variations
export const SearchVariations = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsx(Input, { placeholder: "Search users, spaces, tools...", type: "search", leftIcon: _jsx(Search, { className: "w-4 h-4" }), variant: "ghost", inputSize: "lg" }), _jsx(Input, { label: "Filter by Location", placeholder: "Enter city or region", leftIcon: _jsx(MapPin, { className: "w-4 h-4" }), variant: "filled" }), _jsx(Input, { label: "Date Range", placeholder: "Select date", type: "date", leftIcon: _jsx(Calendar, { className: "w-4 h-4" }) })] }))
};
// Width Variations
export const WidthVariations = {
    render: () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Full Width (Default)" }), _jsx(Input, { placeholder: "Expands to container width", fullWidth: true })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Natural Width" }), _jsx(Input, { placeholder: "Natural sizing", fullWidth: false })] })] }))
};
// Accessibility Demo
export const AccessibilityDemo = {
    render: () => (_jsxs("div", { className: "space-y-4 max-w-md", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Accessibility Features" }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Keyboard navigation (Tab, Shift+Tab)" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Screen reader support with proper labels" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Focus indicators with blue outline" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Error announcements with aria-invalid" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Helper text associations" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Password toggle accessibility" })] }), _jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-4 space-y-4", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Accessible Form" }), _jsx(Input, { label: "Username", placeholder: "Enter username", leftIcon: _jsx(User, { className: "w-4 h-4" }), helperText: "Must be unique and at least 3 characters", "aria-describedby": "username-help" }), _jsx(Input, { label: "Email (Required)", placeholder: "your@email.com", type: "email", leftIcon: _jsx(Mail, { className: "w-4 h-4" }), error: "Please enter a valid email address", "aria-invalid": "true", "aria-describedby": "email-error" }), _jsx(Input, { label: "Password", placeholder: "Create password", type: "password", leftIcon: _jsx(Lock, { className: "w-4 h-4" }), helperText: "Password visibility can be toggled with the eye icon", "aria-describedby": "password-help" }), _jsx("p", { className: "text-xs text-gray-400", children: "All fields support keyboard navigation and screen reader announcements" })] })] }))
};
// Interactive Demo
export const Interactive = {
    render: (args) => (_jsx("div", { className: "max-w-md", children: _jsx(Input, { ...args }) })),
    args: {
        label: 'Interactive Demo',
        placeholder: 'Customize using controls below',
        variant: 'default',
        inputSize: 'md',
        type: 'text',
        fullWidth: true,
        disabled: false,
        helperText: 'Use the controls below to test different configurations'
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo - use the controls below to test different input configurations and see how they affect the behavior and appearance.'
            }
        }
    }
};
//# sourceMappingURL=input.stories.js.map