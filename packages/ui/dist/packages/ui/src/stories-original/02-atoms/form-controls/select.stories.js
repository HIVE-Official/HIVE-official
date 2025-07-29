import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectLabel, SelectGroup, SelectSeparator } from '../../../components/ui/select';
import { Label } from '../../../atomic/atoms/label';
import { HiveCard } from '../../../components/hive-card';
// Create a wrapper component for better Storybook integration
const SelectDemo = ({ placeholder, items, defaultValue, disabled }) => (_jsxs(Select, { defaultValue: defaultValue, disabled: disabled, children: [_jsx(SelectTrigger, { className: "w-[280px]", children: _jsx(SelectValue, { placeholder: placeholder || "Select an option" }) }), _jsx(SelectContent, { children: items.map((item) => (_jsx(SelectItem, { value: item.value, disabled: item.disabled, children: item.label }, item.value))) })] }));
const meta = {
    title: '02-atoms/Form Controls/Select',
    component: SelectDemo,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Select Component** - A dropdown selection control built on Radix UI

Part of the HIVE Atomic Design System with enhanced accessibility and consistent styling.

## Features
- **Radix UI Foundation**: Built on robust, accessible primitives
- **Keyboard Navigation**: Arrow keys, Enter, Escape, type-ahead search
- **Accessibility**: Full ARIA support with proper focus management
- **Portal Rendering**: Dropdown content rendered in portal for z-index management
- **Scroll Support**: Built-in scroll buttons for long option lists
- **Grouping**: Support for grouped options with labels and separators
- **Flexible Content**: Supports icons, descriptions, and custom content
- **Consistent**: Follows HIVE design token system

## Components
- **Select**: Root container component
- **SelectTrigger**: The clickable trigger button
- **SelectValue**: Displays selected value or placeholder
- **SelectContent**: The dropdown content container
- **SelectItem**: Individual option items
- **SelectLabel**: Group labels
- **SelectGroup**: Groups related options
- **SelectSeparator**: Visual dividers between groups
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        placeholder: {
            control: 'text',
            description: 'Placeholder text when no value is selected'
        },
        items: {
            description: 'Array of option items with value and label'
        },
        defaultValue: {
            control: 'text',
            description: 'Default selected value'
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the select is disabled'
        }
    }
};
export default meta;
const basicItems = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' }
];
const planItems = [
    { value: 'free', label: 'Free Plan' },
    { value: 'pro', label: 'Pro Plan - $9/month' },
    { value: 'team', label: 'Team Plan - $29/month' },
    { value: 'enterprise', label: 'Enterprise Plan', disabled: true }
];
// Default Select
export const Default = {
    args: {
        placeholder: 'Select a fruit',
        items: basicItems
    }
};
// With Default Value
export const WithDefaultValue = {
    args: {
        placeholder: 'Select a fruit',
        items: basicItems,
        defaultValue: 'banana'
    }
};
// Disabled Select
export const Disabled = {
    args: {
        placeholder: 'Select a fruit',
        items: basicItems,
        disabled: true
    }
};
// Disabled Options
export const DisabledOptions = {
    args: {
        placeholder: 'Choose your plan',
        items: planItems
    }
};
// With Label
export const WithLabel = {
    render: () => (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "fruit-select", children: "Favorite Fruit" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { id: "fruit-select", className: "w-[280px]", children: _jsx(SelectValue, { placeholder: "Select a fruit" }) }), _jsx(SelectContent, { children: basicItems.map((item) => (_jsx(SelectItem, { value: item.value, children: item.label }, item.value))) })] })] }))
};
// Grouped Options
export const GroupedOptions = {
    render: () => (_jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-[280px]", children: _jsx(SelectValue, { placeholder: "Select a framework" }) }), _jsxs(SelectContent, { children: [_jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Frontend" }), _jsx(SelectItem, { value: "react", children: "React" }), _jsx(SelectItem, { value: "vue", children: "Vue" }), _jsx(SelectItem, { value: "angular", children: "Angular" }), _jsx(SelectItem, { value: "svelte", children: "Svelte" })] }), _jsx(SelectSeparator, {}), _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Backend" }), _jsx(SelectItem, { value: "node", children: "Node.js" }), _jsx(SelectItem, { value: "python", children: "Python" }), _jsx(SelectItem, { value: "go", children: "Go" }), _jsx(SelectItem, { value: "rust", children: "Rust" })] }), _jsx(SelectSeparator, {}), _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Database" }), _jsx(SelectItem, { value: "postgres", children: "PostgreSQL" }), _jsx(SelectItem, { value: "mysql", children: "MySQL" }), _jsx(SelectItem, { value: "mongodb", children: "MongoDB" }), _jsx(SelectItem, { value: "redis", children: "Redis" })] })] })] }))
};
// Long List with Scroll
export const LongList = {
    render: () => {
        const countries = [
            'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
            'Italy', 'Spain', 'Netherlands', 'Belgium', 'Switzerland',
            'Austria', 'Sweden', 'Norway', 'Denmark', 'Finland',
            'Australia', 'New Zealand', 'Japan', 'South Korea', 'Singapore'
        ];
        return (_jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-[280px]", children: _jsx(SelectValue, { placeholder: "Select a country" }) }), _jsx(SelectContent, { children: countries.map((country) => (_jsx(SelectItem, { value: country.toLowerCase(), children: country }, country.toLowerCase().replace(' ', '-')))) })] }));
    }
};
// Form Example
export const FormExample = {
    render: () => (_jsxs(HiveCard, { className: "p-6 space-y-4 max-w-md", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Account Settings" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "timezone", children: "Timezone" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { id: "timezone", children: _jsx(SelectValue, { placeholder: "Select timezone" }) }), _jsxs(SelectContent, { children: [_jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "North America" }), _jsx(SelectItem, { value: "est", children: "Eastern Time (EST)" }), _jsx(SelectItem, { value: "cst", children: "Central Time (CST)" }), _jsx(SelectItem, { value: "mst", children: "Mountain Time (MST)" }), _jsx(SelectItem, { value: "pst", children: "Pacific Time (PST)" })] }), _jsx(SelectSeparator, {}), _jsxs(SelectGroup, { children: [_jsx(SelectLabel, { children: "Europe" }), _jsx(SelectItem, { value: "gmt", children: "Greenwich Mean Time (GMT)" }), _jsx(SelectItem, { value: "cet", children: "Central European Time (CET)" }), _jsx(SelectItem, { value: "eet", children: "Eastern European Time (EET)" })] })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "language", children: "Language" }), _jsxs(Select, { defaultValue: "en", children: [_jsx(SelectTrigger, { id: "language", children: _jsx(SelectValue, { placeholder: "Select language" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "en", children: "English" }), _jsx(SelectItem, { value: "es", children: "Spanish" }), _jsx(SelectItem, { value: "fr", children: "French" }), _jsx(SelectItem, { value: "de", children: "German" }), _jsx(SelectItem, { value: "zh", children: "Chinese" }), _jsx(SelectItem, { value: "ja", children: "Japanese" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "theme", children: "Theme" }), _jsxs(Select, { defaultValue: "dark", children: [_jsx(SelectTrigger, { id: "theme", children: _jsx(SelectValue, { placeholder: "Select theme" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "light", children: "Light" }), _jsx(SelectItem, { value: "dark", children: "Dark" }), _jsx(SelectItem, { value: "system", children: "System" })] })] })] })] }))
};
// Size Variations
export const SizeVariations = {
    render: () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Small Select" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-50 h-8 text-sm", children: _jsx(SelectValue, { placeholder: "Small select" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "option1", children: "Option 1" }), _jsx(SelectItem, { value: "option2", children: "Option 2" }), _jsx(SelectItem, { value: "option3", children: "Option 3" })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Default Select" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-[250px]", children: _jsx(SelectValue, { placeholder: "Default size" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "option1", children: "Option 1" }), _jsx(SelectItem, { value: "option2", children: "Option 2" }), _jsx(SelectItem, { value: "option3", children: "Option 3" })] })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Large Select" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { className: "w-75 h-12 text-lg", children: _jsx(SelectValue, { placeholder: "Large select" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "option1", children: "Option 1" }), _jsx(SelectItem, { value: "option2", children: "Option 2" }), _jsx(SelectItem, { value: "option3", children: "Option 3" })] })] })] })] }))
};
// Accessibility Demo
export const AccessibilityDemo = {
    render: () => (_jsxs("div", { className: "space-y-4 max-w-md", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Accessibility Features" }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Keyboard navigation (Tab, Arrow keys, Enter, Escape)" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Type-ahead search functionality" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Screen reader support with ARIA labels" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Focus management and indicators" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Portal rendering for proper layering" })] }), _jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-4 space-y-3", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Try keyboard navigation:" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "accessible-select", children: "Accessible Select" }), _jsxs(Select, { children: [_jsx(SelectTrigger, { id: "accessible-select", "aria-describedby": "select-help", children: _jsx(SelectValue, { placeholder: "Use Tab to focus, Enter to open" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "alpha", children: "Alpha - Type 'a' to jump here" }), _jsx(SelectItem, { value: "beta", children: "Beta - Arrow keys navigate" }), _jsx(SelectItem, { value: "gamma", children: "Gamma - Enter to select" }), _jsx(SelectItem, { value: "delta", children: "Delta - Escape to close" })] })] }), _jsx("p", { id: "select-help", className: "text-xs text-gray-400", children: "Tab to focus, Enter/Space to open, Arrow keys to navigate, Enter to select, Escape to close" })] })] })] }))
};
//# sourceMappingURL=select.stories.js.map