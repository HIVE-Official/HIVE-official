import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '../../atomic/atoms/input';
import { Icon, Search, Mail, Lock, User } from '../../atomic/atoms';
const meta = {
    title: '02-Atoms/Input',
    component: Input,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
# Input Atom

Core input component using 100% semantic tokens (var(--hive-*)).

## Variants
- **Default**: Standard border with focus states
- **Ghost**: Minimal with transparent background
- **Filled**: Subtle background fill

## Features
- Password visibility toggle
- Left/right icon support
- Error states with validation
- Helper text support
- Full responsive sizing

## Design Principles
- Uses only semantic tokens (no hardcoded colors)
- Apple-inspired generous border radius
- Subtle focus and hover states
- Built-in accessibility features
        `,
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'ghost', 'filled'],
        },
        inputSize: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        type: {
            control: 'select',
            options: ['text', 'email', 'password', 'number', 'tel', 'url'],
        },
        disabled: { control: 'boolean' },
        fullWidth: { control: 'boolean' },
    },
    tags: ['autodocs'],
};
export default meta;
export const AllVariants = {
    render: () => (_jsxs("div", { className: "space-y-8 max-w-md", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-[var(--hive-text-primary)]", children: "Input Variants" }), _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { variant: "default", placeholder: "Default input" }), _jsx(Input, { variant: "ghost", placeholder: "Ghost input" }), _jsx(Input, { variant: "filled", placeholder: "Filled input" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-[var(--hive-text-primary)]", children: "Input Sizes" }), _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { inputSize: "sm", placeholder: "Small input" }), _jsx(Input, { inputSize: "md", placeholder: "Medium input" }), _jsx(Input, { inputSize: "lg", placeholder: "Large input" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-[var(--hive-text-primary)]", children: "With Icons" }), _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { leftIcon: _jsx(Icon, { icon: Search }), placeholder: "Search spaces..." }), _jsx(Input, { leftIcon: _jsx(Icon, { icon: Mail }), type: "email", placeholder: "Enter your email" }), _jsx(Input, { leftIcon: _jsx(Icon, { icon: User }), placeholder: "Username", rightIcon: _jsx(Icon, { icon: Lock }) })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-4 text-[var(--hive-text-primary)]", children: "States & Validation" }), _jsxs("div", { className: "space-y-4", children: [_jsx(Input, { label: "Email Address", type: "email", placeholder: "you@university.edu", helperText: "Use your university email" }), _jsx(Input, { label: "Password", type: "password", placeholder: "Enter password", error: "Password must be at least 8 characters" }), _jsx(Input, { label: "Disabled Input", placeholder: "Cannot edit this", disabled: true })] })] })] })),
};
export const Default = {
    args: {
        placeholder: 'Enter text...',
        variant: 'default',
    },
};
export const SearchInput = {
    args: {
        leftIcon: _jsx(Icon, { icon: Search }),
        placeholder: 'Search HIVE spaces...',
        variant: 'ghost',
    },
    parameters: {
        docs: {
            description: {
                story: 'Typical search input with icon using ghost variant for minimal design.',
            },
        },
    },
};
export const LoginForm = {
    render: () => (_jsxs("div", { className: "space-y-4 max-w-sm", children: [_jsx(Input, { label: "Email", type: "email", leftIcon: _jsx(Icon, { icon: Mail }), placeholder: "you@university.edu", helperText: "Use your university email address" }), _jsx(Input, { label: "Password", type: "password", leftIcon: _jsx(Icon, { icon: Lock }), placeholder: "Enter your password" })] })),
    parameters: {
        docs: {
            description: {
                story: 'Example login form using semantic tokens and university context.',
            },
        },
    },
};
//# sourceMappingURL=input.stories.js.map