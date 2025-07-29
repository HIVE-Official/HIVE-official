import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar } from '../../../atomic/atoms/avatar';
import { HiveCard } from '../../../components/hive-card';
import { Badge } from '../../../atomic/atoms/badge';
import { Bot, Crown, Shield, Star, Camera, Settings } from 'lucide-react';
const meta = {
    title: '02-atoms/Core Foundation/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Avatar Component** - User profile images with status indicators and fallbacks

Part of the HIVE Atomic Design System providing consistent user representation across the platform.

## Features
- **6 Sizes**: xs (24px), sm (32px), md (10), lg (48px), xl (64px), 2xl (80px)
- **5 Status Indicators**: Online, offline, away, busy, ghost with semantic colors
- **Fallback System**: Image → initials → custom placeholder → default icon
- **Interactive Mode**: Hover states and focus management for clickable avatars
- **Error Handling**: Graceful fallback when images fail to load
- **Accessibility**: Proper alt text and focus indicators
- **Design Token Integration**: Uses HIVE semantic color tokens

## Use Cases
- **User Profiles**: Personal avatars in navigation and profiles
- **Status Indication**: Show user availability and presence
- **Team Members**: Display team member photos and status
- **Comment Systems**: Author avatars in discussions
- **Contact Lists**: Visual identification in user lists
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        src: {
            control: 'text',
            description: 'Image URL for the avatar'
        },
        alt: {
            control: 'text',
            description: 'Alt text for the image'
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
            description: 'Avatar size variant'
        },
        status: {
            control: 'select',
            options: ['online', 'offline', 'away', 'busy', 'ghost'],
            description: 'Status indicator color'
        },
        initials: {
            control: 'text',
            description: 'Initials to display as fallback'
        },
        interactive: {
            control: 'boolean',
            description: 'Enable hover and focus states'
        }
    }
};
export default meta;
// Sample avatar URLs for demos
const sampleAvatars = {
    user1: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    user2: 'https://images.unsplash.com/photo-1494790108755-2616b2c0c3ee?w=150&h=150&fit=crop&crop=face',
    user3: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    user4: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    user5: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
};
// Default Avatar
export const Default = {
    args: {
        src: sampleAvatars.user1,
        alt: 'User avatar'
    }
};
// All Sizes
export const AllSizes = {
    render: () => (_jsxs("div", { className: "flex items-end gap-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { size: "xs", src: sampleAvatars.user1 }), _jsx("p", { className: "text-xs text-gray-400", children: "XS (24px)" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { size: "sm", src: sampleAvatars.user1 }), _jsx("p", { className: "text-xs text-gray-400", children: "SM (32px)" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { size: "md", src: sampleAvatars.user1 }), _jsx("p", { className: "text-xs text-gray-400", children: "MD (10)" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { size: "lg", src: sampleAvatars.user1 }), _jsx("p", { className: "text-xs text-gray-400", children: "LG (48px)" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { size: "xl", src: sampleAvatars.user1 }), _jsx("p", { className: "text-xs text-gray-400", children: "XL (64px)" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { size: "2xl", src: sampleAvatars.user1 }), _jsx("p", { className: "text-xs text-gray-400", children: "2XL (80px)" })] })] }))
};
// Status Indicators
export const StatusIndicators = {
    render: () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "All Status Types" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { src: sampleAvatars.user1, status: "online" }), _jsx("p", { className: "text-xs text-gray-400", children: "Online" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { src: sampleAvatars.user2, status: "away" }), _jsx("p", { className: "text-xs text-gray-400", children: "Away" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { src: sampleAvatars.user3, status: "busy" }), _jsx("p", { className: "text-xs text-gray-400", children: "Busy" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { src: sampleAvatars.user4, status: "offline" }), _jsx("p", { className: "text-xs text-gray-400", children: "Offline" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { src: sampleAvatars.user5, status: "ghost" }), _jsx("p", { className: "text-xs text-gray-400", children: "Ghost" })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Different Sizes with Status" }), _jsxs("div", { className: "flex items-end gap-4", children: [_jsx(Avatar, { size: "sm", src: sampleAvatars.user1, status: "online" }), _jsx(Avatar, { size: "md", src: sampleAvatars.user2, status: "away" }), _jsx(Avatar, { size: "lg", src: sampleAvatars.user3, status: "busy" }), _jsx(Avatar, { size: "xl", src: sampleAvatars.user4, status: "offline" })] })] })] }))
};
// Fallback System
export const FallbackSystem = {
    render: () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Image Avatar" }), _jsx(Avatar, { src: sampleAvatars.user1, alt: "John Doe" })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Initials Fallback" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Avatar, { initials: "JD" }), _jsx(Avatar, { initials: "AS", size: "lg" }), _jsx(Avatar, { initials: "MK", size: "xl", status: "online" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Custom Placeholder" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Avatar, { size: "md", placeholder: _jsx(Bot, { className: "w-5 h-5 text-blue-400" }) }), _jsx(Avatar, { size: "lg", placeholder: _jsx(Crown, { className: "w-6 h-6 text-yellow-400" }), status: "online" }), _jsx(Avatar, { size: "xl", placeholder: _jsx(Shield, { className: "w-8 h-8 text-green-400" }) })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Default Fallback" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Avatar, { size: "sm" }), _jsx(Avatar, { size: "md", status: "away" }), _jsx(Avatar, { size: "lg", status: "offline" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Image Error Handling" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Avatar, { src: "https://invalid-url.jpg", initials: "ER", alt: "Error handling demo" }), _jsx(Avatar, { src: "https://another-invalid-url.jpg", placeholder: _jsx(Camera, { className: "w-5 h-5 text-gray-400" }) })] })] })] }))
};
// Interactive Mode
export const InteractiveMode = {
    render: () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Interactive Avatars" }), _jsx("p", { className: "text-sm text-gray-400", children: "Hover to see interaction states" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Avatar, { src: sampleAvatars.user1, interactive: true, status: "online" }), _jsx(Avatar, { initials: "JD", interactive: true, status: "away", size: "lg" }), _jsx(Avatar, { placeholder: _jsx(Bot, { className: "w-6 h-6 text-blue-400" }), interactive: true, size: "xl" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Non-Interactive (Default)" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Avatar, { src: sampleAvatars.user2, status: "online" }), _jsx(Avatar, { initials: "AS", status: "busy", size: "lg" }), _jsx(Avatar, { placeholder: _jsx(Shield, { className: "w-8 h-8 text-green-400" }), size: "xl" })] })] })] }))
};
// Team Avatar List
export const TeamAvatarList = {
    render: () => (_jsxs(HiveCard, { className: "p-6 space-y-6 max-w-md", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Team Members" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Avatar, { src: sampleAvatars.user1, status: "online", interactive: true }), _jsxs("div", { children: [_jsx("p", { className: "text-[var(--hive-text-primary)] font-medium", children: "John Doe" }), _jsx("p", { className: "text-sm text-gray-400", children: "Product Manager" })] })] }), _jsx(Badge, { variant: "success", dot: true, children: "Online" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Avatar, { src: sampleAvatars.user2, status: "away", interactive: true }), _jsxs("div", { children: [_jsx("p", { className: "text-[var(--hive-text-primary)] font-medium", children: "Alice Smith" }), _jsx("p", { className: "text-sm text-gray-400", children: "Lead Designer" })] })] }), _jsx(Badge, { variant: "warning", dot: true, children: "Away" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Avatar, { src: sampleAvatars.user3, status: "busy", interactive: true }), _jsxs("div", { children: [_jsx("p", { className: "text-[var(--hive-text-primary)] font-medium", children: "Bob Johnson" }), _jsx("p", { className: "text-sm text-gray-400", children: "Senior Developer" })] })] }), _jsx(Badge, { variant: "error", dot: true, children: "Busy" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Avatar, { initials: "MK", status: "offline", interactive: true }), _jsxs("div", { children: [_jsx("p", { className: "text-[var(--hive-text-primary)] font-medium", children: "Mike Kim" }), _jsx("p", { className: "text-sm text-gray-400", children: "Data Analyst" })] })] }), _jsx(Badge, { variant: "secondary", dot: true, children: "Offline" })] }), _jsxs("div", { className: "flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Avatar, { placeholder: _jsx(Bot, { className: "w-5 h-5 text-blue-400" }), status: "online", interactive: true }), _jsxs("div", { children: [_jsx("p", { className: "text-[var(--hive-text-primary)] font-medium", children: "HIVE Assistant" }), _jsx("p", { className: "text-sm text-gray-400", children: "AI Bot" })] })] }), _jsx(Badge, { variant: "primary", size: "sm", children: "Bot" })] })] }), _jsx("div", { className: "pt-4 border-t border-[var(--hive-border-default)]", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "flex -space-x-2", children: [_jsx(Avatar, { size: "sm", src: sampleAvatars.user1 }), _jsx(Avatar, { size: "sm", src: sampleAvatars.user2 }), _jsx(Avatar, { size: "sm", src: sampleAvatars.user3 }), _jsx(Avatar, { size: "sm", initials: "+2", className: "bg-gray-700 text-gray-300" })] }), _jsx("span", { className: "text-sm text-gray-400 ml-2", children: "5 members online" })] }) })] }))
};
// Avatar Stack
export const AvatarStack = {
    render: () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Small Stack" }), _jsxs("div", { className: "flex -space-x-2", children: [_jsx(Avatar, { size: "sm", src: sampleAvatars.user1, className: "ring-2 ring-gray-900" }), _jsx(Avatar, { size: "sm", src: sampleAvatars.user2, className: "ring-2 ring-gray-900" }), _jsx(Avatar, { size: "sm", src: sampleAvatars.user3, className: "ring-2 ring-gray-900" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Medium Stack with Count" }), _jsxs("div", { className: "flex -space-x-3", children: [_jsx(Avatar, { src: sampleAvatars.user1, className: "ring-2 ring-gray-900" }), _jsx(Avatar, { src: sampleAvatars.user2, className: "ring-2 ring-gray-900" }), _jsx(Avatar, { src: sampleAvatars.user3, className: "ring-2 ring-gray-900" }), _jsx(Avatar, { initials: "+5", className: "ring-2 ring-gray-900 bg-gray-700 text-gray-300" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Large Stack with Status" }), _jsxs("div", { className: "flex -space-x-4", children: [_jsx(Avatar, { size: "lg", src: sampleAvatars.user1, status: "online", className: "ring-2 ring-gray-900" }), _jsx(Avatar, { size: "lg", src: sampleAvatars.user2, status: "away", className: "ring-2 ring-gray-900" }), _jsx(Avatar, { size: "lg", initials: "BJ", status: "busy", className: "ring-2 ring-gray-900" }), _jsx(Avatar, { size: "lg", initials: "+3", className: "ring-2 ring-gray-900 bg-gray-700 text-gray-300" })] })] })] }))
};
// Special Avatars
export const SpecialAvatars = {
    render: () => (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Role-based Avatars" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { src: sampleAvatars.user1, size: "lg", status: "online", className: "ring-2 ring-yellow-400" }), _jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Crown, { className: "w-3 h-3 text-yellow-400" }), _jsx("span", { className: "text-xs text-yellow-400", children: "Admin" })] })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { src: sampleAvatars.user2, size: "lg", status: "online", className: "ring-2 ring-blue-400" }), _jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Shield, { className: "w-3 h-3 text-blue-400" }), _jsx("span", { className: "text-xs text-blue-400", children: "Moderator" })] })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { src: sampleAvatars.user3, size: "lg", status: "online", className: "ring-2 ring-green-400" }), _jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Star, { className: "w-3 h-3 text-green-400" }), _jsx("span", { className: "text-xs text-green-400", children: "VIP" })] })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "System Avatars" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { placeholder: _jsx(Bot, { className: "w-6 h-6 text-blue-400" }), size: "lg", status: "online", className: "bg-blue-500/10 border-blue-400" }), _jsx("span", { className: "text-xs text-blue-400", children: "AI Assistant" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { placeholder: _jsx(Settings, { className: "w-6 h-6 text-gray-400" }), size: "lg", className: "bg-gray-500/10 border-gray-400" }), _jsx("span", { className: "text-xs text-gray-400", children: "System" })] }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx(Avatar, { placeholder: _jsx(Shield, { className: "w-6 h-6 text-green-400" }), size: "lg", status: "online", className: "bg-green-500/10 border-green-400" }), _jsx("span", { className: "text-xs text-green-400", children: "Security" })] })] })] })] }))
};
// Interactive Demo
export const Interactive = {
    render: (args) => (_jsx("div", { className: "p-8", children: _jsx(Avatar, { ...args }) })),
    args: {
        src: sampleAvatars.user1,
        alt: 'Interactive avatar',
        size: 'lg',
        status: 'online',
        initials: 'JD',
        interactive: true
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo - use the controls below to test different avatar configurations including size, status, fallbacks, and interaction states.'
            }
        }
    }
};
//# sourceMappingURL=avatar.stories.js.map