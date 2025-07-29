import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BreadcrumbNavigation } from '../../../components/shell/breadcrumb-navigation';
import { HiveCard } from '../../../components/hive-card';
import { Text } from '../../../atomic/atoms/text';
import { Folder, FileText, Settings, User, Database, Code, Globe, Package, Layers, Box, GitBranch, Monitor, Shield, Bell, Archive } from 'lucide-react';
const meta = {
    title: '02-atoms/Navigation/Breadcrumb',
    component: BreadcrumbNavigation,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Breadcrumb Navigation** - Hierarchical navigation showing user location and path history

Part of the HIVE Atomic Design System providing clear navigation context and wayfinding.

## Features
- **Home Icon**: Always-present home navigation starting point
- **Icon Support**: Optional icons for each breadcrumb item
- **Clickable Links**: Interactive navigation with hover states
- **Current Page**: Visual distinction for the current/last item
- **Responsive**: Adapts to different screen sizes and content lengths
- **Accessibility**: Proper ARIA labels and semantic navigation structure
- **Separator Icons**: Clear visual separation between levels

## Use Cases
- **File Systems**: Navigate through folder hierarchies
- **Settings Panels**: Show nested configuration sections
- **Multi-step Processes**: Track progress through workflows
- **Content Hierarchies**: Navigate through categorized content
- **Application Sections**: Show current location in app structure

## Accessibility Notes
- Uses semantic nav element with aria-label
- Proper focus management for keyboard navigation
- Visual distinction between clickable and non-clickable items
- Screen reader friendly with clear hierarchy indication
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        items: {
            description: 'Array of breadcrumb items with label, optional href, and optional icon'
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes for styling'
        }
    }
};
export default meta;
// Default Breadcrumb
export const Default = {
    args: {
        items: [
            { label: 'Dashboard' },
            { label: 'Projects' },
            { label: 'HIVE Platform' }
        ]
    }
};
// With Icons
export const WithIcons = {
    args: {
        items: [
            { label: 'Dashboard', icon: Monitor },
            { label: 'Projects', icon: Folder },
            { label: 'HIVE Platform', icon: Code }
        ]
    }
};
// With Clickable Links
export const WithClickableLinks = {
    args: {
        items: [
            { label: 'Dashboard', href: '/dashboard', icon: Monitor },
            { label: 'Projects', href: '/projects', icon: Folder },
            { label: 'Settings', href: '/settings', icon: Settings },
            { label: 'Profile' } // Current page - no href
        ]
    }
};
// File System Navigation
export const FileSystemNavigation = {
    render: () => (_jsx("div", { className: "space-y-6 max-w-2xl", children: _jsxs("div", { className: "space-y-3", children: [_jsx(Text, { variant: "heading-sm", children: "File System Examples" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Root Level" }), _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'Documents', icon: Folder }
                                    ] })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Nested Folders" }), _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'Documents', href: '/documents', icon: Folder },
                                        { label: 'Projects', href: '/documents/projects', icon: Folder },
                                        { label: 'Web Development', href: '/documents/projects/web', icon: Code },
                                        { label: 'HIVE Platform', icon: Globe }
                                    ] })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "File View" }), _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'Documents', href: '/documents', icon: Folder },
                                        { label: 'Designs', href: '/documents/designs', icon: Folder },
                                        { label: 'UI Components', href: '/documents/designs/ui', icon: Layers },
                                        { label: 'button-component.tsx', icon: FileText }
                                    ] })] })] })] }) }))
};
// Application Navigation
export const ApplicationNavigation = {
    render: () => (_jsx("div", { className: "space-y-6 max-w-2xl", children: _jsxs("div", { className: "space-y-3", children: [_jsx(Text, { variant: "heading-sm", children: "Application Sections" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "User Management" }), _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'Admin', href: '/admin', icon: Shield },
                                        { label: 'User Management', href: '/admin/users', icon: User },
                                        { label: 'Profile Settings' }
                                    ] })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "System Configuration" }), _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'System', href: '/system', icon: Settings },
                                        { label: 'Database', href: '/system/database', icon: Database },
                                        { label: 'Connection Settings', href: '/system/database/connections', icon: Globe },
                                        { label: 'Primary Connection' }
                                    ] })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Content Management" }), _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'Content', href: '/content', icon: FileText },
                                        { label: 'Blog Posts', href: '/content/blog', icon: Archive },
                                        { label: 'Getting Started with HIVE' }
                                    ] })] })] })] }) }))
};
// E-commerce Navigation
export const EcommerceNavigation = {
    render: () => (_jsx("div", { className: "space-y-6 max-w-2xl", children: _jsxs("div", { className: "space-y-3", children: [_jsx(Text, { variant: "heading-sm", children: "E-commerce Examples" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Product Catalog" }), _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'Catalog', href: '/catalog', icon: Package },
                                        { label: 'Electronics', href: '/catalog/electronics', icon: Monitor },
                                        { label: 'Computers', href: '/catalog/electronics/computers', icon: Monitor },
                                        { label: 'MacBook Pro 16-inch' }
                                    ] })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Order Management" }), _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'Orders', href: '/orders', icon: Box },
                                        { label: 'Pending', href: '/orders/pending', icon: Archive },
                                        { label: 'Order #12345' }
                                    ] })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Inventory" }), _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'Inventory', href: '/inventory', icon: Package },
                                        { label: 'Warehouse A', href: '/inventory/warehouse-a', icon: Archive },
                                        { label: 'Section B2', href: '/inventory/warehouse-a/b2', icon: Box },
                                        { label: 'SKU-ABC123' }
                                    ] })] })] })] }) }))
};
// Long Navigation Paths
export const LongNavigationPaths = {
    render: () => (_jsx("div", { className: "space-y-6 max-w-4xl", children: _jsxs("div", { className: "space-y-3", children: [_jsx(Text, { variant: "heading-sm", children: "Long Navigation Paths" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Deep Nesting Example" }), _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'Organization', href: '/org', icon: Globe },
                                        { label: 'Engineering', href: '/org/engineering', icon: Code },
                                        { label: 'Frontend Team', href: '/org/engineering/frontend', icon: Monitor },
                                        { label: 'Component Library', href: '/org/engineering/frontend/components', icon: Package },
                                        { label: 'Design System', href: '/org/engineering/frontend/components/design', icon: Layers },
                                        { label: 'Atomic Components', href: '/org/engineering/frontend/components/design/atomic', icon: Box },
                                        { label: 'Button Component' }
                                    ] })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Project Structure" }), _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'Workspace', href: '/workspace', icon: Folder },
                                        { label: 'HIVE Platform', href: '/workspace/hive', icon: Globe },
                                        { label: 'Frontend', href: '/workspace/hive/frontend', icon: Code },
                                        { label: 'Source', href: '/workspace/hive/frontend/src', icon: Folder },
                                        { label: 'Components', href: '/workspace/hive/frontend/src/components', icon: Package },
                                        { label: 'UI', href: '/workspace/hive/frontend/src/components/ui', icon: Layers },
                                        { label: 'Navigation', href: '/workspace/hive/frontend/src/components/ui/navigation', icon: GitBranch },
                                        { label: 'breadcrumb.tsx' }
                                    ] })] })] })] }) }))
};
// Context Examples
export const ContextExamples = {
    render: () => (_jsxs("div", { className: "space-y-8 max-w-4xl", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Dashboard Context" }), _jsxs(HiveCard, { className: "p-6", children: [_jsx("div", { className: "mb-4", children: _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'Analytics', href: '/analytics', icon: Monitor },
                                        { label: 'Performance', href: '/analytics/performance', icon: GitBranch },
                                        { label: 'Real-time Metrics' }
                                    ] }) }), _jsx(Text, { variant: "heading-lg", className: "mb-2", children: "Real-time Metrics" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Monitor your application performance with real-time data visualization and alerts." })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Settings Context" }), _jsxs(HiveCard, { className: "p-6", children: [_jsx("div", { className: "mb-4", children: _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'Account', href: '/account', icon: User },
                                        { label: 'Security', href: '/account/security', icon: Shield },
                                        { label: 'Two-Factor Authentication' }
                                    ] }) }), _jsx(Text, { variant: "heading-lg", className: "mb-2", children: "Two-Factor Authentication" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Secure your account with an additional layer of authentication for enhanced security." })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Content Management Context" }), _jsxs(HiveCard, { className: "p-6", children: [_jsx("div", { className: "mb-4", children: _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'Content', href: '/content', icon: FileText },
                                        { label: 'Documentation', href: '/content/docs', icon: Archive },
                                        { label: 'API Reference', href: '/content/docs/api', icon: Code },
                                        { label: 'Authentication Endpoints' }
                                    ] }) }), _jsx(Text, { variant: "heading-lg", className: "mb-2", children: "Authentication Endpoints" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Complete reference for authentication API endpoints including request/response examples." })] })] })] }))
};
// Responsive Behavior
export const ResponsiveBehavior = {
    render: () => (_jsx("div", { className: "space-y-8 max-w-4xl", children: _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Responsive Breadcrumbs" }), _jsx(Text, { variant: "body-md", color: "secondary", children: "Breadcrumbs adapt to different screen sizes while maintaining usability." }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Mobile View (Truncated)" }), _jsx("div", { className: "max-w-xs border border-[var(--hive-border-default)] rounded-lg p-4", children: _jsx(BreadcrumbNavigation, { items: [
                                            { label: 'Settings', icon: Settings },
                                            { label: 'Profile' }
                                        ] }) })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Tablet View (Moderate)" }), _jsx("div", { className: "max-w-md border border-[var(--hive-border-default)] rounded-lg p-4", children: _jsx(BreadcrumbNavigation, { items: [
                                            { label: 'Dashboard', href: '/dashboard', icon: Monitor },
                                            { label: 'Projects', href: '/projects', icon: Folder },
                                            { label: 'HIVE Platform' }
                                        ] }) })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Desktop View (Full)" }), _jsx("div", { className: "max-w-2xl border border-[var(--hive-border-default)] rounded-lg p-4", children: _jsx(BreadcrumbNavigation, { items: [
                                            { label: 'Organization', href: '/org', icon: Globe },
                                            { label: 'Engineering', href: '/org/engineering', icon: Code },
                                            { label: 'Frontend Team', href: '/org/engineering/frontend', icon: Monitor },
                                            { label: 'Component Library', href: '/org/engineering/frontend/components', icon: Package },
                                            { label: 'Breadcrumb Component' }
                                        ] }) })] })] })] }) }))
};
// Special Cases
export const SpecialCases = {
    render: () => (_jsx("div", { className: "space-y-6 max-w-2xl", children: _jsxs("div", { className: "space-y-3", children: [_jsx(Text, { variant: "heading-sm", children: "Special Cases" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Home Only" }), _jsx(BreadcrumbNavigation, { items: [] })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Single Level" }), _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'Dashboard', icon: Monitor }
                                    ] })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "No Icons" }), _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'Level 1', href: '/level1' },
                                        { label: 'Level 2', href: '/level1/level2' },
                                        { label: 'Level 3', href: '/level1/level2/level3' },
                                        { label: 'Current Page' }
                                    ] })] }), _jsxs("div", { children: [_jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "Mixed Icons" }), _jsx(BreadcrumbNavigation, { items: [
                                        { label: 'System', href: '/system', icon: Settings },
                                        { label: 'Notifications', href: '/system/notifications' }, // No icon
                                        { label: 'Email Settings', icon: Bell }
                                    ] })] })] })] }) }))
};
// Interactive Demo
export const Interactive = {
    render: (args) => (_jsx("div", { className: "max-w-2xl", children: _jsx(BreadcrumbNavigation, { ...args }) })),
    args: {
        items: [
            { label: 'Dashboard', href: '/dashboard', icon: Monitor },
            { label: 'Projects', href: '/projects', icon: Folder },
            { label: 'HIVE Platform', href: '/projects/hive', icon: Code },
            { label: 'Components' }
        ]
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo - modify the items array in the controls to test different breadcrumb configurations. Each item can have a label, optional href (for clickable links), and optional icon.'
            }
        }
    }
};
//# sourceMappingURL=breadcrumb.stories.js.map