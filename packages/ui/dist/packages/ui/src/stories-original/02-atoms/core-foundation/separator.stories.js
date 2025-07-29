import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Separator, HorizontalSeparator, VerticalSeparator, GradientDivider } from '../../../atomic/atoms/separator';
import { HiveCard } from '../../../components/hive-card';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { Avatar } from '../../../atomic/atoms/avatar';
const meta = {
    title: '02-atoms/Core Foundation/Separator',
    component: Separator,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Separator Component** - Visual dividers for content organization and layout structure

Part of the HIVE Atomic Design System providing consistent content separation and visual hierarchy.

## Features
- **2 Orientations**: Horizontal (default) and vertical separators
- **4 Visual Variants**: Solid, dashed, dotted, gradient styles
- **3 Sizes**: sm (1px), md (0.5), lg (3px) thickness options
- **4 Spacing Options**: None, sm, md, lg margin control
- **Accessibility**: Proper ARIA roles and orientation attributes
- **Preset Components**: Convenient shortcuts for common patterns
- **Design Token Integration**: Uses HIVE border color tokens

## Use Cases
- **Content Sections**: Separate different content areas
- **Navigation Items**: Divide menu and navigation elements
- **Card Components**: Internal content organization
- **Toolbar Separators**: Group related actions
- **List Dividers**: Separate list items and categories

## Accessibility Notes
- Uses proper separator role for screen readers
- Includes aria-orientation for navigation context
- decorative prop for purely visual separators
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            description: 'Separator orientation'
        },
        variant: {
            control: 'select',
            options: ['solid', 'dashed', 'dotted', 'gradient'],
            description: 'Visual style variant'
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Separator thickness'
        },
        spacing: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg'],
            description: 'Margin spacing around separator'
        },
        decorative: {
            control: 'boolean',
            description: 'Whether separator is decorative (affects ARIA role)'
        }
    }
};
export default meta;
// Default Separator
export const Default = {
    render: () => (_jsxs("div", { className: "w-80", children: [_jsx(Text, { children: "Content above separator" }), _jsx(Separator, {}), _jsx(Text, { children: "Content below separator" })] }))
};
// All Orientations
export const AllOrientations = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-4", children: "Horizontal Separator" }), _jsxs("div", { className: "w-80", children: [_jsx(Text, { children: "First section" }), _jsx(Separator, { orientation: "horizontal" }), _jsx(Text, { children: "Second section" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-4", children: "Vertical Separator" }), _jsxs("div", { className: "flex items-center h-20", children: [_jsx(Text, { children: "Left" }), _jsx(Separator, { orientation: "vertical", className: "mx-4" }), _jsx(Text, { children: "Right" })] })] })] }))
};
// All Variants
export const AllVariants = {
    render: () => (_jsxs("div", { className: "space-y-6 w-80", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Solid" }), _jsx(Separator, { variant: "solid" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Dashed" }), _jsx(Separator, { variant: "dashed" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Dotted" }), _jsx(Separator, { variant: "dotted" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Gradient" }), _jsx(Separator, { variant: "gradient" })] })] }))
};
// All Sizes
export const AllSizes = {
    render: () => (_jsxs("div", { className: "space-y-6 w-80", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Small (1px)" }), _jsx(Separator, { size: "sm" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Medium (0.5)" }), _jsx(Separator, { size: "md" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Large (3px)" }), _jsx(Separator, { size: "lg" })] })] }))
};
// Spacing Options
export const SpacingOptions = {
    render: () => (_jsxs("div", { className: "space-y-8 w-80", children: [_jsxs("div", { className: "bg-gray-800 p-4 rounded-lg", children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "No Spacing" }), _jsx(Text, { children: "Content above" }), _jsx(Separator, { spacing: "none" }), _jsx(Text, { children: "Content below" })] }), _jsxs("div", { className: "bg-gray-800 p-4 rounded-lg", children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Small Spacing" }), _jsx(Text, { children: "Content above" }), _jsx(Separator, { spacing: "sm" }), _jsx(Text, { children: "Content below" })] }), _jsxs("div", { className: "bg-gray-800 p-4 rounded-lg", children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Medium Spacing (Default)" }), _jsx(Text, { children: "Content above" }), _jsx(Separator, { spacing: "md" }), _jsx(Text, { children: "Content below" })] }), _jsxs("div", { className: "bg-gray-800 p-4 rounded-lg", children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Large Spacing" }), _jsx(Text, { children: "Content above" }), _jsx(Separator, { spacing: "lg" }), _jsx(Text, { children: "Content below" })] })] }))
};
// Vertical Separators
export const VerticalSeparators = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-4", children: "Navigation Bar" }), _jsxs("div", { className: "flex items-center h-12 bg-gray-800 px-4 rounded-lg", children: [_jsx(Text, { children: "Home" }), _jsx(VerticalSeparator, { spacing: "sm" }), _jsx(Text, { children: "About" }), _jsx(VerticalSeparator, { spacing: "sm" }), _jsx(Text, { children: "Services" }), _jsx(VerticalSeparator, { spacing: "sm" }), _jsx(Text, { children: "Contact" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-4", children: "Toolbar Actions" }), _jsxs("div", { className: "flex items-center h-10 bg-gray-800 px-3 rounded-lg", children: [_jsx("button", { className: "px-2 py-1 text-sm text-[var(--hive-text-primary)] hover:bg-gray-700 rounded", children: "Copy" }), _jsx(VerticalSeparator, { spacing: "sm" }), _jsx("button", { className: "px-2 py-1 text-sm text-[var(--hive-text-primary)] hover:bg-gray-700 rounded", children: "Paste" }), _jsx(VerticalSeparator, { spacing: "sm" }), _jsx("button", { className: "px-2 py-1 text-sm text-[var(--hive-text-primary)] hover:bg-gray-700 rounded", children: "Delete" })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-4", children: "Breadcrumb Navigation" }), _jsxs("div", { className: "flex items-center h-8", children: [_jsx(Text, { variant: "body-sm", children: "Dashboard" }), _jsx(VerticalSeparator, { spacing: "sm", size: "sm" }), _jsx(Text, { variant: "body-sm", children: "Projects" }), _jsx(VerticalSeparator, { spacing: "sm", size: "sm" }), _jsx(Text, { variant: "body-sm", color: "gold", children: "Current Project" })] })] })] }))
};
// Preset Components
export const PresetComponents = {
    render: () => (_jsxs("div", { className: "space-y-8 w-80", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "HorizontalSeparator" }), _jsx(Text, { children: "Using preset component" }), _jsx(HorizontalSeparator, {}), _jsx(Text, { children: "Simplified API" })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "GradientDivider" }), _jsx(Text, { children: "Beautiful gradient effect" }), _jsx(GradientDivider, {}), _jsx(Text, { children: "Smooth transition" })] }), _jsxs("div", { className: "flex items-center h-16", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "VerticalSeparator:" }), _jsx(VerticalSeparator, { spacing: "md" }), _jsx(Text, { children: "Clean separation" })] })] }))
};
// Card Content Separation
export const CardContentSeparation = {
    render: () => (_jsxs(HiveCard, { className: "p-6 max-w-md", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx(Avatar, { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", size: "lg" }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-sm", children: "John Doe" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Software Engineer" })] })] }), _jsx(Separator, {}), _jsx("div", { className: "py-4", children: _jsx(Text, { variant: "body-md", children: "Passionate about building great user experiences and scalable applications. Currently working on the HIVE platform to revolutionize collaborative development." }) }), _jsx(Separator, { variant: "dashed" }), _jsx("div", { className: "pt-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Skills" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Badge, { variant: "primary", size: "sm", children: "React" }), _jsx(Badge, { variant: "secondary", size: "sm", children: "TypeScript" }), _jsx(Badge, { variant: "success", size: "sm", children: "Node.js" })] })] }) })] }))
};
// List Separators
export const ListSeparators = {
    render: () => (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-4", children: "Menu List" }), _jsx(HiveCard, { className: "p-4 max-w-xs", children: _jsxs("div", { className: "space-y-0", children: [_jsx("div", { className: "px-3 py-2 text-[var(--hive-text-primary)] hover:bg-gray-800 rounded cursor-pointer", children: "Profile Settings" }), _jsx(Separator, { spacing: "none" }), _jsx("div", { className: "px-3 py-2 text-[var(--hive-text-primary)] hover:bg-gray-800 rounded cursor-pointer", children: "Notifications" }), _jsx(Separator, { spacing: "none" }), _jsx("div", { className: "px-3 py-2 text-[var(--hive-text-primary)] hover:bg-gray-800 rounded cursor-pointer", children: "Privacy & Security" }), _jsx(Separator, { spacing: "none" }), _jsx("div", { className: "px-3 py-2 text-[var(--hive-text-primary)] hover:bg-gray-800 rounded cursor-pointer", children: "Billing" }), _jsx(Separator, { spacing: "none" }), _jsx("div", { className: "px-3 py-2 text-red-400 hover:bg-gray-800 rounded cursor-pointer", children: "Sign Out" })] }) })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-4", children: "Content List" }), _jsxs("div", { className: "max-w-md space-y-0", children: [_jsxs("div", { className: "py-3", children: [_jsx(Text, { variant: "heading-sm", children: "Project Alpha" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "React dashboard for analytics" })] }), _jsx(Separator, {}), _jsxs("div", { className: "py-3", children: [_jsx(Text, { variant: "heading-sm", children: "Project Beta" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Mobile app for iOS and Android" })] }), _jsx(Separator, {}), _jsxs("div", { className: "py-3", children: [_jsx(Text, { variant: "heading-sm", children: "Project Gamma" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "API service for data processing" })] })] })] })] }))
};
// Complex Layout Example
export const ComplexLayoutExample = {
    render: () => (_jsx(HiveCard, { className: "p-6 max-w-2xl", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Text, { variant: "display-sm", as: "h1", children: "Project Dashboard" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Manage your projects and team collaboration" })] }), _jsx(GradientDivider, { size: "lg" }), _jsxs("div", { className: "grid grid-cols-3 gap-6", children: [_jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "display-md", color: "gold", children: "12" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Active Projects" })] }), _jsx("div", { className: "flex justify-center", children: _jsx(VerticalSeparator, { size: "lg" }) }), _jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "display-md", color: "emerald", children: "45" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Team Members" })] }), _jsx("div", { className: "flex justify-center", children: _jsx(VerticalSeparator, { size: "lg" }) }), _jsxs("div", { className: "text-center", children: [_jsx(Text, { variant: "display-md", color: "ruby", children: "3" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Pending Tasks" })] })] }), _jsx(Separator, { variant: "dashed" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { className: "px-4 py-2 bg-blue-600 text-[var(--hive-text-primary)] rounded-lg", children: "New Project" }), _jsx(VerticalSeparator, {}), _jsx("button", { className: "px-4 py-2 bg-gray-600 text-[var(--hive-text-primary)] rounded-lg", children: "Import" }), _jsx(VerticalSeparator, {}), _jsx("button", { className: "px-4 py-2 bg-gray-600 text-[var(--hive-text-primary)] rounded-lg", children: "Export" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: "success", dot: true, children: "5 online" }), _jsx(Badge, { variant: "warning", count: 3 })] })] })] }) }))
};
// Interactive Demo
export const Interactive = {
    render: (args) => (_jsxs("div", { className: "w-80", children: [_jsx(Text, { children: "Content above separator" }), _jsx(Separator, { ...args }), _jsx(Text, { children: "Content below separator" }), args.orientation === 'vertical' && (_jsxs("div", { className: "mt-8", children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-4", children: "Vertical separator example:" }), _jsxs("div", { className: "flex items-center h-16", children: [_jsx(Text, { children: "Left content" }), _jsx(Separator, { ...args, className: "mx-4" }), _jsx(Text, { children: "Right content" })] })] }))] })),
    args: {
        orientation: 'horizontal',
        variant: 'solid',
        size: 'md',
        spacing: 'md',
        decorative: false
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo - use the controls below to test different separator configurations including orientation, variant, size, and spacing options.'
            }
        }
    }
};
//# sourceMappingURL=separator.stories.js.map