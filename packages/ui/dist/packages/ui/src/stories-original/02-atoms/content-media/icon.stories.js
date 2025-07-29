import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from '../../../atomic/atoms/icon';
import { HiveCard } from '../../../components/hive-card';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { Home, User, Settings, Search, Heart, Star, Bell, Mail, MessageSquare, Calendar, Clock, Camera, Image, Video, Music, Download, Upload, Share, Edit, Trash2, Plus, ExternalLink, Copy, Save, Refresh, Info, AlertTriangle, CheckCircle, XCircle, Shield, Lock, Unlock, Eye, EyeOff, Zap, Target, TrendingUp, Activity, BarChart3, Database, Server, Code, Terminal, Github, Globe, Wifi, WifiOff, Battery, BatteryLow, Volume2, VolumeX, Play, Pause } from 'lucide-react';
const meta = {
    title: '02-atoms/Content Media/Icon',
    component: Icon,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Icon Component** - Consistent icon rendering with semantic colors and sizing

Part of the HIVE Atomic Design System providing standardized icon usage across the platform.

## Features
- **6 Sizes**: xs (3), sm (16px), md (5), lg (24px), xl (32px), 2xl (10)
- **7 Semantic Colors**: Primary, secondary, muted, and accent colors (gold, ruby, emerald, sapphire)
- **3 Visual Variants**: Default, outlined, filled styles
- **Lucide Integration**: Full compatibility with Lucide React icon library
- **Consistent Sizing**: Standardized dimensions for visual harmony
- **Semantic Colors**: Uses HIVE design tokens for consistent theming
- **Performance**: Optimized SVG rendering with flex-shrink-0

## Icon Library
Uses Lucide React icons for consistent, high-quality SVG icons with:
- Over 1000+ icons available
- Consistent stroke width and styling
- Tree-shakable for optimal bundle size
- Accessibility-ready with proper attributes

## Use Cases
- **Navigation**: Menu items, buttons, and interactive elements
- **Status Indicators**: Success, error, warning, and info states
- **Actions**: Save, edit, delete, and other user actions
- **Content**: Media, documents, and content type indicators
- **System**: Settings, notifications, and system states
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        icon: {
            description: 'Lucide icon component to render'
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
            description: 'Icon size variant'
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'muted', 'gold', 'ruby', 'emerald', 'sapphire'],
            description: 'Semantic color variant'
        },
        variant: {
            control: 'select',
            options: ['default', 'outlined', 'filled'],
            description: 'Visual style variant'
        }
    }
};
export default meta;
// Default Icon
export const Default = {
    args: {
        icon: Home,
        size: 'md',
        color: 'primary'
    }
};
// All Sizes
export const AllSizes = {
    render: () => (_jsxs("div", { className: "flex items-end gap-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Star, size: "xs" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "XS (3)" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Star, size: "sm" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "SM (16px)" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Star, size: "md" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "MD (5)" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Star, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "LG (24px)" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Star, size: "xl" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "XL (32px)" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Star, size: "2xl" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "2XL (10)" })] })] }))
};
// All Colors
export const AllColors = {
    render: () => (_jsxs("div", { className: "flex flex-wrap gap-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Heart, color: "primary", size: "lg" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Primary" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Heart, color: "secondary", size: "lg" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Secondary" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Heart, color: "muted", size: "lg" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Muted" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Heart, color: "gold", size: "lg" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Gold" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Heart, color: "ruby", size: "lg" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Ruby" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Heart, color: "emerald", size: "lg" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Emerald" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Heart, color: "sapphire", size: "lg" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Sapphire" })] })] }))
};
// Visual Variants
export const VisualVariants = {
    render: () => (_jsxs("div", { className: "flex gap-8", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Shield, variant: "default", size: "xl", color: "primary" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Default" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Shield, variant: "outlined", size: "xl", color: "primary" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Outlined" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Shield, variant: "filled", size: "xl", color: "primary" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Filled" })] })] }))
};
// Common Icons Collection
export const CommonIcons = {
    render: () => (_jsxs("div", { className: "space-y-8 max-w-4xl", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Navigation Icons" }), _jsxs("div", { className: "grid grid-cols-8 gap-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Home, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Home" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: User, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "User" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Settings, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Settings" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Search, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Search" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Bell, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Bell" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Mail, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Mail" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Calendar, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Calendar" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: MessageSquare, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Message" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Action Icons" }), _jsxs("div", { className: "grid grid-cols-8 gap-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Plus, size: "lg", color: "emerald" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Add" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Edit, size: "lg", color: "sapphire" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Edit" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Trash2, size: "lg", color: "ruby" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Delete" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Save, size: "lg", color: "emerald" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Save" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Copy, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Copy" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Share, size: "lg", color: "gold" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Share" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Download, size: "lg", color: "sapphire" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Download" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Upload, size: "lg", color: "gold" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Upload" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Status Icons" }), _jsxs("div", { className: "grid grid-cols-8 gap-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: CheckCircle, size: "lg", color: "emerald" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Success" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: XCircle, size: "lg", color: "ruby" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Error" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: AlertTriangle, size: "lg", color: "gold" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Warning" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Info, size: "lg", color: "sapphire" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Info" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Clock, size: "lg", color: "gold" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Pending" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Zap, size: "lg", color: "gold" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Active" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Shield, size: "lg", color: "emerald" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Secure" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Target, size: "lg", color: "ruby" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Target" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Media Icons" }), _jsxs("div", { className: "grid grid-cols-8 gap-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Play, size: "lg", color: "emerald" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Play" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Pause, size: "lg", color: "gold" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Pause" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Camera, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Camera" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Image, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Image" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Video, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Video" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Music, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Music" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Volume2, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Volume" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: VolumeX, size: "lg", color: "ruby" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Muted" })] })] })] })] }))
};
// Icon in Context
export const IconInContext = {
    render: () => (_jsxs("div", { className: "space-y-8 max-w-2xl", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Navigation Menu" }), _jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-3 p-2 hover:bg-gray-800 rounded-md cursor-pointer", children: [_jsx(Icon, { icon: Home, size: "sm" }), _jsx(Text, { children: "Dashboard" })] }), _jsxs("div", { className: "flex items-center gap-3 p-2 hover:bg-gray-800 rounded-md cursor-pointer", children: [_jsx(Icon, { icon: User, size: "sm" }), _jsx(Text, { children: "Profile" })] }), _jsxs("div", { className: "flex items-center gap-3 p-2 hover:bg-gray-800 rounded-md cursor-pointer", children: [_jsx(Icon, { icon: Settings, size: "sm" }), _jsx(Text, { children: "Settings" })] }), _jsxs("div", { className: "flex items-center gap-3 p-2 hover:bg-gray-800 rounded-md cursor-pointer", children: [_jsx(Icon, { icon: Bell, size: "sm" }), _jsx(Text, { children: "Notifications" }), _jsx(Badge, { variant: "primary", count: 3, className: "ml-auto" })] })] }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Status Cards" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Icon, { icon: CheckCircle, size: "lg", color: "emerald" }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-sm", children: "System Online" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "All services operational" })] })] }) }), _jsx(HiveCard, { className: "p-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Icon, { icon: AlertTriangle, size: "lg", color: "gold" }), _jsxs("div", { children: [_jsx(Text, { variant: "heading-sm", children: "Maintenance" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Scheduled downtime at 2AM" })] })] }) })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Action Buttons" }), _jsxs("div", { className: "flex gap-3", children: [_jsxs("button", { className: "flex items-center gap-2 px-4 py-2 bg-blue-600 text-[var(--hive-text-primary)] rounded-lg hover:bg-blue-700 transition-colors", children: [_jsx(Icon, { icon: Plus, size: "sm" }), "Create New"] }), _jsxs("button", { className: "flex items-center gap-2 px-4 py-2 bg-gray-600 text-[var(--hive-text-primary)] rounded-lg hover:bg-gray-700 transition-colors", children: [_jsx(Icon, { icon: Download, size: "sm" }), "Export"] }), _jsxs("button", { className: "flex items-center gap-2 px-4 py-2 bg-red-600 text-[var(--hive-text-primary)] rounded-lg hover:bg-red-700 transition-colors", children: [_jsx(Icon, { icon: Trash2, size: "sm" }), "Delete"] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Data Visualization" }), _jsxs(HiveCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx(Text, { variant: "heading-sm", children: "Analytics Dashboard" }), _jsx(Icon, { icon: BarChart3, size: "lg", color: "gold" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx(Icon, { icon: TrendingUp, size: "xl", color: "emerald", className: "mx-auto mb-2" }), _jsx(Text, { variant: "display-sm", color: "emerald", children: "+23%" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Growth" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Icon, { icon: Activity, size: "xl", color: "sapphire", className: "mx-auto mb-2" }), _jsx(Text, { variant: "display-sm", color: "sapphire", children: "1.2K" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Active Users" })] }), _jsxs("div", { className: "text-center", children: [_jsx(Icon, { icon: Server, size: "xl", color: "gold", className: "mx-auto mb-2" }), _jsx(Text, { variant: "display-sm", color: "gold", children: "99.9%" }), _jsx(Text, { variant: "body-sm", color: "secondary", children: "Uptime" })] })] })] })] })] }))
};
// Technical Icons
export const TechnicalIcons = {
    render: () => (_jsxs("div", { className: "space-y-8 max-w-4xl", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "Development Icons" }), _jsxs("div", { className: "grid grid-cols-8 gap-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Code, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Code" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Terminal, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Terminal" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Github, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "GitHub" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Database, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Database" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Server, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Server" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Globe, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Web" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Wifi, size: "lg", color: "emerald" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Connected" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: WifiOff, size: "lg", color: "ruby" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Offline" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Text, { variant: "heading-sm", children: "System Icons" }), _jsxs("div", { className: "grid grid-cols-8 gap-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Battery, size: "lg", color: "emerald" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Battery" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: BatteryLow, size: "lg", color: "ruby" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Low Battery" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Lock, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Locked" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Unlock, size: "lg", color: "gold" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Unlocked" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Eye, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Visible" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: EyeOff, size: "lg", color: "muted" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Hidden" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: Refresh, size: "lg", color: "sapphire" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Refresh" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Icon, { icon: ExternalLink, size: "lg" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "External" })] })] })] })] }))
};
// Interactive Demo
export const Interactive = {
    render: (args) => (_jsx("div", { className: "p-8", children: _jsx(Icon, { ...args }) })),
    args: {
        icon: Star,
        size: 'lg',
        color: 'primary',
        variant: 'default'
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo - use the controls below to test different icon configurations including size, color, and visual variants. Note: The icon prop requires selecting from the available Lucide icons.'
            }
        }
    }
};
//# sourceMappingURL=icon.stories.js.map