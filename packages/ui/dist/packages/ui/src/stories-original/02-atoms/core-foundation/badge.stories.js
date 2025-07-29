import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from '../../../atomic/atoms/badge';
import { HiveCard } from '../../../components/hive-card';
import { CheckCircle2, AlertTriangle, XCircle, Info, Star, Crown, Zap, Shield, Bookmark, Tag } from 'lucide-react';
const meta = {
    title: '02-atoms/Core Foundation/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Badge Component** - Compact status indicators and labels with semantic meaning

Part of the HIVE Atomic Design System providing visual categorization and status indication.

## Features
- **7 Semantic Variants**: Primary, secondary, success, warning, error, info, ghost
- **3 Sizes**: sm, md, lg with appropriate padding and text sizing
- **3 Display Modes**: Standard label, dot indicator, count/notification badge
- **Status Colors**: Semantic color system with proper contrast ratios
- **Icon Support**: Works seamlessly with icons for enhanced meaning
- **Flexible Content**: Supports text, numbers, and mixed content
- **Accessibility**: Proper contrast ratios and semantic meaning

## Use Cases
- **Status Indicators**: Online/offline, active/inactive states
- **Category Labels**: Tags, types, classifications
- **Notification Counts**: Unread messages, pending items
- **Priority Levels**: High, medium, low priority indicators
- **Feature Badges**: New, beta, premium feature indicators
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'ghost'],
            description: 'Semantic color variant'
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Badge size variant'
        },
        dot: {
            control: 'boolean',
            description: 'Show as dot indicator instead of full badge'
        },
        count: {
            control: 'number',
            description: 'Show numeric count (overrides children)'
        },
        maxCount: {
            control: 'number',
            description: 'Maximum count before showing "max+"'
        },
        children: {
            control: 'text',
            description: 'Badge content (text or elements)'
        }
    }
};
export default meta;
// Default Badge
export const Default = {
    args: {
        children: 'Badge'
    }
};
// All Variants
export const AllVariants = {
    render: () => (_jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [_jsx(Badge, { variant: "primary", children: "Primary" }), _jsx(Badge, { variant: "secondary", children: "Secondary" }), _jsx(Badge, { variant: "success", children: "Success" }), _jsx(Badge, { variant: "warning", children: "Warning" }), _jsx(Badge, { variant: "error", children: "Error" }), _jsx(Badge, { variant: "info", children: "Info" }), _jsx(Badge, { variant: "ghost", children: "Ghost" })] }))
};
// All Sizes
export const AllSizes = {
    render: () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Badge, { variant: "primary", size: "sm", children: "Small" }), _jsx(Badge, { variant: "primary", size: "md", children: "Medium" }), _jsx(Badge, { variant: "primary", size: "lg", children: "Large" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Badge, { variant: "success", size: "sm", children: "Active" }), _jsx(Badge, { variant: "success", size: "md", children: "Active" }), _jsx(Badge, { variant: "success", size: "lg", children: "Active" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Badge, { variant: "warning", size: "sm", children: "Warning" }), _jsx(Badge, { variant: "warning", size: "md", children: "Warning" }), _jsx(Badge, { variant: "warning", size: "lg", children: "Warning" })] })] }))
};
// Dot Indicators
export const DotIndicators = {
    render: () => (_jsx("div", { className: "space-y-4 max-w-md", children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Badge, { variant: "success", dot: true, children: "Online" }), _jsx(Badge, { variant: "warning", dot: true, children: "Away" }), _jsx(Badge, { variant: "error", dot: true, children: "Offline" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Badge, { variant: "primary", dot: true, size: "sm", children: "Small Dot" }), _jsx(Badge, { variant: "primary", dot: true, size: "md", children: "Medium Dot" }), _jsx(Badge, { variant: "primary", dot: true, size: "lg", children: "Large Dot" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Badge, { variant: "info", dot: true, children: "Processing" }), _jsx(Badge, { variant: "success", dot: true, children: "Complete" }), _jsx(Badge, { variant: "ghost", dot: true, children: "Inactive" })] })] }) }))
};
// Count Badges
export const CountBadges = {
    render: () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Notification Counts" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Badge, { variant: "primary", count: 3 }), _jsx(Badge, { variant: "error", count: 12 }), _jsx(Badge, { variant: "warning", count: 156 }), _jsx(Badge, { variant: "success", count: 1 })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Large Counts" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Badge, { variant: "primary", count: 99 }), _jsx(Badge, { variant: "primary", count: 100, maxCount: 99 }), _jsx(Badge, { variant: "error", count: 999, maxCount: 99 }), _jsx(Badge, { variant: "warning", count: 1500, maxCount: 999 })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Different Sizes" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Badge, { variant: "primary", count: 5, size: "sm" }), _jsx(Badge, { variant: "primary", count: 5, size: "md" }), _jsx(Badge, { variant: "primary", count: 5, size: "lg" })] })] })] }))
};
// With Icons
export const WithIcons = {
    render: () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Status Badges" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Badge, { variant: "success", children: [_jsx(CheckCircle2, { className: "w-3 h-3" }), "Verified"] }), _jsxs(Badge, { variant: "warning", children: [_jsx(AlertTriangle, { className: "w-3 h-3" }), "Pending"] }), _jsxs(Badge, { variant: "error", children: [_jsx(XCircle, { className: "w-3 h-3" }), "Failed"] }), _jsxs(Badge, { variant: "info", children: [_jsx(Info, { className: "w-3 h-3" }), "Info"] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Feature Badges" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Badge, { variant: "primary", children: [_jsx(Star, { className: "w-3 h-3" }), "Featured"] }), _jsxs(Badge, { variant: "warning", size: "sm", children: [_jsx(Crown, { className: "w-3 h-3" }), "Premium"] }), _jsxs(Badge, { variant: "success", children: [_jsx(Zap, { className: "w-3 h-3" }), "Fast"] }), _jsxs(Badge, { variant: "secondary", children: [_jsx(Shield, { className: "w-3 h-3" }), "Secure"] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Icon Only" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Badge, { variant: "ghost", size: "sm", children: _jsx(Bookmark, { className: "w-3 h-3" }) }), _jsx(Badge, { variant: "primary", size: "md", children: _jsx(Star, { className: "w-4 h-4" }) }), _jsx(Badge, { variant: "success", size: "lg", children: _jsx(CheckCircle2, { className: "w-4 h-4" }) })] })] })] }))
};
// Status Indicators
export const StatusIndicators = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-md", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "User Status" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-800 rounded-lg", children: [_jsx("span", { className: "text-[var(--hive-text-primary)]", children: "John Doe" }), _jsx(Badge, { variant: "success", dot: true, children: "Online" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-800 rounded-lg", children: [_jsx("span", { className: "text-[var(--hive-text-primary)]", children: "Jane Smith" }), _jsx(Badge, { variant: "warning", dot: true, children: "Away" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-800 rounded-lg", children: [_jsx("span", { className: "text-[var(--hive-text-primary)]", children: "Bob Johnson" }), _jsx(Badge, { variant: "error", dot: true, children: "Offline" })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "System Status" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-800 rounded-lg", children: [_jsx("span", { className: "text-[var(--hive-text-primary)]", children: "API Server" }), _jsx(Badge, { variant: "success", children: "Operational" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-800 rounded-lg", children: [_jsx("span", { className: "text-[var(--hive-text-primary)]", children: "Database" }), _jsx(Badge, { variant: "warning", children: "Degraded" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-800 rounded-lg", children: [_jsx("span", { className: "text-[var(--hive-text-primary)]", children: "CDN" }), _jsx(Badge, { variant: "error", children: "Down" })] })] })] })] }))
};
// Notification Examples
export const NotificationExamples = {
    render: () => (_jsxs(HiveCard, { className: "p-6 space-y-6 max-w-md", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Notifications" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-[var(--hive-text-primary)] text-sm font-medium", children: "M" }) }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: "Messages" })] }), _jsx(Badge, { variant: "primary", count: 12 })] }), _jsxs("div", { className: "flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-green-600 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-[var(--hive-text-primary)] text-sm font-medium", children: "T" }) }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: "Tasks" })] }), _jsx(Badge, { variant: "success", count: 5 })] }), _jsxs("div", { className: "flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-red-600 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-[var(--hive-text-primary)] text-sm font-medium", children: "A" }) }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: "Alerts" })] }), _jsx(Badge, { variant: "error", count: 3 })] }), _jsxs("div", { className: "flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-[var(--hive-text-primary)] text-sm font-medium", children: "R" }) }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: "Reviews" })] }), _jsx(Badge, { variant: "warning", count: 156, maxCount: 99 })] })] })] }))
};
// Category Tags
export const CategoryTags = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-2xl", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Content Categories" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Badge, { variant: "primary", children: "JavaScript" }), _jsx(Badge, { variant: "secondary", children: "React" }), _jsx(Badge, { variant: "info", children: "TypeScript" }), _jsx(Badge, { variant: "success", children: "Node.js" }), _jsx(Badge, { variant: "warning", children: "Beta" }), _jsx(Badge, { variant: "ghost", children: "Archive" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Priority Levels" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsxs(Badge, { variant: "error", size: "sm", children: [_jsx(AlertTriangle, { className: "w-3 h-3" }), "Critical"] }), _jsxs(Badge, { variant: "warning", size: "sm", children: [_jsx(Info, { className: "w-3 h-3" }), "High"] }), _jsxs(Badge, { variant: "primary", size: "sm", children: [_jsx(Tag, { className: "w-3 h-3" }), "Medium"] }), _jsxs(Badge, { variant: "ghost", size: "sm", children: [_jsx(Tag, { className: "w-3 h-3" }), "Low"] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Feature Flags" }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsxs(Badge, { variant: "success", size: "lg", children: [_jsx(CheckCircle2, { className: "w-4 h-4" }), "Stable"] }), _jsxs(Badge, { variant: "warning", size: "lg", children: [_jsx(Zap, { className: "w-4 h-4" }), "Beta"] }), _jsxs(Badge, { variant: "info", size: "lg", children: [_jsx(Star, { className: "w-4 h-4" }), "Experimental"] }), _jsxs(Badge, { variant: "error", size: "lg", children: [_jsx(XCircle, { className: "w-4 h-4" }), "Deprecated"] })] })] })] }))
};
// Interactive Demo
export const Interactive = {
    render: (args) => (_jsx("div", { className: "p-8", children: _jsx(Badge, { ...args }) })),
    args: {
        variant: 'primary',
        size: 'md',
        dot: false,
        count: undefined,
        maxCount: 99,
        children: 'Interactive Badge'
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo - use the controls below to test different badge configurations including variants, sizes, dot mode, and count display.'
            }
        }
    }
};
//# sourceMappingURL=badge.stories.js.map