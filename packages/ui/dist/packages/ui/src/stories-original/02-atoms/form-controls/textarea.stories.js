import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveTextarea, Textarea, HiveToolDescriptionTextarea, HiveSpaceDescriptionTextarea, HiveFeedbackTextarea, HiveCodeTextarea } from '../../../components/hive-textarea';
import { Label } from '../../../atomic/atoms/label';
import { HiveCard } from '../../../components/hive-card';
import { MessageSquare, Code, Search, Send } from 'lucide-react';
const meta = {
    title: '02-atoms/Form Controls/Textarea',
    component: HiveTextarea,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Textarea Component** - A rich text input with advanced features and liquid metal motion

Part of the HIVE Atomic Design System with PRD-aligned styling, enhanced accessibility, and premium interactions.

## Features
- **6 Variants**: Default, error, success, disabled, premium, minimal
- **4 Sizes**: sm (80px), default (120px), lg (160px), xl (50)
- **Floating Labels**: Smooth animated labels that float on focus/content
- **Character Counter**: Optional character count with overflow indicators
- **Icon Support**: Leading and trailing icon positions
- **Loading States**: Built-in spinner with accessible labels
- **Status Messages**: Error, success, and helper text with smooth animations
- **Liquid Motion**: Premium motion system with spring animations
- **Auto-resize**: Optional vertical resizing capability
- **Full Accessibility**: WCAG 2.1 AA compliant with proper focus management

## Design Token Usage
Uses \`hive-background-*\`, \`hive-border-*\`, \`hive-text-*\`, \`hive-status-*\` tokens exclusively.

## Pre-built Variants
- **HiveToolDescriptionTextarea**: For tool creation forms
- **HiveSpaceDescriptionTextarea**: For space setup
- **HiveFeedbackTextarea**: For feedback collection
- **HiveCodeTextarea**: For code input with monospace font
- **Textarea**: Simple version for basic use cases
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'error', 'success', 'disabled', 'premium', 'minimal'],
            description: 'Visual style variant'
        },
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg', 'xl'],
            description: 'Textarea height variant'
        },
        radius: {
            control: 'select',
            options: ['sm', 'default', 'lg', 'xl'],
            description: 'Border radius variant'
        },
        label: {
            control: 'text',
            description: 'Label text (floating by default)'
        },
        placeholder: {
            control: 'text',
            description: 'Placeholder text'
        },
        helperText: {
            control: 'text',
            description: 'Helper text below the textarea'
        },
        errorText: {
            control: 'text',
            description: 'Error message (overrides variant)'
        },
        successText: {
            control: 'text',
            description: 'Success message (overrides variant)'
        },
        showCharacterCount: {
            control: 'boolean',
            description: 'Show character count indicator'
        },
        maxLength: {
            control: 'number',
            description: 'Maximum character limit'
        },
        floatingLabel: {
            control: 'boolean',
            description: 'Enable floating label animation'
        },
        resize: {
            control: 'boolean',
            description: 'Allow vertical resizing'
        },
        loading: {
            control: 'boolean',
            description: 'Show loading spinner'
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state'
        }
    }
};
export default meta;
// Default Textarea
export const Default = {
    args: {
        label: 'Description',
        placeholder: 'Enter your description...'
    }
};
// All Variants
export const AllVariants = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsx(HiveTextarea, { label: "Default", placeholder: "Default textarea style", variant: "default" }), _jsx(HiveTextarea, { label: "Premium", placeholder: "Premium textarea with enhanced styling", variant: "premium" }), _jsx(HiveTextarea, { label: "Error State", placeholder: "Something went wrong", variant: "error", errorText: "This field is required" }), _jsx(HiveTextarea, { label: "Success State", placeholder: "Looking good!", variant: "success", successText: "Perfect! Your input looks great" }), _jsx(HiveTextarea, { label: "Minimal", placeholder: "Clean and simple", variant: "minimal" }), _jsx(HiveTextarea, { label: "Disabled", placeholder: "Cannot edit this field", variant: "disabled", disabled: true })] }))
};
// All Sizes
export const AllSizes = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsx(HiveTextarea, { label: "Small (80px)", placeholder: "Compact textarea for brief inputs", size: "sm" }), _jsx(HiveTextarea, { label: "Default (120px)", placeholder: "Standard textarea for most use cases", size: "default" }), _jsx(HiveTextarea, { label: "Large (160px)", placeholder: "Spacious textarea for longer content", size: "lg" }), _jsx(HiveTextarea, { label: "Extra Large (50)", placeholder: "Maximum height for extensive writing", size: "xl" })] }))
};
// With Character Count
export const WithCharacterCount = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsx(HiveTextarea, { label: "With Counter", placeholder: "Start typing to see character count...", showCharacterCount: true, helperText: "Character count appears when focused" }), _jsx(HiveTextarea, { label: "With Limit", placeholder: "Limited to 100 characters", showCharacterCount: true, maxLength: 100, helperText: "Count shows when approaching limit" }), _jsx(HiveTextarea, { label: "Strict Limit", placeholder: "Cannot exceed 50 characters", showCharacterCount: true, maxLength: 50, defaultValue: "This text will show over-limit styling when it exceeds the maximum length" })] }))
};
// With Icons
export const WithIcons = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsx(HiveTextarea, { label: "Message", placeholder: "Type your message...", leftIcon: _jsx(MessageSquare, { className: "w-4 h-4" }) }), _jsx(HiveTextarea, { label: "Search Query", placeholder: "Enter search terms...", leftIcon: _jsx(Search, { className: "w-4 h-4" }), rightIcon: _jsx(Send, { className: "w-4 h-4" }) }), _jsx(HiveTextarea, { label: "Code Block", placeholder: "Enter your code...", leftIcon: _jsx(Code, { className: "w-4 h-4" }), variant: "minimal", className: "font-mono" })] }))
};
// Loading and Interactive States
export const InteractiveStates = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsx(HiveTextarea, { label: "Loading", placeholder: "Processing your input...", loading: true, defaultValue: "This textarea is currently processing" }), _jsx(HiveTextarea, { label: "With Clear Button", placeholder: "Type something to see clear button", defaultValue: "Clear me!", onClear: () => alert('Cleared!') }), _jsx(HiveTextarea, { label: "No Resize", placeholder: "Fixed height textarea", resize: false, helperText: "This textarea cannot be resized" })] }))
};
// Label Variations
export const LabelVariations = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsx(HiveTextarea, { label: "Floating Label", placeholder: "Label floats up on focus", floatingLabel: true, helperText: "Default floating behavior" }), _jsx(HiveTextarea, { label: "Static Label", placeholder: "Label stays above textarea", floatingLabel: false, helperText: "Traditional label placement" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "external-label", children: "External Label" }), _jsx(HiveTextarea, { id: "external-label", placeholder: "Using external label component", helperText: "No built-in label, using separate Label component" })] })] }))
};
// Pre-built Variants
export const PrebuiltVariants = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsx(HiveToolDescriptionTextarea, { helperText: "For tool creation forms - includes character limit and premium styling" }), _jsx(HiveSpaceDescriptionTextarea, { helperText: "For space setup - optimized length and standard styling" }), _jsx(HiveFeedbackTextarea, { helperText: "For feedback collection - longer limit for detailed responses" }), _jsx(HiveCodeTextarea, { label: "Code Input", placeholder: "function example() { return 'hello'; }", helperText: "Monospace font for code input" }), _jsx(Textarea, { placeholder: "Simple textarea for basic use cases" })] }))
};
// Real-world Form Example
export const FormExample = {
    render: () => (_jsxs(HiveCard, { className: "p-6 space-y-6 max-w-lg", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Create New Tool" }), _jsx(HiveTextarea, { label: "Tool Name", placeholder: "Enter a descriptive name for your tool", size: "sm", showCharacterCount: true, maxLength: 60 }), _jsx(HiveToolDescriptionTextarea, {}), _jsx(HiveTextarea, { label: "Usage Instructions", placeholder: "Explain how to use this tool...", size: "lg", showCharacterCount: true, maxLength: 800, helperText: "Provide clear instructions for other users" }), _jsx(HiveCodeTextarea, { label: "Configuration", placeholder: '{ "setting": "value" }', size: "lg", helperText: "JSON configuration for your tool" }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx("button", { className: "px-4 py-2 bg-gray-600 text-[var(--hive-text-primary)] rounded-lg", children: "Save Draft" }), _jsx("button", { className: "px-4 py-2 bg-blue-600 text-[var(--hive-text-primary)] rounded-lg", children: "Publish Tool" })] })] }))
};
// Accessibility Demo
export const AccessibilityDemo = {
    render: () => (_jsxs("div", { className: "space-y-4 max-w-md", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Accessibility Features" }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Keyboard navigation (Tab, Shift+Tab)" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Screen reader support with ARIA labels" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Focus indicators and management" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Character count announcements" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Error/success state announcements" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Proper label associations" })] }), _jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-4 space-y-4", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Accessible Textarea" }), _jsx(HiveTextarea, { label: "Feedback", placeholder: "Share your accessibility feedback", helperText: "This textarea meets WCAG 2.1 AA guidelines", showCharacterCount: true, maxLength: 200, "aria-describedby": "feedback-help" }), _jsx("p", { id: "feedback-help", className: "text-xs text-gray-400", children: "Tab to focus, type your message, character count is announced to screen readers" }), _jsx(HiveTextarea, { label: "Error Example", placeholder: "This field has an error", errorText: "Please provide valid feedback", "aria-invalid": "true", "aria-describedby": "error-help" }), _jsx("p", { id: "error-help", className: "text-xs text-gray-400", children: "Error states are properly announced with aria-invalid" })] })] }))
};
// Interactive Demo
export const Interactive = {
    render: (args) => (_jsx("div", { className: "max-w-md", children: _jsx(HiveTextarea, { ...args }) })),
    args: {
        label: 'Interactive Demo',
        placeholder: 'Customize using controls below',
        variant: 'default',
        size: 'default',
        radius: 'default',
        showCharacterCount: false,
        maxLength: undefined,
        floatingLabel: true,
        resize: true,
        loading: false,
        disabled: false,
        helperText: 'Use the controls below to test different configurations'
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo - use the controls below to test different textarea configurations and see how they affect the behavior and appearance.'
            }
        }
    }
};
//# sourceMappingURL=textarea.stories.js.map